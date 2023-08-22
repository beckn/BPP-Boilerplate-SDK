export interface APIResponse {
  message?: string
  error?: {
    message?: string
    error_code?: number
  }
}
