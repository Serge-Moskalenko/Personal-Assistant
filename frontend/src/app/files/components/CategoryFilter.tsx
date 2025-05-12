"use client";

import { CategoryFilterProps } from "@/types/Files/Components/CategoryFilter";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";


export default function CategoryFilter({
  value,
  onChange,
  onUploadClick,
}: CategoryFilterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        flexWrap: "wrap",
        gap: 1,

        mx: "25%",
      }}
    >
      <ToggleButtonGroup
        value={value}
        exclusive
        size="small"
        onChange={(_, v) => onChange(v ?? "")}
      >
        <ToggleButton value="">All</ToggleButton>
        <ToggleButton value="image">Images</ToggleButton>
        <ToggleButton value="video">Videos</ToggleButton>
        <ToggleButton value="document">Documents</ToggleButton>
        <ToggleButton value="other">Other</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" sx={{ ml: "auto" }} onClick={onUploadClick}>
        Upload File
      </Button>
    </Box>
  );
}
