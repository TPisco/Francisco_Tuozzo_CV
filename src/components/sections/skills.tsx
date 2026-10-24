"use client";

import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TechMarquee } from "@/components/tech-marquee";
import { skillMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} lead={t.skills.lead} />
      </div>

      <div className="mt-14">
        <TechMarquee />
      </div>

      <div className="wrap mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillMeta.map((meta, i) => {
          const group = t.skills.groups[meta.id];
          return (
            <Reveal key={meta.id} delay={(i % 3) * 0.05}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand text-clay">
                    <Icon icon={meta.icon} className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-medium tracking-tight">{group.category}</h3>
                </div>
                <p className="mt-3 text-sm text-ink-faint">{group.note}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink-soft">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
