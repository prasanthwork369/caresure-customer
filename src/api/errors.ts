import type { AxiosError } from "axios";

export type AppErrorKind =
  | "network"
  | "timeout"
  | "cancelled"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "rate_limited"
  | "conflict"
  | "server"
  | "unknown";

export class AppError extends Error {
  kind: AppErrorKind;
  status?: number;
  data?: unknown;
  /** Seconds the server asked us to wait; only set for `rate_limited`. */
  retryAfterSeconds?: number;

  constructor(
    kind: AppErrorKind,
    message: string,
    status?: number,
    data?: unknown,
    retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "AppError";
    this.kind = kind;
    this.status = status;
    this.data = data;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

// Accepts delay-seconds ("120") or an HTTP date; undefined for anything else.
function parseRetryAfter(raw: unknown, now = Date.now()): number | undefined {
  if (typeof raw !== "string" && typeof raw !== "number") return undefined;
  const value = String(raw).trim();
  if (!value) return undefined;

  if (/^\d+$/.test(value)) {
    const seconds = Number(value);
    return Number.isFinite(seconds) ? seconds : undefined;
  }

  const at = Date.parse(value);
  if (Number.isNaN(at)) return undefined;
  return Math.max(0, Math.round((at - now) / 1000));
}

function isAxiosError(err: unknown): err is AxiosError {
  return (
    typeof err === "object" &&
    err !== null &&
    (err as { isAxiosError?: boolean }).isAxiosError === true
  );
}

export function toAppError(err: unknown): AppError {
  if (err instanceof AppError) return err;

  if (
    (err as { code?: string } | null)?.code === "ERR_CANCELED" ||
    (err as { name?: string } | null)?.name === "CanceledError"
  ) {
    return new AppError("cancelled", "Request cancelled");
  }

  if (isAxiosError(err)) {
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      return new AppError(
        "timeout",
        "Request timed out. Please check your connection.",
      );
    }
    // No response covers DNS failure, connection reset, unreachable host.
    if (!err.response) {
      return new AppError(
        "network",
        "Connection error. Please check your internet or try again.",
      );
    }

    const status = err.response.status;
    const data = err.response.data as { message?: string } | undefined;
    const message = data?.message ?? err.message;

    if (status === 401) return new AppError("unauthorized", message, status, data);
    if (status === 403) return new AppError("forbidden", message, status, data);
    if (status === 404) return new AppError("not_found", message, status, data);
    if (status === 400 || status === 422)
      return new AppError("validation", message, status, data);
    if (status === 409) return new AppError("conflict", message, status, data);
    if (status === 429) {
      return new AppError(
        "rate_limited",
        message,
        status,
        data,
        parseRetryAfter(err.response.headers?.["retry-after"]),
      );
    }
    if (status >= 500) {
      return new AppError(
        "server",
        "Server error. Please try again later.",
        status,
        data,
      );
    }
    return new AppError("unknown", message, status, data);
  }

  if (err instanceof Error) return new AppError("unknown", err.message);
  return new AppError("unknown", "Something went wrong");
}
