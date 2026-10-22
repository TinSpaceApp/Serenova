import { notFound } from "next/navigation";
import { PageHero } from "@/components/editorial/PageHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Container } from "@/components/ui/Container";
import { articles, getArticle } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(asLocale(locale));
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero image={article.cover} eyebrow={article.category} title={article.title} />
      <Container className="max-w-3xl py-16">
        {article.body?.map((paragraph) => (
          <p key={paragraph} className="mb-6 text-lg leading-9 text-muted">
            {paragraph}
          </p>
        ))}
        {!article.published ? (
          <p className="text-lg leading-8 text-muted">
            This article is illustrated in the maquette. The complete text has not been
            supplied or transcribed yet, so we are not inventing it.
          </p>
        ) : null}
      </Container>
      <Container className="pb-20">
        <MediaGallery ids={[article.cover]} />
        <div className="mt-10">
          <VideoSlot videoId={`${article.slug}-video`} coverId={article.cover} />
        </div>
      </Container>
    </>
  );
}
