export type ApiMethod = "GET" | "POST";

export interface ApiError {
  message: string;
  status: number;
}
