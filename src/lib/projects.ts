import {
  projectMeta,
  type ProjectId,
  type ProjectMeta,
} from "@/data/portfolio";

export function getProjectPath(id: ProjectId): string {
  return `/projects/${id}`;
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.id === slug);
}

export const projectSlugs = projectMeta.map((p) => p.id);

export type PreviewMedia = {
  /** 720 and 1440 px wide webp posters, as a ready-made srcSet. */
  srcSet: string;
  /** The 720 px poster, for `src`. */
  poster: string;
  clip?: string;
};

export function getPreviewMedia(meta: ProjectMeta): PreviewMedia | null {
  if (!meta.preview) return null;
  const base = `/previews/${meta.id}`;
  return {
    srcSet: `${base}-720.webp 720w, ${base}-1440.webp 1440w`,
    poster: `${base}-720.webp`,
    clip: meta.preview.clip ? `${base}.mp4` : undefined,
  };
}
