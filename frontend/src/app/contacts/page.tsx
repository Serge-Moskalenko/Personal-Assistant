"use client";
import { pageContactStyles } from "@/styles/contacts/ContactsPage";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ContactsClient } from "./components/ContactsClient";

export default function ContactsPage() {
  return (
    <div style={{ ...pageContactStyles }}>
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Contacts
        </Typography>
        <ContactsClient />
      </Container>
    </div>
  );
}
