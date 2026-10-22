import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fromPrice, packages } from "@/content/catalog";
import { pageMeta } from "@/lib/page-meta";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "journeysPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("journeysPage");
  const copy = await getTranslations("catalog.packages");
  const tier = await getTranslations("catalog.tier");
  const ui = await getTranslations("ui");

  return (
    <>
      <PageHero
        image="serengeti-lions"
        images={["serengeti-lions", "ndutu-wildlife", "zanzibar-coast"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleWide
        lede={t("lede")}
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-16">
          {packages.map((item, index) => (
            <Link
              key={item.slug}
              href={`/journeys/${item.slug}`}
              className="group grid items-center gap-8 border-b border-line pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-14"
            >
              <div
                className={`photo-frame relative ${
                  index % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <MediaFrame
                  id={item.cover}
                  className="photo-zoom"
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </div>
              <div>
                <p className="eyebrow">
                  {item.days} {ui("days")} · {tier(item.category)} · {copy(`${item.slug}.audience`)}
                </p>
                <h2 className="display mt-3 text-[2.4rem] group-hover:text-bronze md:text-[3.6rem]">
                  {copy(`${item.slug}.name`)}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-muted">{copy(`${item.slug}.overview`)}</p>
                <p className="mt-5 font-sans text-sm text-ink">
                  {ui("fromPrice")} ${fromPrice(item)?.toLocaleString("en-US")} {ui("perPerson")}
                  {item.pricesPending ? ` · ${ui("indicative")}` : ""}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {item.stays.map((stay) => (
                    <div key={stay.name} className="photo-frame-sm relative aspect-[4/3]">
                      <MediaFrame id={stay.photo} sizes="18vw" />
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <Button href="/plan">{t("different")}</Button>
        </div>
      </Container>
    </>
  );
}
