"use client";

import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { ProjectTechPills } from "@/components/projects/project-tech-pills";
import { ViewDetailsLink } from "@/components/projects/view-details-link";
import type { ProjectMeta } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";

type FeaturedProjectCardProps = {
  meta: ProjectMeta;
  t: Dictionary;
  flip: boolean;
};

export function FeaturedProjectCard({
  meta,
  t,
  flip,
}: FeaturedProjectCardProps) {
  const item = t.projects.items[meta.id];

  return (
    <Reveal>
      {/*
        The whole card is clickable, but only "View details" is an actual <a>:
        it stretches an ::after overlay across the card. Wrapping the card in a
        link instead would nest that anchor inside another one — invalid HTML —
        and would turn every paragraph and bullet into link text.
      */}
      <article className="card-soft group relative grid overflow-hidden transition-shadow duration-300 hover:shadow-lift lg:grid-cols-2">
        <div
          className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-10 sm:min-h-[340px] ${
            flip ? "lg:order-2" : ""
          }`}
          style={{ backgroundColor: meta.tint }}
        >
          <Icon
            icon={meta.icon}
            className="pointer-events-none absolute -bottom-8 -right-6 h-48 w-48 text-ink/[0.06]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            {t.projects.featured}
          </span>
          <div>
            <h3 className="font-display text-4xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-clay sm:text-5xl">
              {meta.name}
            </h3>
            <p className="mt-3 max-w-sm text-base text-ink-soft">
              {item.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-10 sm:p-12">
          <p className="text-lg leading-relaxed text-ink">{item.what}</p>

          <div>
            <p className="text-sm font-semibold text-ink">
              {t.projects.whyTitle}
            </p>
            <p className="mt-1.5 leading-relaxed text-ink-soft">{item.why}</p>
          </div>

          <ul className="space-y-2.5">
            {item.built.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-snug text-ink-soft">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-clay" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
            <ProjectTechPills tech={meta.tech} />
            <ViewDetailsLink
              projectId={meta.id}
              label={t.projects.viewDetails}
              ariaLabel={`${t.projects.viewDetails} — ${meta.name}`}
              className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-clay"
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
