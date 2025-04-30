"use client";

import { ContactCardProps } from "@/types/Contacts/Components/ContactCard";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

export default function ContactRow({
  contact: c,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <TableRow
      key={c.id}
      sx={{
        "&:nth-of-type(even)": {
          backgroundColor: "rgba(25, 118, 210, 0.08)",
        },
      }}
    >
      <TableCell>{`${c.first_name} ${c.last_name}`}</TableCell>
      <TableCell>{c.email}</TableCell>
      <TableCell>{c.phone_number}</TableCell>
      <TableCell>{c.address}</TableCell>
      <TableCell>{c.birthday}</TableCell>
      <TableCell align="center">
        <Stack direction="column" spacing={1} alignItems="center">
          <IconButton color="primary" onClick={() => onEdit(c)} size="small">
            <Edit fontSize="small" />
          </IconButton>

          {confirming ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                color="error"
                onClick={() => {
                  onDelete(c.id);
                  setConfirming(false);
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
              <Button size="small" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </Stack>
          ) : (
            <IconButton
              color="error"
              onClick={() => setConfirming(true)}
              size="small"
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
