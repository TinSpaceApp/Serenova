import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { places } from "@/content/catalog";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const northern = places.filter((item) => item.region === "northern");
  const wider = places.filter((item) => item.region === "wider");

  return (
    <>
      <PageHero
        image="tanzania"
        title="Tanzania"
        eyebrow="Extraordinary places, endless experiences"
        lede="From iconic national parks to quieter parks further south — a journey written around your story."
      />
      <Container className="py-16 md:py-20">
        <VideoSlot
          videoId="home-video"
          coverId="tanzania"
          caption="A country film can sit here later. Cover only for now."
        />
      </Container>
      <Container className="pb-20">
        <p className="eyebrow">The northern circuit</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {northern.map((place) => (
            <Link key={place.slug} href={`/tanzania/${place.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <MediaFrame id={place.cover} sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <h2 className="mt-3 font-display text-xl">{place.name}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{place.summary}</p>
            </Link>
          ))}
        </div>
        <p className="eyebrow mt-16">Discover more of Tanzania</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wider.map((place) => (
            <Link key={place.slug} href={`/tanzania/${place.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <MediaFrame id={place.cover} sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <h2 className="mt-3 font-display text-xl">{place.name}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{place.summary}</p>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <Button href="/plan?destination=tanzania">Plan your Tanzania trip</Button>
        </div>
      </Container>
    </>
  );
}
