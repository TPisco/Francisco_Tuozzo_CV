import type { Dictionary, Locale } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, fr, es };

export const locales: Locale[] = ["en", "fr", "es"];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr" || value === "es";
}
