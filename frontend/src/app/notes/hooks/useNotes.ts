"use client";

import { http } from "@/shared/services/mainAxios";
import type { Note, NoteInput, PaginatedResponse } from "@/types/Notes/notes";
import { Params } from "@/types/Notes/useNotes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotes(params: Params) {
  const qc = useQueryClient();
  const key = ["notes", params];

  const query = useQuery<PaginatedResponse<Note>>({
    queryKey: key,
    queryFn: () =>
      http
        .get("/notes/", {
          params: {
            ...params,

            tags: params.tags?.trim() ? params.tags : undefined,
          },
        })
        .then((r) => r.data),
    keepPreviousData: true,
  });

  const createNote = useMutation({
    mutationFn: (data: NoteInput) =>
      http.post("/notes/", data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries(key),
  });

  const updateNote = useMutation({
    mutationFn: ({ id, data }: { id: string; data: NoteInput }) =>
      http.put(`/notes/${id}/`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries(key),
  });

  const deleteNote = useMutation({
    mutationFn: (id: string) =>
      http.delete(`/notes/${id}/`).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries(key),
  });

  return {
    ...query,
    createNote: createNote.mutateAsync,
    updateNote: updateNote.mutateAsync,
    deleteNote: deleteNote.mutateAsync,
  };
}
