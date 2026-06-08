"use client";

import { SectionHeading } from "@/components/section-heading";
import { CompactProjectRow } from "@/components/projects/compact-project-row";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { projectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Projects() {
  const { t } = useI18n();
  const featured = projectMeta.filter((p) => p.featured);
  const rest = projectMeta.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          lead={t.projects.lead}
        />

        <div className="mt-16 space-y-10">
          {featured.map((meta, i) => (
            <FeaturedProjectCard
              key={meta.id}
              meta={meta}
              t={t}
              flip={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold">
            {t.projects.moreTitle}
          </h3>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {rest.map((meta, i) => (
              <CompactProjectRow key={meta.id} meta={meta} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
