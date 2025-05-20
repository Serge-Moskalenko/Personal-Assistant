"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuthGuard } from "../auth/hooks/useAuthGuard";
import ImagesClient from "./components/FilesClient";

export default function ImagesPage() {
  useAuthGuard();
  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: 750 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your files
      </Typography>
      <ImagesClient />
    </Container>
  );
}
