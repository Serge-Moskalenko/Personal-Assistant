"use client";
import { schema } from "@/schemas/notes";
import { NoteModalProps } from "@/types/Notes/components/NoteModal";
import type { NoteInput } from "@/types/Notes/notes";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: NoteInput = {
  title: "",
  content: "",
  tags: "",
  reminder_date: "",
  status: "",
};

export function NoteModal({ open, initial, onClose, onSave }: NoteModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteInput>({
    resolver: yupResolver(schema),
    defaultValues: initial
      ? {
          title: initial.title,
          content: initial.content,
          tags: initial.tags.join(", "),
          reminder_date: initial.reminder_date ?? "",
          status: initial.status,
        }
      : defaultValues,
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title,
        content: initial.content,
        tags: initial.tags.join(", "),
        reminder_date: initial.reminder_date ?? "",
        status: initial.status,
      });
    } else {
      reset(defaultValues);
    }
  }, [initial, reset]);

  const onSubmit = async (data: NoteInput) => {
    const tagsArray = (data.tags as string)
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const finalTags =
      initial && tagsArray.length === 0 ? initial.tags : tagsArray;

    await onSave({
      ...data,
      tags: finalTags,
    });

    reset(defaultValues);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 1,
          width: 400,
        }}
      >
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {initial ? "Edit Note" : "New Note"}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="textSecondary">
            Fields marked * are required.
          </Typography>

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title *"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Content *"
                multiline
                rows={3}
                fullWidth
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tags (comma-separated)"
                placeholder="e.g. work, personal"
                fullWidth
                error={!!errors.tags}
                helperText={
                  errors.tags?.message ||
                  (initial ? "Leave empty to keep existing tags" : "")
                }
              />
            )}
          />

          <Controller
            name="reminder_date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reminder Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                error={!!errors.reminder_date}
                helperText={errors.reminder_date?.message}
                value={field.value ?? ""}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status"
                select
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="green">Completed</MenuItem>
                <MenuItem value="yellow">Pending</MenuItem>
                <MenuItem value="red">Failed</MenuItem>
              </TextField>
            )}
          />

          {Object.keys(errors).length > 0 && (
            <Typography color="error" variant="body2">
              Please fix the errors above.
            </Typography>
          )}

          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {initial ? "Update" : "Create"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
