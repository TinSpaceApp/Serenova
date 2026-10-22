import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { kiliRoutes } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));

  return (
    <>
      <PageHero
        image="styles"
        title="Kilimanjaro"
        eyebrow="Climb Africa’s highest peak"
        lede="More than a mountain — a journey that stays with you."
      />
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">A higher perspective</p>
          <h2 className="display mt-3 text-[2.4rem]">More than a mountain</h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Rising to 5,895 metres, Kilimanjaro is a profound, life-changing walk:
            rainforest, alpine desert, then a summit that rewards you with light and
            silence. Serenova composes the route around your fitness, time and pace.
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.3rem]">
          <MediaFrame id="styles" />
        </div>
      </Container>
      <Container className="pb-16">
        <p className="eyebrow">Our routes</p>
        <h2 className="display mt-3 text-[2.3rem]">Seven paths to the summit</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kiliRoutes.map((route) => (
            <article key={route.slug}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <MediaFrame id={route.cover} />
              </div>
              <h3 className="mt-3 font-display text-2xl">{route.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{route.summary}</p>
            </article>
          ))}
        </div>
      </Container>
      <Container className="grid gap-6 border-y border-line py-10 font-sans text-sm text-muted md:grid-cols-4">
        <p>5,895 m · highest peak in Africa</p>
        <p>Typically 7–9 days on the mountain</p>
        <p>Best months: January–March and June–October</p>
        <p>Guiding, porters, permits and meals included in a Serenova climb</p>
      </Container>
      <Container className="py-16">
        <Button href="/plan?destination=tanzania">Plan your Kilimanjaro trip</Button>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId="kilimanjaro-video" coverId="styles" />
      </Container>
    </>
  );
}
