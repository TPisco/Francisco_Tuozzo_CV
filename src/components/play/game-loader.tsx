"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { GameId } from "@/data/games";
import { useI18n } from "@/i18n/provider";

function Loading() {
  const { t } = useI18n();
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-ink text-sm font-medium text-cream/70">
      {t.gameShell.loading}
    </main>
  );
}

/**
 * Each game's code, loaded only on its own page and only in the browser (it
 * draws to a canvas). A new game adds one line here.
 */
const gameComponents: Record<GameId, ComponentType> = {
  runFrancisco: dynamic(() => import("@/games/run-francisco/game"), { ssr: false, loading: Loading }),
};

export function GameLoader({ id }: { id: GameId }) {
  const Game = gameComponents[id];
  return <Game />;
}
