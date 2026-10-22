import type { Metadata } from "next";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { ImmersiveCarousel } from "@/components/media/ImmersiveCarousel";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StayMosaic } from "@/components/media/StayMosaic";
import { lodges, places } from "@/content/catalog";
import { pageMeta } from "@/lib/page-meta";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "tanzaniaPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("tanzaniaPage");
  const placeCopy = await getTranslations("catalog.places");
  const ui = await getTranslations("ui");
  const northern = places.filter((item) => item.region === "northern");
  const wider = places.filter((item) => item.region === "wider");
  const featured = northern[0];

  return (
    <>
      <PageHero
        image="tanzania"
        images={["tanzania", "serengeti-lions", "ngorongoro-2", "tarangire-elephant"]}
        title={t("title")}
        eyebrow={t("eyebrow")}
        lede={t("lede")}
      />
      <ImmersiveCarousel
        ids={["serengeti-river", "ngorongoro-buffalo", "tarangire-lion", "ndutu-wildlife", "culture-1", "hyena"]}
        caption={t("caption")}
      />
      {featured ? (
        <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="photo-frame group relative aspect-[16/11]">
            <MediaFrame id={featured.cover} className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div>
            <p className="eyebrow">{t("northern")}</p>
            <h2 className="display mt-3 text-[2.6rem] md:text-[4rem]">{placeCopy(`${featured.slug}.name`)}</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">{placeCopy(`${featured.slug}.summary`)}</p>
            <Link
              href={`/tanzania/${featured.slug}`}
              className="text-cta mt-6"
            >
              {ui("readPlace")}
            </Link>
          </div>
        </Container>
      ) : null}
      <Container className="pb-20">
        <p className="eyebrow">{t("northernPlaces")}</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {northern.slice(1).map((place) => (
            <Link key={place.slug} href={`/tanzania/${place.slug}`} className="group block">
              <div className="photo-frame relative aspect-[16/10]">
                <MediaFrame id={place.cover} className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <h2 className="display mt-4 text-[1.9rem] group-hover:text-bronze">{placeCopy(`${place.slug}.name`)}</h2>
              <p className="mt-2 leading-7 text-muted">{placeCopy(`${place.slug}.summary`)}</p>
            </Link>
          ))}
        </div>
        <p className="eyebrow mt-20">{t("wider")}</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {wider.map((place) => (
            <Link key={place.slug} href={`/tanzania/${place.slug}`} className="group block">
              <div className="photo-frame relative aspect-[16/10]">
                <MediaFrame id={place.cover} className="photo-zoom" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <h2 className="display mt-4 text-[1.9rem] group-hover:text-bronze">{placeCopy(`${place.slug}.name`)}</h2>
              <p className="mt-2 leading-7 text-muted">{placeCopy(`${place.slug}.summary`)}</p>
            </Link>
          ))}
        </div>
        <StayMosaic
          ids={lodges.filter((item) => item.place !== "zanzibar").flatMap((item) => item.gallery.slice(0, 2))}
          eyebrow={t("staysEyebrow")}
          title={t("staysTitle")}
          body={t("staysBody")}
        />
        <div className="mt-16">
          <Button href="/plan?destination=tanzania">{t("plan")}</Button>
        </div>
      </Container>
      <ImmersiveCta
        image="sunset-ngorongoro"
        title={t("ctaTitle")}
        href="/plan?destination=tanzania"
        label={t("ctaLabel")}
      />
    </>
  );
}
