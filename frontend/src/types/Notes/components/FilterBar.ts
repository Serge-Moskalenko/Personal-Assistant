export interface FiltersBarProps {
    values: {
      search?: string;
      status?: string;
      date_from?: string;
      date_to?: string;
      ordering?: string;
      page?: number;
      tags?: string;
      [key: string]: any;
    };
    onChange: (values: FiltersBarProps["values"]) => void;
    onAdd: () => void;
  }