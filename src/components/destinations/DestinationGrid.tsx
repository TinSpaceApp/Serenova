"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/content/catalog";
import { MediaFrame } from "@/components/media/MediaFrame";

const filters = ["all", "tanzania", "zanzibar", "kenya", "uganda"] as const;

export function DestinationGrid() {
  const t = useTranslations("catalog.destinations");
  const nav = useTranslations("nav");
  const ui = useTranslations("ui");
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
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`min-h-11 px-1 font-sans text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
              filter === item ? "border-b border-ink text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {item === "all" ? ui("all") : nav(item)}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-16">
        {items.map((item, index) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="group grid items-center gap-8 md:grid-cols-2 md:gap-16"
          >
            <div
              className={`photo-frame relative ${
                index % 2 === 0 ? "aspect-[16/11]" : "aspect-[4/5] md:order-2"
              }`}
            >
              <MediaFrame
                id={item.cover}
                className="photo-zoom"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className={index % 2 === 0 ? "" : "md:order-1"}>
              <p className="eyebrow">{t(`${item.slug}.eyebrow`)}</p>
              <h2 className="display mt-3 text-[2.6rem] md:text-[4rem]">{t(`${item.slug}.name`)}</h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-muted">{t(`${item.slug}.lede`)}</p>
              <span className="mt-6 inline-block font-sans text-[0.76rem] uppercase tracking-[0.16em] text-bronze">
                {item.cta === "contact" ? ui("contactUs") : ui("viewDestination")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
