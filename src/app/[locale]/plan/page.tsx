import { Suspense } from "react";
import { PageHero } from "@/components/editorial/PageHero";
import { PlannerForm } from "@/components/forms/PlannerForm";
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
        title="Plan your trip"
        lede="Tell us what you are dreaming of. Jenny reads every brief herself."
      />
      <Container className="py-16 md:max-w-3xl md:py-20">
        <Suspense>
          <PlannerForm />
        </Suspense>
      </Container>
    </>
  );
}
