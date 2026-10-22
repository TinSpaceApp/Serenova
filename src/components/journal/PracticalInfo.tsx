export function PracticalInfo({
  title,
  rows,
  items,
}: {
  title?: string;
  rows?: { label: string; value: string }[];
  items?: string[];
}) {
  return (
    <aside className="article-shell">
      <div className="article-panel">
        {title ? <p className="eyebrow">{title}</p> : null}
        {rows?.length ? (
          <dl className={`grid gap-5 sm:grid-cols-2 ${title ? "mt-6" : ""}`}>
            {rows.map((row) => (
              <div key={row.label} className="border-t border-line pt-4">
                <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{row.label}</dt>
                <dd className="mt-2 font-serif text-[1.12rem] leading-7 text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {items?.length ? (
          <ul className={`${title || rows?.length ? "mt-6" : ""} space-y-3`}>
            {items.map((item) => (
              <li key={item} className="flex gap-3 font-serif text-[1.05rem] leading-8 text-ink">
                <span aria-hidden className="mt-[0.7rem] h-[5px] w-[5px] shrink-0 rounded-full bg-bronze" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
