import { notFound } from "next/navigation";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { MediaGallery } from "@/components/media/MediaGallery";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPackage, packages } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
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

  return (
    <>
      <PageHero
        image={item.cover}
        eyebrow={`${item.days} days · ${item.category} · ${item.audience}`}
        title={item.name}
        lede={item.subtitle}
      />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <p className="eyebrow">Overview</p>
          <p className="mt-4 text-lg leading-8 text-muted">{item.overview}</p>
          <p className="eyebrow mt-10">Itinerary</p>
          <ol className="mt-4 space-y-5">
            {item.itinerary.map((day) => (
              <li key={day.title}>
                <h2 className="font-display text-2xl">{day.title}</h2>
                <p className="mt-2 leading-7 text-muted">{day.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="eyebrow">Highlights</p>
          <ul className="mt-4 space-y-2 text-muted">
            {item.highlights.map((highlight) => (
              <li key={highlight}>— {highlight}</li>
            ))}
          </ul>
          <p className="eyebrow mt-10">Indicative price per person (USD)</p>
          <table className="mt-4 w-full text-left font-sans text-sm">
            <thead>
              <tr className="text-muted">
                <th className="py-2 font-medium">Travellers</th>
                <th className="py-2 font-medium">From</th>
              </tr>
            </thead>
            <tbody>
              {item.prices.map((price) => (
                <tr key={price.people} className="border-t border-line">
                  <td className="py-2">{price.people}</td>
                  <td className="py-2">${price.usd.toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm text-muted">
            Prices vary by season, camp and availability. They are not a confirmation.
          </p>
        </div>
      </Container>
      <Container className="grid gap-10 pb-16 md:grid-cols-2">
        <div>
          <p className="eyebrow">Includes</p>
          <ul className="mt-4 space-y-2 text-muted">
            {item.includes.map((line) => (
              <li key={line}>— {line}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Does not include</p>
          <ul className="mt-4 space-y-2 text-muted">
            {item.excludes.map((line) => (
              <li key={line}>— {line}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="pb-16">
        <p className="eyebrow">Accommodations</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {item.stays.map((stay) => (
            <article key={stay.name} className="overflow-hidden rounded-2xl bg-ivory">
              <div className="relative aspect-[16/10]">
                <MediaFrame id={stay.photo} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl">{stay.name}</h3>
                <p className="mt-1 text-sm text-muted">{stay.role}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="eyebrow mt-12">Map</p>
        <p className="mt-3 text-muted">Route points: {item.mapPoints.join(" → ")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/plan?package=${item.slug}`}>Plan this journey</Button>
        </div>
      </Container>
      <Container className="pb-20">
        <MediaGallery ids={item.gallery} />
        <div className="mt-10">
          <VideoSlot videoId={`${item.slug}-video`} coverId={item.cover} />
        </div>
      </Container>
    </>
  );
}
