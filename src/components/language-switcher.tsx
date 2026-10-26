"use client";

import { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/i18n/provider";
import { dictionaries, locales } from "@/i18n";
import { useDismiss } from "@/lib/use-dismiss";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close, buttonRef);
  const short = dictionaries[locale].localeShort;

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        // The visible code is part of the name, so voice control users can say "EN".
        aria-label={`${t.switcher.label}: ${short}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03] min-[400px]:px-3.5"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 text-ink-soft" />
        {/* On the narrowest phones the globe alone keeps the navbar on one line. */}
        <span className="max-[399px]:sr-only">{short}</span>
      </button>

      {open ? (
        <ul
          role="menu"
          aria-label={t.switcher.label}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-frame border border-ink/10 bg-shell p-1.5 shadow-lift"
        >
          {locales.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors sm:min-h-9 ${
                    active ? "bg-cream font-semibold text-ink" : "text-ink-soft hover:bg-cream/70"
                  }`}
                >
                  {dictionaries[code].localeName}
                  {active ? <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-clay-deep" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
