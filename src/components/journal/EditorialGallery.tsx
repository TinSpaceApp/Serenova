import type { FigureData } from "@/content/journal/compose";
import { EditorialPhoto } from "./EditorialPhoto";

export function EditorialGallery({
  heading,
  headingId,
  paragraphs,
  figures,
}: {
  heading?: string;
  headingId?: string;
  paragraphs: string[];
  figures: FigureData[];
}) {
  const pair = figures.slice(0, 2);

  return (
    <section className="article-shell" aria-labelledby={headingId}>
      {heading && headingId ? (
        <div className="article-measure">
          <h2 id={headingId} className="article-h2">
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="article-copy">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      <div className={`grid gap-3 sm:grid-cols-2 sm:gap-4 ${heading ? "mt-8" : ""}`}>
        {pair.map((figure, index) => (
          <EditorialPhoto
            key={`${figure.id}-${index}`}
            id={figure.id}
            caption={figure.caption}
            frameClassName={index === 1 ? "aspect-[4/5] max-h-[26rem]" : "aspect-[4/5] max-h-[26rem] sm:aspect-[3/4]"}
            sizes="(min-width: 1240px) 600px, (min-width: 640px) 46vw, 100vw"
          />
        ))}
      </div>
      {!heading && paragraphs.length ? (
        <div className="article-measure mt-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="article-copy">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
