import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { JournalArticle } from "@/components/journal/JournalArticle";
import { getJournalArticle, journalSlugs } from "@/content/journal";
import { asLocale } from "@/i18n/routing";
import { entryMeta } from "@/lib/page-meta";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return journalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getJournalArticle(asLocale(locale), slug);
  if (!article) {
    return {};
  }
  const meta = entryMeta(locale, `/journal/${article.slug}`, article.seoTitle, article.seoDescription);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const currentLocale = asLocale(locale);
  setRequestLocale(currentLocale);

  if (slug === "safari-zanzibar") {
    redirect(`/${currentLocale}/zanzibar`);
  }

  const article = getJournalArticle(currentLocale, slug);
  if (!article || !article.published) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    dateModified: article.lastReviewed,
    author: {
      "@type": "Organization",
      name: "Serenova",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalArticle article={article} locale={currentLocale} />
    </>
  );
}
