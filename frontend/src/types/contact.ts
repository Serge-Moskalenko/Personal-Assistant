export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  address?: string;
  phone_number: string;
  email: string;
  birthday?: string;
  created_at: string;
  updated_at: string;
}

export type ContactInput = Omit<Contact, "id" | "created_at" | "updated_at">;
