/**
 * The games on the Play page, in the order they're listed. Adding one takes
 * three steps: an entry here, its copy under `games.<id>` in the dictionaries,
 * and its component in components/play/game-loader.tsx. The Play page, the
 * game's page and the sitemap pick it up from this list.
 */

export type GameId = "runFrancisco";

export type GameMeta = {
  id: GameId;
  /** URL segment: the game is played at /play/<slug>. */
  slug: string;
  /** Fills the cover's frame while the image loads. */
  tint: string;
};

export const games: GameMeta[] = [{ id: "runFrancisco", slug: "run-francisco", tint: "#e9d6c2" }];

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
