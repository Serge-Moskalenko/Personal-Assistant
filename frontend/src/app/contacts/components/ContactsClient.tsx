
"use client";

import type { Contact, ContactInput } from "@/types/contact";
import Button from "@mui/material/Button";
import * as React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactModal from "./ContactModal";
import ContactsList from "./ContactsList";

interface ContactsClientProps {
  initialData: Contact[];
}

export default function ContactsClient({ initialData }: ContactsClientProps) {
  const { data, error, isLoading, createContact } = useContacts(initialData);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async (input: ContactInput) => {
    await createContact(input);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Contact
      </Button>

      <ContactModal open={open} onClose={handleClose} onSubmit={handleCreate} />

      <ContactsList contacts={data} />
    </>
  );
}
