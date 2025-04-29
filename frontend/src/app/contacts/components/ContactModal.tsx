"use client";

import type { ContactInput } from "@/types/contact";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import ContactForm, { ContactFormProps } from "./ContactForm";

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

interface Props {
  open: boolean;
  initialValues?: ContactInput;
  onClose: () => void;
  onSave: (data: ContactInput) => Promise<void>;
}

export default function ContactModal({
  open,
  onClose,
  onSave,
  initialValues,
}: Props) {
  const handleSubmit: ContactFormProps["onSubmit"] = async (formData) => {
    await onSave(formData);
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
          <Typography variant="h6">
            {initialValues ? "Edit Contact" : "Add Contact"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <ContactForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
}
