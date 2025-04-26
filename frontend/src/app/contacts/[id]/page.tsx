"use client";

import { useEffect, useState } from "react";

interface ContactDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

export default function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [contact, setContact] = useState<ContactDetail | null>(null);

  useEffect(() => {
    fetch(`/api/contacts/${params.id}`)
      .then((res) => res.json())
      .then(setContact)
      .catch(console.error);
  }, [params.id]);

  if (!contact) return <p>Loading…</p>;

  return (
    <article>
      <h1>
        {contact.firstName} {contact.lastName}
      </h1>
      <p>Email: {contact.email}</p>
      {contact.phoneNumber && <p>Phone: {contact.phoneNumber}</p>}
      {contact.address && <p>Address: {contact.address}</p>}
    </article>
  );
}
