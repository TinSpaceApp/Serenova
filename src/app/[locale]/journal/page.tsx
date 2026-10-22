import { JournalGrid } from "@/components/journal/JournalGrid";
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
        image="cta"
        title="The Serenova Journal"
        lede="Inspiration and practical advice. Full essays only where the maquette supplied them."
      />
      <Container className="py-16">
        <JournalGrid />
      </Container>
    </>
  );
}
