import type { Metadata } from "next";
import { GameCard } from "@/components/play/game-card";
import { PlayIntro } from "@/components/play/play-intro";
import { games } from "@/data/games";
import { en } from "@/i18n/en";

export const metadata: Metadata = {
  title: "Play",
  description: en.play.lead,
};

/** Play: one card per game, newest first. Each card's button opens the game full screen. */
export default function PlayPage() {
  return (
    <div className="wrap pb-8 pt-28 sm:pt-32">
      <PlayIntro />
      <ul className="mt-10 space-y-4 sm:mt-14">
        {games.map((game, i) => (
          <li key={game.id}>
            <GameCard game={game} priority={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
