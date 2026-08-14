// Shared response envelope the backend wraps every payload in.
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
