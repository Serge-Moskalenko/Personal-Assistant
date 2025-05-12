"use client";

import { http } from "@/shared/services/mainAxios";
import { Image } from "@/types/Files/useFiles";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import { useState } from "react";
import { useImages } from "../hooks/useFiles";
import CategoryFilter from "./CategoryFilter";
import ImageCard from "./FileCard";
import UploadImageModal from "./UploadImageModal";

export default function ImagesClient() {
  const [params, setParams] = useState({ page: 1, category: "" });
  const { images, loading, page, setPage, deleteImage, updateImage, reload } =
    useImages(params.category);

  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const totalPages = Math.ceil((images.length || 0) / 10);

  return (
    <Box>
      <CategoryFilter
        value={params.category}
        onChange={(cat) => setParams({ ...params, category: cat, page: 1 })}
        onUploadClick={() => setModalOpen(true)}
      />

      <Grid container spacing={2}>
        {images.map((img: Image) => (
          <Grid item xs={12} sm={6} md={4} key={img.id}>
            <ImageCard
              image={img}
              onDelete={deleteImage}
              onUpdateTitle={updateImage}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            color="primary"
            count={totalPages}
            page={params.page}
            onChange={(_, p) => {
              setParams({ ...params, page: p });
              setPage(p);
            }}
          />
        </Box>
      )}

      <UploadImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={async (form) => {
          await http.post("/files/", form);
          reload();
        }}
      />
    </Box>
  );
}
