"use client";

import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { skillMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="section bg-sand">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          lead={t.skills.lead}
        />

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillMeta.map((meta, i) => {
            const group = t.skills.groups[meta.id];
            return (
              <Reveal key={meta.id} delay={(i % 3) * 0.06}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-clay">
                      <Icon icon={meta.icon} className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {group.category}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-ink-faint">{group.note}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-ink/10 bg-cream px-3.5 py-1.5 text-sm text-ink-soft"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
