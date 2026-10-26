import { describe, expect, test } from "bun:test";
import { levels, type LevelConfig, type ObstacleSpec } from "./levels";
import { BOOST_SPEED, RUN_SPEED } from "./physics";
import { startRun, step, type GameEvent, type Input, type RunState } from "./simulation";
import type { Track } from "./track";

const DT = 1 / 120;
const idle: Input = { run: false, brake: false, jump: false, slide: false };
const run: Input = { ...idle, run: true };

/** A slow-chaser level, so tests about moving aren't cut short by getting caught. */
const calm: LevelConfig = { ...levels[0], length: 200, chaser: { sprite: "bug", start: 1, ramp: 0, max: 1, leash: 1000 }, ballEvery: 0 };
const backpack: ObstacleSpec = { sprite: "backpack", kind: "low", w: 0.4, h: 0.5, weight: 1 };
const banner: ObstacleSpec = { sprite: "banner", kind: "overhead", w: 1.6, h: 0.3, weight: 1 };

function track(parts: Partial<Track> = {}, level: LevelConfig = calm): Track {
  return { level, obstacles: [], gaps: [], ice: [], coffees: [], platforms: [], ...parts };
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

describe("platforms", () => {
  /** Holds jump from takeoff until clearly on the way down, like a player going for height. */
  const jumpAt = (from: number, to: number) => (s: RunState) => ({ ...run, jump: s.player.x > from && s.player.x < to });

  test("jumping onto a block lands you on top, still running", () => {
    const state = atFullSpeed();
    const block = { x: state.player.x + 4, w: 6, h: 1 };
    state.track.platforms.push(block);
    play(state, 1, jumpAt(block.x - 2.6, block.x));
    expect(state.player.y).toBe(1);
    expect(state.player.onGround).toBe(true);
    expect(state.player.vx).toBeGreaterThan(8);
  });

  test("running into a block's face stops you dead", () => {
    const state = atFullSpeed();
    const block = { x: state.player.x + 3, w: 6, h: 1 };
    state.track.platforms.push(block);
    const events = play(state, 1, () => run);
    expect(events).toContain("bump");
    expect(state.player.x).toBeLessThan(block.x);
    expect(state.player.y).toBe(0);
  });

  test("a small step is climbed without jumping", () => {
    const state = atFullSpeed();
    const step = { x: state.player.x + 2, w: 5, h: 0.25 };
    state.track.platforms.push(step);
    play(state, 0.6, () => run);
    expect(state.player.y).toBe(0.25);
    expect(state.player.x).toBeGreaterThan(step.x + 2);
  });

  test("running off the end of a block drops you back to the ground", () => {
    const state = atFullSpeed();
    state.player.y = 1;
    state.track.platforms.push({ x: state.player.x - 1, w: 3, h: 1 });
    play(state, 1, () => run);
    expect(state.outcome).toBe("running");
    expect(state.player.y).toBe(0);
  });

  test("a held jump from a block reaches the next floor up", () => {
    const state = atFullSpeed();
    state.player.y = 1;
    const low = { x: state.player.x - 1, w: 5, h: 1 };
    const high = { x: low.x + low.w, w: 14, h: 2 };
    state.track.platforms.push(low, high);
    play(state, 1.2, jumpAt(high.x - 2.4, high.x + 0.5));
    expect(state.player.y).toBe(2);
  });

  test("a pillar over a gap holds you; stepping off it into the gap is a fall", () => {
    const state = atFullSpeed();
    const gap = { x: state.player.x + 3, w: 9 };
    const pillar = { x: gap.x + 2, w: 2, h: 0.6 };
    state.track.gaps.push(gap);
    state.track.platforms.push(pillar);
    play(state, 0.7, jumpAt(gap.x - 1, gap.x - 0.6));
    expect(state.player.y).toBe(0.6);
    play(state, 2, () => run);
    expect(state.outcome).toBe("fell");
  });

  test("an obstacle standing on a block trips you up there", () => {
    const state = atFullSpeed();
    state.player.y = 1;
    state.track.platforms.push({ x: state.player.x - 1, w: 10, h: 1 });
    state.track.obstacles.push({ x: state.player.x + 3, y: 1, spec: backpack });
    expect(play(state, 0.8, () => run)).toContain("stumble");
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
  test("the chaser waits for you to start running, up to a second and a half", () => {
    const state = startRun(track({}, levels[4]));
    const start = state.chaser.x;
    play(state, 1.2, () => idle);
    expect(state.chaser.x).toBe(start);
    play(state, 0.5, () => idle);
    expect(state.chaser.x).toBeGreaterThan(start);

    const eager = startRun(track({}, levels[4]));
    play(eager, 0.3, () => run);
    expect(eager.chaser.x).toBeGreaterThan(start);
  });

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
