import { notFound } from "next/navigation";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPlace, places } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
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

  return (
    <>
      <PageHero image={place.cover} eyebrow={place.tags.join(" · ")} title={place.name} />
      <Container className="grid gap-10 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div className="space-y-6 text-lg leading-9 text-muted">
          {place.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {!place.documented ? (
            <p>
              This place is listed on the Tanzania map in the maquette. The long field
              notes from pages 5–20 have not been fully transcribed here yet — we will
              not invent a complete sheet.
            </p>
          ) : null}
        </div>
        <div className="flex flex-col justify-end gap-4">
          <Button href={`/plan?destination=tanzania`}>Plan a journey including {place.name}</Button>
        </div>
      </Container>
      <Container className="pb-20">
        {place.gallery.length > 0 ? <MediaGallery ids={place.gallery} /> : null}
        <div className="mt-10">
          <VideoSlot videoId={`${place.slug}-video`} coverId={place.cover} />
        </div>
      </Container>
    </>
  );
}
