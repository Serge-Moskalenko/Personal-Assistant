"use client";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useAuthStore } from "@/stores/useAuthStore";

export default function NavBar() {
  const token = useAuthStore((state) => state.token);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Assistant
          </Typography>
          {token ? (
            <>
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/contacts">
                Contacts
              </Button>
              <Button color="inherit" component={Link} href="/notes">
                Notes
              </Button>
              <Button color="inherit" component={Link} href="/files">
                Files
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  useAuthStore.getState().clearToken();
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}