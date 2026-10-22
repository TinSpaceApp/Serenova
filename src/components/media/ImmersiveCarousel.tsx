"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MediaFrame } from "./MediaFrame";
import { getMedia } from "@/content/media";

type ImmersiveCarouselProps = {
  ids: string[];
  caption?: string;
};

export function ImmersiveCarousel({ ids, caption }: ImmersiveCarouselProps) {
  const ui = useTranslations("ui");
  const slides = [...new Set(ids.filter(Boolean))];
  const [index, setIndex] = useState(0);
  const current = slides[index] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!current) {
    return null;
  }

  const asset = getMedia(current);

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-forest md:min-h-[92vh]">
      {slides.map((id, slideIndex) => (
        <div
          key={id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <MediaFrame id={id} sizes="100vw" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 px-5 py-8 md:px-12 md:py-12">
        <div>
          {caption ? (
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-ivory/70">
              {caption}
            </p>
          ) : null}
          <p className="mt-2 max-w-lg text-sm leading-6 text-ivory/80">{asset.alt}</p>
        </div>
        {slides.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-full border border-ivory/35 font-sans text-ivory transition-colors duration-300 hover:bg-white/10"
              onClick={() => setIndex((value) => (value === 0 ? slides.length - 1 : value - 1))}
              aria-label={ui("prevPhoto")}
            >
              ‹
            </button>
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-full border border-ivory/35 font-sans text-ivory transition-colors duration-300 hover:bg-white/10"
              onClick={() => setIndex((value) => (value + 1) % slides.length)}
              aria-label={ui("nextPhoto")}
            >
              ›
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
