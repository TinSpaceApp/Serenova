export function ArticleSection({
  heading,
  headingId,
  paragraphs,
}: {
  heading?: string;
  headingId?: string;
  paragraphs: string[];
}) {
  if (!heading && paragraphs.length === 0) return null;

  return (
    <section className="article-shell" aria-labelledby={headingId}>
      <div className="article-measure">
        {heading && headingId ? (
          <h2 id={headingId} className="article-h2">
            {heading}
          </h2>
        ) : null}
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="article-copy">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
