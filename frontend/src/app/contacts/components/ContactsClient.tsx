// frontend/src/app/contacts/components/ContactsClient.tsx
"use client";

import type { Contact, PaginatedResponse } from "@/types/contact";
import { Cake, Delete, Edit, RestartAlt } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Pagination,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useContacts } from "../hooks/useContacts";
import ContactModal from "./ContactModal";

export default function ContactsClient({
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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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

  const resetFilters = () => {
    setSearch("");
    setDaysAhead(undefined);
    setOrdering(undefined);
    setPage(1);
  };

  const openAdd = () => {
    setEditContact(null);
    setModalOpen(true);
  };

  const openEdit = (c: Contact) => {
    setEditContact(c);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    setConfirmDeleteId(null);
  };

  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <ToggleButtonGroup
          value={ordering}
          exclusive
          size="small"
          color="primary"
          onChange={(_, v) => {
            setOrdering(v);
            setPage(1);
          }}
        >
          <ToggleButton value="first_name">A→Z</ToggleButton>
          <ToggleButton value="-first_name">Z→A</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={ordering}
          exclusive
          size="small"
          color="primary"
          onChange={(_, v) => {
            setOrdering(v);
            setPage(1);
          }}
        >
          <ToggleButton value="birthday" aria-label="Oldest">
            <Cake /> ↑
          </ToggleButton>
          <ToggleButton value="-birthday" aria-label="Newest">
            <Cake /> ↓
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Next (days)"
          type="number"
          size="small"
          value={daysAhead ?? ""}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setDaysAhead(isNaN(v) ? undefined : v);
            setPage(1);
          }}
          inputProps={{ min: 0 }}
        />

        <IconButton onClick={resetFilters}>
          <RestartAlt />
        </IconButton>

        <Button variant="contained" sx={{ ml: "auto" }} onClick={openAdd}>
          Add Contact
        </Button>
      </Stack>

      {loading ? (
        <Typography>Loading…</Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {data?.results.map((c) => (
              <Card key={c.id} variant="outlined" sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6">
                    {c.first_name} {c.last_name}
                  </Typography>
                  <Typography variant="body2">Email: {c.email}</Typography>
                  <Typography variant="body2">
                    Phone: {c.phone_number}
                  </Typography>
                  <Typography variant="body2">Address: {c.address}</Typography>
                  <Typography variant="body2">
                    Birthday: {c.birthday}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="success"
                    onClick={() => openEdit(c)}
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>

                  {confirmDeleteId === c.id ? (
                    <>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(c.id)}
                      >
                        Confirm Delete
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDeleteId(c.id)}
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            ))}
          </Stack>

          <Stack alignItems="center" mt={2}>
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
        onSave={async (data) => {
          if (editContact) {
            await updateContact(editContact.id, data);
          } else {
            await createContact(data);
          }
          setModalOpen(false);
          setEditContact(null);
        }}
      />
    </>
  );
}
