import { describe, expect, test } from "bun:test";
import { dictionaries, locales } from "@/i18n";
import { emptyStrings, keyPaths } from "./key-paths";

describe("translations", () => {
  const english = keyPaths(dictionaries.en).sort();

  for (const locale of locales.filter((l) => l !== "en")) {
    test(`${locale} has exactly the strings English has, list lengths included`, () => {
      expect(keyPaths(dictionaries[locale]).sort()).toEqual(english);
    });
  }

  // English included: the others are measured against it, so an empty English string would pass unnoticed.
  for (const locale of locales) {
    test(`${locale} has no empty strings`, () => {
      expect(emptyStrings(dictionaries[locale])).toEqual([]);
    });
  }
});
