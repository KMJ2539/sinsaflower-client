import type { Metadata } from "next";
import React from "react";
import "@/shared/styles/globals.css";
import "@/shared/styles/fonts.css";

export const metadata: Metadata = {
  title: "신사 플라워",
  description: "B2B 어쩌고",
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
