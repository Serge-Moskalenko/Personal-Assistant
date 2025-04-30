"use client";
import { FiltersBarProps } from "@/types/Contacts/Components/FiltersBar";
import { Cake, RestartAlt } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export default function FiltersBar({
  search,
  daysAhead,
  ordering,
  onSearchChange,
  onDaysAheadChange,
  onOrderingChange,
  onReset,
  onAdd,
}: FiltersBarProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      mb={2}
    >
      <TextField
        label="Search"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <ToggleButtonGroup
        value={ordering}
        exclusive
        size="small"
        color="primary"
        onChange={(_, v) => onOrderingChange(v!)}
        aria-label="sort by name"
      >
        <ToggleButton value="first_name">A→Z</ToggleButton>
        <ToggleButton value="-first_name">Z→A</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={ordering}
        exclusive
        size="small"
        color="primary"
        onChange={(_, v) => onOrderingChange(v!)}
        aria-label="sort by birthday"
      >
        <ToggleButton value="birthday" aria-label="Oldest">
          <Cake /> ↑
        </ToggleButton>
        <ToggleButton value="-birthday" aria-label="Newest">
          <Cake /> ↓
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label="Upcoming (days)"
        type="number"
        size="small"
        value={daysAhead ?? ""}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          onDaysAheadChange(isNaN(v) ? undefined : v);
        }}
        inputProps={{ min: 0 }}
      />
      <IconButton onClick={onReset}>
        <RestartAlt />
      </IconButton>
      <Button variant="contained" onClick={onAdd}>
        Add Contact
      </Button>
    </Stack>
  );
}
