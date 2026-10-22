"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MediaFrame } from "@/components/media/MediaFrame";
import type { JournalCard } from "@/content/journal";
import { Link } from "@/i18n/navigation";

export function JournalGrid({ cards }: { cards: JournalCard[] }) {
  const t = useTranslations("journalPage");
  const categories = useMemo(
    () => Array.from(new Set(cards.map((item) => item.category))),
    [cards],
  );
  const [category, setCategory] = useState("all");
  const items = useMemo(
    () => (category === "all" ? cards : cards.filter((item) => item.category === category)),
    [cards, category],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["all", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`min-h-11 px-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
              category === item ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {item === "all" ? t("all") : item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article, index) => (
          <Link key={article.slug} href={article.href} className="group block">
            <div
              className={`photo-frame relative ${
                index % 5 === 1 ? "aspect-[4/5]" : "aspect-[16/10]"
              }`}
            >
              <MediaFrame
                id={article.cover}
                className="photo-zoom"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <p className="eyebrow mt-5">{article.category}</p>
            <h2 className="display mt-2 text-[1.9rem] leading-[1.08] group-hover:text-bronze md:text-[2.15rem]">
              {article.title}
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-muted">{article.excerpt}</p>
            <p className="mt-4 font-sans text-sm uppercase tracking-[0.14em] text-ink">
              {t("readArticle")} →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
