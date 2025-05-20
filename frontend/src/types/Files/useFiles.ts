export interface Image {
  id: string;
  title: string;
  download_url: string;
  category: string;
  uploaded_at: string;
  original_filename: string;
}

export interface Paginated<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
}
