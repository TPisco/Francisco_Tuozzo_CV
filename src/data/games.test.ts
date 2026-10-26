import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { locales } from "@/i18n";
import { dictionaries } from "@/i18n/all";
import { games, getGameCover } from "./games";

describe("the games registry", () => {
  test("ids and URL slugs are unique", () => {
    expect(new Set(games.map((g) => g.id)).size).toBe(games.length);
    expect(new Set(games.map((g) => g.slug)).size).toBe(games.length);
  });

  test("every game has both cover sizes on disk", () => {
    for (const game of games) {
      for (const size of [720, 1440]) {
        const file = join(process.cwd(), "public", "games", game.slug, `cover-${size}.webp`);
        expect(existsSync(file), file).toBe(true);
      }
      expect(getGameCover(game).srcSet).toContain("720w");
    }
  });

  test("every game has its card copy in every language", () => {
    for (const game of games) {
      for (const locale of locales) {
        const card = dictionaries[locale].games[game.id];
        expect(card.title.length, `${locale} ${game.id}`).toBeGreaterThan(0);
        expect(card.meta.length).toBeGreaterThan(0);
      }
    }
  });
});
