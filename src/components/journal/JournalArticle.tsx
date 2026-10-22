import { ArticleCTA } from "@/components/journal/ArticleCTA";
import { ArticleHeader } from "@/components/journal/ArticleHeader";
import { ArticleHero } from "@/components/journal/ArticleHero";
import { ArticleIntro } from "@/components/journal/ArticleIntro";
import { ArticleSection } from "@/components/journal/ArticleSection";
import { ArticleTableOfContents } from "@/components/journal/ArticleTableOfContents";
import { EditorialGallery } from "@/components/journal/EditorialGallery";
import { EditorialImage } from "@/components/journal/EditorialImage";
import { EditorialQuote } from "@/components/journal/EditorialQuote";
import { EditorialSplit } from "@/components/journal/EditorialSplit";
import { PracticalInfo } from "@/components/journal/PracticalInfo";
import { RelatedArticles } from "@/components/journal/RelatedArticles";
import { SeasonIndex } from "@/components/journal/SeasonIndex";
import type { JournalArticle as JournalArticleModel } from "@/content/journal";
import { composeJournal, type ComposedNode } from "@/content/journal/compose";
import { getJournalCards } from "@/content/journal";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

function relatedCover(href: string, covers: Record<string, string>) {
  if (covers[href]) return covers[href];
  if (href.includes("photography")) return "photography";
  if (href.includes("uganda")) return "uganda";
  if (href.includes("zanzibar")) return "zanzibar-coast";
  return "sunset-ngorongoro";
}

function ArticleNode({ node }: { node: ComposedNode }) {
  if (node.kind === "split") {
    return (
      <EditorialSplit
        heading={node.heading}
        headingId={node.headingId}
        paragraphs={node.paragraphs}
        figure={node.figure}
        imageSide={node.imageSide}
      />
    );
  }
  if (node.kind === "prose") {
    return <ArticleSection heading={node.heading} headingId={node.headingId} paragraphs={node.paragraphs} />;
  }
  if (node.kind === "gallery") {
    return (
      <EditorialGallery
        heading={node.heading}
        headingId={node.headingId}
        paragraphs={node.paragraphs}
        figures={node.figures}
      />
    );
  }
  if (node.kind === "image") {
    return <EditorialImage figure={node.figure} />;
  }
  if (node.kind === "guide") {
    return <PracticalInfo title={node.title} rows={node.rows} />;
  }
  if (node.kind === "list") {
    return <PracticalInfo title={node.title} items={node.items} />;
  }
  if (node.kind === "notice") {
    return (
      <div className="article-shell">
        <aside className="article-notice">
          <p>{node.text}</p>
        </aside>
      </div>
    );
  }
  return <EditorialQuote text={node.text} />;
}

export async function JournalArticle({
  article,
  locale,
}: {
  article: JournalArticleModel;
  locale: Locale;
}) {
  const t = await getTranslations("journalPage");
  const nav = await getTranslations("nav");
  const composed = composeJournal(article);
  const cards = getJournalCards(locale);
  const covers = Object.fromEntries(cards.map((card) => [card.href, card.cover]));

  return (
    <article className="bg-ivory pb-20 md:pb-28">
      <ArticleHeader
        category={article.category}
        title={article.title}
        subtitle={article.subtitle}
        lastReviewed={article.lastReviewed}
        lastReviewedLabel={t("lastReviewed")}
      />
      <ArticleHero id={article.cover} />
      <ArticleIntro paragraphs={article.intro} />
      <SeasonIndex items={composed.seasons} label={t("seasons")} />
      <ArticleTableOfContents items={composed.toc} label={t("contents")} />

      <div className="article-flow">
        {composed.nodes.map((node, index) => (
          <ArticleNode key={`${node.kind}-${index}`} node={node} />
        ))}
      </div>

      <div className="article-flow mt-16 md:mt-20">
        {article.sources?.length ? (
          <aside className="article-shell">
            <div className="article-measure">
              <p className="eyebrow">{t("officialSources")}</p>
              <ul className="mt-5 space-y-3">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-[1.05rem] leading-7 text-ink underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}

        <RelatedArticles
          label={t("related")}
          continueLabel={t("continueReading")}
          items={article.related.map((item) => ({
            href: item.href,
            label: item.label,
            cover: relatedCover(item.href, covers),
          }))}
        />

        <ArticleCTA title={article.cta} href="/plan" label={nav("plan")} image={article.cover} />
      </div>
    </article>
  );
}
