"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import type { PreviewMedia } from "@/lib/projects";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

type ProjectVideoProps = {
  videoUrl?: string;
  /** Poster from public/previews: the video's cover, or the image shown when there is no video. */
  media: PreviewMedia | null;
  title: string;
  playLabel: string;
  imageAlt: string;
  placeholderLabel: string;
};

/**
 * The detail page's media slot. A YouTube video loads only when played: until
 * then it is just its poster and a play button, so the page never pulls in
 * YouTube's player (or its cookies) unasked.
 */
export function ProjectVideo({
  videoUrl,
  media,
  title,
  playLabel,
  imageAlt,
  placeholderLabel,
}: ProjectVideoProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-sand shadow-soft">
      {embedUrl && playing ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : embedUrl ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {media ? <PosterImage media={media} alt="" /> : null}
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ink/80 text-cream shadow-lift transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-[0.97] sm:h-20 sm:w-20">
            <Icon icon={faPlay} className="ml-1 h-6 w-6" />
          </span>
        </button>
      ) : media ? (
        <PosterImage media={media} alt={imageAlt} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/80 text-ink/30">
            <Icon icon={faPlay} className="h-6 w-6" />
          </div>
          <p className="max-w-xs text-sm font-medium text-ink-soft">
            {placeholderLabel}
          </p>
        </div>
      )}
    </div>
  );
}

function PosterImage({ media, alt }: { media: PreviewMedia; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized webp, no optimizer needed
    <img
      src={media.poster}
      srcSet={media.srcSet}
      sizes="(min-width: 1152px) 1056px, 100vw"
      width={1440}
      height={810}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
