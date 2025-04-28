"use client";

import type { Contact } from "@/types/contact";

export interface ContactsListProps {
  contacts: Contact[];
}

export default function ContactsList({ contacts }: ContactsListProps) {
  return (
    <>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            {c.first_name} {c.last_name} — {c.email}
          </li>
        ))}
      </ul>
    </>
  );
}
