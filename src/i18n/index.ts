import type { Dictionary, Locale } from "./types";
import { en } from "./en";

export type { Dictionary, Locale } from "./types";

export const locales: Locale[] = ["en", "fr", "es"];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr" || value === "es";
}

/** What the language menu shows for each language, without loading the dictionaries themselves. */
export const localeLabels: Record<Locale, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  fr: { name: "Français", short: "FR" },
  es: { name: "Español", short: "ES" },
};

/**
 * A language's dictionary. English is built in (pages are rendered in English
 * first); French and Spanish are separate files fetched only for visitors who
 * use them, so nobody downloads all three.
 */
export function loadDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "fr") return import("./fr").then((m) => m.fr);
  if (locale === "es") return import("./es").then((m) => m.es);
  return Promise.resolve(en);
}

export { en as englishDictionary };
