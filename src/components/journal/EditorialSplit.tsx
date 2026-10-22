import type { FigureData } from "@/content/journal/compose";
import { EditorialPhoto } from "./EditorialPhoto";

export function EditorialSplit({
  heading,
  headingId,
  paragraphs,
  figure,
  imageSide,
}: {
  heading: string;
  headingId: string;
  paragraphs: string[];
  figure: FigureData;
  imageSide: "left" | "right";
}) {
  const portrait = figure.frame === "portrait";
  const photo = (
    <EditorialPhoto
      id={figure.id}
      caption={figure.caption}
      frameClassName={portrait ? "aspect-[4/5] max-h-[28rem]" : "aspect-[3/2] max-h-[22rem]"}
      sizes="(min-width: 1240px) 520px, (min-width: 768px) 42vw, 100vw"
    />
  );
  const copy = (
    <div>
      <h2 id={headingId} className="article-h2 article-h2-flush">
        {heading}
      </h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="article-copy">
          {paragraph}
        </p>
      ))}
    </div>
  );

  return (
    <section className="article-shell" aria-labelledby={headingId}>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        {imageSide === "left" ? (
          <>
            {photo}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {photo}
          </>
        )}
      </div>
    </section>
  );
}
