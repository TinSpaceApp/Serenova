"use client";

import { useState } from "react";
import { MediaFrame } from "./MediaFrame";
import { getMedia } from "@/content/media";

type MediaGalleryProps = {
  ids: string[];
};

export function MediaGallery({ ids }: MediaGalleryProps) {
  const slides = ids.filter(Boolean);
  const [index, setIndex] = useState(0);
  const current = slides[index] ?? slides[0];

  if (!current) {
    return null;
  }

  const asset = getMedia(current);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-sand">
        <MediaFrame id={current} />
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-white/90 font-sans text-lg"
              onClick={() => setIndex((value) => (value === 0 ? slides.length - 1 : value - 1))}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-white/90 font-sans text-lg"
              onClick={() => setIndex((value) => (value === slides.length - 1 ? 0 : value + 1))}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {asset.credit ? (
        <p className="mt-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          {asset.credit}
          {asset.status === "provisional" ? " · provisional" : ""}
        </p>
      ) : null}
      {slides.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-5">
          {slides.map((id, slideIndex) => (
            <button
              key={`${id}-${slideIndex}`}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                slideIndex === index ? "ring-2 ring-bronze" : "opacity-80"
              }`}
              aria-label={`Open image ${slideIndex + 1}`}
            >
              <MediaFrame id={id} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
