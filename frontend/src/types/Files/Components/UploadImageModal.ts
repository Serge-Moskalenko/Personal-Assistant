export interface UploadImageModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: FormData) => Promise<any>;
}
