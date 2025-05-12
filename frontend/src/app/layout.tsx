import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

import Providers from "@/providers/Providers";

export const metadata = {
  title: "Personal Assistant",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <header
            style={{
              padding: "1rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <nav style={{ display: "flex", gap: "1rem" }}>
              <Link href="/">Home</Link>
              <Link href="/contacts">Contacts</Link>
              <Link href="/notes">Notes</Link>
              <Link href="/files">Files</Link>
            </nav>
          </header>

          <main style={{ minHeight: 750 }}>{children}</main>

          <footer
            style={{
              textAlign: "center",
              padding: "1rem 0",
              borderTop: "1px solid #ddd",
            }}
          >
            © 2025 My Company
          </footer>
        </Providers>
      </body>
    </html>
  );
}
