import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
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
  return pageMeta(locale, "aboutPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("aboutPage");

  return (
    <>
      <PageHero
        image="about"
        images={["about", "vehicle-2", "bush-lunch"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
        titleWide
      />
      <Container className="grid items-center gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24 md:gap-20">
        <div className="photo-frame group relative aspect-[4/5]">
          <MediaFrame id="founder-portrait" className="photo-zoom" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div>
          <p className="eyebrow">{t("founderEyebrow")}</p>
          <h2 className="display mt-4 text-[2.6rem] md:text-[4.2rem]">{t("founderTitle")}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{t("founderBody1")}</p>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{t("founderBody2")}</p>
          <p className="wordmark mt-8 text-[2.6rem] text-ink">{t("signature")}</p>
          <p className="photo-caption mt-3">{t("signatureRole")}</p>
        </div>
      </Container>
      <section className="bg-paper">
        <Container className="grid gap-12 py-16 md:grid-cols-3 md:py-24">
          <article>
            <p className="eyebrow">01</p>
            <h2 className="display mt-3 text-[2rem]">{t("storyTitle")}</h2>
            <p className="mt-4 leading-8 text-muted">{t("storyBody")}</p>
          </article>
          <article>
            <p className="eyebrow">02</p>
            <h2 className="display mt-3 text-[2rem]">{t("approachTitle")}</h2>
            <p className="mt-4 leading-8 text-muted">{t("approachBody")}</p>
          </article>
          <article>
            <p className="eyebrow">03</p>
            <h2 className="display mt-3 text-[2rem]">{t("partnersTitle")}</h2>
            <p className="mt-4 leading-8 text-muted">{t("partnersBody")}</p>
          </article>
        </Container>
      </section>
      <ImmersiveCta
        image="sunset-2"
        title={t("ctaTitle")}
        body={t("ctaBody")}
        href="/plan"
        label={t("ctaLabel")}
      />
    </>
  );
}
