import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra as
  | { apiBaseUrl?: string }
  | undefined;

// Resolved once by app.config.ts (extra.apiBaseUrl) — this fallback only
// covers the edge case where Constants.expoConfig itself is unavailable.
export const API_BASE_URL = extra?.apiBaseUrl ?? "https://api.caresure.dev";

// Generous in dev (Metro/debugger overhead); tight in production so a
// stalled request fails fast instead of hanging the UI.
export const API_TIMEOUT = __DEV__ ? 60_000 : 15_000;
