"use client";

import { Bubble, BubbleLabel, GroupHeader } from "@/components/info/bubble";
import { educationOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** The degree and the technical diploma, side by side. */
export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" aria-labelledby="education-title" className="wrap scroll-mt-20 pt-20 sm:pt-28">
      <GroupHeader id="education-title" eyebrow={t.education.eyebrow} title={t.education.title} />

      <div className="grid gap-4 md:grid-cols-2">
        {educationOrder.map((id, i) => {
          const edu = t.education.items[id];
          return (
            <Bubble key={id} as="article" delay={i * 0.06}>
              <BubbleLabel className="text-clay">{edu.period}</BubbleLabel>
              <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight">{edu.program}</h3>
              <p className="mt-1 text-sm text-ink-soft">{edu.school}</p>
              <p className="mt-5 leading-relaxed text-ink-soft">{edu.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {edu.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft">
                    {highlight}
                  </li>
                ))}
              </ul>
            </Bubble>
          );
        })}
      </div>
    </section>
  );
}
