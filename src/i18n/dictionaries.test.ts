import { describe, expect, test } from "bun:test";
import { loadDictionary, localeLabels, locales } from "@/i18n";
import { dictionaries } from "./all";
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

  test("each language loads on demand, whole", async () => {
    for (const locale of locales) {
      expect(await loadDictionary(locale)).toEqual(dictionaries[locale]);
    }
  });

  test("the language menu's labels match each dictionary", () => {
    for (const locale of locales) {
      expect(localeLabels[locale]).toEqual({ name: dictionaries[locale].localeName, short: dictionaries[locale].localeShort });
    }
  });
});
