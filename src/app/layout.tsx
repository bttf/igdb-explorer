import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "igdb-explorer",
  description: "Explore the compendium of knowledge that is IGDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
