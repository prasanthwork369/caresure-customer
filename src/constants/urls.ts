// Same override convention as API_BASE_URL (src/api/config.ts) — public web
// domain for legal/policy pages, overridable per-environment.
export const WEB_BASE_URL =
  process.env.EXPO_PUBLIC_WEB_BASE_URL ?? "https://caresure.com";
