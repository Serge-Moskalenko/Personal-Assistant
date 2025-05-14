"use client";

import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

import NewsList from "./NewsList";
import { useNews } from "../hooks/useNews";

type NewsFeedProps = {
  pageSize?: number;
};

export  function NewsFeed({ pageSize = 10 }: NewsFeedProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useNews({
    page,
    page_size: pageSize,
  });

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">{String(error)}</Alert>;
  }

  const totalPages = Math.ceil((data?.count ?? 0) / pageSize);

  return (
    <Box>
      {isFetching && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <NewsList items={data!.results} />

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
