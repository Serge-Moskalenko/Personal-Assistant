import { Note } from "../notes";

export interface NotesListProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (note: Note) => void;
  }