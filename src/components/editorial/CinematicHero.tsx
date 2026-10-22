import { HeroStage } from "@/components/media/HeroStage";
import { Button } from "@/components/ui/Button";

type CinematicHeroProps = {
  image: string;
  images?: string[];
  eyebrow?: string;
  title: string;
  titleLine2?: string;
  lede?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CinematicHero({
  image,
  images,
  eyebrow,
  title,
  titleLine2,
  lede,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CinematicHeroProps) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-forest">
      <HeroStage images={images?.length ? images : [image]} />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/72 via-forest/15 to-transparent" />
      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-12 md:pb-20">
        <div className="hero-copy mx-auto w-full max-w-[1320px]">
          {eyebrow ? (
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-ivory/70">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="display mt-5 max-w-[20ch] text-[3.4rem] text-ivory sm:text-[5.4rem] md:text-[7.2rem]">
            {title}
            {titleLine2 ? (
              <>
                <br />
                {titleLine2}
              </>
            ) : null}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-md text-base leading-8 text-ivory/80 md:text-lg">
              {lede}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={primaryHref} variant="light">
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant="ghost" className="border-ivory/30 text-ivory">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="scroll-cue mt-12" aria-hidden>
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
