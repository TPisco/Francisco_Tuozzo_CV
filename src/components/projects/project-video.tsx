import { Icon } from "@/components/icon";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

type ProjectVideoProps = {
  videoUrl?: string;
  title: string;
  placeholderLabel: string;
};

export function ProjectVideo({
  videoUrl,
  title,
  placeholderLabel,
}: ProjectVideoProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-3xl bg-sand shadow-soft">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
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
