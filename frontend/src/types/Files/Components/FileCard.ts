import { Image as ImageType } from "../useFiles";
export interface ImageCardProps {
  image: ImageType;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onDownload: (image: ImageType) => void;
}
