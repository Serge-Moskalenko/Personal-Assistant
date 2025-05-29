"use client";
import { http } from "@/shared/services/mainAxios";
import { useAuthStore } from "@/stores/useAuthStore";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "login" | "requestReset" | "confirmReset";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      setInfo("");
      const { data } = await http.post("token/", { username, password });
      useAuthStore.getState().setTokens(data.access, data.refresh);
      router.push("/");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Login error");
    }
  };

  const handleRequestReset = async () => {
    try {
      setError("");
      setInfo("");
      await http.post("auth/request_password_reset/", { email });
      setInfo("The code has been sent to your email..");
      setMode("confirmReset");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Error requesting code");
    }
  };

  const handleConfirmReset = async () => {
    try {
      setError("");
      setInfo("");
      await http.post("auth/confirm_password_reset/", {
        email,
        code,
        new_password: newPassword,
      });
      setInfo("Password changed successfully. Please log in with the new password.");
      setMode("login");
      // очистимо поля
      setUsername("");
      setPassword("");
      setCode("");
      setNewPassword("");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Error resetting password");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" minHeight={750} mt={10}>
      {mode === "login" && (
        <>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {info && <Alert severity="success">{info}</Alert>}
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box textAlign="right" mt={1}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setMode("requestReset");
                setError("");
                setInfo("");

                setEmail(username || "");
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </>
      )}

      {mode === "requestReset" && (
        <>
          <Typography variant="h5" gutterBottom>
            Password reset request
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {info && <Alert severity="success">{info}</Alert>}
          <TextField
            fullWidth
            type="email"
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRequestReset}
          >
            Get code
          </Button>
          <Box textAlign="right" mt={1}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setMode("login");
                setError("");
                setInfo("");
              }}
            >
              ← Back to login
            </Link>
          </Box>
        </>
      )}

      {mode === "confirmReset" && (
        <>
          <Typography variant="h5" gutterBottom>
            Confirm reset
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {info && <Alert severity="success">{info}</Alert>}
          <TextField
            fullWidth
            type="email"
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
          <TextField
            fullWidth
            type="password"
            label="new password"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleConfirmReset}
          >
            Confirm and change
          </Button>
          <Box textAlign="right" mt={1}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setMode("login");
                setError("");
                setInfo("");
              }}
            >
              ← Back to login
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}
