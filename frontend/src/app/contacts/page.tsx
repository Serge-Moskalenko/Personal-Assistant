import ContactsClient from "./components/ContactsClient";

export default async function ContactsPage() {
  const API = process.env.NEXT_PUBLIC_DJANGO_API_URL!;
  const res = await fetch(`${API}/contacts/`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    return <p>Error loading contacts: {res.status}</p>;
  }
  const initialData = await res.json();
  return (
    <section>
      <ContactsClient initialData={initialData} />
    </section>
  );
}
