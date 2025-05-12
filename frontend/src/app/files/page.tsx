"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImagesClient from "./components/FilesClient";

export default function ImagesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4   }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your files
      </Typography>
      <ImagesClient />
    </Container>
  );
}
