/** How Francisco moves. Metres, seconds. */

/** Top speed while holding run. Every chaser's top speed stays below it. */
export const RUN_SPEED = 9.5;
/** Top speed for a few seconds after a coffee. */
export const BOOST_SPEED = 12;
export const BOOST_TIME = 2.5;

export const ACCELERATION = 14;
export const BRAKING = 22;
/** Slowing down when neither run nor brake is held. */
export const COASTING = 7;
/** On ice, speeding up, braking and coasting all lose most of their grip. */
export const ICE_GRIP = 0.3;

export const JUMP_SPEED = 7;
export const GRAVITY = 30;
/** Holding jump on the way up floats higher: a tap clears about 0.8 m, a hold about 1.5 m. */
export const GRAVITY_HELD = 16;

export const PLAYER_WIDTH = 0.5;
export const PLAYER_HEIGHT = 1.6;
export const SLIDE_HEIGHT = 0.75;
export const SLIDE_TIME = 0.9;

/** Hitting something: speed drops to this share of top speed, and stays capped there for STUMBLE_TIME. */
export const STUMBLE_SPEED = 0.3;
export const STUMBLE_TIME = 0.6;

/** The chaser starts this far behind. */
export const CHASER_START_GAP = 8;
/** A chaser left this far behind sprints to catch up, so dawdling never pays. */
export const CHASER_LEASH = 22;
export const CHASER_CATCHUP = 3;

/** Tennis balls fly from behind at head height: slide under them. */
export const BALL_SPEED = 15;
export const BALL_HEIGHT = 1.25;
export const BALL_RADIUS = 0.08;

export const COFFEE_HEIGHT = 1;
export const COFFEE_RADIUS = 0.35;
