"use client";

import { Bubble, BubbleLabel } from "@/components/info/bubble";
import { profile } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** About: who I am, that I'm available, and the quick facts, in one card. */
export function InfoIntro({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <Bubble id="about" labelledBy="about-title" onLoad className={className}>
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-start sm:justify-between">
        {/* On phones the navbar has no room for the name, so the card opens with it instead of the tab's name. */}
        <p className="text-sm text-ink-soft sm:hidden">
          {profile.name}, {t.hero.role}
        </p>
        <p className="eyebrow hidden sm:block">{t.about.eyebrow}</p>
        <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-cream px-3.5 py-1.5 text-sm font-medium text-ink">
          <span aria-hidden className="h-2 w-2 rounded-full bg-clay" />
          {t.hero.introMuted}
        </p>
      </div>

      <h1
        id="about-title"
        className="mt-5 max-w-3xl pb-1 text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] [text-wrap:balance]"
      >
        {t.about.headingLead} <span className="accent-serif">{t.about.headingAccent}</span>
      </h1>

      <div className="mt-8 grid gap-7 border-t border-ink/10 pt-8 md:grid-cols-3 md:gap-10">
        {t.about.paragraphs.map((paragraph, i) => (
          <div key={paragraph.slice(0, 32)}>
            <BubbleLabel>{t.about.paragraphLabels[i]}</BubbleLabel>
            <p className={`mt-2 leading-relaxed ${i === 0 ? "text-ink" : "text-ink-soft"}`}>{paragraph}</p>
          </div>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-8 md:grid-cols-4">
        {t.about.facts.map((fact) => (
          <div key={fact.label}>
            <dt>
              <BubbleLabel>{fact.label}</BubbleLabel>
            </dt>
            <dd className="mt-1.5 font-medium leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Bubble>
  );
}
