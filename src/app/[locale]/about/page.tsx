import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Container } from "@/components/ui/Container";
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
        image="hero-savanna"
        title="About Serenova"
        eyebrow="A more personal way to experience Africa"
      />
      <Container className="grid gap-12 py-16 md:grid-cols-3 md:py-20">
        <article>
          <h2 className="display text-[2rem]">Our story</h2>
          <p className="mt-4 leading-8 text-muted">
            Serenova is based in Lausanne, Switzerland, but it began on the other side
            of the world, with a first journey to Tanzania — its people, its landscapes,
            its particular energy. Jenny returned again and again. The house exists to
            share that country with care, not as a catalogue.
          </p>
        </article>
        <article>
          <h2 className="display text-[2rem]">A personal approach</h2>
          <p className="mt-4 leading-8 text-muted">
            Every journey is designed with care, around what actually matters to you.
            Jenny takes time to listen — whether it is a first safari or a return to a
            place already loved.
          </p>
        </article>
        <article>
          <h2 className="display text-[2rem]">Trusted local expertise</h2>
          <p className="mt-4 leading-8 text-muted">
            She works with guides and partners who share the same values: a deep love
            of Tanzania, respect for people and land, and a refusal of the generic.
          </p>
        </article>
      </Container>
      <Container className="grid items-center gap-10 pb-20 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-sand">
          <MediaFrame id="founder-portrait" />
        </div>
        <div>
          <p className="eyebrow">Jenny · founder</p>
          <h2 className="display mt-3 text-[2.4rem]">Creating journeys that matter</h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Serenova was born from a love of Africa, especially Tanzania, and from the
            belief that travel can be truly meaningful. The aim is simple: a journey
            designed with attention, so you come home with people and places still in
            you.
          </p>
        </div>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId="about-video" coverId="about" />
      </Container>
    </>
  );
}
