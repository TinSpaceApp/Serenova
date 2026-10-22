import type { TocItem } from "@/content/journal/compose";

export function ArticleTableOfContents({
  items,
  label,
}: {
  items: TocItem[];
  label: string;
}) {
  if (items.length < 4) return null;

  return (
    <nav aria-label={label} className="article-shell mt-10 md:mt-12">
      <div className="article-toc">
        <p className="eyebrow">{label}</p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {items.map((item, index) => {
            const alreadyNumbered = /^\d+[.)]/.test(item.label);
            return (
              <li key={item.id}>
                <a href={`#${item.id}`} className="article-toc-link">
                  {alreadyNumbered ? null : (
                    <span className="article-toc-index">{String(index + 1).padStart(2, "0")}</span>
                  )}
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
