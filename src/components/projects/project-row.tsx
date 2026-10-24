"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { ProjectThumb } from "@/components/projects/project-thumb";
import type { ProjectMeta } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";
import { getProjectPath } from "@/lib/projects";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type ProjectRowProps = {
  meta: ProjectMeta;
  item: Dictionary["projects"]["items"][ProjectMeta["id"]];
  index: number;
  onPointerEnter: (index: number, event: PointerEvent<HTMLLIElement>) => void;
};

export function ProjectRow({ meta, item, index, onPointerEnter }: ProjectRowProps) {
  const taglineId = `project-${meta.id}-tagline`;
  const stack = meta.tech.slice(0, 2).join(" · ");

  return (
    <li
      className="project-row"
      onPointerEnter={(event) => onPointerEnter(index, event)}
    >
      <Reveal delay={Math.min(index, 6) * 0.05}>
        {/*
          The name is the row's link; its ::after stretches over the whole row,
          so the entire row is clickable while other links (like an award badge)
          can still sit inside it without nesting anchors.
        */}
        <div className="group relative flex items-center gap-5 py-6 sm:gap-6 md:gap-8 md:py-8">
          {/* Static poster for touch screens and reduced motion, where there is no hover card. */}
          <ProjectThumb
            meta={meta}
            sizes="(min-width: 768px) 128px, 112px"
            className="w-28 flex-none rounded-xl md:w-32 hover-fine:motion-safe:hidden"
          />

          <div className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-baseline md:gap-8">
            <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
              <Link
                href={getProjectPath(meta.id)}
                aria-describedby={taglineId}
                className="row-link no-underline transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover-fine:group-hover:text-clay"
              >
                {meta.name}
              </Link>
            </h3>
            <p
              id={taglineId}
              className="mt-1.5 text-sm leading-snug text-ink-soft md:mt-0 md:text-base"
            >
              {item.tagline}
            </p>
            <p className="mt-2 text-xs font-medium text-ink-faint md:hidden">{stack}</p>
          </div>

          <div className="flex flex-none items-center justify-end gap-4 md:w-48">
            <span className="hidden text-xs font-medium text-ink-faint md:block">{stack}</span>
            <Icon
              icon={faArrowRight}
              className="h-4 w-4 -rotate-45 text-ink-faint transition-[transform,color] duration-200 hover-fine:group-hover:rotate-0 hover-fine:group-hover:text-clay"
            />
          </div>
        </div>
      </Reveal>
    </li>
  );
}
