import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { styles } from "@/content/catalog";
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
  return pageMeta(locale, "stylesPage");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("stylesPage");
  const catalog = await getTranslations("catalog.styles");

  return (
    <>
      <PageHero
        image="styles"
        images={["styles", "walking-giraffe", "photography", "culture-1"]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lede={t("lede")}
      />
      <Container className="py-16 md:py-24">
        <p className="mx-auto mb-16 max-w-[40rem] text-center font-serif text-[1.15rem] leading-9 text-muted">
          {t("intro")}
        </p>
        <div className="grid gap-16">
          {styles.map((item, index) => (
            <Link
              key={item.slug}
              href={`/styles/${item.slug}`}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div
                className={`photo-frame relative ${
                  index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                } ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <MediaFrame
                  id={item.cover}
                  className="photo-zoom"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="eyebrow">0{index + 1}</p>
                <h2 className="display mt-3 text-[2.4rem] group-hover:text-bronze md:text-[3.8rem]">
                  {catalog(`${item.slug}.name`)}
                </h2>
                <p className="mt-4 max-w-md text-lg leading-8 text-muted">
                  {catalog(`${item.slug}.summary`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
