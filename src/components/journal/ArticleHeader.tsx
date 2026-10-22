type ArticleHeaderProps = {
  category: string;
  title: string;
  subtitle: string;
  lastReviewed?: string;
  lastReviewedLabel: string;
};

export function ArticleHeader({
  category,
  title,
  subtitle,
  lastReviewed,
  lastReviewedLabel,
}: ArticleHeaderProps) {
  return (
    <header className="article-shell pt-28 md:pt-36">
      <p className="eyebrow">{category}</p>
      <h1 className="display mt-4 max-w-[16ch] text-[2.5rem] leading-[1.04] text-ink md:max-w-[18ch] md:text-[4rem]">
        {title}
      </h1>
      <p className="article-kicker mt-5 max-w-[36rem]">{subtitle}</p>
      {lastReviewed ? (
        <p className="photo-caption mt-5">
          {lastReviewedLabel} {lastReviewed}
        </p>
      ) : null}
    </header>
  );
}
