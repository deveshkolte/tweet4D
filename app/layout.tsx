import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tweet4D - grow on X with AI",
  description: "Draft catchy tweets, replies and threads for the AI space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-ink">{children}</body>
    </html>
  );
}
