import { Icon } from "@/components/icon";
import type { ProjectMeta } from "@/data/portfolio";
import { getPreviewMedia } from "@/lib/projects";

type ProjectThumbProps = {
  meta: ProjectMeta;
  /** Rendered width, used to pick the right poster from the srcSet. */
  sizes: string;
  className?: string;
  /** Load straight away instead of when scrolled near (hover card only). */
  eager?: boolean;
};

/**
 * A project's 16:9 poster, or its tint and icon when it has no media yet.
 * Purely decorative: the project name is always next to it as text.
 */
export function ProjectThumb({ meta, sizes, className = "", eager }: ProjectThumbProps) {
  const media = getPreviewMedia(meta);

  return (
    <div
      className={`relative aspect-video overflow-hidden ${className}`}
      style={{ backgroundColor: meta.tint }}
    >
      {media ? (
        // eslint-disable-next-line @next/next/no-img-element -- pre-sized webp, no optimizer needed
        <img
          src={media.poster}
          srcSet={media.srcSet}
          sizes={sizes}
          width={720}
          height={405}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Icon
          icon={meta.icon}
          className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-ink/[0.08]"
        />
      )}
    </div>
  );
}
