import { QueryClient } from "@tanstack/react-query";

import { AppError, type AppErrorKind } from "@/api";

// Retrying these wastes a request: the outcome is already decided by
// something other than transient network flakiness.
const NON_RETRYABLE: AppErrorKind[] = [
  "cancelled",
  "unauthorized",
  "forbidden",
  "not_found",
  "validation",
  "network",
  "rate_limited",
  "conflict",
];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,
      gcTime: 60 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof AppError && NON_RETRYABLE.includes(error.kind)) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
