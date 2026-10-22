"use client";

import { useState } from "react";
import { LightboxTrigger, useLightbox } from "@/components/media/Lightbox";
import { MediaFrame } from "@/components/media/MediaFrame";

export function LodgeCard({
  name,
  area,
  photos,
}: {
  name: string;
  area: string;
  photos: string[];
}) {
  const slides = photos.filter(Boolean);
  const [index, setIndex] = useState(0);
  const { open } = useLightbox();
  const current = slides[index] ?? slides[0];

  if (!current) {
    return null;
  }

  return (
    <article>
      <LightboxTrigger ids={slides} index={index} className="photo-frame group relative block aspect-[16/10] w-full">
        <MediaFrame
          id={current}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="photo-zoom"
        />
      </LightboxTrigger>
      {slides.length > 1 ? (
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {slides.map((id, slideIndex) => (
            <button
              key={`${id}-${slideIndex}`}
              type="button"
              onClick={() => {
                setIndex(slideIndex);
                open(slides, slideIndex);
              }}
              className={`photo-frame-sm relative aspect-[4/3] ${
                slideIndex === index ? "ring-2 ring-bronze ring-offset-2 ring-offset-ivory" : "opacity-75"
              }`}
              aria-label={`${name} ${slideIndex + 1}`}
            >
              <MediaFrame id={id} sizes="12vw" />
            </button>
          ))}
        </div>
      ) : null}
      <h3 className="display mt-4 text-[1.65rem]">{name}</h3>
      <p className="photo-caption mt-1">{area}</p>
    </article>
  );
}
