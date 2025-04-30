export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  address?: string;
  phone_number: string;
  email: string;
  birthday: string | null;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export type ContactInput = Omit<Contact, "id">;
