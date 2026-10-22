"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/content/catalog";
import { MediaFrame } from "@/components/media/MediaFrame";

const filters = ["all", "tanzania", "zanzibar", "kenya", "uganda"] as const;

export function DestinationGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const items = useMemo(
    () =>
      filter === "all"
        ? destinations
        : destinations.filter((item) => item.filter === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`min-h-11 px-4 font-sans text-[0.72rem] uppercase tracking-[0.18em] ${
              filter === item ? "border-b border-ink text-ink" : "text-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.2rem]">
              <MediaFrame id={item.cover} sizes="(min-width: 1024px) 25vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="eyebrow text-white/70">{item.eyebrow}</p>
                <h2 className="display mt-2 text-[2rem]">{item.name}</h2>
                <p className="mt-2 text-sm leading-6 text-white/85">{item.lede}</p>
                <span className="mt-4 inline-block font-sans text-sm">
                  {item.cta === "contact" ? "Contact us" : "View destination"} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
