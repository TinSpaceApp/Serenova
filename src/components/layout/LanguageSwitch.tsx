"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitch({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const button = (code: "fr" | "en", label: string) => {
    const active = locale === code;
    return (
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: code })}
        className={`min-h-11 min-w-11 rounded-full px-2 text-[0.72rem] font-medium tracking-[0.08em] uppercase font-sans transition-opacity ${
          active ? "opacity-100" : "opacity-55 hover:opacity-100"
        } ${tone === "paper" ? "text-white" : "text-ink"}`}
        aria-pressed={active}
        aria-label={label}
      >
        {code}
      </button>
    );
  };

  return (
    <div
      className="flex items-center"
      role="group"
      aria-label="Language"
    >
      {button("fr", "Français")}
      <span
        className={`text-[0.65rem] ${tone === "paper" ? "text-white/40" : "text-ink/25"}`}
      >
        /
      </span>
      {button("en", "English")}
    </div>
  );
}
