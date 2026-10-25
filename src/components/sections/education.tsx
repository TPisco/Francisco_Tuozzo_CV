"use client";

import { Bubble, BubbleHeading, BubbleLabel, BubbleList, bubbleEntry } from "@/components/info/bubble";
import { educationOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** The degree and the technical diploma, in one card. */
export function Education({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <Bubble id="education" labelledBy="education-title" delay={0.06} className={className}>
      <BubbleHeading id="education-title">{t.education.eyebrow}</BubbleHeading>

      <BubbleList>
        {educationOrder.map((id) => {
          const edu = t.education.items[id];
          return (
            <article key={id} className={bubbleEntry}>
              <BubbleLabel>{edu.period}</BubbleLabel>
              <h3 className="mt-3 text-xl font-medium leading-tight tracking-tight">{edu.program}</h3>
              <p className="mt-1 text-sm text-ink-soft">{edu.school}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{edu.description}</p>
            </article>
          );
        })}
      </BubbleList>
    </Bubble>
  );
}
