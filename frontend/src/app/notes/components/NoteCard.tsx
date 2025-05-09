"use client";

import { NoteCardProps } from "@/types/Notes/components/NoteCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
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

  return (
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
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
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
          <IconButton onClick={() => onEdit(note)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => onDelete(note)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
