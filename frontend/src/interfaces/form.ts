import type { ContactInput } from "@/types/contact";
import { FormValues } from "@/types/form";
import { SubmitHandler } from "react-hook-form";

export interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactInput) => Promise<void> | void;
}

export interface ContactFormProps {
  onSubmit: SubmitHandler<FormValues>;
}
