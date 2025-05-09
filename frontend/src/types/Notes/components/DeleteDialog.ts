export interface DeleteDialogProps {
    open: boolean;
    title?: string;
    onCancel: () => void;
    onConfirm: () => void;
  }