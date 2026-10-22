import type { Locale } from "@/i18n/routing";
import { journalArticlesEn, journalCardsEn } from "./en";
import { journalArticlesFr, journalCardsFr } from "./fr";
import type { JournalArticle, JournalCard } from "./types";

export type { JournalArticle, JournalBlock, JournalCard } from "./types";

export function getJournalArticles(locale: Locale): JournalArticle[] {
  return locale === "fr" ? journalArticlesFr : journalArticlesEn;
}

export function getJournalCards(locale: Locale): JournalCard[] {
  return locale === "fr" ? journalCardsFr : journalCardsEn;
}

export function getJournalArticle(locale: Locale, slug: string) {
  return getJournalArticles(locale).find((item) => item.slug === slug);
}

export const journalSlugs = journalArticlesEn.map((item) => item.slug);
