"use client";
import { Add as AddIcon, RestartAlt } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { FiltersBarProps } from "@/types/Notes/components/FilterBar";

export function FiltersBar({ values, onChange, onAdd }: FiltersBarProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      mb={2}
      sx={{ width: "100%", maxWidth: 1000, mx: "auto", px: 2 }}
    >
      <TextField
        label="From date"
        type="date"
        size="small"
        value={values.date_from || ""}
        onChange={(e) =>
          onChange({ ...values, date_from: e.target.value, page: 1 })
        }
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="To date"
        type="date"
        size="small"
        value={values.date_to || ""}
        onChange={(e) =>
          onChange({ ...values, date_to: e.target.value, page: 1 })
        }
        InputLabelProps={{ shrink: true }}
      />

      <ToggleButtonGroup
        value={values.status || ""}
        exclusive
        size="small"
        onChange={(_, status) => onChange({ ...values, status, page: 1 })}
      >
        <ToggleButton value="" title="All statuses">
          All
        </ToggleButton>
        <ToggleButton
          value="green"
          sx={{ background: "green", color: "#fff" }}
          title="Completed"
        >
          ✔
        </ToggleButton>
        <ToggleButton
          value="yellow"
          sx={{ background: "yellow" }}
          title="Pending"
        >
          ●
        </ToggleButton>
        <ToggleButton
          value="red"
          sx={{ background: "red", color: "#fff" }}
          title="Failed"
        >
          ✖
        </ToggleButton>
      </ToggleButtonGroup>

      <TextField
        label="Tags"
        placeholder="tag1, tag2"
        size="small"
        value={values.tags || ""}
        onChange={(e) => onChange({ ...values, tags: e.target.value, page: 1 })}
        sx={{ minWidth: 200 }}
      />

      <IconButton
        onClick={() =>
          onChange({
            search: "",
            status: "",
            date_from: "",
            date_to: "",
            ordering: "",
            tags: "",
            page: 1,
          })
        }
        title="Clear filters"
      >
        <RestartAlt />
      </IconButton>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ ml: "auto" }}
        onClick={onAdd}
      >
        New Note
      </Button>
    </Stack>
  );
}
