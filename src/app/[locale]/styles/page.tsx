import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { styles } from "@/content/catalog";
import { Link } from "@/i18n/navigation";
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
        image="styles"
        title="Safari styles"
        lede="Thoughtfully designed journeys, tailored to how you actually travel."
      />
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20">
        {styles.map((item) => (
          <Link key={item.slug} href={`/styles/${item.slug}`} className="group grid gap-5 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <MediaFrame id={item.cover} sizes="(min-width: 768px) 25vw, 100vw" />
            </div>
            <div>
              <h2 className="display text-[2rem]">{item.name}</h2>
              <p className="mt-3 leading-7 text-muted">{item.summary}</p>
            </div>
          </Link>
        ))}
      </Container>
    </>
  );
}
