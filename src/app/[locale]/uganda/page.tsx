import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { getDestination } from "@/content/catalog";
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
  return pageMeta(locale, "ugandaPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const destination = getDestination("uganda")!;
  const t = await getTranslations("catalog.destinations.uganda");
  const page = await getTranslations("ugandaPage");
  const body = t.raw("body") as string[];

  return (
    <>
      <PageHero
        image="uganda"
        images={["uganda", "mahale", "gombe"]}
        title={t("name")}
        eyebrow={t("eyebrow")}
        lede={t("lede")}
      />
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="photo-frame group relative aspect-[4/5]">
          <MediaFrame id={destination.cover} className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="space-y-5 text-lg leading-9 text-muted">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
      <ImmersiveCta
        image="uganda"
        title={page("ctaTitle")}
        href="/plan?destination=uganda"
        label={page("ctaLabel")}
      />
    </>
  );
}
