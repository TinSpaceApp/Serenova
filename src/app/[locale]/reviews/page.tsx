import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { Button } from "@/components/ui/Button";
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
  return pageMeta(locale, "reviewsPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("reviewsPage");

  return (
    <>
      <PageHero image="hero-savanna" title={t("title")} lede={t("lede")} />
      <Container className="py-16 md:py-20">
        <p className="max-w-2xl text-lg leading-8 text-muted">{t("body1")}</p>
        <p className="mt-6 max-w-2xl leading-8 text-muted">{t("body2")}</p>
        <div className="mt-10">
          <Button href="/contact">{t("cta")}</Button>
        </div>
      </Container>
    </>
  );
}
