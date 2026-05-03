const DEFAULT_API_BASE_URL = "http://127.0.0.1:5000";

export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? DEFAULT_API_BASE_URL,
};
