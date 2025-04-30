export interface FiltersBarProps {
  search: string;
  daysAhead?: number;
  ordering?: string;
  onSearchChange: (v: string) => void;
  onDaysAheadChange: (v?: number) => void;
  onOrderingChange: (v?: string) => void;
  onReset: () => void;
  onAdd: () => void;
}
