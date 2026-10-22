import { PageHero } from "@/components/editorial/PageHero";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

const regions = [
  {
    name: "Nungwi & Kendwa",
    area: "North",
    text: "Vibrant and festive. Famous for sunsets, clear water, swimming and a wide range of water activities.",
  },
  {
    name: "Paje & Jambiani",
    area: "South-east",
    text: "Sporty and bohemian. Long white-sand beaches, fishing villages and a laid-back coast.",
  },
  {
    name: "Matemwe",
    area: "North-east",
    text: "Exclusive and peaceful. A quieter escape, with snorkelling near Mnemba Atoll.",
  },
  {
    name: "Stone Town",
    area: "Historic centre",
    text: "Winding alleys, carved doors, a UNESCO town of Swahili architecture and living culture.",
  },
];

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
        image="zanzibar"
        title="Zanzibar"
        eyebrow="The jewel of the Indian Ocean"
        lede="Beaches, culture and unforgettable island days — after the bush, or as a journey of its own."
      />
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20">
        {regions.map((region) => (
          <article key={region.name}>
            <p className="eyebrow">{region.area}</p>
            <h2 className="display mt-3 text-[2.2rem]">{region.name}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{region.text}</p>
          </article>
        ))}
      </Container>
      <Container className="pb-10 text-lg leading-8 text-muted">
        <p>
          Best time: June to October and January to February are generally the kindest
          beach months. March to May is usually wetter. Spice tours, Jozani Forest,
          Mnemba Atoll and Stone Town can be arranged with trusted local partners.
        </p>
        <div className="mt-8">
          <Button href="/plan?destination=zanzibar">Plan Zanzibar</Button>
        </div>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId="zanzibar-video" coverId="zanzibar" />
      </Container>
    </>
  );
}
