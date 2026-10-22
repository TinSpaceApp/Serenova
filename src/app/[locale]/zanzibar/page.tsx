import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { Reveal } from "@/components/editorial/Reveal";
import { ImmersiveCarousel } from "@/components/media/ImmersiveCarousel";
import { MediaFrame } from "@/components/media/MediaFrame";
import { StayRail } from "@/components/media/StayRail";
import { Container } from "@/components/ui/Container";
import { getLodge } from "@/content/catalog";
import { pageMeta } from "@/lib/page-meta";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

const regionKeys = ["nungwi", "paje", "matemwe", "stone"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "zanzibarPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("zanzibarPage");
  const ui = await getTranslations("ui");

  return (
    <>
      <PageHero
        image="zanzibar-beach"
        images={["zanzibar-beach", "zanzibar-detail", "zanzibar-coast"]}
        title={t("title")}
        eyebrow={t("eyebrow")}
        lede={t("lede")}
      />
      <ImmersiveCarousel
        ids={["zanzibar", "bagamoyo-boma", "lodge-the-mora", "lodge-the-mora-02", "lodge-the-mora-03"]}
        caption={t("caption")}
      />
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="photo-frame group relative aspect-[4/5]">
          <MediaFrame id="zanzibar-detail" className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div>
          <p className="eyebrow">{t("light")}</p>
          <h2 className="display mt-4 text-[2.6rem] md:text-[4rem]">{t("waterTitle")}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{t("waterBody")}</p>
        </div>
      </Container>
      <section className="bg-paper">
        <Container className="py-16 md:py-24">
          <Reveal className="max-w-xl">
            <p className="eyebrow">{t("stayEyebrow")}</p>
            <h2 className="display mt-4 max-w-[14ch] text-[2.4rem] md:text-[3.8rem]">{t("stayTitle")}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("stayBody")}</p>
          </Reveal>
          <StayRail
            lodges={[getLodge("lodge-the-mora")].filter((item): item is NonNullable<typeof item> => Boolean(item))}
            eyebrow={t("stayCaption")}
            note={ui("stayNote")}
          />
        </Container>
      </section>
      <Container className="grid gap-14 py-16 md:grid-cols-2 md:py-20">
        {regionKeys.map((key) => (
          <article key={key} className="border-t border-line pt-6">
            <p className="eyebrow">{t(`${key}Area`)}</p>
            <h2 className="display mt-3 text-[2.2rem]">{t(`${key}Name`)}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{t(`${key}Text`)}</p>
          </article>
        ))}
      </Container>
      <ImmersiveCta
        image="zanzibar-coast"
        title={t("ctaTitle")}
        href="/plan?destination=zanzibar"
        label={t("ctaLabel")}
      />
    </>
  );
}
