import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proposition — Serenova",
  robots: { index: false, follow: false },
};

export default function PropositionLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontClassName} h-full antialiased`}>
      <body className="min-h-full bg-ivory text-ink">{children}</body>
    </html>
  );
}
