import { describe, expect, test } from "bun:test";
import { levels } from "./levels";
import { floorAt, startRun, step, STEP_UP, type Input, type Outcome, type RunState } from "./simulation";
import { buildTrack } from "./track";

const DT = 1 / 120;

/**
 * A bot that plays a level with good timing, missing on purpose every
 * `missEvery`-th obstacle (0 = never). It stands in for players of different
 * skill, so the difficulty curve is tested, not just hoped for. It climbs the
 * way a player would: jump at a block's face, jump off an edge when there's
 * nothing below, and hold the jump on the way up for height.
 */
function decide(state: RunState, missEvery: number): Input {
  const p = state.player;
  const input: Input = { run: true, brake: false, jump: false, slide: false };
  const takeoff = Math.max(1.2, p.vx * 0.24) + 0.25;

  const next = state.track.obstacles
    .map((o, i) => ({ ...o, i }))
    .find((o) => o.x + o.spec.w > p.x - 0.3 && !state.obstaclesHit[o.i] && Math.abs((o.y ?? 0) - p.y) < 0.3);
  if (next && !(missEvery > 0 && next.i % missEvery === missEvery - 1)) {
    const d = next.x - p.x;
    if (next.spec.kind === "low" && (d < takeoff || !p.onGround) && d > -next.spec.w - 0.3) input.jump = true;
    if (next.spec.kind === "overhead" && d < 1.4 && d > -next.spec.w - 0.3) input.slide = true;
  }

  // A block face ahead, taller than a step: jump early enough to clear its top.
  // A sloppy player misses some of these too: runs into the face, then climbs from a standstill.
  const wallIndex = state.track.platforms.findIndex((b) => b.x > p.x - 0.3 && b.h > p.y + STEP_UP);
  const wall = wallIndex >= 0 ? state.track.platforms[wallIndex] : undefined;
  const fumble = missEvery > 0 && wallIndex % missEvery === missEvery - 1 && p.vx > 3;
  if (wall && !fumble && wall.x - p.x < takeoff + (wall.h - p.y) * 0.9) input.jump = true;

  // Nothing to land on just ahead: jump off the edge.
  if (p.onGround && floorAt(state.track, p.x + 0.9, p.y) === -Infinity) input.jump = true;

  // On the way up, keep holding for height whenever there's something to clear.
  if (!p.onGround && p.vy > 0 && (wall || floorAt(state.track, p.x + 2, p.y) === -Infinity)) input.jump = true;

  if (state.balls.some((b) => p.x - b.x < 2.5 && p.x - b.x > -0.5)) input.slide = true;
  // A jump needs a fresh press: still holding from the last one, let go for a frame first.
  if (input.jump && p.onGround && state.held.jump) input.jump = false;
  return input;
}

function play(index: number, missEvery: number): Outcome {
  const state = startRun(buildTrack(levels[index], index + 1));
  while (state.outcome === "running" && state.time < 200) step(state, decide(state, missEvery), DT);
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
    expect(play(levels.length - 1, 8)).not.toBe("finished");
  });

  test("forgiveness only shrinks: once sloppy play fails a level, it fails every later one", () => {
    const sloppy = levels.map((_, i) => play(i, 4));
    const firstFail = sloppy.findIndex((o) => o !== "finished");
    expect(firstFail).toBeGreaterThan(0);
    expect(sloppy.slice(firstFail).every((o) => o !== "finished")).toBe(true);
  });
});
