"use client";

import { useI18n } from "@/i18n/provider";

/** First stop for keyboard and screen-reader users: jumps past the navbar to the page's content. */
export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#content"
      className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream no-underline shadow-lift transition-transform duration-150 ease-out focus-visible:translate-y-0"
    >
      {t.nav.skip}
    </a>
  );
}
