import axios, { type AxiosInstance } from "axios";

import { API_BASE_URL, API_TIMEOUT } from "./config";
import { toAppError } from "./errors";

// In-memory only, mirrors the web client's window.__ACCESS_TOKEN__ pattern.
// Auth owns writing this and persisting it to SecureStore.
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

// Auth registers this to react to a session going invalid.
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

// Auth registers this to persist a silently-refreshed token — kept as a
// callback (not a direct SecureStore import) so this shared client never
// depends on a specific storage mechanism.
let persistToken: ((token: string) => void) | null = null;

export function setTokenPersister(fn: ((token: string) => void) | null) {
  persistToken = fn;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-panel-id": "customer",
  },
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const REFRESH_PATH = "/api/v1/customers/auth/refresh";
// After a refresh failure that isn't a confirmed invalid session (network
// blip, 5xx), back off instead of retrying on every subsequent 401.
const REFRESH_COOLDOWN_MS = 5000;
let refreshCooldownUntil = 0;
let isRefreshing = false;
let pendingRequests: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const resolvePending = (error: unknown, token: string | null) => {
  pendingRequests.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  pendingRequests = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isRefreshCall = original?.url === REFRESH_PATH;

    if (
      error?.response?.status !== 401 ||
      original?._retry ||
      isRefreshCall
    ) {
      return Promise.reject(toAppError(error));
    }

    if (Date.now() < refreshCooldownUntil) {
      return Promise.reject(toAppError(error));
    }

    // A refresh already in flight — queue behind it instead of firing a
    // second one; every 401 that lands while it's running retries with
    // whichever token that single refresh produces.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        original._retry = true;
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;
    try {
      // Plain axios, not apiClient — avoids recursing through this same
      // interceptor. No token in the body: the httpOnly cookie carries it.
      const { data } = await axios.post(
        `${API_BASE_URL}${REFRESH_PATH}`,
        {},
        { withCredentials: true, headers: { "x-panel-id": "customer" } },
      );
      const newToken = data.data.accessToken as string;
      setAccessToken(newToken);
      persistToken?.(newToken);
      resolvePending(null, newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } catch (refreshError) {
      resolvePending(refreshError, null);
      const status = (refreshError as { response?: { status?: number } })
        ?.response?.status;
      if (status === 401 || status === 403) {
        setAccessToken(null);
        onUnauthorized?.();
      } else {
        refreshCooldownUntil = Date.now() + REFRESH_COOLDOWN_MS;
      }
      return Promise.reject(toAppError(error));
    } finally {
      isRefreshing = false;
    }
  },
);
