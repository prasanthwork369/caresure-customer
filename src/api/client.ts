import axios, { type AxiosInstance } from "axios";

import { API_BASE_URL, API_TIMEOUT } from "./config";
import { toAppError } from "./errors";

// In-memory only, mirrors the web client's window.__ACCESS_TOKEN__ pattern.
// Auth (a later step) owns writing this and persisting it to SecureStore.
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

// Auth registers this once its store exists, to react to a session going invalid.
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
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

// No refresh-and-retry here — that needs the auth refresh endpoint and
// SecureStore, neither of which this step touches. This just normalizes the
// error and gives auth a single hook to react to an invalid session later.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      onUnauthorized?.();
    }
    return Promise.reject(toAppError(error));
  },
);
