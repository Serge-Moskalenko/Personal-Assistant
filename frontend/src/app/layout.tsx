import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Personal Assistant",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/contacts">Contacts</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 My Company</footer>
      </body>
    </html>
  );
}
