import { getMedia, type MediaId } from "@/content/media";
import { MediaFrame } from "./MediaFrame";

type VideoSlotProps = {
  videoId: MediaId | string;
  coverId: MediaId | string;
  caption?: string;
};

export function VideoSlot({ videoId, coverId, caption }: VideoSlotProps) {
  const video = getMedia(videoId);
  const playable = video.kind === "video" && Boolean(video.src);

  return (
    <figure className="overflow-hidden">
      <div className="relative aspect-[4/5] md:aspect-[16/9]">
        {playable ? (
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            poster={video.poster}
            preload="metadata"
          >
            <source src={video.src} />
          </video>
        ) : (
          <>
            <MediaFrame id={coverId} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 md:p-8">
              <p className="font-sans text-sm tracking-[0.04em] text-white">
                Presentation film to come — cover only for now.
              </p>
            </div>
          </>
        )}
      </div>
      {caption ? (
        <figcaption className="display py-8 text-center text-[1.55rem] text-ink md:text-[2rem]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
