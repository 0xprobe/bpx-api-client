export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface ApiResponse<T> {
  statusCode: number;                                 // HTTP status code
  data: T | Record<string, never>;                    // Success case: actual data, Failure case: empty object
  error: ApiErrorResponse | Record<string, never>;    // Success case: empty object, Failure case: error details
}

export interface ApiErrorResponse {
  code: string;
  message: string;
}