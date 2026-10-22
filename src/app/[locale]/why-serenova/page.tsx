import type { Metadata } from "next";
import { Figure } from "@/components/editorial/Figure";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { PageHero } from "@/components/editorial/PageHero";
import { Reveal } from "@/components/editorial/Reveal";
import { Container } from "@/components/ui/Container";
import { pageMeta } from "@/lib/page-meta";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

const pillars = ["passion", "partners", "guides", "tailored", "nature", "more", "guidance", "memory"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "whyPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("whyPage");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        image="sunset-ngorongoro"
        images={["sunset-ngorongoro", "walking-giraffe", "serengeti-lions"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
        titleWide
      />

      <section className="bg-ivory">
        <Container className="grid items-end gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-24">
          <Figure
            id="walking-giraffe"
            caption={t("introCaption")}
            frameClassName="aspect-[4/5]"
            objectPosition="center 32%"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <Reveal className="md:pb-8">
            <p className="max-w-xl font-serif text-[1.2rem] leading-9 text-muted">{t("intro")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-4">
          {pillars.map((key, index) => (
            <article key={key}>
              <p className="eyebrow">0{index + 1}</p>
              <h2 className="display mt-3 text-[1.85rem]">{t(`${key}.title`)}</h2>
              <p className="mt-4 leading-8 text-muted">{t(`${key}.body`)}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="eyebrow">{t("closeEyebrow")}</p>
            <h2 className="display mt-4 max-w-[14ch] text-[2.4rem] md:text-[4rem]">{t("closeTitle")}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("closeBody")}</p>
          </Reveal>
          <Figure
            id="sunset-2"
            frameClassName="aspect-[16/11]"
            objectPosition="center 55%"
            sizes="(min-width: 768px) 46vw, 100vw"
          />
        </Container>
      </section>

      <ImmersiveCta
        image="cta"
        title={t("ctaTitle")}
        body={t("ctaBody")}
        href="/plan"
        label={nav("plan")}
      />
    </>
  );
}
