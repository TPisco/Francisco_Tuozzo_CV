"use client";

import { SectionHeading } from "@/components/section-heading";
import { ProjectList } from "@/components/projects/project-list";
import { useI18n } from "@/i18n/provider";

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="section bg-gradient-to-b from-cream to-sand">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          lead={t.projects.lead}
        />
        <ProjectList />
      </div>
    </section>
  );
}
