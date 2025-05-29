import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL!.replace(/\/$/, "");

export const http = axios.create({ baseURL: BASE_URL });

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token!);
  });
  failedQueue = [];
}

http.interceptors.request.use((cfg) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

http.interceptors.response.use(
  (response) => response,
  (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalReq = error.config!;

    if (error.response?.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalReq.headers = originalReq.headers || {};
          originalReq.headers.Authorization = `Bearer ${token}`;
          return http(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

      return axios
        .post(
          `${BASE_URL}/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          const newAccess = res.data.access as string;
          const newRefresh = (res.data.refresh as string) || refreshToken;

          setTokens(newAccess, newRefresh);
          http.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
          originalReq.headers.Authorization = `Bearer ${newAccess}`;

          processQueue(null, newAccess);
          return http(originalReq);
        })
        .catch((err) => {
          processQueue(err, null);
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  }
);
