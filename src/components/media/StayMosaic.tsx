import { LightboxTrigger } from "@/components/media/Lightbox";
import { MediaFrame } from "@/components/media/MediaFrame";
import { getMedia } from "@/content/media";

export function StayMosaic({
  ids,
  eyebrow,
  title,
  body,
}: {
  ids: string[];
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const slides = [...new Set(ids.filter(Boolean))];
  if (!slides.length) {
    return null;
  }

  return (
    <section className="mt-16">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="display mt-4 max-w-[16ch] text-[2.2rem] md:text-[3.4rem]">{title}</h2> : null}
      {body ? <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{body}</p> : null}
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
        {slides.map((id, index) => {
          const asset = getMedia(id);
          return (
            <figure key={`${id}-${index}`} className="mb-4 break-inside-avoid">
              <LightboxTrigger
                ids={slides}
                index={index}
                className={`photo-frame group relative block w-full ${
                  index % 5 === 0 ? "aspect-[4/5]" : "aspect-[16/10]"
                }`}
              >
                <MediaFrame
                  id={id}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 50vw"
                  className="photo-zoom"
                />
              </LightboxTrigger>
              <figcaption className="photo-caption mt-2">{asset.alt}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
