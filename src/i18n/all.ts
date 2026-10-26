import type { Dictionary, Locale } from "./types";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

/**
 * Every dictionary at once, for tests and build-time code only. Pages in the
 * browser load one language at a time through loadDictionary (./index).
 */
export const dictionaries: Record<Locale, Dictionary> = { en, fr, es };
