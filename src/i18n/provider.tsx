"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Dictionary, Locale } from "./types";
import { defaultLocale, englishDictionary, isLocale, loadDictionary } from "./index";

const STORAGE_KEY = "portfolio-locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * The site's language. Pages render in English; a French or Spanish visitor's
 * dictionary is fetched on its own (see loadDictionary) and the switch happens
 * once it has arrived, so the language and the text never disagree.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<{ locale: Locale; t: Dictionary }>({ locale: defaultLocale, t: englishDictionary });
  const latest = useRef(0);

  const switchTo = useCallback((next: Locale) => {
    const request = ++latest.current;
    loadDictionary(next).then((t) => {
      // Two quick picks: only the last one counts.
      if (request === latest.current) setCurrent({ locale: next, t });
    });
  }, []);

  // Restore a saved preference, otherwise fall back to the browser language.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked (all cookies off, sandboxed iframe): use the browser language */
    }
    if (isLocale(stored)) {
      if (stored !== defaultLocale) switchTo(stored);
      return;
    }
    const browser = window.navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(browser) && browser !== defaultLocale) switchTo(browser);
  }, [switchTo]);

  // Keep the document language in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = current.locale;
  }, [current.locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      switchTo(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore storage failures (private mode, etc.) */
      }
    },
    [switchTo],
  );

  const value = useMemo<I18nContextValue>(() => ({ locale: current.locale, setLocale, t: current.t }), [current, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
