"use client";

import { ImageCardProps } from "@/types/Files/Components/FileCard";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import ImageEditDialog from "./FileEditDialog";

export default function ImageCard({
  image,
  onDelete,
  onUpdateTitle,
}: ImageCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditSave = (newTitle: string) => {
    onUpdateTitle(image.id, newTitle);
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(image.id);
    setDeleteOpen(false);
  };
  console.log(image);

  return (
    <>
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardMedia
          component="img"
          height="180"
          image={image.download_url}
          alt={image.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom noWrap>
            {image.title || "Untitled"}
          </Typography>
          <Box>
            <Chip
              label={
                image.category.charAt(0).toUpperCase() + image.category.slice(1)
              }
              size="small"
            />
          </Box>
        </CardContent>
        <CardActions>
          <IconButton
            component="a"
            href={image.download_url}
            aria-label="download"
          >
            <DownloadIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => setEditOpen(true)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => setDeleteOpen(true)}>
            <DeleteIcon color="error" />
          </IconButton>
        </CardActions>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ p: 1, pt: 0 }}
        >
          {new Date(image.uploaded_at).toLocaleDateString()}
        </Typography>
      </Card>

      <ImageEditDialog
        open={editOpen}
        initialTitle={image.title}
        onClose={() => setEditOpen(false)}
        onSave={handleEditSave}
      />

      <DeleteConfirmationDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
