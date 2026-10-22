"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitch({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <Suspense fallback={<LanguageLinks tone={tone} />}>
      <LanguageLinksWithQuery tone={tone} />
    </Suspense>
  );
}

function LanguageLinksWithQuery({ tone }: { tone: "ink" | "paper" }) {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  return <LanguageLinks tone={tone} query={query} />;
}

function LanguageLinks({
  tone,
  query,
}: {
  tone: "ink" | "paper";
  query?: Record<string, string>;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const nav = useTranslations("nav");
  const href = query && Object.keys(query).length > 0 ? { pathname, query } : pathname;

  const item = (code: "fr" | "en", label: string) => {
    const active = locale === code;
    return (
      <Link
        href={href}
        locale={code}
        hrefLang={code}
        scroll={false}
        aria-current={active ? "true" : undefined}
        aria-label={label}
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 text-[0.72rem] font-medium uppercase tracking-[0.08em] font-sans transition-[opacity,background-color,color] duration-300 ${
          active
            ? tone === "paper"
              ? "bg-white/12 text-white opacity-100"
              : "bg-ink/[0.06] text-ink opacity-100"
            : "opacity-50 hover:opacity-100"
        } ${tone === "paper" ? "text-white" : "text-ink"}`}
      >
        {code}
      </Link>
    );
  };

  return (
    <div className="flex items-center" role="group" aria-label={nav("language")}>
      {item("fr", "Français")}
      <span className={`text-[0.65rem] ${tone === "paper" ? "text-white/40" : "text-ink/25"}`}>/</span>
      {item("en", "English")}
    </div>
  );
}
