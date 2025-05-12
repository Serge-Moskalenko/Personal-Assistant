"use client";

import { UploadImageModalProps } from "@/types/Files/Components/UploadImageModal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";



export default function UploadImageModal({
  open,
  onClose,
  onUpload,
}: UploadImageModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    try {
      await onUpload(form);
      setFile(null);
      setTitle("");
      setError("");
      onClose();
    } catch (e: any) {
      setError(e.message || "Upload failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
          <TextField
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setError("");
            }}
            inputProps={{ accept: "*" }}
          />
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
