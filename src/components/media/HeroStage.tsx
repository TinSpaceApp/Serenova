"use client";

import { useEffect, useState } from "react";
import { MediaFrame } from "./MediaFrame";

type HeroStageProps = {
  images: string[];
  interval?: number;
};

export function HeroStage({ images, interval = 7000 }: HeroStageProps) {
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      {slides.map((id, slideIndex) => (
        <div
          key={id}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <MediaFrame id={id} priority={slideIndex === 0} sizes="100vw" />
        </div>
      ))}
    </div>
  );
}
