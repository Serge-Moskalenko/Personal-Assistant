// frontend/src/app/contacts/hooks/useContacts.tsx
"use client";

import type { Contact, ContactInput } from "@/types/contact";
import useSWR from "swr";

const BASE = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";

interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

interface UseContactsOptions {
  page?: number;
  search?: string;
  days_ahead?: number;
  ordering?: string;
}

export function useContacts(
  opts: UseContactsOptions,
  initialData: PaginatedResponse<Contact>
) {
  const { page = 1, search, days_ahead, ordering } = opts;

  const qs = new URLSearchParams({
    page: String(page),
    ...(search ? { search } : {}),
    ...(days_ahead != null ? { days_ahead: String(days_ahead) } : {}),
    ...(ordering ? { ordering } : {}),
  }).toString();

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Contact>>(
    `/contacts/?${qs}`,
    (url) =>
      fetch(`${BASE}${url}`, { headers: { Accept: "application/json" } }).then(
        (r) => {
          if (!r.ok) throw new Error(r.statusText);
          return r.json();
        }
      ),
    {
      fallbackData: initialData,
      revalidateOnFocus: true,
      refreshInterval: 30_000,
    }
  );

  async function createContact(input: ContactInput) {
    const res = await fetch(`${BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Create failed");
    await mutate();
  }

  async function updateContact(id: string, input: ContactInput) {
    const res = await fetch(`${BASE}/contacts/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Update failed");
    await mutate();
  }

  // видалити
  async function deleteContact(id: string) {
    const res = await fetch(`${BASE}/contacts/${id}/`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    await mutate();
  }

  return {
    data,
    total: data?.count ?? 0,
    loading: isLoading,
    error,
    createContact,
    updateContact,
    deleteContact,
  };
}
