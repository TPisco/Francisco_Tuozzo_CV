"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experienceOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="section bg-sand">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          lead={t.experience.lead}
        />

        <div className="mt-14 space-y-px">
          {experienceOrder.map((id, i) => {
            const exp = t.experience.items[id];
            return (
              <Reveal key={id} delay={(i % 2) * 0.05}>
                <div className="grid gap-3 rounded-2xl px-2 py-7 transition-colors hover:bg-cream/70 md:grid-cols-12 md:gap-8 md:px-6">
                  <div className="md:col-span-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-clay">
                      {exp.period}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-ink-faint">{exp.org}</p>
                  </div>
                  <div className="md:col-span-8">
                    <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
                      {exp.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {exp.takeaways.map((tk) => (
                        <li
                          key={tk}
                          className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink-soft"
                        >
                          {tk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
