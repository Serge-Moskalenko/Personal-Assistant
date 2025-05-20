"use client";
import { http } from "@/shared/services/mainAxios";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyCodePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("verify_email");
    if (!stored) router.push("/register");
    else setEmail(stored);
  }, [router]);

  const handleSubmit = async () => {
    try {
      await http.post("auth/confirm_email_code/", { email, code });
      localStorage.removeItem("verify_email");
      router.push("/login");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Invalid code");
    }
  };

  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h5" gutterBottom>
        Email confirmation
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        disabled
      />
      <TextField
        fullWidth
        label="Code"
        margin="normal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </Box>
  );
}
