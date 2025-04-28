"use client";

import type { ContactInput } from "@/types/contact";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import { ContactModalProps } from "@/interfaces/form";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ContactModal({
  open,
  onClose,
  onSubmit,
}: ContactModalProps) {
  const handleSubmit = async (data: ContactInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Add Contact</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <ContactForm onSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
}
