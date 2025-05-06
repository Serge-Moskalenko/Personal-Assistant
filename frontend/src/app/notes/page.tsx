"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NotesClient from "./components/NotesClient";

export default function NotesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Notes
      </Typography>
      <NotesClient />
    </Container>
  );
}
