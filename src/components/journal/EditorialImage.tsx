import type { FigureData } from "@/content/journal/compose";
import { EditorialPhoto } from "./EditorialPhoto";

export function EditorialImage({ figure }: { figure: FigureData }) {
  const portrait = figure.frame === "portrait";

  return (
    <div className="article-shell">
      <EditorialPhoto
        id={figure.id}
        caption={figure.caption}
        frameClassName={
          portrait
            ? "aspect-[4/5] max-h-[28rem] max-w-[22rem]"
            : "aspect-[3/2] max-h-[22rem]"
        }
        sizes={
          portrait
            ? "(min-width: 768px) 22rem, 80vw"
            : "(min-width: 1240px) 720px, (min-width: 768px) 60vw, 100vw"
        }
        className={portrait ? "article-measure" : "max-w-[46rem]"}
      />
    </div>
  );
}
