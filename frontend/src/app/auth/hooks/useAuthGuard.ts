"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();
  const hasHydrated = useAuthStore.persist.hasHydrated;

  useEffect(() => {
    if (!hasHydrated) return;

    if (accessToken === null) {
      clearTokens();
      router.replace("/login");
    }
  }, [hasHydrated, accessToken]);
}
