// frontend/src/app/contacts/hooks/useContacts.ts
"use client";

import type { Contact, ContactInput } from "@/types/Contacts/contact";
import useSWR from "swr";

const BASE = process.env.NEXT_PUBLIC_DJANGO_API_URL!;

export interface PaginatedResponse<T> {
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

  // Ключ — завжди строка запиту
  const key = `/contacts/?${qs}`;

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Contact>>(
    key,
    // fetcher приймає єдиний параметр — рядок
    (path) =>
      fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } }).then(
        (r) => {
          if (!r.ok) throw new Error(r.statusText);
          return r.json();
        }
      ),
    {
      fallbackData: initialData, // перший рендер із серверу
      revalidateOnFocus: true,
      refreshInterval: 30_000,
    }
  );

  const createContact = async (input: ContactInput) => {
    const res = await fetch(`${BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to create");
    await mutate(); // оновити сторінку
  };

  const updateContact = async (id: string, input: ContactInput) => {
    const res = await fetch(`${BASE}/contacts/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to update");
    await mutate();
  };

  const deleteContact = async (id: string) => {
    const res = await fetch(`${BASE}/contacts/${id}/`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    await mutate();
  };

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
