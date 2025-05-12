"use client";

import { Props } from "@/types/Files/Components/DeleteConfirmationDialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete file</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
