/**
 * The five levels of Run, Francisco!, easiest first. Everything is in metres
 * and seconds. Difficulty grows through the chaser's speed, how close together
 * obstacles come (`reaction`, the seconds you get between two of them at full
 * speed), which kinds appear, and the level-specific hazards (flying balls,
 * gaps, ice).
 */

export type LevelId = "campus" | "tennis" | "port" | "winter" | "hackathon";

/** Something on the track: jump over a `low` one, slide under an `overhead` one. */
export type ObstacleKind = "low" | "overhead";

export type ObstacleSpec = {
  /** Sprite name (see assets/props.json). */
  sprite: string;
  kind: ObstacleKind;
  /** Collision box in metres; overhead ones hang with their bottom edge at OVERHEAD_CLEARANCE. */
  w: number;
  h: number;
  /** Relative chance of being picked. */
  weight: number;
};

export type LevelConfig = {
  id: LevelId;
  /** Distance from the start line to the finish line. */
  length: number;
  /** The chaser's sprite and speed: it starts at `start` m/s and gains `ramp` m/s every second, up to `max`. */
  chaser: { sprite: string; start: number; ramp: number; max: number };
  /** Seconds of running at full speed between two obstacles, at the start and at the end of the level. */
  reaction: { start: number; end: number };
  obstacles: ObstacleSpec[];
  /** Chance that a slot holds a gap in the ground instead of an obstacle (port docks, rooftops). */
  gapChance: number;
  gapWidth: { min: number; max: number };
  /** Chance that a slot holds an ice patch (winter). */
  iceChance: number;
  /** Seconds between tennis balls fired from behind, or 0 for none. */
  ballEvery: number;
  /** Coffee cups (speed boost) along the level. */
  coffees: number;
  /** Ground and sky colours behind the sprites, used before the background image loads. */
  palette: { sky: string; ground: string; groundEdge: string; gap: string };
  /**
   * Where the background image's flat ground band starts, as a share of its height
   * (public/games/run-francisco/backgrounds/<id>-*.webp); the renderer lines it up with the track.
   */
  bandStart: number;
};

/** Bottom edge of an overhead hazard: a standing runner hits it, a sliding one passes under. */
export const OVERHEAD_CLEARANCE = 1.05;

export const levels: LevelConfig[] = [
  {
    id: "campus",
    length: 300,
    chaser: { sprite: "bug", start: 5.6, ramp: 0.04, max: 7 },
    reaction: { start: 1.6, end: 1.2 },
    obstacles: [
      { sprite: "backpack", kind: "low", w: 0.4, h: 0.5, weight: 3 },
      { sprite: "bench", kind: "low", w: 1.4, h: 0.5, weight: 2 },
      { sprite: "banner", kind: "overhead", w: 1.6, h: 0.3, weight: 1 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 2,
    palette: { sky: "#f3e6d3", ground: "#b9a27e", groundEdge: "#7d9b6a", gap: "#5d554b" },
    bandStart: 0.694,
  },
  {
    id: "tennis",
    length: 380,
    chaser: { sprite: "ballMachine", start: 6.4, ramp: 0.05, max: 7.8 },
    reaction: { start: 1.35, end: 1.05 },
    obstacles: [
      { sprite: "net", kind: "low", w: 1.2, h: 0.9, weight: 2 },
      { sprite: "ballBasket", kind: "low", w: 0.5, h: 0.75, weight: 3 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0,
    ballEvery: 4.5,
    coffees: 2,
    palette: { sky: "#f1e4cf", ground: "#c2603f", groundEdge: "#f6f3ee", gap: "#5d554b" },
    bandStart: 0.753,
  },
  {
    id: "port",
    length: 450,
    chaser: { sprite: "forklift", start: 7, ramp: 0.05, max: 8.4 },
    reaction: { start: 1.2, end: 0.95 },
    obstacles: [
      { sprite: "crate", kind: "low", w: 0.8, h: 0.85, weight: 3 },
      { sprite: "barrel", kind: "low", w: 0.6, h: 0.95, weight: 2 },
      { sprite: "pipe", kind: "overhead", w: 1.4, h: 0.4, weight: 2 },
    ],
    gapChance: 0.22,
    gapWidth: { min: 1.6, max: 2.6 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#f0d9c0", ground: "#8a7a6a", groundEdge: "#6f7f8c", gap: "#4f6f86" },
    bandStart: 0.775,
  },
  {
    id: "winter",
    length: 520,
    chaser: { sprite: "snowplow", start: 7.5, ramp: 0.05, max: 8.9 },
    reaction: { start: 1.1, end: 0.85 },
    obstacles: [
      { sprite: "snowbank", kind: "low", w: 1.2, h: 0.65, weight: 3 },
      { sprite: "cone", kind: "low", w: 0.4, h: 0.7, weight: 2 },
      { sprite: "sign", kind: "overhead", w: 1.4, h: 0.45, weight: 2 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0.28,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#e4e2e3", ground: "#f6f3ee", groundEdge: "#c9d3db", gap: "#9fb3c2" },
    bandStart: 0.754,
  },
  {
    id: "hackathon",
    length: 600,
    chaser: { sprite: "deadlineClock", start: 8, ramp: 0.06, max: 9.3 },
    reaction: { start: 1, end: 0.75 },
    obstacles: [
      { sprite: "chair", kind: "low", w: 0.6, h: 0.95, weight: 2 },
      { sprite: "cables", kind: "low", w: 0.7, h: 0.4, weight: 3 },
      { sprite: "lamp", kind: "overhead", w: 1, h: 0.5, weight: 2 },
    ],
    gapChance: 0.18,
    gapWidth: { min: 1.8, max: 2.8 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#2b3346", ground: "#3a4152", groundEdge: "#d98a6a", gap: "#151a26" },
    bandStart: 0.769,
  },
];
