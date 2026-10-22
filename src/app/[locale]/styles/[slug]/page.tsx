import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { StayRail } from "@/components/media/StayRail";
import { getLodgesForStyle, getStyle, styles } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

const styleHeroes: Record<string, string[]> = {
  "halal-friendly": ["halal", "lodge-tulia", "lodge-under-the-shade", "culture-1"],
  "fly-in": ["fly", "fly-check", "lodge-river-camp", "lodge-moyo-central"],
  walking: ["walking-giraffe", "walking", "lodge-nyuki", "lodge-baobab-tented"],
  photography: ["photography", "lodge-kuro-treetops", "lodge-crater-edge", "lodge-sametu"],
  honeymoon: ["honeymoon", "lodge-the-mora", "lodge-crater-edge", "lodge-gran-melia-ngorongoro"],
  family: ["family", "lodge-tulia", "lodge-farm-of-dreams", "lodge-kika"],
  "beach-zanzibar": ["zanzibar-beach", "lodge-the-mora", "lodge-the-mora-02", "zanzibar-coast"],
  "great-migration": ["migration", "lodge-moyo-north", "lodge-lake-masek", "lodge-serenity"],
};

export function generateStaticParams() {
  return styles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const style = getStyle(slug);
  if (!style) {
    return {};
  }
  const t = await getTranslations({ locale: asLocale(locale), namespace: `catalog.styles.${slug}` });
  return {
    title: t("name"),
    description: t("summary"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(asLocale(locale));
  const style = getStyle(slug);
  if (!style) {
    notFound();
  }
  const t = await getTranslations(`catalog.styles.${style.slug}`);
  const ui = await getTranslations("ui");

  return (
    <>
      <PageHero
        image={style.cover}
        images={styleHeroes[style.slug] ?? [style.cover]}
        title={t("name")}
        lede={t("summary")}
      />
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="photo-frame group relative aspect-[4/5]">
          <MediaFrame id={style.cover} className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div>
          <p className="eyebrow">{ui("styleWayIn")}</p>
          <h2 className="display mt-4 text-[2.4rem] md:text-[3.6rem]">{t("chapter")}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{t("summary")}</p>
          <p className="mt-5 text-lg leading-8 text-muted">{t("note")}</p>
        </div>
      </Container>
      <Container className="pb-16">
        <StayRail
          lodges={getLodgesForStyle(style.slug)}
          eyebrow={ui("staysHere")}
          note={ui("stayNote")}
        />
      </Container>
      <ImmersiveCta
        image={style.cover}
        title={ui("planThisStyle")}
        href={`/plan?style=${style.slug}`}
        label={ui("startBrief")}
      />
    </>
  );
}
