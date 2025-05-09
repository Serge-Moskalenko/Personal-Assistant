export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  reminder_date: string | null;
  status: "" | "green" | "yellow" | "red";
  created_at: string;
  updated_at: string;
}

export type NoteInput = Omit<Note, "id" | "created_at" | "updated_at">;

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}
