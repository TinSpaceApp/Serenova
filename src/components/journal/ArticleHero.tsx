import { EditorialPhoto } from "./EditorialPhoto";

export function ArticleHero({ id }: { id: string }) {
  return (
    <div className="article-shell mt-8 md:mt-10">
      <EditorialPhoto
        id={id}
        frameClassName="article-hero-frame"
        sizes="(min-width: 1240px) 1240px, 100vw"
        priority
      />
    </div>
  );
}
