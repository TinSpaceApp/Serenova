"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { MediaFrame } from "@/components/media/MediaFrame";
import { getMedia } from "@/content/media";

type LightboxContextValue = {
  open: (ids: string[], index?: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const open = useCallback((nextIds: string[], nextIndex = 0) => {
    const slides = [...new Set(nextIds.filter(Boolean))];
    if (!slides.length) {
      return;
    }
    setIds(slides);
    setIndex(Math.min(Math.max(nextIndex, 0), slides.length - 1));
  }, []);
  const close = useCallback(() => setIds([]), []);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {ids.length ? <PhotoLightbox ids={ids} index={index} onIndex={setIndex} onClose={close} /> : null}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    return { open: () => undefined };
  }
  return context;
}

export function LightboxTrigger({
  ids,
  index = 0,
  label,
  className = "",
  children,
}: {
  ids: string[];
  index?: number;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useLightbox();
  const t = useTranslations("ui");

  return (
    <button
      type="button"
      onClick={() => open(ids, index)}
      className={`cursor-zoom-in text-left ${className}`}
      aria-label={label ?? t("enlargePhoto")}
    >
      {children}
    </button>
  );
}

function PhotoLightbox({
  ids,
  index,
  onIndex,
  onClose,
}: {
  ids: string[];
  index: number;
  onIndex: (value: number) => void;
  onClose: () => void;
}) {
  const t = useTranslations("ui");
  const titleId = useId();
  const current = ids[index] ?? ids[0];
  const asset = getMedia(current);
  const multiple = ids.length > 1;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight" && multiple) {
        onIndex((index + 1) % ids.length);
      }
      if (event.key === "ArrowLeft" && multiple) {
        onIndex(index === 0 ? ids.length - 1 : index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids.length, index, multiple, onClose, onIndex]);

  if (!current) {
    return null;
  }

  return (
    <div
      className="lightbox-shell fixed inset-0 z-[80] flex flex-col bg-forest/93 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        aria-label={t("closePhoto")}
        onClick={onClose}
      />
      <div className="relative z-10 flex items-center justify-between px-5 py-4 md:px-10">
        <p id={titleId} className="photo-caption text-ivory/70">
          {asset.alt}
          {multiple ? ` · ${index + 1}/${ids.length}` : ""}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 px-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ivory"
        >
          {t("closePhoto")}
        </button>
      </div>
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 items-center gap-3 px-5 pb-8 md:px-10">
        {multiple ? (
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-full border border-ivory/35 font-sans text-ivory transition-colors duration-300 hover:bg-white/10"
            onClick={() => onIndex(index === 0 ? ids.length - 1 : index - 1)}
            aria-label={t("prevPhoto")}
          >
            ‹
          </button>
        ) : null}
        <div className="lightbox-stage photo-frame relative mx-auto h-[72vh] w-full bg-transparent">
          <MediaFrame id={current} sizes="92vw" fit="contain" objectPosition="center" />
        </div>
        {multiple ? (
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-full border border-ivory/35 font-sans text-ivory transition-colors duration-300 hover:bg-white/10"
            onClick={() => onIndex((index + 1) % ids.length)}
            aria-label={t("nextPhoto")}
          >
            ›
          </button>
        ) : null}
      </div>
      {asset.credit ? <p className="relative z-10 px-5 pb-6 text-center photo-caption text-ivory/55">{asset.credit}</p> : null}
    </div>
  );
}
