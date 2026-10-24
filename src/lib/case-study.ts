import type { Dictionary } from "@/i18n/types";

type ProjectCopy = Dictionary["projects"]["items"][keyof Dictionary["projects"]["items"]];
type DetailLabels = Dictionary["projects"]["detail"];

/** Stable anchor ids, shared by every language so links to a section keep working. */
export type CaseStudySectionId = "overview" | "why" | "features" | "role";

export type CaseStudySection = { id: CaseStudySectionId; label: string };

/**
 * The case study's table of contents, in reading order. A section with no
 * content is skipped, so the contents never points at an empty heading.
 */
export function getCaseStudySections(item: ProjectCopy, labels: DetailLabels): CaseStudySection[] {
  const candidates: [CaseStudySectionId, string, boolean][] = [
    ["overview", labels.description, item.detail.description.trim().length > 0],
    ["why", labels.why, item.why.trim().length > 0],
    ["features", labels.features, item.detail.features.length > 0],
    ["role", labels.role, item.detail.role.length > 0],
  ];
  return candidates.filter(([, , hasContent]) => hasContent).map(([id, label]) => ({ id, label }));
}
