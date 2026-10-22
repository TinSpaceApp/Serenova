import type { Metadata } from "next";
import { Suspense } from "react";
import { Figure } from "@/components/editorial/Figure";
import { PageHero } from "@/components/editorial/PageHero";
import { Reveal } from "@/components/editorial/Reveal";
import { PlannerForm } from "@/components/forms/PlannerForm";
import { Container } from "@/components/ui/Container";
import { pageMeta } from "@/lib/page-meta";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "planPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("pages.plan");
  const planner = await getTranslations("planner");

  return (
    <>
      <PageHero
        image="sunset-ngorongoro"
        images={["sunset-ngorongoro", "hero-savanna", "zanzibar-beach"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
        titleWide
      />

      <section className="bg-ivory">
        <Container className="grid items-end gap-12 py-16 md:grid-cols-[0.82fr_1.18fr] md:gap-20 md:py-24">
          <Figure
            id="founder-portrait"
            caption={planner("introCaption")}
            frameClassName="aspect-[4/5]"
            objectPosition="center 40%"
            sizes="(min-width: 768px) 36vw, 100vw"
          />
          <Reveal className="md:pb-6">
            <p className="eyebrow">{planner("introEyebrow")}</p>
            <h2 className="display mt-5 max-w-[14ch] text-[2.4rem] md:text-[4rem]">
              {planner("introTitle")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{planner("introBody")}</p>
            <p className="photo-caption mt-6">{planner("promise")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 md:py-24">
          <Suspense fallback={<p className="text-muted">{planner("sending")}</p>}>
            <PlannerForm />
          </Suspense>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-24">
          {(["private", "combine", "sightings", "dietary"] as const).map((key) => (
            <article key={key} className="border-t border-line pt-6">
              <h2 className="display text-[1.8rem]">{planner(`faq.${key}.q`)}</h2>
              <p className="mt-4 leading-8 text-muted">{planner(`faq.${key}.a`)}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
