import Image from "next/image";
import { getMedia, mediaSrc, type MediaId } from "@/content/media";

type MediaFrameProps = {
  id: MediaId | string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  fit?: "cover" | "contain";
  objectPosition?: string;
};

export function MediaFrame({
  id,
  className = "",
  sizes = "100vw",
  priority = false,
  fill = true,
  fit = "cover",
  objectPosition,
}: MediaFrameProps) {
  const asset = getMedia(id);
  const position = objectPosition ?? asset.objectPosition ?? "center";

  if (asset.status === "missing" || asset.status === "placeholder" || !asset.src) {
    return (
      <div
        className={`flex items-end bg-sand/80 p-4 ${className}`}
        role="img"
        aria-label={asset.alt}
      >
        <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          {asset.note ?? "Photograph to be supplied"}
        </p>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={mediaSrc(id)}
        alt={asset.alt}
        fill
        priority={priority}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
        style={{ objectPosition: position }}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={mediaSrc(id)}
      alt={asset.alt}
      width={asset.width ?? 1600}
      height={asset.height ?? 1000}
      priority={priority}
      className={`h-auto w-full object-cover ${className}`}
      style={{ objectPosition: position }}
      sizes={sizes}
    />
  );
}
