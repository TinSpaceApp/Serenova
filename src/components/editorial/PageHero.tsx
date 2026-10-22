import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  image: string;
};

export function PageHero({ eyebrow, title, lede, image }: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[58vh] overflow-hidden bg-[#2b241c] md:min-h-[68vh]">
      <MediaFrame id={image} priority />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex min-h-[58vh] items-end px-5 pb-12 md:min-h-[68vh] md:px-10 md:pb-16">
        <Container className="text-white">
          {eyebrow ? <p className="eyebrow text-white/75">{eyebrow}</p> : null}
          <h1 className="display mt-3 text-[3rem] md:text-[5rem]">{title}</h1>
          {lede ? (
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/85">{lede}</p>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
