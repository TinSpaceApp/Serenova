import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAdminLocale } from "@/lib/admin/locale";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration — Serenova",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({ children }: { children: ReactNode }) {
  const locale = await getAdminLocale();

  return (
    <html lang={locale} className={`${fontClassName} h-full antialiased`}>
      <body className="min-h-full bg-ivory text-ink">{children}</body>
    </html>
  );
}
