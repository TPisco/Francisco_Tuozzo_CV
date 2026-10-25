"use client";

import { Bubble, BubbleLabel, GroupHeading } from "@/components/info/bubble";
import { experienceOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/**
 * Bento placement for past jobs: the first two roles share a row, the rest
 * go three to a row on desktop. On tablets (two per row) an odd one out at the
 * end takes the full row, so no cell is left empty.
 */
function placement(index: number, count: number) {
  if (index < 2) return "md:col-span-3";
  const lastAndAlone = index === count - 1 && (count - 2) % 2 === 1;
  return lastAndAlone ? "md:col-span-6 lg:col-span-2" : "md:col-span-3 lg:col-span-2";
}

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap scroll-mt-20 pt-4">
      <GroupHeading id="experience-title">{t.experience.eyebrow}</GroupHeading>

      <div className="grid gap-4 md:grid-cols-6">
        {experienceOrder.map((id, i) => {
          const exp = t.experience.items[id];
          return (
            <Bubble key={id} as="article" delay={Math.min(i, 4) * 0.05} className={placement(i, experienceOrder.length)}>
              <BubbleLabel>
                {t.experience.eyebrow} · {exp.period}
              </BubbleLabel>
              <h3 className="mt-4 text-xl font-medium leading-tight tracking-tight">{exp.role}</h3>
              <p className="mt-1 text-sm text-ink-soft">{exp.org}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{exp.description}</p>
              <p className="mt-auto pt-5 text-sm text-ink-faint">{exp.takeaways.join(", ")}</p>
            </Bubble>
          );
        })}
      </div>
    </section>
  );
}
