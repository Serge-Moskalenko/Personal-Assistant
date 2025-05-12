"use client";

import { Props } from "@/types/Files/Components/FileEditDialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ImageEditDialog({
  open,
  initialTitle,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (open) setTitle(initialTitle);
  }, [open, initialTitle]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit title</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(title)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
