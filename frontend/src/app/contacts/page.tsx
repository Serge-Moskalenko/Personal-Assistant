"use client";
import { pageContactStyles } from "@/styles/contacts/ContactsPage";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuthGuard } from "../auth/hooks/useAuthGuard";
import { ContactsClient } from "./components/ContactsClient";

export default function ContactsPage() {
  useAuthGuard();
  return (
    <div style={{ ...pageContactStyles }}>
      <Container maxWidth="lg" sx={{ px: 0, minHeight: 750 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Contacts
        </Typography>
        <ContactsClient />
      </Container>
    </div>
  );
}
