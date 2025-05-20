"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuthGuard } from "../auth/hooks/useAuthGuard";
import { NotesClient } from "./components/NotesClient";

export default function NotesPage() {
  useAuthGuard();
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 4, minHeight: 750 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Notes
        </Typography>
        <NotesClient />
      </Container>
    </div>
  );
}
