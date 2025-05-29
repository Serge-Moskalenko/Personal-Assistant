"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface JwtPayload {
  exp: number;
}

export function useAuthGuard() {
  const router = useRouter();
  const { token, setToken, clearToken } = useAuthStore();
  const [rehydrated, setRehydrated] = useState(false);
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated) {
      setRehydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!rehydrated) return;
    if (!token) {
      router.replace("/login");
    }
  }, [token, rehydrated]);

  useEffect(() => {
    if (!rehydrated || !token) return;

    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      const expiresAt = exp * 1000;
      const now = Date.now();
      const buffer = 30 * 1000;
      const refreshIn = expiresAt - now - buffer;

      if (refreshIn <= 0) {
        doTokenRefresh();
      } else {
        refreshTimeout.current = setTimeout(doTokenRefresh, refreshIn);
      }
    } catch (e) {
      clearToken();
      router.replace("/login");
    }

    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, [token, rehydrated]);

  async function doTokenRefresh() {
    try {
      const res = await fetch("/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: useAuthStore.getState().refreshToken }),
      });
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      setToken(data.access);
    } catch (err) {
      clearToken();
      router.replace("/login");
    }
  }
}
