"use client";

import type { Contact, PaginatedResponse } from "@/types/Contacts/contact";
import { Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";

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
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
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
      </div>
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
            onDelete={deleteContact}
          />

          <Stack alignItems="center" mt={3}>
            <Pagination
              count={Math.ceil(total / 10)}
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
        initialValues={
          editContact
            ? {
                first_name: editContact.first_name,
                last_name: editContact.last_name,
                address: editContact.address ?? "",
                phone_number: editContact.phone_number,
                email: editContact.email,
                birthday: editContact.birthday,
              }
            : undefined
        }
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
