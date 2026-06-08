"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import type { ProjectMeta } from "@/data/portfolio";
import { getProjectPath } from "@/lib/projects";
import type { Dictionary } from "@/i18n";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type CompactProjectRowProps = {
  meta: ProjectMeta;
  t: Dictionary;
  index: number;
};

export function CompactProjectRow({ meta, t, index }: CompactProjectRowProps) {
  const item = t.projects.items[meta.id];

  return (
    <Reveal delay={index * 0.05}>
      <Link
        href={getProjectPath(meta.id)}
        className="group grid items-baseline gap-2 py-7 no-underline md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-4">
          <h4 className="font-display text-xl font-semibold transition-colors group-hover:text-clay">
            {meta.name}
          </h4>
          <p className="mt-1 text-sm text-clay">{item.tagline}</p>
        </div>
        <p className="leading-relaxed text-ink-soft md:col-span-6">
          {item.what}
        </p>
        <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <span className="text-xs font-medium text-ink-faint">
            {meta.tech.slice(0, 2).join(" · ")}
          </span>
          <Icon
            icon={faArrowRight}
            className="h-4 w-4 -rotate-45 text-ink-faint transition-all group-hover:rotate-0 group-hover:text-clay"
          />
        </div>
      </Link>
    </Reveal>
  );
}
