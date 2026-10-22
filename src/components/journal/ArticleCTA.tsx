import { EditorialPhoto } from "./EditorialPhoto";
import { Button } from "@/components/ui/Button";

export function ArticleCTA({
  title,
  href,
  label,
  image,
}: {
  title: string;
  href: string;
  label: string;
  image: string;
}) {
  return (
    <section className="article-shell">
      <div className="grid items-center gap-8 border-t border-line bg-paper px-0 py-2 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-4">
        <EditorialPhoto
          id={image}
          frameClassName="aspect-[16/10] max-h-[16rem] md:aspect-[4/5] md:max-h-[22rem]"
          sizes="(min-width: 1240px) 460px, (min-width: 768px) 40vw, 100vw"
        />
        <div className="py-2 md:py-4">
          <p className="eyebrow">Serenova</p>
          <h2 className="display mt-4 max-w-[16ch] text-[2rem] leading-[1.08] text-ink md:text-[2.6rem]">{title}</h2>
          <div className="mt-7">
            <Button href={href} variant="forest">
              {label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
