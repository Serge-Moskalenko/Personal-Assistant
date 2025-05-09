"use client";

import { useNotes } from "@/app/notes/hooks/useNotes";
import { Note } from "@/types/Notes/notes";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";
import { FiltersBar } from "./FiltersBar";
import { NoteModal } from "./NoteModal";
import { NotesList } from "./NotesList";

export function NotesClient() {
  const [params, setParams] = useState({ page: 1, search: "", status: "" });
  const { data, isLoading, error, createNote, updateNote, deleteNote } =
    useNotes(params);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const handleAdd = () => {
    setCurrentNote(undefined);
    setModalOpen(true);
  };
  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };
  const openDeleteDialog = (note: Note) => {
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };
  const confirmDelete = async () => {
    if (noteToDelete) {
      await deleteNote(noteToDelete.id);
      setParams({ ...params });
    }
    closeDeleteDialog();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        Error loading notes.
      </Typography>
    );
  }

  const items: Note[] = data?.results || [];
  const totalPages = Math.ceil((data?.count || 0) / 10);

  return (
    <Box>
      <FiltersBar onChange={setParams} onAdd={handleAdd} values={params} />

      <NotesList
        notes={items}
        onEdit={handleEdit}
        onDelete={openDeleteDialog}
      />

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={params.page}
            color="primary"
            onChange={(_, p) => setParams({ ...params, page: p })}
          />
        </Box>
      )}

      <NoteModal
        open={modalOpen}
        initial={currentNote}
        onClose={() => setModalOpen(false)}
        onSave={async (note) => {
          if (currentNote) {
            await updateNote({ id: currentNote.id, data: note });
          } else {
            await createNote(note);
          }
          setModalOpen(false);
        }}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        title={noteToDelete?.title}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}
