"use client";

import { Bubble, BubbleHeading, BubbleLabel, BubbleList, bubbleEntry } from "@/components/info/bubble";
import { experienceOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** Past jobs as rows of one card: role and place on the left, what I did on the right. */
export function Experience({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <Bubble id="experience" labelledBy="experience-title" className={className}>
      <BubbleHeading id="experience-title">{t.experience.eyebrow}</BubbleHeading>

      <BubbleList>
        {experienceOrder.map((id) => {
          const exp = t.experience.items[id];
          return (
            <article key={id} className={`grid gap-x-10 gap-y-2 md:grid-cols-12 ${bubbleEntry}`}>
              <div className="md:col-span-5">
                <BubbleLabel>{exp.period}</BubbleLabel>
                <h3 className="mt-2 text-lg font-medium leading-tight tracking-tight">{exp.role}</h3>
                <p className="mt-1 text-sm text-ink-soft">{exp.org}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft md:col-span-7 md:pt-6">{exp.description}</p>
            </article>
          );
        })}
      </BubbleList>
    </Bubble>
  );
}
