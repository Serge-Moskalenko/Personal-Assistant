
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_URL?.replace(/\/$/, "") ?? "";

export const http = axios.create({ baseURL: BASE_URL });

http.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();
      try {
        const { data } = await axios.post(
          `${BASE_URL}/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        setTokens(data.access, data.refresh ?? refreshToken);
     
        config.headers.Authorization = `Bearer ${data.access}`;
        return http(config);
      } catch {
        clearTokens(); 
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
