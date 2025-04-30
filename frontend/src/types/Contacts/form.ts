import { FormSchema } from "@/schemas/form.yup";
import type { ContactInput } from "@/types/Contacts/contact";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";

export type FormValues = yup.InferType<typeof FormSchema>;
export interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactInput) => Promise<void> | void;
}

export interface ContactFormProps {
  onSubmit: SubmitHandler<FormValues>;
}
