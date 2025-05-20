import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL?.replace(/\/$/, "") ?? "";

export const http = axios.create({ baseURL: BASE_URL });

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});