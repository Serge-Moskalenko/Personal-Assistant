"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onHydrate(() => setHydrated(true));

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (accessToken === null) {
      clearTokens();
      router.replace("/login");
    }
  }, [hydrated, accessToken]);
}
