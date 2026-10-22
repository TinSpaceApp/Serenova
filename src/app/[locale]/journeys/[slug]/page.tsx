import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { LodgeCard } from "@/components/media/LodgeCard";
import { MediaGallery } from "@/components/media/MediaGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getLodgeByPhoto, getLodgePhotos, getPackage, packages } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getPackage(slug);
  if (!item) {
    return {};
  }
  const copy = await getTranslations({
    locale: asLocale(locale),
    namespace: `catalog.packages.${slug}`,
  });
  return {
    title: copy("name"),
    description: copy("overview"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(asLocale(locale));
  const item = getPackage(slug);
  if (!item) {
    notFound();
  }
  const page = await getTranslations("journeyPage");
  const copy = await getTranslations(`catalog.packages.${item.slug}`);
  const tier = await getTranslations("catalog.tier");
  const ui = await getTranslations("ui");
  const stayRoles = await getTranslations("catalog.stayRoles");
  const itinerary = copy.raw("itinerary") as { title: string; text: string }[];
  const highlights = copy.raw("highlights") as string[];
  const includes = copy.raw("includes") as string[];
  const excludes = copy.raw("excludes") as string[];

  return (
    <>
      <PageHero
        image={item.cover}
        images={[
          item.cover,
          ...item.gallery.filter((id) => id !== item.cover && !id.startsWith("lodge-")),
        ]}
        eyebrow={`${item.days} ${ui("days")} · ${tier(item.category)} · ${copy("audience")}`}
        title={copy("name")}
        lede={copy("subtitle")}
      />
      <Container className="grid gap-16 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div>
          <p className="eyebrow">{page("overview")}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{copy("overview")}</p>
          <p className="eyebrow mt-14">{page("itinerary")}</p>
          <ol className="mt-8">
            {itinerary.map((day, index) => (
              <li key={day.title} className="grid gap-4 border-t border-line py-7 md:grid-cols-[5rem_1fr]">
                <span className="display text-[2rem] text-bronze">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="display text-[1.85rem]">{day.title}</h2>
                  <p className="mt-3 leading-8 text-muted">{day.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="self-start border-t border-line pt-8 md:sticky md:top-28">
          <p className="eyebrow">{page("highlights")}</p>
          <ul className="mt-5 space-y-3 text-muted">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <p className="eyebrow mt-12">{page("price")}</p>
          <table className="mt-4 w-full text-left font-sans text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 font-medium">{page("travellers")}</th>
                <th className="py-2 font-medium">{page("fromUsd")}</th>
              </tr>
            </thead>
            <tbody>
              {item.prices.map((price) => (
                <tr key={price.people} className="border-t border-line">
                  <td className="py-2.5">{price.people}</td>
                  <td className="py-2.5">${price.usd.toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm leading-6 text-muted">{page("priceNote")}</p>
          <div className="mt-8">
            <Button href={`/plan?package=${item.slug}`}>{page("ctaLabel")}</Button>
          </div>
        </aside>
      </Container>
      <Container className="grid gap-12 border-t border-line py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow">{page("includes")}</p>
          <ul className="mt-5 space-y-2 text-muted">
            {includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">{page("excludes")}</p>
          <ul className="mt-5 space-y-2 text-muted">
            {excludes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="pb-16">
        <p className="eyebrow">{page("stays")}</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{page("staysNote")}</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {item.stays.map((stay) => {
            const lodge = getLodgeByPhoto(stay.photo);
            return (
              <LodgeCard
                key={stay.name}
                name={stay.name}
                area={stayRoles.has(stay.role) ? stayRoles(stay.role) : stay.role}
                photos={lodge ? lodge.gallery : getLodgePhotos(stay.photo)}
              />
            );
          })}
        </div>
        <p className="mt-10 font-sans text-sm text-muted">
          {page("route")}: {item.mapPoints.join(" → ")}
        </p>
      </Container>
      <Container className="pb-20">
        <MediaGallery ids={item.gallery} />
      </Container>
      <ImmersiveCta
        image={item.cover}
        title={page("ctaTitle")}
        href={`/plan?package=${item.slug}`}
        label={page("ctaLabel")}
      />
    </>
  );
}
