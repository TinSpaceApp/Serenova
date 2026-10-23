import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "contactPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("contactPage");

  return (
    <>
      <PageHero image="sunset-2" images={["sunset-2", "culture-1", "founder-portrait"]} title={t("title")} lede={t("lede")} />
      <Container className="grid gap-8 py-12 font-sans text-sm text-muted md:grid-cols-2 lg:grid-cols-5">
        <p>
          {t("email")}
          <br />
          <a className="text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p>
          {t("phone")}
          <br />
          <a className="text-ink" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
        </p>
        <p>
          {t("whatsapp")}
          <br />
          <a className="text-ink" href={site.whatsappHref}>
            {site.phoneDisplay}
          </a>
        </p>
        <p>
          {t("hours")}
          <br />
          {t("hoursValue")}
        </p>
        <p>
          {t("basedIn")}
          <br />
          {t("basedValue")}
        </p>
      </Container>
      <Container className="grid gap-12 pb-20 md:grid-cols-2">
        <ContactForm />
        <div>
          <div className="photo-frame group relative aspect-[4/5]">
            <MediaFrame id="about" className="photo-zoom" />
          </div>
          <p className="mt-4 text-sm text-muted">{site.contactsArePlaceholders ? t("placeholderNote") : null}</p>
        </div>
      </Container>
    </>
  );
}
