"use client";

import { NotesListProps } from "@/types/Notes/components/NotesList";
import { Grid } from "@mui/material";
import { NoteCard } from "./NoteCard";

export function NotesList({ notes, onEdit, onDelete }: NotesListProps) {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
      {notes.map((note) => (
        <Grid
          key={note.id}
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", height: "100%" }}
        >
          <NoteCard note={note} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
