import { describe, expect, test } from "bun:test";
import { locales } from "@/i18n";
import { emptyStrings, keyPaths } from "@/i18n/key-paths";
import { copy } from "./copy";

describe("the game's own copy", () => {
  const english = keyPaths(copy.en).sort();

  for (const locale of locales) {
    test(`${locale} has every string English has and none empty`, () => {
      expect(keyPaths(copy[locale]).sort()).toEqual(english);
      expect(emptyStrings(copy[locale])).toEqual([]);
    });
  }
});
