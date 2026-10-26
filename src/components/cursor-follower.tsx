"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * A ring that trails the mouse a little behind, like the reference site.
 * Purely decorative: the system cursor stays visible and works as usual, the
 * ring ignores the pointer, and it only exists with a real mouse or trackpad
 * and without the "reduce motion" setting. It grows softly over anything
 * clickable and dips when you press. `mix-blend-mode: difference` keeps it
 * visible on both the cream page and the dark panels.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // A soft, critically damped spring: it lags behind, then settles without bouncing.
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let shown = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      // Appearing (first move, or back into the window): start at the pointer instead of flying in.
      if (!shown) {
        springX.jump(e.clientX);
        springY.jump(e.clientY);
        shown = true;
        setVisible(true);
      }
    };
    const over = (e: PointerEvent) => setHovering(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      shown = false;
      setVisible(false);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y, springX, springY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <div
        className={`h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white transition-[transform,opacity,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          pressed ? "scale-90" : hovering ? "scale-[1.6] bg-white/10" : "scale-100"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </motion.div>
  );
}
