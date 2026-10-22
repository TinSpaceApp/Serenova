import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = 2026;

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10 md:py-14">
        <div>
          <Wordmark />
          <p className="mt-2 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            {t("tagline")}
          </p>
        </div>
        <div className="flex flex-col gap-3 font-sans text-sm text-muted md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={site.instagram} className="hover:text-ink">
              Instagram
            </a>
            <a href={site.tiktok} className="hover:text-ink">
              TikTok
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
            <a href={site.phoneHref} className="hover:text-ink">
              {site.phoneDisplay}
            </a>
          </div>
          <p>
            © {year} Serenova. {t("rights")}.
          </p>
          {site.contactsArePlaceholders ? (
            <p className="text-[0.72rem]">{t("placeholderNote")}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
