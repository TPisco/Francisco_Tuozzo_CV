"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/i18n/provider";
import { dictionaries, locales } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.switcher.label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 text-ink-soft" />
        {dictionaries[locale].localeShort}
      </button>

      {open ? (
        <ul
          role="menu"
          aria-label={t.switcher.label}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-ink/10 bg-shell p-1.5 shadow-lift"
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
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-cream font-semibold text-ink"
                      : "text-ink-soft hover:bg-cream/70"
                  }`}
                >
                  {dictionaries[code].localeName}
                  {active ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-3 w-3 text-clay"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
