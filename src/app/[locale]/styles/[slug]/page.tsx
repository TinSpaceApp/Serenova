import { notFound } from "next/navigation";
import { PageHero } from "@/components/editorial/PageHero";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getStyle, styles } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return styles.map((item) => ({ slug: item.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(asLocale(locale));
  const style = getStyle(slug);
  if (!style) {
    notFound();
  }

  return (
    <>
      <PageHero image={style.cover} title={style.name} lede={style.summary} />
      <Container className="py-16">
        <p className="max-w-2xl text-lg leading-8 text-muted">
          Each style is a way in, not a fixed product. Jenny uses it to shape camps,
          pace and guiding — then writes the days around you.
        </p>
        <div className="mt-8">
          <Button href={`/plan?style=${style.slug}`}>Plan this kind of journey</Button>
        </div>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId={`${style.slug}-video`} coverId={style.cover} />
      </Container>
    </>
  );
}
