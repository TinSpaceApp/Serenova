import { Reveal } from "@/components/editorial/Reveal";
import { LightboxTrigger } from "@/components/media/Lightbox";
import { MediaFrame } from "@/components/media/MediaFrame";

type FigureProps = {
  id: string;
  caption?: string;
  className?: string;
  frameClassName?: string;
  sizes?: string;
  objectPosition?: string;
  delay?: number;
};

export function Figure({
  id,
  caption,
  className = "",
  frameClassName = "aspect-[4/5]",
  sizes,
  objectPosition,
  delay,
}: FigureProps) {
  return (
    <figure className={`group w-full ${className}`}>
      <LightboxTrigger ids={[id]} className="block w-full">
        <Reveal variant="mask" delay={delay} className={`photo-frame w-full ${frameClassName}`}>
          <MediaFrame
            id={id}
            sizes={sizes}
            objectPosition={objectPosition}
            className="photo-zoom"
          />
        </Reveal>
      </LightboxTrigger>
      {caption ? <figcaption className="photo-caption mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
