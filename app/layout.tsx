import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
          <link rel="stylesheet" href="github.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
