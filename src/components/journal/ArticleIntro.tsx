export function ArticleIntro({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="article-shell mt-10 md:mt-14">
      <div className="article-measure">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="article-lead">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
