import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { kiliRoutes } from "@/content/catalog";
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
  return pageMeta(locale, "kilimanjaroPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("kilimanjaroPage");
  const routes = await getTranslations("catalog.kili");

  return (
    <>
      <PageHero
        image="styles"
        images={["styles", "kilimanjaro-plants", "arusha-fig"]}
        title={t("title")}
        eyebrow={t("eyebrow")}
        lede={t("lede")}
      />
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">{t("higher")}</p>
          <h2 className="display mt-3 text-[2.4rem]">{t("mountainTitle")}</h2>
          <p className="mt-5 text-lg leading-8 text-muted">{t("mountainBody")}</p>
        </div>
        <div className="photo-frame group relative aspect-[16/10]">
          <MediaFrame id="styles" className="photo-zoom" />
        </div>
      </Container>
      <Container className="pb-16">
        <p className="eyebrow">{t("routesEyebrow")}</p>
        <h2 className="display mt-3 text-[2.3rem]">{t("routesTitle")}</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {kiliRoutes.map((route) => (
            <article key={route.slug} className="border-t border-line pt-5">
              <h3 className="display text-[2rem]">{route.name}</h3>
              <p className="mt-2 leading-7 text-muted">{routes(route.slug)}</p>
            </article>
          ))}
        </div>
      </Container>
      <Container className="grid gap-6 border-y border-line py-10 font-sans text-sm text-muted md:grid-cols-4">
        <p>{t("stat1")}</p>
        <p>{t("stat2")}</p>
        <p>{t("stat3")}</p>
        <p>{t("stat4")}</p>
      </Container>
      <Container className="py-16">
        <Button href="/plan?destination=tanzania">{t("plan")}</Button>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId="kilimanjaro-video" coverId="styles" />
      </Container>
    </>
  );
}
