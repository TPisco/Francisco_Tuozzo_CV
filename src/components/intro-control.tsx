"use client";

import { useEffect } from "react";

/** Length of the intro's CSS timeline (draw, fill, lift), in ms. Keep in step with .intro in globals.css. */
const INTRO_MS = 2700;
const LEAVE_MS = 500;

/**
 * Lets the visitor skip the intro with any key, click, scroll or touch (it
 * then lifts right away), and marks it done when it ends, so pages visited
 * afterwards animate in normally.
 */
export function IntroControl() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    let leaveTimer = 0;
    const done = () => {
      root.dataset.intro = "done";
      remove();
    };
    const skip = () => {
      if (root.dataset.intro !== "play") return;
      root.dataset.intro = "leave";
      window.clearTimeout(endTimer);
      leaveTimer = window.setTimeout(done, LEAVE_MS);
      remove();
    };
    const events = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    const remove = () => events.forEach((e) => window.removeEventListener(e, skip));
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    const endTimer = window.setTimeout(done, INTRO_MS);

    return () => {
      remove();
      window.clearTimeout(endTimer);
      window.clearTimeout(leaveTimer);
    };
  }, []);

  return null;
}
