"use client";

import { useEffect, useState } from "react";
import ContactCard, { Contact } from "../components/ContactCard";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then(setContacts)
      .catch(console.error);
  }, []);

  return (
    <section>
      <h1>Contacts</h1>
      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        contacts.map((c) => <ContactCard key={c.id} contact={c} />)
      )}
    </section>
  );
}
