import { describe, expect, test } from "bun:test";
import { levels } from "./levels";
import { startRun, step, type Input, type Outcome } from "./simulation";
import { buildTrack } from "./track";

const DT = 1 / 120;

/**
 * A bot that plays a level with good timing, missing on purpose every
 * `missEvery`-th obstacle (0 = never). It stands in for players of different
 * skill, so the difficulty curve is tested, not just hoped for.
 */
function play(index: number, missEvery: number): Outcome {
  const state = startRun(buildTrack(levels[index], index + 1));
  while (state.outcome === "running" && state.time < 200) {
    const p = state.player;
    const input: Input = { run: true, brake: false, jump: false, slide: false };
    const next = state.track.obstacles
      .map((o, i) => ({ ...o, i }))
      .find((o) => o.x + o.spec.w > p.x - 0.3 && !state.obstaclesHit[o.i]);
    if (next && !(missEvery > 0 && next.i % missEvery === missEvery - 1)) {
      const d = next.x - p.x;
      const takeoff = Math.max(1.2, p.vx * 0.24) + 0.25;
      if (next.spec.kind === "low" && (d < takeoff || !p.onGround) && d > -next.spec.w - 0.3) input.jump = true;
      if (next.spec.kind === "overhead" && d < 1.4 && d > -next.spec.w - 0.3) input.slide = true;
    }
    const gap = state.track.gaps.find((g) => g.x + g.w > p.x);
    if (gap && gap.x - p.x < 1 && gap.x - p.x > -gap.w) input.jump = true;
    if (state.balls.some((b) => p.x - b.x < 2.5 && p.x - b.x > -0.5)) input.slide = true;
    step(state, input, DT);
  }
  return state.outcome;
}

describe("difficulty", () => {
  test("a careful player can finish every level", () => {
    expect(levels.map((_, i) => play(i, 0))).toEqual(levels.map(() => "finished"));
  });

  test("the first level forgives a lot: missing one obstacle in four still finishes", () => {
    expect(play(0, 4)).toBe("finished");
  });

  test("the last level doesn't: missing one obstacle in eight gets you caught", () => {
    expect(play(levels.length - 1, 8)).toBe("caught");
  });

  test("forgiveness only shrinks: once sloppy play gets caught on a level, it does on every later one", () => {
    const sloppy = levels.map((_, i) => play(i, 4));
    const firstCaught = sloppy.indexOf("caught");
    expect(firstCaught).toBeGreaterThan(0);
    expect(sloppy.slice(firstCaught).every((o) => o === "caught")).toBe(true);
  });
});
