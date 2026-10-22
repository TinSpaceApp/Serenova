import { LodgeCard } from "@/components/media/LodgeCard";
import type { Lodge } from "@/content/types";

export function StayRail({
  lodges,
  eyebrow,
  note,
}: {
  lodges: Lodge[];
  eyebrow: string;
  note: string;
}) {
  if (!lodges.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <p className="eyebrow">{eyebrow}</p>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{note}</p>
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {lodges.map((lodge) => (
          <LodgeCard
            key={lodge.slug}
            name={lodge.name}
            area={lodge.area}
            photos={lodge.gallery.length ? lodge.gallery : [lodge.cover]}
          />
        ))}
      </div>
    </section>
  );
}
