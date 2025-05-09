"use client";

import { DeleteDialogProps } from "@/types/Notes/components/DeleteDialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export function DeleteDialog({
  open,
  title,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the note “{title}”?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
