import { MediaFrame } from "@/components/media/MediaFrame";
import { Link } from "@/i18n/navigation";

export type RelatedItem = {
  href: string;
  label: string;
  cover: string;
};

export function RelatedArticles({
  items,
  label,
  continueLabel,
}: {
  items: RelatedItem[];
  label: string;
  continueLabel: string;
}) {
  if (!items.length) return null;

  return (
    <aside className="article-shell">
      <p className="eyebrow">{label}</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group block">
            <div className="photo-frame relative aspect-[16/11]">
              <MediaFrame
                id={item.cover}
                className="photo-zoom"
                sizes="(min-width: 1240px) 380px, (min-width: 640px) 44vw, 100vw"
              />
            </div>
            <h2 className="display mt-4 text-[1.55rem] leading-[1.12] group-hover:text-bronze md:text-[1.7rem]">
              {item.label}
            </h2>
            <p className="mt-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              {continueLabel} →
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
