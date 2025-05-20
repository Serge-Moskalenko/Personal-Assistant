"use client";
import { http } from "@/shared/services/mainAxios";
import { useAuthStore } from "@/stores/useAuthStore";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await http.post("token/", { username, password });
      useAuthStore.getState().setToken(data.access);
      router.push("/");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Login error");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" minHeight={750} mt={10}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
}
