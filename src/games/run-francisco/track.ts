import type { LevelConfig, ObstacleSpec } from "./levels";
import { COFFEE_HEIGHT, RUN_SPEED } from "./physics";
import { between, seededRandom } from "./random";

export type TrackObstacle = { x: number; spec: ObstacleSpec };
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
};

/** Nothing in the way for the first metres, so every level starts with a few strides. */
export const SAFE_START = 20;
/** Nothing in the way right before the finish line either. */
const SAFE_END = 10;

/**
 * Lays out one level: hazards one after another, each separated by at least
 * the level's reaction time at full speed (shrinking from `reaction.start` to
 * `reaction.end` along the level), plus some random slack. Seeded, so a level
 * always plays the same for a given seed.
 */
export function buildTrack(level: LevelConfig, seed: number): Track {
  const random = seededRandom(seed);
  const end = level.length - SAFE_END;
  const track: Track = { level, obstacles: [], gaps: [], ice: [], coffees: [] };

  let x = SAFE_START;
  for (;;) {
    const progress = (x - SAFE_START) / (end - SAFE_START);
    const reaction = level.reaction.start + (level.reaction.end - level.reaction.start) * Math.min(progress, 1);
    const spacing = reaction * RUN_SPEED * (1 + random() * 0.6);

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
    track.obstacles.push({ x, spec });
    x += spec.w + spacing;
  }

  for (let i = 1; i <= level.coffees; i++) {
    track.coffees.push({ x: clearSpot(track, (level.length * i) / (level.coffees + 1)), y: COFFEE_HEIGHT });
  }
  return track;
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

/** The nearest spot to `x` that isn't over a gap, so a coffee is always reachable. */
function clearSpot(track: Track, x: number): number {
  const gap = track.gaps.find((g) => x > g.x - 0.5 && x < g.x + g.w + 0.5);
  return gap ? gap.x + gap.w + 1.5 : x;
}
