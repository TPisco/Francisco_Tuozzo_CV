import type { LevelConfig, ObstacleSpec } from "./levels";
import { COFFEE_HEIGHT, GRAVITY, GRAVITY_HELD, JUMP_SPEED, RUN_SPEED } from "./physics";
import { between, seededRandom } from "./random";

/** An obstacle; `y` is the floor it stands on (0, the ground, unless it's on a block). */
export type TrackObstacle = { x: number; y?: number; spec: ObstacleSpec };
/** A solid block you can stand on (crates, a container stack, a wall, a rooftop): from the ground up to `h`. */
export type Platform = { x: number; w: number; h: number };
/** A stretch with no ground (water between docks, the drop between rooftops). */
export type Gap = { x: number; w: number };
export type IcePatch = { x: number; w: number };
export type Coffee = { x: number; y: number };

export type Track = {
  level: LevelConfig;
  obstacles: TrackObstacle[];
  gaps: Gap[];
  ice: IcePatch[];
  coffees: Coffee[];
  platforms: Platform[];
};

/** Nothing in the way for the first metres, so every level starts with a few strides. */
export const SAFE_START = 20;
/** Nothing in the way right before the finish line either. */
const SAFE_END = 10;
/** The tallest step up the generator asks for; a held jump rises about 1.5 m. */
export const MAX_STEP_UP = 1.1;
/** Gaps in a climb are at most this share of what a full-speed held jump covers. */
const REACH_MARGIN = 0.6;

/**
 * How far a held jump at full speed carries you, from a floor at height `from`
 * to one at height `to` (0 if `to` is above what the jump can reach).
 */
export function jumpReach(from: number, to: number): number {
  const rise = (JUMP_SPEED * JUMP_SPEED) / (2 * GRAVITY_HELD);
  const apex = from + rise;
  if (to > apex - 0.2) return 0;
  const up = JUMP_SPEED / GRAVITY_HELD;
  const down = Math.sqrt((2 * (apex - to)) / GRAVITY);
  return RUN_SPEED * (up + down);
}

/**
 * Lays out one level: hazards one after another, each separated by at least
 * the level's reaction time at full speed (shrinking from `reaction.start` to
 * `reaction.end` along the level), plus some random slack. Some slots hold a
 * climbing section instead (see `climb`). Seeded, so a level always plays the
 * same for a given seed.
 */
export function buildTrack(level: LevelConfig, seed: number): Track {
  const random = seededRandom(seed);
  const end = level.length - SAFE_END;
  const track: Track = { level, obstacles: [], gaps: [], ice: [], coffees: [], platforms: [] };

  let x = SAFE_START;
  for (;;) {
    const progress = (x - SAFE_START) / (end - SAFE_START);
    const reaction = level.reaction.start + (level.reaction.end - level.reaction.start) * Math.min(progress, 1);
    const spacing = reaction * RUN_SPEED * (1 + random() * 0.6);

    if (random() < level.climbs.chance) {
      const after = climb(track, x, end, random);
      if (after !== null) {
        x = after + spacing;
        continue;
      }
    }

    if (random() < level.gapChance) {
      const w = between(random, level.gapWidth.min, level.gapWidth.max);
      if (x + w > end) break;
      track.gaps.push({ x, w });
      x += w + spacing;
      continue;
    }

    const spec = pick(level.obstacles, random);
    if (x + spec.w > end) break;
    // Ice runs right up to some obstacles: you slide into them unless you jump early.
    if (random() < level.iceChance) {
      const w = between(random, 5, 9);
      const start = Math.max(SAFE_START, x - w);
      track.ice.push({ x: start, w: x - start });
    }
    track.obstacles.push({ x, y: 0, spec });
    x += spec.w + spacing;
  }

  for (let i = 1; i <= level.coffees; i++) {
    const cx = clearSpot(track, (level.length * i) / (level.coffees + 1));
    track.coffees.push({ x: cx, y: floorUnder(track, cx) + COFFEE_HEIGHT });
  }
  return track;
}

/**
 * A climbing section from `x`: one to three floors going up, each a solid block
 * no more than MAX_STEP_UP above the last. On levels that cross water or
 * drops, the floors are separate with gaps between them (within jump reach,
 * with a margin) and no ground underneath; elsewhere they're stacked like
 * stairs. A long block may carry an obstacle. Returns where the section ends,
 * or null if it doesn't fit before `end`.
 */
function climb(track: Track, x: number, end: number, random: () => number): number | null {
  const { climbs, obstacles } = track.level;
  const crossing = climbs.overGaps && random() < 0.55;
  // An obstacle waits on the top floor of some staircases, far enough in to land and react.
  const guarded = !crossing && random() < climbs.topObstacles;
  const blocks: Platform[] = [];
  let floor = 0;
  let cursor = x;
  const floors = 1 + (random() < climbs.stairs ? 1 : 0) + (random() < climbs.stairs * 0.5 ? 1 : 0);
  // Room to land and run up again: a step with another above it, or a block across water,
  // is long enough for a held jump to land on and for the next take-off.
  for (let i = 0; i < floors; i++) {
    const room = Math.min(MAX_STEP_UP, climbs.maxHeight - floor);
    if (room < 0.45) break;
    const h = floor + between(random, Math.min(0.5, room), room);
    if (crossing && i > 0) cursor += crossingGap(floor, h, random);
    const last = i === floors - 1;
    const w = crossing ? between(random, 5.5, 7) : !last ? between(random, 6, 8) : guarded ? between(random, 8.5, 10) : between(random, 3, 6);
    blocks.push({ x: cursor, w, h });
    cursor += w;
    floor = h;
  }
  // A crossing ends on a last, lower block over the water before the ground comes back.
  if (crossing) {
    const h = Math.max(0.5, floor - between(random, 0.3, 0.9));
    cursor += crossingGap(floor, h, random);
    const w = between(random, 4, 5.5);
    blocks.push({ x: cursor, w, h });
    cursor += w;
  }
  if (blocks.length === 0 || cursor > end) return null;

  track.platforms.push(...blocks);
  if (crossing) track.gaps.push({ x: blocks[0].x + blocks[0].w - 0.01, w: blocks[blocks.length - 1].x - (blocks[0].x + blocks[0].w) + 0.02 });

  const top = blocks[blocks.length - 1];
  const low = obstacles.filter((o) => o.kind === "low" && o.h <= 0.7);
  if (guarded && top.w >= 8.5 && low.length > 0) {
    const spec = pick(low, random);
    track.obstacles.push({ x: top.x + 5.6, y: top.h, spec });
  }
  return cursor;
}

/** Water between two floors of a crossing: at least a stride, at most 3.5 m and well within jump reach. */
function crossingGap(from: number, to: number, random: () => number): number {
  return between(random, 1.4, Math.max(1.4, Math.min(3.5, jumpReach(from, to) * REACH_MARGIN)));
}

function pick(specs: ObstacleSpec[], random: () => number): ObstacleSpec {
  const total = specs.reduce((sum, s) => sum + s.weight, 0);
  let roll = random() * total;
  for (const spec of specs) {
    roll -= spec.weight;
    if (roll < 0) return spec;
  }
  return specs[specs.length - 1];
}

/** The floor you'd stand on at `x`: the top of a block there, or the ground. */
function floorUnder(track: Track, x: number): number {
  return Math.max(0, ...track.platforms.filter((p) => x >= p.x && x <= p.x + p.w).map((p) => p.h));
}

/** The nearest spot to `x` that isn't over open water or a drop, so a coffee is always reachable. */
function clearSpot(track: Track, x: number): number {
  const onBlock = track.platforms.some((p) => x >= p.x && x <= p.x + p.w);
  const gap = track.gaps.find((g) => x > g.x - 0.5 && x < g.x + g.w + 0.5);
  return gap && !onBlock ? gap.x + gap.w + 1.5 : x;
}
