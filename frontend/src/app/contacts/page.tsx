import pageContactStyles from "@/styles/contacts/ContactsPage";
import type { Contact, PaginatedResponse } from "@/types/Contacts/contact";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ContactsClient } from "./components/ContactsClient";

export default async function ContactsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/contacts/`,
    { cache: "no-store", headers: { Accept: "application/json" } }
  );
  if (!res.ok) {
    return <Typography color="error">Error: {res.status}</Typography>;
  }

  const initialData = (await res.json()) as PaginatedResponse<Contact>;

  return (
    <div style={pageContactStyles}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          color=""
        >
          Your Contacts
        </Typography>
        <ContactsClient initialData={initialData} />
      </Container>
    </div>
  );
}
