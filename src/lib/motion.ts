/**
 * The little bits of motion maths the site needs, kept here instead of in an
 * animation library: the project cards' scroll scale and the cursor ring's spring.
 */

/** Smallest card scale, when its top edge is just entering at the bottom of the screen. */
export const CARD_MIN_SCALE = 0.92;

/**
 * A project card's scale for where its top edge is (`top`, px from the top of
 * the viewport): smallest as it enters at the bottom, full size once its top is
 * 35% down the screen.
 */
export function cardScale(top: number, viewportHeight: number): number {
  const progress = (viewportHeight - top) / (viewportHeight * 0.65);
  return CARD_MIN_SCALE + (1 - CARD_MIN_SCALE) * Math.min(1, Math.max(0, progress));
}

export type Spring = { value: number; velocity: number };

/**
 * One step of a soft spring toward `target` (stiffness 260, damping 30, mass
 * 0.6: slightly overdamped, so it trails behind and settles without bouncing).
 */
export function springStep(spring: Spring, target: number, dt: number): void {
  const accel = (260 * (target - spring.value) - 30 * spring.velocity) / 0.6;
  spring.velocity += accel * dt;
  spring.value += spring.velocity * dt;
}
