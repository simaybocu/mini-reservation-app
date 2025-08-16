"use client";

import "./globals.css";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">Yatch Reservation Platform</footer>
      </body>
    </html>
  );
}
