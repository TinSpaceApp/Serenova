import { HeroStage } from "@/components/media/HeroStage";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  image: string;
  images?: string[];
  titleWide?: boolean;
};

export function PageHero({ eyebrow, title, lede, image, images, titleWide }: PageHeroProps) {
  const slides = [...new Set((images?.length ? images : [image]).filter(Boolean))];

  return (
    <section className="relative isolate min-h-[86vh] overflow-hidden bg-forest md:min-h-[100svh]">
      {slides.length > 1 ? (
        <HeroStage images={slides} />
      ) : (
        <MediaFrame id={slides[0] ?? image} priority />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/78 via-forest/20 to-transparent" />
      <div className="relative flex min-h-[86vh] items-end px-5 pb-16 md:min-h-[100svh] md:px-12 md:pb-24">
        <Container className="hero-copy text-ivory">
          {eyebrow ? (
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.24em] text-ivory/65">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={`display mt-5 text-[3.6rem] leading-[0.95] md:text-[7rem] ${
              titleWide ? "max-w-[26ch]" : "max-w-[12ch]"
            }`}
          >
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/82">{lede}</p>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
