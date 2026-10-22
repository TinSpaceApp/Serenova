import { DestinationGrid } from "@/components/destinations/DestinationGrid";
import { PageHero } from "@/components/editorial/PageHero";
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
        eyebrow="Explore our destinations"
        title="Extraordinary places, endless possibilities"
        lede="From iconic landscapes to quieter corners, each destination is shaped around you."
      />
      <Container className="py-16 md:py-24">
        <DestinationGrid />
      </Container>
    </>
  );
}
