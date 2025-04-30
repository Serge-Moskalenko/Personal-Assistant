import { ContactInput } from "../contact";

export interface Props {
    open: boolean;
    initialValues?: ContactInput;
    onClose: () => void;
    onSave: (data: ContactInput) => Promise<void>;
  }