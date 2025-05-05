"use client";

import { http } from "@/shared/services/mainAxios";
import type {
  Contact,
  ContactInput,
  PaginatedResponse,
  UseContactsParams,
} from "@/types/Contacts/contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useContacts(params: UseContactsParams) {
  const qc = useQueryClient();
  const queryKey = ["contacts", params];

  const fetchContacts = () =>
    http
      .get<PaginatedResponse<Contact>>("/contacts/", { params })
      .then((res) => res.data);

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: fetchContacts,
    keepPreviousData: true,
  });

  const createContact = useMutation({
    mutationFn: (input: ContactInput) =>
      http.post<Contact>("/contacts/", input).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries(queryKey),
  });

  const updateContact = useMutation({
    mutationFn: ({ id, input }: { id: string; input: ContactInput }) =>
      http.put<Contact>(`/contacts/${id}/`, input).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries(queryKey),
  });

  const deleteContact = useMutation({
    mutationFn: (id: string) => http.delete<void>(`/contacts/${id}/`),
    onSuccess: () => qc.invalidateQueries(queryKey),
  });

  return {
    data,
    isLoading,
    error,
    createContact: createContact.mutateAsync,
    updateContact: updateContact.mutateAsync,
    deleteContact: deleteContact.mutateAsync,
  };
}
