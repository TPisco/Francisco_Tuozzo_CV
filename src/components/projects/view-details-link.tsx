import Link from "next/link";
import { Icon } from "@/components/icon";
import { getProjectPath } from "@/lib/projects";
import type { ProjectId } from "@/data/portfolio";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type ViewDetailsLinkProps = {
  projectId: ProjectId;
  label: string;
  className?: string;
  /** Distinguishes otherwise identical "View details" links for screen readers. */
  ariaLabel?: string;
};

export function ViewDetailsLink({
  projectId,
  label,
  className = "ml-auto inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-clay",
  ariaLabel,
}: ViewDetailsLinkProps) {
  return (
    <Link
      href={getProjectPath(projectId)}
      className={className}
      aria-label={ariaLabel}
    >
      {label}
      <Icon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
    </Link>
  );
}
