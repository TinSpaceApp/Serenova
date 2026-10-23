import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminConsoleLayout({ children }: { children: ReactNode }) {
  const { profile } = await requireAdmin();
  const { copy, locale } = await getAdminCopy();

  return (
    <AdminShell profile={profile} copy={copy} locale={locale}>
      {children}
    </AdminShell>
  );
}
