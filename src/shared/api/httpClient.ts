import { env } from "../config/env";
import type { ApiError, ApiMethod } from "../types/api";

interface RequestOptions {
  method?: ApiMethod;
  body?: BodyInit | object;
  headers?: HeadersInit;
}

function buildInit(options: RequestOptions): RequestInit {
  const method = options.method ?? "GET";
  const isRawBody = options.body instanceof FormData;
  const body =
    options.body && !isRawBody && typeof options.body === "object"
      ? JSON.stringify(options.body)
      : (options.body as BodyInit | undefined);

  const headers: HeadersInit = isRawBody
    ? options.headers ?? {}
    : {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      };

  return { method, body, headers };
}

async function parseApiError(response: Response): Promise<ApiError> {
  let message = "Unexpected API error.";
  try {
    const payload = (await response.json()) as { error?: string; message?: string };
    message = payload.error ?? payload.message ?? message;
  } catch {
    message = response.statusText || message;
  }
  return { message, status: response.status };
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, buildInit(options));
  if (!response.ok) {
    throw await parseApiError(response);
  }
  return (await response.json()) as T;
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: BodyInit | object, headers?: HeadersInit) =>
    request<T>(path, { method: "POST", body, headers }),
};
