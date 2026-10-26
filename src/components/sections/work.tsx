"use client";

import { ProjectCard, type ProjectAward } from "@/components/work/project-card";
import { NextProject } from "@/components/work/next-project";
import { projectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { fill } from "@/lib/fill";

const total = projectMeta.length;
const nextItems = projectMeta.map((m) => ({ id: m.id, name: m.name }));
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The project list. Testers often took the first big card for the whole list,
 * so the list says up front how many there are and names them all (each a
 * jump link), every card carries its number, and a floating pill offers the
 * next project while you scroll.
 */
export function Work() {
  const { t } = useI18n();

  return (
    <section id="work" aria-labelledby="work-title" className="wrap scroll-mt-20 pt-14 sm:pt-20">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 id="work-title" className="text-lg font-medium tracking-tight text-ink">
          {t.projects.eyebrow}
        </h2>
        <p className="text-sm text-ink-soft">{fill(t.projects.count, { n: total })}</p>
      </div>

      <nav aria-label={t.projects.index} className="mt-4">
        <ol className="flex flex-wrap gap-2">
          {projectMeta.map((meta, i) => (
            <li key={meta.id}>
              <a
                href={`#project-${meta.id}`}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-ink/15 bg-shell/70 px-3.5 py-1.5 text-sm font-medium text-ink no-underline transition-[background-color,border-color] duration-150 hover:border-ink/40 hover:bg-shell"
              >
                <span aria-hidden className="font-mono text-xs tabular-nums text-ink-faint">
                  {pad(i + 1)}
                </span>
                {meta.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ul aria-labelledby="work-title" className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
        {projectMeta.map((meta, index) => {
          const event = meta.award ? t.events.items[meta.award] : undefined;
          const award: ProjectAward | undefined =
            meta.award && event?.badge
              ? { label: event.badge, detail: event.badgeAria ?? event.result, href: `/info#event-${meta.award}` }
              : undefined;
          return (
            <li key={meta.id}>
              <ProjectCard
                meta={meta}
                item={t.projects.items[meta.id]}
                award={award}
                priority={index === 0}
                index={index}
                total={total}
                positionLabel={fill(t.projects.position, { n: index + 1, total })}
              />
            </li>
          );
        })}
      </ul>

      <NextProject items={nextItems} label={t.projects.next} />
    </section>
  );
}
