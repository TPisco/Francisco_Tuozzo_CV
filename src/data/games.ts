import { runFranciscoManifest } from "@/games/run-francisco/manifest";

/**
 * The games on the Play page, in the order they're listed (a new game goes at
 * the end, in its own bubble below the others).
 *
 * A game is a folder in src/games/<slug>/ with:
 * - manifest.ts: id, slug, tint (added to the list below);
 * - copy.ts: everything it says once open, in every language;
 * - game.tsx: its default-exported component, wrapped in components/play/game-shell
 *   (menu, controls card, pausing, ways back to the site);
 * plus its card copy under games.<id> in the dictionaries, one line in
 * components/play/game-loader.tsx, and its cover in public/games/<slug>/.
 * The route, the Play page, the sitemap and games.test.ts follow this list.
 */
export const games = [runFranciscoManifest] as const;

export type GameMeta = (typeof games)[number];
export type GameId = GameMeta["id"];

export function getGamePath(game: GameMeta): string {
  return `/play/${game.slug}`;
}

export function getGameBySlug(slug: string): GameMeta | undefined {
  return games.find((g) => g.slug === slug);
}

/** The cover art, 720 and 1440 px wide: public/games/<slug>/cover-720.webp and cover-1440.webp. */
export function getGameCover(game: GameMeta): { src: string; srcSet: string } {
  const base = `/games/${game.slug}/cover`;
  return { src: `${base}-1440.webp`, srcSet: `${base}-720.webp 720w, ${base}-1440.webp 1440w` };
}
