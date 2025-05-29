"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();

  useEffect(() => {
    if (accessToken === null) {
      clearTokens();
      router.replace("/login");
    }
  }, [accessToken]);
}
