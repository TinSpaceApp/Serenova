"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LightboxTrigger, useLightbox } from "./Lightbox";
import { MediaFrame } from "./MediaFrame";
import { getMedia } from "@/content/media";

type MediaGalleryProps = {
  ids: string[];
};

export function MediaGallery({ ids }: MediaGalleryProps) {
  const ui = useTranslations("ui");
  const slides = [...new Set(ids.filter(Boolean))];
  const [index, setIndex] = useState(0);
  const { open } = useLightbox();
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
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!current) {
    return null;
  }

  const asset = getMedia(current);

  return (
    <div>
      <div className="photo-frame relative aspect-[16/10] bg-sand">
        <LightboxTrigger ids={slides} index={index} className="absolute inset-0 block">
          <MediaFrame id={current} className="photo-zoom" />
        </LightboxTrigger>
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 z-10 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-white/90 font-sans text-lg"
              onClick={() => setIndex((value) => (value === 0 ? slides.length - 1 : value - 1))}
              aria-label={ui("prevPhoto")}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 z-10 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-white/90 font-sans text-lg"
              onClick={() => setIndex((value) => (value === slides.length - 1 ? 0 : value + 1))}
              aria-label={ui("nextPhoto")}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {asset.credit ? (
        <p className="mt-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          {asset.credit}
          {asset.status === "provisional" ? ` · ${ui("provisional")}` : ""}
        </p>
      ) : null}
      {slides.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-5">
          {slides.map((id, slideIndex) => (
            <button
              key={`${id}-${slideIndex}`}
              type="button"
              onClick={() => {
                setIndex(slideIndex);
                open(slides, slideIndex);
              }}
              className={`photo-frame-sm relative aspect-[4/3] ${
                slideIndex === index ? "ring-2 ring-bronze ring-offset-2 ring-offset-ivory" : "opacity-80"
              }`}
              aria-label={ui("openPhoto", { n: slideIndex + 1 })}
            >
              <MediaFrame id={id} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
