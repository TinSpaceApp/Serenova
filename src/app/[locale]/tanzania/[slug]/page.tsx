import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { Container } from "@/components/ui/Container";
import { StayRail } from "@/components/media/StayRail";
import { getLodgesForPlace, getPlace, places } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { entryMeta } from "@/lib/page-meta";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = getPlace(slug);
  if (!place) {
    return {};
  }
  const t = await getTranslations({ locale: asLocale(locale), namespace: `catalog.places.${slug}` });
  return entryMeta(locale, `/tanzania/${slug}`, t("name"), t("summary"));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(asLocale(locale));
  const place = getPlace(slug);
  if (!place) {
    notFound();
  }
  const t = await getTranslations(`catalog.places.${place.slug}`);
  const ui = await getTranslations("ui");
  const translatedBody = t.has("body") ? (t.raw("body") as string[]) : null;
  const paragraphs =
    translatedBody ??
    (locale === "en" && place.body?.length ? place.body : []);

  return (
    <>
      <PageHero
        image={place.cover}
        images={[
          place.cover,
          ...place.gallery.filter((id) => id !== place.cover && !id.startsWith("lodge-")),
        ]}
        eyebrow={place.region === "northern" ? ui("northernTanzania") : ui("widerTanzania")}
        title={t("name")}
        lede={t("summary")}
      />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div className="space-y-6 text-lg leading-9 text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {!place.documented ? <p>{ui("placePending")}</p> : null}
        </div>
        <aside className="self-start border-t border-line pt-6">
          <p className="eyebrow">{ui("region")}</p>
          <p className="mt-3 text-ink">
            {place.region === "northern" ? ui("northernTanzania") : ui("widerTanzania")}
          </p>
        </aside>
      </Container>
      <Container className="pb-20">
        {place.gallery.length > 0 ? <MediaGallery ids={place.gallery} /> : null}
        <StayRail
          lodges={getLodgesForPlace(place.slug)}
          eyebrow={ui("staysHere")}
          note={ui("stayNote")}
        />
      </Container>
      <ImmersiveCta
        image={place.cover}
        title={ui("includePlace", { name: t("name") })}
        href="/plan?destination=tanzania"
        label={ui("planJourney")}
      />
    </>
  );
}
