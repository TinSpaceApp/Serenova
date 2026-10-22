"use client";

import { useMemo, useState } from "react";
import { MediaFrame } from "@/components/media/MediaFrame";
import { articles } from "@/content/catalog";
import { Link } from "@/i18n/navigation";

const categories = ["All", ...Array.from(new Set(articles.map((item) => item.category)))];

export function JournalGrid() {
  const [category, setCategory] = useState("All");
  const items = useMemo(
    () => (category === "All" ? articles : articles.filter((item) => item.category === category)),
    [category],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`min-h-11 px-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] ${
              category === item ? "text-ink" : "text-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <MediaFrame id={article.cover} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <p className="eyebrow mt-4">{article.category}</p>
            <h2 className="display mt-2 text-[1.8rem]">{article.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{article.excerpt}</p>
            <p className="mt-3 font-sans text-sm">
              {article.published ? "Read the article" : "Listed — full text still to come"} →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
