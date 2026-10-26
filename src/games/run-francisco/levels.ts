/**
 * The five levels of Run, Francisco!. Everything is in metres and seconds.
 * The campus is the tutorial run: a slow chaser, room between obstacles, low
 * blocks. Every level after it is hard: the chaser starts at 8 m/s or more and
 * never falls far behind, obstacles come less than a second apart (`reaction`,
 * the seconds you get between two of them at full speed), and climbs reach
 * the third floor. Each adds its own hazard (flying balls, gaps, ice), and the
 * hackathon has the fastest chaser, the widest gaps and the tallest climbs.
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
  /**
   * The chaser's sprite and speed: it starts at `start` m/s and gains `ramp` m/s every second, up to `max`.
   * Left more than `leash` metres behind, it sprints to catch up, so it stays close and every stumble counts.
   */
  chaser: { sprite: string; start: number; ramp: number; max: number; leash: number };
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
  /** A dark scene: sprites get a light rim so they stand off the background. */
  night: boolean;
  /** Falling snow drawn over the scene. */
  weather: "snow" | null;
  /**
   * Climbing sections (solid blocks to jump onto, like Extreme Pamplona's later levels):
   * the chance a slot holds one, the tallest floor, the chance of each extra floor up,
   * whether they cross water or a drop (miss a jump and you fall), and the chance of an
   * obstacle waiting on top of a long block.
   */
  climbs: { chance: number; maxHeight: number; stairs: number; overGaps: boolean; topObstacles: number };
  /** How the blocks look: their colours, and a pattern drawn on their face. */
  blocks: { colors: string[]; top: string; pattern: "brick" | "bleachers" | "container" | "stone" | "roof" };
};

/** Bottom edge of an overhead hazard: a standing runner hits it, a sliding one passes under. */
export const OVERHEAD_CLEARANCE = 1.05;

export const levels: LevelConfig[] = [
  {
    id: "campus",
    length: 300,
    chaser: { sprite: "bug", start: 5.6, ramp: 0.04, max: 7, leash: 15 },
    reaction: { start: 1.6, end: 1.2 },
    obstacles: [
      { sprite: "backpack", kind: "low", w: 0.42, h: 0.48, weight: 3 },
      { sprite: "bench", kind: "low", w: 1.39, h: 0.44, weight: 2 },
      { sprite: "banner", kind: "overhead", w: 1.52, h: 0.31, weight: 1 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 2,
    palette: { sky: "#f3e6d3", ground: "#b9a27e", groundEdge: "#7d9b6a", gap: "#5d554b" },
    bandStart: 0.694,
    night: false,
    weather: null,
    climbs: { chance: 0.1, maxHeight: 0.7, stairs: 0, overGaps: false, topObstacles: 0 },
    blocks: { colors: ["#b5654a"], top: "#7d9b6a", pattern: "brick" },
  },
  {
    id: "tennis",
    length: 600,
    chaser: { sprite: "ballMachine", start: 8, ramp: 0.06, max: 9.3, leash: 8.2 },
    reaction: { start: 0.95, end: 0.72 },
    obstacles: [
      { sprite: "net", kind: "low", w: 1.21, h: 0.83, weight: 2 },
      { sprite: "ballBasket", kind: "low", w: 0.67, h: 0.71, weight: 3 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0,
    ballEvery: 3.5,
    coffees: 3,
    palette: { sky: "#f1e4cf", ground: "#c2603f", groundEdge: "#f6f3ee", gap: "#5d554b" },
    bandStart: 0.753,
    night: false,
    weather: null,
    climbs: { chance: 0.55, maxHeight: 2.6, stairs: 0.6, overGaps: false, topObstacles: 0.35 },
    blocks: { colors: ["#e6ddcf"], top: "#c2603f", pattern: "bleachers" },
  },
  {
    id: "port",
    length: 600,
    chaser: { sprite: "forklift", start: 8.1, ramp: 0.06, max: 9.35, leash: 8.2 },
    reaction: { start: 0.9, end: 0.68 },
    obstacles: [
      { sprite: "crate", kind: "low", w: 1.01, h: 0.78, weight: 3 },
      { sprite: "barrel", kind: "low", w: 0.62, h: 0.84, weight: 2 },
      { sprite: "pipe", kind: "overhead", w: 1.3, h: 0.42, weight: 2 },
    ],
    gapChance: 0.22,
    gapWidth: { min: 1.8, max: 2.9 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#f0d9c0", ground: "#8a7a6a", groundEdge: "#6f7f8c", gap: "#4f6f86" },
    bandStart: 0.775,
    night: false,
    weather: null,
    climbs: { chance: 0.5, maxHeight: 2.6, stairs: 0.6, overGaps: true, topObstacles: 0.35 },
    blocks: { colors: ["#c2603f", "#6f7f8c", "#e07b39", "#7d9b6a"], top: "#e6ddcf", pattern: "container" },
  },
  {
    id: "winter",
    length: 620,
    chaser: { sprite: "snowplow", start: 8.2, ramp: 0.06, max: 9.35, leash: 8.2 },
    reaction: { start: 0.9, end: 0.68 },
    obstacles: [
      { sprite: "snowbank", kind: "low", w: 1.21, h: 0.6, weight: 3 },
      { sprite: "cone", kind: "low", w: 0.5, h: 0.65, weight: 2 },
      { sprite: "sign", kind: "overhead", w: 1.33, h: 0.45, weight: 2 },
    ],
    gapChance: 0,
    gapWidth: { min: 0, max: 0 },
    iceChance: 0.28,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#e4e2e3", ground: "#f6f3ee", groundEdge: "#c9d3db", gap: "#9fb3c2" },
    bandStart: 0.754,
    night: false,
    weather: "snow",
    climbs: { chance: 0.6, maxHeight: 2.6, stairs: 0.65, overGaps: false, topObstacles: 0.35 },
    blocks: { colors: ["#b9b1a6"], top: "#f6f3ee", pattern: "stone" },
  },
  {
    id: "hackathon",
    length: 650,
    chaser: { sprite: "deadlineClock", start: 8.4, ramp: 0.07, max: 9.4, leash: 7.8 },
    reaction: { start: 0.9, end: 0.68 },
    obstacles: [
      { sprite: "chair", kind: "low", w: 0.64, h: 0.87, weight: 2 },
      { sprite: "cables", kind: "low", w: 0.7, h: 0.29, weight: 3 },
      { sprite: "lamp", kind: "overhead", w: 0.99, h: 0.52, weight: 2 },
    ],
    gapChance: 0.26,
    gapWidth: { min: 1.9, max: 3 },
    iceChance: 0,
    ballEvery: 0,
    coffees: 3,
    palette: { sky: "#2b3346", ground: "#3a4152", groundEdge: "#d98a6a", gap: "#151a26" },
    bandStart: 0.769,
    night: true,
    weather: null,
    climbs: { chance: 0.55, maxHeight: 2.9, stairs: 0.7, overGaps: true, topObstacles: 0.45 },
    blocks: { colors: ["#3a4152", "#454d61"], top: "#d98a6a", pattern: "roof" },
  },
];
