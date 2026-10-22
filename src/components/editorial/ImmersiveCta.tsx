import { MediaFrame } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type ImmersiveCtaProps = {
  image: string;
  title: string;
  body?: string;
  href: string;
  label: string;
};

export function ImmersiveCta({ image, title, body, href, label }: ImmersiveCtaProps) {
  return (
    <section className="relative isolate min-h-[58vh] overflow-hidden bg-forest md:min-h-[64vh]">
      <MediaFrame id={image} sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/35 to-forest/15" />
      <Container className="relative flex min-h-[58vh] flex-col items-start justify-end py-16 text-ivory md:min-h-[64vh] md:items-center md:py-20 md:text-center">
        <h2 className="display max-w-[18ch] text-[3rem] md:text-[5.2rem]">{title}</h2>
        {body ? (
          <p className="mt-5 max-w-lg text-lg leading-8 text-ivory/78">{body}</p>
        ) : null}
        <div className="mt-9">
          <Button href={href} variant="light">
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
