"use client";

import { Bubble, BubbleLabel } from "@/components/info/bubble";
import { useI18n } from "@/i18n/provider";

/** The Info page's first row: my story in one tall bubble, the essentials in a dark one beside it. */
export function InfoIntro() {
  const { t } = useI18n();

  return (
    <section id="about" className="wrap scroll-mt-20 pt-28 sm:pt-32">
      <div className="grid gap-4 lg:grid-cols-12">
        <Bubble className="lg:col-span-8">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h1 className="mt-4 pb-1 text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
            {t.about.headingLead} <span className="accent-serif">{t.about.headingAccent}</span>
          </h1>

          <div className="mt-8 space-y-7 border-t border-ink/10 pt-8">
            {t.about.paragraphs.map((paragraph, i) => (
              <div key={paragraph.slice(0, 32)}>
                <BubbleLabel>{t.about.paragraphLabels[i]}</BubbleLabel>
                <p
                  className={`mt-2 ${
                    i === 0 ? "text-lg leading-snug text-ink sm:text-xl" : "text-[17px] leading-relaxed text-ink-soft"
                  }`}
                >
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </Bubble>

        <Bubble dark delay={0.06} className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-12">
            <p className="text-2xl leading-snug tracking-tight [text-wrap:balance]">{t.hero.introMuted}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1 xl:grid-cols-2">
              {t.about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    <BubbleLabel className="text-cream/55">{fact.label}</BubbleLabel>
                  </dt>
                  <dd className="mt-1.5 font-medium text-cream">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Bubble>
      </div>
    </section>
  );
}
