import type { Metadata } from "next";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { PageHero } from "@/components/editorial/PageHero";
import { Container } from "@/components/ui/Container";
import { getJournalCards } from "@/content/journal";
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
  return pageMeta(locale, "journalPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = asLocale(locale);
  setRequestLocale(currentLocale);
  const t = await getTranslations("journalPage");
  const cards = getJournalCards(currentLocale);

  return (
    <>
      <PageHero
        image="photography"
        images={["photography", "sunset-2", "zanzibar-detail"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
        titleWide
      />
      <Container className="py-16 md:py-24">
        <JournalGrid cards={cards} />
      </Container>
    </>
  );
}
