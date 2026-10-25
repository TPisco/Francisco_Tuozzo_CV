"use client";

import { Bubble, BubbleLabel, GroupHeading } from "@/components/info/bubble";
import { educationOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** The degree and the technical diploma, side by side. */
export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" aria-labelledby="education-title" className="wrap scroll-mt-20 pt-4">
      <GroupHeading id="education-title">{t.education.eyebrow}</GroupHeading>

      <div className="grid gap-4 lg:grid-cols-2">
        {educationOrder.map((id, i) => {
          const edu = t.education.items[id];
          return (
            <Bubble key={id} as="article" delay={i * 0.06}>
              <BubbleLabel className="text-clay-deep">
                {t.education.eyebrow} · {edu.period}
              </BubbleLabel>
              <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight">{edu.program}</h3>
              <p className="mt-1 text-sm text-ink-soft">{edu.school}</p>
              <p className="mt-5 leading-relaxed text-ink-soft">{edu.description}</p>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-ink-faint">{edu.highlights.join(", ")}</p>
            </Bubble>
          );
        })}
      </div>
    </section>
  );
}
