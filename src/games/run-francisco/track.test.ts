import { describe, expect, test } from "bun:test";
import { RUN_SPEED } from "./physics";
import { levels } from "./levels";
import { buildTrack, SAFE_START } from "./track";

/** Start positions of every hazard (obstacle or gap), in order along the track. */
function hazards(track: ReturnType<typeof buildTrack>) {
  return [...track.obstacles.map((o) => ({ x: o.x, w: o.spec.w })), ...track.gaps].sort((a, b) => a.x - b.x);
}

describe("buildTrack", () => {
  test("the same seed always builds the same track", () => {
    expect(buildTrack(levels[2], 7)).toEqual(buildTrack(levels[2], 7));
  });

  test("another seed builds another track", () => {
    expect(buildTrack(levels[2], 7).obstacles).not.toEqual(buildTrack(levels[2], 8).obstacles);
  });

  for (const level of levels) {
    test(`${level.id}: two hazards are never closer than the level's fastest reaction time at full speed`, () => {
      const list = hazards(buildTrack(level, 1));
      for (let i = 1; i < list.length; i++) {
        const space = list[i].x - (list[i - 1].x + list[i - 1].w);
        expect(space).toBeGreaterThanOrEqual(level.reaction.end * RUN_SPEED - 0.001);
      }
    });

    test(`${level.id}: the first metres and the finish stay clear`, () => {
      const list = hazards(buildTrack(level, 1));
      expect(list[0].x).toBeGreaterThanOrEqual(SAFE_START);
      const last = list[list.length - 1];
      expect(last.x + last.w).toBeLessThanOrEqual(level.length - 10);
    });

    test(`${level.id}: coffees never float over a gap`, () => {
      const track = buildTrack(level, 1);
      expect(track.coffees).toHaveLength(level.coffees);
      for (const cup of track.coffees) {
        expect(track.gaps.some((g) => cup.x > g.x - 0.5 && cup.x < g.x + g.w + 0.5)).toBe(false);
      }
    });
  }

  test("only the docks and the rooftops have gaps, as wide as their level allows", () => {
    for (const level of levels) {
      const { gaps } = buildTrack(level, 3);
      if (level.gapChance === 0) {
        expect(gaps).toEqual([]);
      } else {
        expect(gaps.length).toBeGreaterThan(0);
        for (const gap of gaps) {
          expect(gap.w).toBeGreaterThanOrEqual(level.gapWidth.min);
          expect(gap.w).toBeLessThanOrEqual(level.gapWidth.max);
        }
      }
    }
  });

  test("ice only covers the winter streets", () => {
    for (const level of levels) {
      expect(buildTrack(level, 3).ice.length > 0).toBe(level.id === "winter");
    }
  });

  test("each level packs hazards closer together than the one before", () => {
    const perHundredMetres = levels.map((level) => (hazards(buildTrack(level, 5)).length / level.length) * 100);
    for (let i = 1; i < perHundredMetres.length; i++) {
      expect(perHundredMetres[i]).toBeGreaterThan(perHundredMetres[i - 1]);
    }
  });
});
