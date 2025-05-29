import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { NextRouter, useRouter } from "next/navigation";

export const BASE_URL = (process.env.NEXT_PUBLIC_DJANGO_API_URL ?? "").replace(
  /\/$/,
  ""
);

export const http = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config } = err;
    const router: NextRouter = useRouter();

    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          config.headers.Authorization = `Bearer ${token}`;
          return http(config);
        });
      }

      config._retry = true;
      isRefreshing = true;

      try {
        const refresh = useAuthStore.getState().refreshToken;
        const resRefresh = await axios.post(
          `${BASE_URL}/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );
        const newAccess = resRefresh.data.access;
        const newRefresh = resRefresh.data.refresh;

        useAuthStore.getState().setTokens(newAccess, newRefresh);

        http.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        config.headers.Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        return http(config);
      } catch (refreshError) {
        processQueue(refreshError, null);

        useAuthStore.getState().clearTokens();
        router.replace("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
