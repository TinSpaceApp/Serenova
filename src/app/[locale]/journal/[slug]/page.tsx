import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { JournalArticle } from "@/components/journal/JournalArticle";
import { getJournalArticle, journalSlugs } from "@/content/journal";
import { asLocale } from "@/i18n/routing";
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
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: `/${locale}/journal/${article.slug}`,
      languages: {
        en: `/en/journal/${article.slug}`,
        fr: `/fr/journal/${article.slug}`,
      },
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
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
