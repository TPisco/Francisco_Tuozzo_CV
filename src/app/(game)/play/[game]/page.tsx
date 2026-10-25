import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameLoader } from "@/components/play/game-loader";
import { games, getGameBySlug } from "@/data/games";
import { en } from "@/i18n/en";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((game) => ({ game: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ game: string }> }): Promise<Metadata> {
  const game = getGameBySlug((await params).game);
  if (!game) return {};
  const copy = en.games[game.id];
  return { title: copy.title, description: copy.tagline };
}

/** A game, full screen: no navbar or footer (this route sits outside app/(site)); its menu leads back. */
export default async function GamePage({ params }: { params: Promise<{ game: string }> }) {
  const game = getGameBySlug((await params).game);
  if (!game) notFound();
  return <GameLoader id={game.id} />;
}
