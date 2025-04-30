"use client";

import { ContactsListProps } from "@/types/Contacts/Components/ContactsList";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ContactRow from "./ContactCard";

export default function ContactsList({
  contacts,
  onEdit,
  onDelete,
}: ContactsListProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(25, 118, 210, 0.08)" }}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((c) => (
            <ContactRow
              key={c.id}
              contact={c}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
