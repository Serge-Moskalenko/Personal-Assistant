"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const { token, clearToken } = useAuthStore();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    useAuthStore.persist.hasHydrated && setRehydrated(true);
  }, []);

  useEffect(() => {
    if (!rehydrated) return;
    if (!token) {
      router.replace("/login");
    }
  }, [token, rehydrated]);
}
