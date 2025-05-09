import { NoteInput } from "../notes";

export interface NoteModalProps {
  open: boolean;
  initial?: Note;
  onClose: () => void;
  onSave: (d: NoteInput) => Promise<any>;
}
