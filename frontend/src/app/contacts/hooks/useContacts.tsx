"use client";
import type { Contact, ContactInput } from "@/types/contact";
import useSWR from "swr";

const API = process.env.NEXT_PUBLIC_DJANGO_API_URL!;

const fetcher = (path: string) =>
  fetch(`${API}${path}`, {
    headers: { Accept: "application/json" },
  }).then((r) => {
    if (!r.ok) throw new Error(r.statusText);
    return r.json();
  });

export function useContacts(initialData: Contact[]) {
  const {
    data = initialData,
    error,
    isLoading,
    mutate,
  } = useSWR<Contact[]>("/contacts/", fetcher, {
    fallbackData: initialData,
    refreshInterval: 30_000,
    revalidateOnFocus: true,
  });

  async function createContact(input: ContactInput) {
    const res = await fetch(`${API}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(res.statusText);
    await mutate();
  }

  return { data, error, isLoading, createContact };
}
