"use client";

import { useI18n } from "@/i18n/provider";

/** The Play page's heading. */
export function PlayIntro() {
  const { t } = useI18n();

  return (
    <header className="max-w-3xl animate-rise opacity-0">
      <p className="eyebrow">{t.play.eyebrow}</p>
      <h1 className="mt-4 pb-1 text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
        {t.play.headingLead} <span className="accent-serif">{t.play.headingAccent}</span>
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{t.play.lead}</p>
    </header>
  );
}
