import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { localeAlternates, shareMeta } from "@/lib/seo";

const pagePaths: Record<string, string> = {
  aboutPage: "/about",
  contactPage: "/contact",
  destinationsPage: "/destinations",
  journalPage: "/journal",
  journeysPage: "/journeys",
  kenyaPage: "/kenya",
  kilimanjaroPage: "/kilimanjaro",
  planPage: "/plan",
  reviewsPage: "/reviews",
  stylesPage: "/styles",
  tanzaniaPage: "/tanzania",
  ugandaPage: "/uganda",
  whyPage: "/why-serenova",
  zanzibarPage: "/zanzibar",
};

export async function pageMeta(
  locale: string,
  namespace: string,
  titleKey = "metaTitle",
  descriptionKey = "metaDescription",
): Promise<Metadata> {
  const loc = asLocale(locale);
  const t = await getTranslations({ locale: loc, namespace });
  const title = t(titleKey);
  const description = t(descriptionKey);
  const path = pagePaths[namespace] ?? "/";

  return {
    title,
    description,
    alternates: localeAlternates(path, loc),
    ...shareMeta(title, description, loc, path),
  };
}

export function entryMeta(locale: string, path: string, title: string, description: string): Metadata {
  const loc = asLocale(locale);
  return {
    title,
    description,
    alternates: localeAlternates(path, loc),
    ...shareMeta(title, description, loc, path),
  };
}
