import { LightboxTrigger } from "@/components/media/Lightbox";
import { MediaFrame } from "@/components/media/MediaFrame";

type EditorialPhotoProps = {
  id: string;
  caption?: string;
  frameClassName: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function EditorialPhoto({
  id,
  caption,
  frameClassName,
  sizes,
  priority,
  className = "",
}: EditorialPhotoProps) {
  return (
    <figure className={className}>
      <LightboxTrigger ids={[id]} className={`photo-frame group block w-full ${frameClassName}`}>
        <MediaFrame id={id} sizes={sizes} priority={priority} className="photo-zoom" />
      </LightboxTrigger>
      {caption ? <figcaption className="photo-caption mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
