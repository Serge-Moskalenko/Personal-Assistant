"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import * as jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface JwtPayload {
  exp: number;
}

export function useAuthGuard() {
  const router = useRouter();
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const API = process.env.NEXT_PUBLIC_API_BASE!;

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated) {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!accessToken) {
      clearTokens();
      router.replace("/login");
    }
  }, [accessToken, hydrated]);

  useEffect(() => {
    if (!hydrated || !accessToken || !refreshToken) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let payload: JwtPayload;
    try {
      payload = jwtDecode<JwtPayload>(accessToken);
    } catch {
      clearTokens();
      return router.replace("/login");
    }

    const expiresMs = payload.exp * 1000;
    const now = Date.now();
    const buffer = 30_000; // 30s
    const msToRefresh = expiresMs - now - buffer;

    if (msToRefresh <= 0) {
      refresh();
    } else {
      timeoutRef.current = setTimeout(refresh, msToRefresh);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [accessToken, refreshToken, hydrated]);

  async function refresh() {
    try {
      const res = await fetch(`${API}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!res.ok) throw new Error("Refresh error");
      const data = await res.json();

      setTokens(data.access, data.refresh ?? refreshToken);
    } catch {
      clearTokens();
      router.replace("/login");
    }
  }
}
