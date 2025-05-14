"use client";

import Box from "@mui/material/Box";
import { NewsFeed } from "./components/NewsFeed";

export function NewsPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ width: { xs: "100%", md: 400 }, mr: 2}}>
        <NewsFeed pageSize={10} />
      </Box>
    </Box>
  );
}
