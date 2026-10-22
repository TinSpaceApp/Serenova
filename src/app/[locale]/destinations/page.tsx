import type { Metadata } from "next";
import { DestinationGrid } from "@/components/destinations/DestinationGrid";
import { PageHero } from "@/components/editorial/PageHero";
import { Container } from "@/components/ui/Container";
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
  return pageMeta(locale, "destinationsPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("destinationsPage");

  return (
    <>
      <PageHero
        image="tanzania"
        images={["tanzania", "serengeti-lions", "zanzibar-beach", "kenya-samburu"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
      />
      <Container className="py-16 md:py-24">
        <DestinationGrid />
      </Container>
    </>
  );
}
