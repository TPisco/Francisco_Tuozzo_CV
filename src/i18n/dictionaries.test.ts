import { describe, expect, test } from "bun:test";
import { dictionaries, locales } from "@/i18n";

/** Every leaf's path, list indices included, e.g. "projects.items.vert.detail.features.3". */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, i) => keyPaths(entry, `${prefix}${i}.`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, entry]) => keyPaths(entry, `${prefix}${key}.`));
  }
  return [prefix.slice(0, -1)];
}

describe("translations", () => {
  const english = keyPaths(dictionaries.en).sort();

  for (const locale of locales.filter((l) => l !== "en")) {
    test(`${locale} has exactly the strings English has, list lengths included`, () => {
      expect(keyPaths(dictionaries[locale]).sort()).toEqual(english);
    });

    test(`${locale} has no empty strings`, () => {
      const empty = keyPaths(dictionaries[locale]).filter((path) => {
        const leaf = path.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], dictionaries[locale]);
        return typeof leaf === "string" && leaf.trim() === "";
      });
      expect(empty).toEqual([]);
    });
  }
});
