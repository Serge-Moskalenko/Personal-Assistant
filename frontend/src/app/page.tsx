"use client";
import { Box } from "@mui/material";
import { useAuthGuard } from "./auth/hooks/useAuthGuard";
import { NewsPage } from "./news/page";

export default function HomePage() {
  useAuthGuard();
  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Box textAlign="center"></Box>
        <NewsPage />
      </Box>
    </div>
  );
}
