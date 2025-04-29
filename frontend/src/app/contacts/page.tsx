import type { Contact, PaginatedResponse } from "@/types/contact";
import ContactsClient from "./components/ContactsClient";

export default async function ContactsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/contacts/`,
    { cache: "no-store", headers: { Accept: "application/json" } }
  );
  if (!res.ok) return <p>Error: {res.status}</p>;

  const initialData = (await res.json()) as PaginatedResponse<Contact>;

  return (
    <section>
      <ContactsClient initialData={initialData} />
    </section>
  );
}
