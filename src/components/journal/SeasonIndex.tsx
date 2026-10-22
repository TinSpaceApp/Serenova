import type { TocItem } from "@/content/journal/compose";

function splitSeason(label: string) {
  const parts = label.split(/\s*[:：]\s*/);
  if (parts.length >= 2) {
    return { period: parts[0], detail: parts.slice(1).join(": ") };
  }
  return { period: label, detail: "" };
}

export function SeasonIndex({
  items,
  label,
}: {
  items: TocItem[];
  label: string;
}) {
  if (items.length < 2) return null;

  return (
    <section aria-label={label} className="article-shell mt-10 md:mt-12">
      <p className="eyebrow">{label}</p>
      <div className="mt-5 grid gap-px bg-line sm:grid-cols-2">
        {items.map((item) => {
          const { period, detail } = splitSeason(item.label);
          return (
            <a key={item.id} href={`#${item.id}`} className="article-season">
              <p className="photo-caption">{period}</p>
              {detail ? <p className="display mt-2 text-[1.55rem] leading-[1.15] md:text-[1.75rem]">{detail}</p> : null}
            </a>
          );
        })}
      </div>
    </section>
  );
}
