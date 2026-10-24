"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { educationOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" className="wrap section">
      <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} lead={t.education.lead} />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {educationOrder.map((id, i) => {
          const edu = t.education.items[id];
          return (
            <Reveal key={id} delay={i * 0.06}>
              <article className="h-full rounded-surface border border-ink/10 bg-shell p-8 shadow-soft sm:p-10">
                <p className="text-sm font-medium text-clay">{edu.period}</p>
                <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight">{edu.program}</h3>
                <p className="mt-1 text-sm text-ink-soft">{edu.school}</p>
                <p className="mt-6 leading-relaxed text-ink-soft">{edu.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {edu.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
