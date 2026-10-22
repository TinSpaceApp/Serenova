"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { LanguageSwitch } from "./LanguageSwitch";

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onPhoto = transparent && !scrolled && !open;
  const tone = onPhoto ? "paper" : "ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          onPhoto
            ? "bg-transparent"
            : "bg-ivory/92 backdrop-blur-md border-b border-line/70"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1280px] items-center justify-between px-5 md:h-[5rem] md:px-10">
          <Wordmark tone={tone} />

          <div className="flex items-center gap-1 md:gap-3">
            <LanguageSwitch tone={tone} />
            <button
              type="button"
              className={`inline-flex min-h-11 items-center gap-2 px-2 font-sans text-[0.78rem] tracking-[0.06em] ${
                tone === "paper" ? "text-white" : "text-ink"
              }`}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="hidden sm:inline">{open ? t("close") : t("menu")}</span>
              <span className="flex w-4 flex-col gap-1" aria-hidden>
                <span
                  className={`h-px w-full ${tone === "paper" ? "bg-white" : "bg-ink"}`}
                />
                <span
                  className={`h-px w-3 ${tone === "paper" ? "bg-white" : "bg-ink"}`}
                />
              </span>
            </button>
            <div className="hidden md:block">
              <Button href="/plan" variant={onPhoto ? "light" : "primary"}>
                {t("plan")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className="fixed inset-0 top-[4.25rem] z-40 overflow-y-auto bg-ivory md:top-[5rem]"
        >
          <nav className="mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-[1280px] flex-col justify-between px-5 py-8 md:min-h-[calc(100vh-5rem)] md:px-10 md:py-12">
            <ul className="grid gap-1 md:grid-cols-2 md:gap-x-16">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2.5 text-[2.05rem] text-ink transition-colors hover:text-bronze md:text-[2.75rem]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button href="/plan" className="w-full sm:w-auto" variant="primary">
                {t("plan")}
              </Button>
              <p className="font-sans text-sm text-muted">Lausanne · Tanzania</p>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
