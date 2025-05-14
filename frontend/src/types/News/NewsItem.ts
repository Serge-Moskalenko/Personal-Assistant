export type NewsItem = {
  guid: string;
  title: string;
  link: string;
  description: string;
  pub_date: string;
};

export type PaginatedResponse<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type NewsParams = {
  page?: number;
  page_size?: number;
};