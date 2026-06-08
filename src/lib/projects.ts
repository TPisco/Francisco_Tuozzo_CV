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
