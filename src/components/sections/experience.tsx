"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experienceOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="wrap section">
      <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} lead={t.experience.lead} />

      <ol className="mt-14 divide-y divide-ink/10 border-t border-ink/10">
        {experienceOrder.map((id, i) => {
          const exp = t.experience.items[id];
          return (
            <li key={id}>
              <Reveal delay={Math.min(i, 4) * 0.04}>
                <div className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                  <p className="text-sm text-ink-faint md:col-span-3 md:pt-1">{exp.period}</p>
                  <div className="md:col-span-4">
                    <h3 className="text-xl font-medium tracking-tight">{exp.role}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{exp.org}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="leading-relaxed text-ink-soft">{exp.description}</p>
                    <p className="mt-3 text-sm text-ink-faint">{exp.takeaways.join(", ")}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
