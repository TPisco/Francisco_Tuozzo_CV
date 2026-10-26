import { describe, expect, test } from "bun:test";
import { RUN_SPEED } from "./physics";
import { levels } from "./levels";
import { buildTrack, jumpReach, MAX_STEP_UP, SAFE_START, type Track } from "./track";

const overlapsBlock = (track: Track, x0: number, x1: number) => track.platforms.some((p) => x1 > p.x - 0.5 && x0 < p.x + p.w + 0.5);

/** Hazards on the open ground (climbing sections have their own, tighter rhythm, checked below). */
function groundHazards(track: Track) {
  return [
    ...track.obstacles.filter((o) => !o.y && !overlapsBlock(track, o.x, o.x + o.spec.w)).map((o) => ({ x: o.x, w: o.spec.w })),
    ...track.gaps.filter((g) => !overlapsBlock(track, g.x, g.x + g.w)),
  ].sort((a, b) => a.x - b.x);
}

/** Every place you have to get past: obstacles, gaps and blocks. */
const allHazards = (track: Track) => track.obstacles.length + track.gaps.length + track.platforms.length;

describe("buildTrack", () => {
  test("the same seed always builds the same track", () => {
    expect(buildTrack(levels[2], 7)).toEqual(buildTrack(levels[2], 7));
  });

  test("another seed builds another track", () => {
    expect(buildTrack(levels[2], 7).obstacles).not.toEqual(buildTrack(levels[2], 8).obstacles);
  });

  for (const level of levels) {
    test(`${level.id}: open-ground hazards are never closer than the level's fastest reaction time at full speed`, () => {
      const list = groundHazards(buildTrack(level, 1));
      for (let i = 1; i < list.length; i++) {
        const space = list[i].x - (list[i - 1].x + list[i - 1].w);
        expect(space).toBeGreaterThanOrEqual(level.reaction.end * RUN_SPEED - 0.001);
      }
    });

    test(`${level.id}: the first metres and the finish stay clear`, () => {
      const track = buildTrack(level, 1);
      const starts = [...track.obstacles, ...track.gaps, ...track.platforms].map((h) => h.x);
      const ends = [
        ...track.obstacles.map((o) => o.x + o.spec.w),
        ...track.gaps.map((g) => g.x + g.w),
        ...track.platforms.map((p) => p.x + p.w),
      ];
      expect(Math.min(...starts)).toBeGreaterThanOrEqual(SAFE_START);
      expect(Math.max(...ends)).toBeLessThanOrEqual(level.length - 10);
    });

    test(`${level.id}: coffees never float over a gap or sit inside a block`, () => {
      const track = buildTrack(level, 1);
      expect(track.coffees).toHaveLength(level.coffees);
      for (const cup of track.coffees) {
        const block = track.platforms.find((p) => cup.x >= p.x && cup.x <= p.x + p.w);
        const floor = block ? block.h : 0;
        expect(cup.y).toBeGreaterThan(floor);
        if (!block) expect(track.gaps.some((g) => cup.x > g.x - 0.5 && cup.x < g.x + g.w + 0.5)).toBe(false);
      }
    });

    test(`${level.id}: every climb is within reach: steps up no taller than a jump, gaps no wider than one`, () => {
      const track = buildTrack(level, 1);
      const blocks = [...track.platforms].sort((a, b) => a.x - b.x);
      for (const block of blocks) expect(block.h).toBeLessThanOrEqual(level.climbs.maxHeight + 1e-9);
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const prev = blocks[i - 1];
        const space = prev ? block.x - (prev.x + prev.w) : Infinity;
        // Water (or a drop) between the two: you can only get here by jumping from the previous block.
        const overWater = !!prev && space > 1e-6 && track.gaps.some((g) => g.x <= prev.x + prev.w + 1e-6 && g.x + g.w >= block.x - 1e-6);
        const touching = !!prev && Math.abs(space) < 1e-6;
        const from = touching || overWater ? prev.h : 0;
        expect(block.h - from).toBeLessThanOrEqual(MAX_STEP_UP + 1e-9);
        if (overWater) expect(space).toBeLessThanOrEqual(jumpReach(prev.h, block.h) * 0.6 + 1e-9);
      }
    });
  }

  test("only the docks and the rooftops have gaps, as wide as their level allows outside climbs", () => {
    for (const level of levels) {
      const track = buildTrack(level, 3);
      const open = track.gaps.filter((g) => !overlapsBlock(track, g.x, g.x + g.w));
      if (level.gapChance === 0) {
        expect(open).toEqual([]);
      } else {
        for (const gap of open) {
          expect(gap.w).toBeGreaterThanOrEqual(level.gapWidth.min);
          expect(gap.w).toBeLessThanOrEqual(level.gapWidth.max);
        }
      }
    }
  });

  test("climbs cross water or drops only where the level says so", () => {
    for (const level of levels) {
      const track = buildTrack(level, 3);
      const crossings = track.gaps.filter((g) => overlapsBlock(track, g.x, g.x + g.w));
      if (!level.climbs.overGaps) expect(crossings).toEqual([]);
    }
  });

  test("ice only covers the winter streets", () => {
    for (const level of levels) {
      expect(buildTrack(level, 3).ice.length > 0).toBe(level.id === "winter");
    }
  });

  test("the later levels are about climbing: more blocks, higher floors", () => {
    const blocks = levels.map((level) => buildTrack(level, 5).platforms);
    const tallest = blocks.map((list) => Math.max(0, ...list.map((p) => p.h)));
    expect(blocks[4].length).toBeGreaterThan(blocks[0].length);
    expect(tallest[4]).toBeGreaterThan(2);
    expect(tallest[0]).toBeLessThanOrEqual(0.8);
  });

  test("each level packs more to get past into every 100 m than the one before", () => {
    const perHundredMetres = levels.map((level) => (allHazards(buildTrack(level, 5)) / level.length) * 100);
    for (let i = 1; i < perHundredMetres.length; i++) {
      expect(perHundredMetres[i]).toBeGreaterThan(perHundredMetres[i - 1]);
    }
  });

  test("a held jump at full speed covers several metres, and nothing above its peak", () => {
    expect(jumpReach(0, 0)).toBeGreaterThan(6);
    expect(jumpReach(2, 0)).toBeGreaterThan(jumpReach(0, 0));
    expect(jumpReach(0, 1.6)).toBe(0);
  });
});
