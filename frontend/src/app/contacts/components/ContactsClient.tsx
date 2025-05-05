"use client";

import { Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";

import type { Contact } from "@/types/Contacts/contact";
import { useContacts } from "../hooks/useContacts";
import ContactModal from "./ContactModal";
import ContactsList from "./ContactsList";
import FiltersBar from "./FiltersBar";

export function ContactsClient({
  initialData,
}: {
  initialData: PaginatedResponse<Contact>;
}) {
  const [search, setSearch] = useState("");
  const [daysAhead, setDaysAhead] = useState<number>();
  const [ordering, setOrdering] = useState<string>();
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const {
    data,
    total,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
  } = useContacts(
    { page, search, days_ahead: daysAhead, ordering },
    initialData
  );

  const resetAll = () => {
    setSearch("");
    setDaysAhead(undefined);
    setOrdering(undefined);
    setPage(1);
  };

  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <FiltersBar
        search={search}
        daysAhead={daysAhead}
        ordering={ordering}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onDaysAheadChange={(v) => {
          setDaysAhead(v);
          setPage(1);
        }}
        onOrderingChange={(v) => {
          setOrdering(v);
          setPage(1);
        }}
        onReset={resetAll}
        onAdd={() => {
          setEditContact(null);
          setModalOpen(true);
        }}
      />

      {loading ? (
        <Typography>Loading…</Typography>
      ) : (
        <>
          <ContactsList
            contacts={data?.results || []}
            onEdit={(c) => {
              setEditContact(c);
              setModalOpen(true);
            }}
            onDelete={(id) => deleteContact(id)}
          />

          <Stack alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil((data?.count ?? 0) / 10)}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Stack>
        </>
      )}

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={editContact ?? undefined}
        onSave={async (vals) => {
          if (editContact) {
            await updateContact(editContact.id, vals);
          } else {
            await createContact(vals);
          }
          setModalOpen(false);
          setEditContact(null);
        }}
      />
    </>
  );
}
