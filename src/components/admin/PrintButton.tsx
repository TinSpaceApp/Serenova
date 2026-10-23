"use client";

import { adminButtonGhost } from "@/lib/admin/ui";

type PrintButtonProps = {
  label: string;
};

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <button type="button" className={adminButtonGhost} onClick={() => window.print()}>
      {label}
    </button>
  );
}
