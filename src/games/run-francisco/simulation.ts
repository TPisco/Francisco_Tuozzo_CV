import { OVERHEAD_CLEARANCE } from "./levels";
import {
  ACCELERATION,
  BALL_HEIGHT,
  BALL_RADIUS,
  BALL_SPEED,
  BOOST_SPEED,
  BOOST_TIME,
  BRAKING,
  CHASER_CATCHUP,
  CHASER_WAIT,
  CHASER_START_GAP,
  COASTING,
  COFFEE_RADIUS,
  GRAVITY,
  GRAVITY_HELD,
  ICE_GRIP,
  JUMP_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  RUN_SPEED,
  SLIDE_HEIGHT,
  SLIDE_TIME,
  STUMBLE_SPEED,
  STUMBLE_TIME,
} from "./physics";
import type { Track } from "./track";

/** What the player is holding this tick. */
export type Input = { run: boolean; brake: boolean; jump: boolean; slide: boolean };

/** Things that happened during the last tick, for sounds, effects and tests. */
export type GameEvent = "jump" | "land" | "slide" | "stumble" | "bump" | "coffee" | "fall" | "caught" | "finish";

export type Outcome = "running" | "caught" | "fell" | "finished";

export type RunState = {
  track: Track;
  /** Seconds since the start of the run. */
  time: number;
  player: {
    /** Centre of the feet, in metres from the start line. */
    x: number;
    /** Height of the feet above the ground. */
    y: number;
    vx: number;
    vy: number;
    onGround: boolean;
    /** Seconds of slide left, 0 when standing. */
    slide: number;
    /** Seconds left of a stumble. */
    stumble: number;
    /** Seconds left of a coffee boost. */
    boost: number;
    falling: boolean;
  };
  chaser: { x: number; speed: number };
  balls: { x: number }[];
  obstaclesHit: boolean[];
  coffeesTaken: boolean[];
  outcome: Outcome;
  events: GameEvent[];
  /** Input memory, so a held key acts once (jump on press, a new slide only after letting go). */
  held: { jump: boolean; slide: boolean; slideSpent: boolean };
  ballClock: number;
};

export function startRun(track: Track): RunState {
  return {
    track,
    time: 0,
    player: { x: 0, y: 0, vx: 0, vy: 0, onGround: true, slide: 0, stumble: 0, boost: 0, falling: false },
    chaser: { x: -CHASER_START_GAP, speed: track.level.chaser.start },
    balls: [],
    obstaclesHit: track.obstacles.map(() => false),
    coffeesTaken: track.coffees.map(() => false),
    outcome: "running",
    events: [],
    held: { jump: false, slide: false, slideSpent: false },
    ballClock: track.level.ballEvery,
  };
}

export function playerHeight(state: RunState): number {
  return state.player.slide > 0 ? SLIDE_HEIGHT : PLAYER_HEIGHT;
}

/** Advances the run by `dt` seconds (call it with a small fixed step, e.g. 1/120 s). */
export function step(state: RunState, input: Input, dt: number): void {
  state.events = [];
  if (state.outcome !== "running") return;
  const { player, track } = state;
  state.time += dt;

  const onIce = player.onGround && track.ice.some((p) => player.x >= p.x && player.x <= p.x + p.w);
  const grip = onIce ? ICE_GRIP : 1;

  // Running speed.
  if (!player.falling) {
    const top = player.boost > 0 ? BOOST_SPEED : RUN_SPEED;
    const cap = player.stumble > 0 ? RUN_SPEED * STUMBLE_SPEED : top;
    if (player.slide > 0) {
      player.vx = Math.max(0, player.vx - 2 * dt);
    } else if (input.run && !input.brake) {
      player.vx = Math.min(cap, player.vx + ACCELERATION * grip * dt);
    } else {
      player.vx = Math.max(0, player.vx - (input.brake ? BRAKING : COASTING) * grip * dt);
    }
    player.vx = Math.min(player.vx, Math.max(cap, player.stumble > 0 ? cap : player.vx));
  }

  // Jump on press; floating higher while held on the way up.
  const jumpPressed = input.jump && !state.held.jump;
  state.held.jump = input.jump;
  if (jumpPressed && player.onGround && !player.falling) {
    player.vy = JUMP_SPEED;
    player.onGround = false;
    player.slide = 0;
    state.events.push("jump");
  }

  // Slide: starts on the ground, lasts while held up to SLIDE_TIME, then needs a fresh press.
  if (!input.slide) state.held.slideSpent = false;
  if (input.slide && player.onGround && player.slide === 0 && !state.held.slideSpent && !player.falling) {
    player.slide = SLIDE_TIME;
    state.held.slideSpent = true;
    state.events.push("slide");
  } else if (player.slide > 0) {
    player.slide = input.slide ? Math.max(0, player.slide - dt) : 0;
  }

  // Forward, with block faces as walls: a small step is climbed, a ledge just missed
  // is still made, anything taller stops you dead (and the chaser closes in).
  let nextX = player.x + player.vx * dt;
  if (!player.falling) {
    for (const p of track.platforms) {
      const face = p.x - PLAYER_WIDTH / 2;
      if (player.x > face + 1e-6 || nextX <= face || player.y >= p.h - 1e-6) continue;
      const below = p.h - player.y;
      if ((player.onGround && below <= STEP_UP) || (!player.onGround && below <= LEDGE_GRACE)) {
        player.y = p.h;
        player.vy = 0;
        player.onGround = true;
      } else {
        if (player.vx > 0.5) state.events.push("bump");
        nextX = face;
        player.vx = 0;
      }
    }
  }
  player.x = nextX;

  // Up and down: land on the highest surface under you, drop off edges, fall into gaps.
  if (player.onGround && !player.falling && floorAt(track, player.x, player.y) < player.y - 1e-6) {
    player.onGround = false;
    player.vy = 0;
    player.slide = 0;
  }
  if (!player.onGround || player.falling) {
    const gravity = input.jump && player.vy > 0 && !player.falling ? GRAVITY_HELD : GRAVITY;
    const before = player.y;
    player.vy -= gravity * dt;
    player.y += player.vy * dt;
    if (!player.falling && player.vy <= 0) {
      const landing = floorAt(track, player.x, before);
      if (player.y <= landing) {
        player.y = landing;
        player.vy = 0;
        player.onGround = true;
        state.events.push("land");
      } else if (landing === -Infinity && player.y < 0) {
        // Below ground level with nothing underneath: into the water, or off the roof.
        player.falling = true;
        player.slide = 0;
      }
    }
  }
  if (player.falling && player.y < -1.2) {
    state.outcome = "fell";
    state.events.push("fall");
    return;
  }
  player.stumble = Math.max(0, player.stumble - dt);
  player.boost = Math.max(0, player.boost - dt);

  // Collisions with obstacles, balls and coffees.
  const left = player.x - PLAYER_WIDTH / 2;
  const right = player.x + PLAYER_WIDTH / 2;
  const bottom = player.y;
  const top = player.y + playerHeight(state);
  const overlaps = (x0: number, x1: number, y0: number, y1: number) => right > x0 && left < x1 && top > y0 && bottom < y1;

  track.obstacles.forEach((o, i) => {
    if (state.obstaclesHit[i]) return;
    const y0 = (o.y ?? 0) + (o.spec.kind === "overhead" ? OVERHEAD_CLEARANCE : 0);
    if (overlaps(o.x, o.x + o.spec.w, y0, y0 + o.spec.h)) {
      state.obstaclesHit[i] = true;
      trip(state);
    }
  });

  state.balls = state.balls.filter((ball) => {
    ball.x += BALL_SPEED * dt;
    if (overlaps(ball.x - BALL_RADIUS, ball.x + BALL_RADIUS, BALL_HEIGHT - BALL_RADIUS, BALL_HEIGHT + BALL_RADIUS)) {
      trip(state);
      return false;
    }
    return ball.x < player.x + 30;
  });

  track.coffees.forEach((cup, i) => {
    if (state.coffeesTaken[i]) return;
    if (overlaps(cup.x - COFFEE_RADIUS, cup.x + COFFEE_RADIUS, cup.y - COFFEE_RADIUS, cup.y + COFFEE_RADIUS)) {
      state.coffeesTaken[i] = true;
      player.boost = BOOST_TIME;
      player.stumble = 0;
      state.events.push("coffee");
    }
  });

  // The chaser: waits until you start (or CHASER_WAIT), speeds up over the level,
  // sprints if left far behind, ignores obstacles.
  const { chaser } = state;
  const config = track.level.chaser;
  chaser.speed = Math.min(config.max, config.start + config.ramp * state.time);
  const lead = player.x - chaser.x;
  if (player.x > 0.05 || state.time > CHASER_WAIT) {
    chaser.x += (chaser.speed + (lead > config.leash ? CHASER_CATCHUP : 0)) * dt;
  }

  if (track.level.ballEvery > 0) {
    state.ballClock -= dt;
    if (state.ballClock <= 0) {
      // Hold the shot if the ball would reach you right where you need to jump: you can't dodge both.
      const meet = player.x + player.vx * ((player.x - chaser.x) / Math.max(1, BALL_SPEED - player.vx));
      const blocked =
        track.obstacles.some((o) => o.x + o.spec.w > meet - 4 && o.x < meet + 4) ||
        track.platforms.some((p) => p.x + p.w > meet - 6 && p.x < meet + 4);
      if (blocked) {
        state.ballClock = 0.3;
      } else {
        state.ballClock = track.level.ballEvery;
        state.balls.push({ x: chaser.x });
      }
    }
  }

  if (chaser.x >= player.x - 0.4) {
    state.outcome = "caught";
    state.events.push("caught");
  } else if (player.x >= track.level.length) {
    state.outcome = "finished";
    state.events.push("finish");
  }
}

/** A step this high or lower is walked up without jumping. */
export const STEP_UP = 0.3;
/** Clipping a ledge's face this close below its top still puts you on it. */
const LEDGE_GRACE = 0.15;
/** Feet count as on a block while any part of the body is over it. */
const EDGE = PLAYER_WIDTH / 2;

/**
 * The highest surface at `x` that isn't above height `y`: a block's top, the
 * ground (0) unless there's a gap there, or -Infinity if there's nothing.
 */
export function floorAt(track: Track, x: number, y: number): number {
  const overGap = track.gaps.some((g) => x > g.x + 0.15 && x < g.x + g.w - 0.15);
  let best = !overGap && y >= -1e-6 ? 0 : -Infinity;
  for (const p of track.platforms) {
    if (x >= p.x - EDGE && x <= p.x + p.w + EDGE && p.h <= y + 1e-6 && p.h > best) best = p.h;
  }
  return best;
}

function trip(state: RunState) {
  state.player.stumble = STUMBLE_TIME;
  state.player.boost = 0;
  state.player.vx = Math.min(state.player.vx, RUN_SPEED * STUMBLE_SPEED);
  state.events.push("stumble");
}
