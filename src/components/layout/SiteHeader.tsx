"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { LanguageSwitch } from "./LanguageSwitch";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const t = useTranslations("nav");
  const ui = useTranslations("ui");
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          onPhoto ? "bg-transparent" : "border-b border-line/80 bg-ivory/90 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 md:h-[5.25rem] md:px-10">
          <Wordmark tone={tone} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label={ui("primaryNav")}>
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link font-sans text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  tone === "paper" ? "text-ivory/80 hover:text-ivory" : "text-ink/70 hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitch tone={tone} />
            <button
              type="button"
              className={`inline-flex min-h-11 items-center gap-2 px-2 font-sans text-[0.72rem] uppercase tracking-[0.14em] lg:hidden ${
                tone === "paper" ? "text-ivory" : "text-ink"
              }`}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? t("close") : t("menu")}
            </button>
            <div className="hidden md:block">
              <Button href="/plan" variant={onPhoto ? "light" : "forest"}>
                {t("plan")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-ivory md:top-[5.25rem]"
        >
          <nav className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[1320px] flex-col justify-between px-5 py-10 md:px-10">
            <ul className="grid gap-1 md:grid-cols-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-[2.4rem] text-ink hover:text-bronze md:text-[3.2rem]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <LanguageSwitch />
              <Button href="/plan" className="w-full sm:w-auto" variant="forest">
                {t("plan")}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
