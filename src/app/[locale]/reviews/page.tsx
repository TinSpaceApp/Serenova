import { PageHero } from "@/components/editorial/PageHero";
import { Button } from "@/components/ui/Button";
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
        title="Reviews"
        lede="Real experiences only. We will not publish invented names, scores or quotes."
      />
      <Container className="py-16 md:py-20">
        <p className="max-w-2xl text-lg leading-8 text-muted">
          The maquette shows a grid of five-star testimonials. Those texts are generated
          and unauthenticated. This page will hold TripAdvisor, Google or handwritten
          reviews only after Jenny supplies the originals and the right to display them.
        </p>
        <p className="mt-6 max-w-2xl leading-8 text-muted">
          Scores such as “5/5 on TripAdvisor” will appear here only with a live link to
          the public profile.
        </p>
        <div className="mt-10">
          <Button href="/contact">Write to Jenny</Button>
        </div>
      </Container>
    </>
  );
}
