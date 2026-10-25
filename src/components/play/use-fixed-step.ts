"use client";

import { useEffect, useRef } from "react";

type Loop = {
  /** Seconds per simulation step (e.g. 1/120). */
  step: number;
  /** Whether time moves (false while paused, between levels, on the title screen). */
  active: () => boolean;
  /** One simulation step of `step` seconds. */
  update: (step: number) => void;
  /** Draws a frame; `alpha` (0-1) is how far between the last two steps this frame falls, for smooth motion. */
  render: (alpha: number, clock: number) => void;
};

/**
 * A fixed-step game loop on requestAnimationFrame: the simulation always
 * advances in equal steps, whatever the screen's refresh rate, and frames are
 * drawn between steps (alpha) so motion stays smooth on 75-165 Hz screens.
 * While time is stopped it redraws at ~20 fps only, to spare phone batteries.
 */
export function useFixedStep(loop: Loop) {
  const latest = useRef(loop);
  useEffect(() => {
    latest.current = loop;
  });

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let clock = 0;
    let lastIdleDraw = 0;

    const tick = (now: number) => {
      const { step, active, update, render } = latest.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      if (active()) {
        acc += dt;
        while (acc >= step && active()) {
          update(step);
          acc -= step;
        }
        render(acc / step, clock);
      } else {
        acc = 0;
        if (now - lastIdleDraw > 50) {
          lastIdleDraw = now;
          render(1, clock);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}
