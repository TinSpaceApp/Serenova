"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
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
  const overlayRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const expandedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  expandedRef.current = expanded;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const inline = videoRef.current;
    const overlay = overlayRef.current;
    if (inline) {
      inline.muted = !soundOn || expanded;
    }
    if (overlay) {
      overlay.muted = !soundOn;
      if (soundOn) {
        overlay.play().catch(() => undefined);
      }
    } else if (inline && soundOn && !expanded) {
      inline.play().catch(() => undefined);
    }
  }, [soundOn, expanded]);

  useEffect(() => {
    const inline = videoRef.current;
    if (!expanded) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inline?.pause();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

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
      if (!expandedRef.current) {
        video.play().catch(() => undefined);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (expandedRef.current) {
          return;
        }
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
      if (document.hidden && !expandedRef.current) {
        video.pause();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (!expandedRef.current) {
        video.pause();
      }
    };
  }, []);

  const open = () => {
    setExpanded(true);
  };

  const close = () => {
    const overlay = overlayRef.current;
    const inline = videoRef.current;
    if (overlay && inline && Number.isFinite(overlay.currentTime)) {
      inline.currentTime = overlay.currentTime;
    }
    setExpanded(false);
    inline?.play().catch(() => undefined);
  };

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-forest">
      <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[72vh]">
        <div className="absolute inset-0">
          <button
            type="button"
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label={ui("enlargeFilm")}
            onClick={open}
          />
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
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex gap-2 md:bottom-6 md:right-6">
            <FilmControl
              label={soundOn ? ui("muteSound") : ui("enableSound")}
              onClick={() => setSoundOn((value) => !value)}
              active={soundOn}
            >
              {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
            </FilmControl>
            <FilmControl label={ui("enlargeFilm")} onClick={open}>
              <ExpandIcon />
            </FilmControl>
          </div>
        </div>
      </div>
      {caption ? (
        <div className="bg-ivory px-5 py-5 md:px-14">
          <p className="photo-caption">{caption}</p>
        </div>
      ) : null}
      {mounted && expanded
        ? createPortal(
            <FilmOverlay
              src={src}
              poster={poster}
              startAt={videoRef.current?.currentTime ?? 0}
              soundOn={soundOn}
              videoRef={overlayRef}
              onClose={close}
              onToggleSound={() => setSoundOn((value) => !value)}
            />,
            document.body,
          )
        : null}
    </section>
  );
}

function FilmOverlay({
  src,
  poster,
  startAt,
  soundOn,
  videoRef,
  onClose,
  onToggleSound,
}: {
  src: string;
  poster: string;
  startAt: number;
  soundOn: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onToggleSound: () => void;
}) {
  const ui = useTranslations("ui");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (Number.isFinite(startAt)) {
      video.currentTime = startAt;
    }
    video.play().catch(() => undefined);
  }, [startAt, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !soundOn;
    }
  }, [soundOn, videoRef]);

  return (
    <div
      className="lightbox-shell fixed inset-0 z-[80] flex flex-col bg-forest/93 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={ui("filmLabel")}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        aria-label={ui("closeFilm")}
        onClick={onClose}
      />
      <div className="relative z-10 flex items-center justify-end px-5 py-4 md:px-10">
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 px-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ivory"
        >
          {ui("closeFilm")}
        </button>
      </div>
      <div className="lightbox-stage relative z-10 mx-auto mb-8 flex min-h-0 w-full max-w-[1400px] flex-1 items-center px-5 md:px-10">
        <video
          ref={videoRef}
          className="mx-auto max-h-[78vh] w-full object-contain"
          muted={!soundOn}
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-label={ui("filmLabel")}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/quicktime" />
        </video>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex gap-2 md:bottom-6 md:right-6">
        <FilmControl
          label={soundOn ? ui("muteSound") : ui("enableSound")}
          onClick={onToggleSound}
          active={soundOn}
        >
          {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
        </FilmControl>
      </div>
    </div>
  );
}

function FilmControl({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`film-control pointer-events-auto min-h-11 min-w-11 rounded-full border text-ivory transition-colors duration-300 ${
        active
          ? "border-ivory/70 bg-white/12"
          : "border-ivory/35 bg-forest/35 hover:bg-white/10"
      }`}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" aria-hidden>
      <path
        d="M4 10v4h3.2L12 18V6L7.2 10H4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 9.2a3.4 3.4 0 0 1 0 5.6M17.4 7a6.2 6.2 0 0 1 0 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" aria-hidden>
      <path
        d="M4 10v4h3.2L12 18V6L7.2 10H4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M16 9.5 20.5 14M20.5 9.5 16 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" aria-hidden>
      <path
        d="M8 5H5v3M16 5h3v3M5 16v3h3M19 16v3h-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
