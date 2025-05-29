import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL?.replace(/\/$/, "")!;

export const http = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

http.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return http(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

      return axios
        .post(
          `${BASE_URL}/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(({ data }) => {
          const newAccess = data.access;
          const newRefresh = data.refresh ?? refreshToken;
          setTokens(newAccess, newRefresh);

          http.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          processQueue(null, newAccess);

          return http(originalRequest);
        })
        .catch((refreshError) => {
          processQueue(refreshError, null);
          clearTokens();

          window.location.href = "/login";
          return Promise.reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(err);
  }
);
