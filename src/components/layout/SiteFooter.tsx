import { getTranslations } from "next-intl/server";
import { AdminLock } from "@/components/admin/AdminLock";
import { site, navItems } from "@/lib/site";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { Wordmark } from "@/components/ui/Wordmark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-line bg-forest text-ivory">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Wordmark tone="paper" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/65">{t("tagline")}</p>
        </div>
        <nav className="grid gap-2 font-sans text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link w-fit text-ivory/75 transition-colors duration-300 hover:text-ivory">
              {nav(item.key)}
            </Link>
          ))}
        </nav>
        <div className="grid gap-2 font-sans text-sm text-ivory/75">
          <a href={`mailto:${site.email}`} className="hover:text-ivory">
            {site.email}
          </a>
          <a href={site.phoneHref} className="hover:text-ivory">
            {site.phoneDisplay}
          </a>
          <a href={site.whatsappHref} className="hover:text-ivory">
            WhatsApp
          </a>
          <a href={site.instagram} className="hover:text-ivory">
            Instagram
          </a>
          <p className="mt-4 text-ivory/50">
            {site.city} · {nav("tanzania")}
          </p>
          <div className="mt-5">
            <LanguageSwitch tone="paper" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-6 font-sans text-[0.72rem] text-ivory/45 md:px-10">
          <p>© 2026 Serenova. {t("rights")}.</p>
          <div className="flex items-center gap-4">
            {site.contactsArePlaceholders ? <p className="hidden sm:block">{t("placeholderNote")}</p> : null}
            <AdminLock label={t("admin")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
