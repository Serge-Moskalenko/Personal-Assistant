"use client";
import Link from "next/link";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <article className="contact-card">
      <h2>
        <Link href={`/contacts/${contact.id}`}>
          {contact.firstName} {contact.lastName}
        </Link>
      </h2>
      {contact.email && <p>Email: {contact.email}</p>}
    </article>
  );
}
