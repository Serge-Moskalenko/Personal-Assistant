import { Contact } from "../contact";

export interface ContactsListProps {
    contacts: Contact[];
    onEdit: (c: Contact) => void;
    onDelete: (id: string) => Promise<void>;
  }