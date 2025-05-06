"use client";
import { useNotes } from "@/app/notes/hooks/useNotes";
import { Note } from "@/types/Notes/notes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FiltersBar from "./FiltersBar";
import NoteModal from "./NoteModal";

export default function NotesClient() {
  const theme = useTheme();
 
  const statusBg: Record<string, string> = {
    red: "rgba(213, 157, 157, 0.1)",
    yellow: "rgba(204, 204, 10, 0.1)",
    green: "rgba(59, 204, 10, 0.1)",
  };
 
  const statusColors: Record<string, string> = {
    red: theme.palette.error.main,
    yellow: "yellow",
    green: theme.palette.success.main,
  };

  const [params, setParams] = useState({ page: 1, search: "", status: "" });
  const { data, isLoading, error, createNote, updateNote, deleteNote } =
    useNotes(params);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);

  const handleAdd = () => {
    setCurrentNote(undefined);
    setModalOpen(true);
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const handleDelete = async (note: Note) => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(note.id);
      setParams({ ...params });
    }
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

      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {items.map((note) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={note.id}
            sx={{ display: "flex", height: "100%" }}
          >
            <Card
              sx={{
                position: "relative",
                width: 300,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
                backgroundColor:
                  statusBg[note.status] || theme.palette.background.paper,
              }}
            >
              <CardHeader
                title={note.title}
                subheader={note.reminder_date || "No date"}
                sx={{ pb: 0 }}
              />
           
              {note.status && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 16,
                    height: 16,
                    bgcolor: statusColors[note.status],
                    borderRadius: "50%",
                  }}
                />
              )}

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ flexGrow: 1 }}
                >
                  {note.content}
                </Typography>

                {note.tags.length > 0 && (
                  <Typography variant="caption" display="block" mt={1}>
                    Tags: {note.tags.join(", ")}
                  </Typography>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                  <IconButton onClick={() => handleEdit(note)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(note)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={params.page}
            onChange={(_, p) => setParams({ ...params, page: p })}
          />
        </Box>
      )}

      <NoteModal
        open={modalOpen}
        initial={currentNote}
        onClose={() => setModalOpen(false)}
        onSave={(note) =>
          currentNote
            ? updateNote({ id: currentNote.id, data: note })
            : createNote(note)
        }
      />
    </Box>
  );
}
