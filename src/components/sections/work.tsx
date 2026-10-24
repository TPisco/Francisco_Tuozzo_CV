"use client";

import { Icon } from "@/components/icon";
import { ProjectCard, type ProjectAward } from "@/components/work/project-card";
import { projectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export function Work() {
  const { t } = useI18n();

  return (
    <section id="work" aria-labelledby="work-title" className="wrap scroll-mt-20 pt-16 sm:pt-24">
      <h2 id="work-title" className="flex items-center gap-2 text-sm font-medium tracking-normal text-ink-soft">
        <Icon icon={faArrowDown} className="h-3 w-3" />
        {t.projects.eyebrow}
      </h2>

      <ul aria-labelledby="work-title" className="mt-6 space-y-8 sm:space-y-12">
        {projectMeta.map((meta, index) => {
          const event = meta.award ? t.events.items[meta.award] : undefined;
          const award: ProjectAward | undefined =
            meta.award && event?.badge
              ? { label: event.badge, detail: event.badgeAria ?? event.result, href: `/info#event-${meta.award}` }
              : undefined;
          return (
            <li key={meta.id}>
              <ProjectCard meta={meta} item={t.projects.items[meta.id]} award={award} priority={index === 0} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
