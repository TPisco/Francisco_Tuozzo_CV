import { describe, expect, test } from "bun:test";
import { levels, type LevelConfig, type ObstacleSpec } from "./levels";
import { BOOST_SPEED, RUN_SPEED } from "./physics";
import { startRun, step, type GameEvent, type Input, type RunState } from "./simulation";
import type { Track } from "./track";

const DT = 1 / 120;
const idle: Input = { run: false, brake: false, jump: false, slide: false };
const run: Input = { ...idle, run: true };

/** A slow-chaser level, so tests about moving aren't cut short by getting caught. */
const calm: LevelConfig = { ...levels[0], length: 200, chaser: { sprite: "bug", start: 1, ramp: 0, max: 1 }, ballEvery: 0 };
const backpack: ObstacleSpec = { sprite: "backpack", kind: "low", w: 0.4, h: 0.5, weight: 1 };
const banner: ObstacleSpec = { sprite: "banner", kind: "overhead", w: 1.6, h: 0.3, weight: 1 };

function track(parts: Partial<Track> = {}, level: LevelConfig = calm): Track {
  return { level, obstacles: [], gaps: [], ice: [], coffees: [], ...parts };
}

/** Runs the simulation for `seconds`, choosing the input from the state each tick; returns every event that happened. */
function play(state: RunState, seconds: number, input: (s: RunState) => Input): GameEvent[] {
  const events: GameEvent[] = [];
  for (let t = 0; t < seconds && state.outcome === "running"; t += DT) {
    step(state, input(state), DT);
    events.push(...state.events);
  }
  return events;
}

/** A run that has already been going at full speed for 2 s. */
function atFullSpeed(parts: Partial<Track> = {}, level?: LevelConfig): RunState {
  const state = startRun(track(parts, level));
  play(state, 2, () => run);
  return state;
}

describe("running", () => {
  test("holding run reaches top speed and never passes it", () => {
    const state = startRun(track());
    let fastest = 0;
    play(state, 3, (s) => ((fastest = Math.max(fastest, s.player.vx)), run));
    expect(state.player.vx).toBeCloseTo(RUN_SPEED, 5);
    expect(fastest).toBeLessThanOrEqual(RUN_SPEED);
  });

  test("letting go slows to a stop", () => {
    const state = atFullSpeed();
    play(state, 3, () => idle);
    expect(state.player.vx).toBe(0);
  });

  test("on ice, braking barely bites", () => {
    const dry = atFullSpeed();
    play(dry, 0.4, () => ({ ...idle, brake: true }));
    const iced = atFullSpeed({ ice: [{ x: 0, w: 150 }] });
    play(iced, 0.4, () => ({ ...idle, brake: true }));
    expect(iced.player.vx).toBeGreaterThan(dry.player.vx + 3);
  });
});

describe("obstacles", () => {
  test("running into a low obstacle trips you and costs most of your speed", () => {
    const state = atFullSpeed();
    state.track.obstacles.push({ x: state.player.x + 3, spec: backpack });
    expect(play(state, 0.6, () => run)).toContain("stumble");
    expect(state.player.vx).toBeLessThan(RUN_SPEED * 0.5);
  });

  test("a tapped jump clears it", () => {
    const state = atFullSpeed();
    const x = state.player.x + 4;
    state.track.obstacles.push({ x, spec: backpack });
    const events = play(state, 1, (s) => ({ ...run, jump: x - s.player.x < 2.4 && x - s.player.x > 2.2 }));
    expect(events).toContain("jump");
    expect(events).not.toContain("stumble");
    expect(state.player.x).toBeGreaterThan(x + 1);
  });

  test("standing runs into an overhead hazard, sliding passes under it", () => {
    const standing = atFullSpeed();
    standing.track.obstacles.push({ x: standing.player.x + 3, spec: banner });
    expect(play(standing, 0.8, () => run)).toContain("stumble");

    const sliding = atFullSpeed();
    sliding.track.obstacles.push({ x: sliding.player.x + 3, spec: banner });
    const events = play(sliding, 0.8, () => ({ ...run, slide: true }));
    expect(events).toContain("slide");
    expect(events).not.toContain("stumble");
  });

  test("an obstacle trips you only once", () => {
    const state = atFullSpeed();
    state.track.obstacles.push({ x: state.player.x + 2, spec: { ...backpack, w: 1.2 } });
    expect(play(state, 1.5, () => run).filter((e) => e === "stumble")).toHaveLength(1);
  });
});

describe("the ground", () => {
  test("running off the edge of a gap is a fall", () => {
    const state = atFullSpeed();
    state.track.gaps.push({ x: state.player.x + 3, w: 2.4 });
    play(state, 2, () => run);
    expect(state.outcome).toBe("fell");
  });

  test("jumping a gap at speed lands you on the other side", () => {
    const state = atFullSpeed();
    const gap = { x: state.player.x + 4, w: 2.4 };
    state.track.gaps.push(gap);
    play(state, 1.5, (s) => ({ ...run, jump: gap.x - s.player.x < 1 && gap.x - s.player.x > 0.6 }));
    expect(state.outcome).toBe("running");
    expect(state.player.x).toBeGreaterThan(gap.x + gap.w);
    expect(state.player.y).toBe(0);
  });
});

describe("coffee", () => {
  test("a coffee lifts your top speed for a while", () => {
    const state = atFullSpeed();
    state.track.coffees.push({ x: state.player.x + 2, y: 1 });
    let fastest = 0;
    const events = play(state, 1.5, (s) => ((fastest = Math.max(fastest, s.player.vx)), run));
    expect(events).toContain("coffee");
    expect(fastest).toBeGreaterThan(RUN_SPEED + 1);
    expect(fastest).toBeLessThanOrEqual(BOOST_SPEED);
    expect(state.coffeesTaken).toEqual([true]);
  });
});

describe("the chase", () => {
  test("standing still gets you caught", () => {
    const state = startRun(track({}, levels[0]));
    play(state, 10, () => idle);
    expect(state.outcome).toBe("caught");
  });

  test("running the whole level at full speed reaches the finish", () => {
    const state = startRun(track({}, levels[0]));
    play(state, 60, () => run);
    expect(state.outcome).toBe("finished");
    expect(state.time).toBeGreaterThan(levels[0].length / RUN_SPEED);
  });

  test("the ball machine's balls fly at head height: slide under them", () => {
    const tennis: LevelConfig = { ...levels[1], length: 200, ballEvery: 1 };
    expect(play(startRun(track({}, tennis)), 4, () => run)).toContain("stumble");

    const ducking = startRun(track({}, tennis));
    const events = play(ducking, 4, (s) => {
      const incoming = s.balls.some((b) => s.player.x - b.x < 2.5 && s.player.x - b.x > -0.5);
      return { ...run, slide: incoming };
    });
    expect(events).not.toContain("stumble");
  });
});
