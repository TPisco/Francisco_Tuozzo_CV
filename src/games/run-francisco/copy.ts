import type { Labelled, Locale } from "@/i18n/types";
import type { LevelId } from "./levels";

/**
 * Everything Run, Francisco! says once it's open, in every language. It lives
 * with the game (not in the site's dictionaries) so the rest of the site never
 * loads it; the Play card's copy stays in the dictionaries under games.runFrancisco.
 */
export type RunFranciscoCopy = {
  /** The controls card: what each key or button does. */
  controls: { keyboard: Labelled[]; touch: Labelled[] };
  /** Accessible names of the on-screen buttons. */
  buttons: { left: string; right: string; jump: string; slide: string };
  levels: Record<LevelId, { name: string; chaser: string }>;
  hud: { level: string; time: string; best: string };
  /** {n} is a level number. */
  startFrom: string;
  newGame: string;
  /** {n}, {name}: the level; {chaser}: who chases you there. */
  intro: string;
  goal: string;
  go: string;
  caught: string;
  fell: string;
  retry: string;
  complete: string;
  next: string;
  victory: string;
  /** {time} is the total time. */
  totalTime: string;
  record: string;
  again: string;
};

export const copy: Record<Locale, RunFranciscoCopy> = {
  en: {
    controls: {
      keyboard: [
        { label: "→ or D", value: "Hold to run" },
        { label: "← or A", value: "Brake" },
        { label: "Space, ↑ or W", value: "Jump (hold to jump higher)" },
        { label: "↓ or S", value: "Slide under things" },
        { label: "Esc", value: "Menu" },
      ],
      touch: [
        { label: "▶", value: "Hold to run" },
        { label: "◀", value: "Brake" },
        { label: "▲", value: "Jump (hold to jump higher)" },
        { label: "▼", value: "Slide under things" },
      ],
    },
    buttons: { left: "Brake", right: "Run", jump: "Jump", slide: "Slide" },
    levels: {
      campus: { name: "Campus", chaser: "the bugs" },
      tennis: { name: "Tennis tournament", chaser: "the ball machine" },
      port: { name: "Port of Montreal", chaser: "the forklift" },
      winter: { name: "Old Quebec", chaser: "the snowplow" },
      hackathon: { name: "Hackathon night", chaser: "the deadline" },
    },
    hud: { level: "Level", time: "Time", best: "Best" },
    startFrom: "Start from level {n}",
    newGame: "New game",
    intro: "Level {n}: {name}",
    goal: "Outrun {chaser}!",
    go: "Go!",
    caught: "Caught by {chaser}!",
    fell: "Missed the jump!",
    retry: "Try again",
    complete: "Level complete!",
    next: "Next level",
    victory: "You made it!",
    totalTime: "Total time: {time}",
    record: "New record!",
    again: "Play again",
  },
  fr: {
    controls: {
      keyboard: [
        { label: "→ ou D", value: "Maintenir pour courir" },
        { label: "← ou A", value: "Freiner" },
        { label: "Espace, ↑ ou W", value: "Sauter (maintenir pour sauter plus haut)" },
        { label: "↓ ou S", value: "Glisser sous les obstacles" },
        { label: "Échap", value: "Menu" },
      ],
      touch: [
        { label: "▶", value: "Maintenir pour courir" },
        { label: "◀", value: "Freiner" },
        { label: "▲", value: "Sauter (maintenir pour sauter plus haut)" },
        { label: "▼", value: "Glisser sous les obstacles" },
      ],
    },
    buttons: { left: "Freiner", right: "Courir", jump: "Sauter", slide: "Glisser" },
    levels: {
      campus: { name: "Campus", chaser: "les bogues" },
      tennis: { name: "Tournoi de tennis", chaser: "la machine à balles" },
      port: { name: "Port de Montréal", chaser: "le chariot élévateur" },
      winter: { name: "Vieux-Québec", chaser: "la déneigeuse" },
      hackathon: { name: "Nuit de hackathon", chaser: "la date de remise" },
    },
    hud: { level: "Niveau", time: "Temps", best: "Record" },
    startFrom: "Commencer au niveau {n}",
    newGame: "Nouvelle partie",
    intro: "Niveau {n} : {name}",
    goal: "Échappez à {chaser} !",
    go: "Go !",
    caught: "Rattrapé par {chaser} !",
    fell: "Saut raté !",
    retry: "Réessayer",
    complete: "Niveau réussi !",
    next: "Niveau suivant",
    victory: "Vous avez réussi !",
    totalTime: "Temps total : {time}",
    record: "Nouveau record !",
    again: "Rejouer",
  },
  es: {
    controls: {
      keyboard: [
        { label: "→ o D", value: "Mantén para correr" },
        { label: "← o A", value: "Frenar" },
        { label: "Espacio, ↑ o W", value: "Saltar (mantén para saltar más alto)" },
        { label: "↓ o S", value: "Deslizarte por debajo" },
        { label: "Esc", value: "Menú" },
      ],
      touch: [
        { label: "▶", value: "Mantén para correr" },
        { label: "◀", value: "Frenar" },
        { label: "▲", value: "Saltar (mantén para saltar más alto)" },
        { label: "▼", value: "Deslizarte por debajo" },
      ],
    },
    buttons: { left: "Frenar", right: "Correr", jump: "Saltar", slide: "Deslizarse" },
    levels: {
      campus: { name: "Campus", chaser: "los bugs" },
      tennis: { name: "Torneo de tenis", chaser: "la máquina lanzapelotas" },
      port: { name: "Puerto de Montreal", chaser: "la carretilla elevadora" },
      winter: { name: "Viejo Quebec", chaser: "la quitanieves" },
      hackathon: { name: "Noche de hackathon", chaser: "la fecha de entrega" },
    },
    hud: { level: "Nivel", time: "Tiempo", best: "Récord" },
    startFrom: "Empezar en el nivel {n}",
    newGame: "Nueva partida",
    intro: "Nivel {n}: {name}",
    goal: "¡Escapa de {chaser}!",
    go: "¡Ya!",
    caught: "¡Te atrapó {chaser}!",
    fell: "¡Salto fallido!",
    retry: "Reintentar",
    complete: "¡Nivel superado!",
    next: "Siguiente nivel",
    victory: "¡Lo lograste!",
    totalTime: "Tiempo total: {time}",
    record: "¡Nuevo récord!",
    again: "Jugar de nuevo",
  },
};
