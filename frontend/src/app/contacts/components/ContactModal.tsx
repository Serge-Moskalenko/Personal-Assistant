"use client";

import { styleModal } from "@/styles/contacts/ContactModal";
import { Props } from "@/types/Contacts/Components/ContactModal";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import ContactForm, { ContactFormProps } from "./ContactForm";

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
      <Box sx={styleModal}>
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
