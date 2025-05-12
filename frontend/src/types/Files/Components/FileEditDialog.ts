export interface Props {
  open: boolean;
  initialTitle: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}
