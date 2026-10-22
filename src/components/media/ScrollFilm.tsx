"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type Connection = {
  saveData?: boolean;
  effectiveType?: string;
};

type ScrollFilmProps = {
  src: string;
  poster: string;
  caption?: string;
};

export function ScrollFilm({ src, poster, caption }: ScrollFilmProps) {
  const ui = useTranslations("ui");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const slow =
      connection?.saveData ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    if (reduce || slow) {
      return;
    }

    const play = () => {
      video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.45, 0.75] },
    );

    observer.observe(section);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-forest">
      <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[72vh]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={ui("filmLabel")}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/quicktime" />
        </video>
      </div>
      {caption ? (
        <div className="bg-ivory px-5 py-5 md:px-14">
          <p className="photo-caption">{caption}</p>
        </div>
      ) : null}
    </section>
  );
}
