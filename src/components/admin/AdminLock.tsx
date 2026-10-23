import { Lock } from "lucide-react";

export function AdminLock({ label }: { label: string }) {
  return (
    <a
      href="/admin/login"
      className="inline-flex h-7 w-7 items-center justify-center text-ivory/40 transition-colors duration-300 hover:text-ivory/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory/50"
      aria-label={label}
    >
      <Lock size={14} strokeWidth={1.5} aria-hidden />
    </a>
  );
}
