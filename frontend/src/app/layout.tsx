import Providers from "@/providers/Providers";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Personal Assistant",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <NavBar />

          {children}

          <Box
            component="footer"
            sx={{
              py: 2,
              textAlign: "center",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="body2">© 2025 My Company</Typography>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
