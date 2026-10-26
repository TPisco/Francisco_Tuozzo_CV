"use client";

import { useEffect, useRef, useState } from "react";
import { springStep, type Spring } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * A ring that trails the mouse a little behind, like the reference site.
 * Purely decorative: the system cursor stays visible and works as usual, the
 * ring ignores the pointer, and it only exists with a real mouse or trackpad
 * and without the "reduce motion" setting. It grows softly over anything
 * clickable and dips when you press. `mix-blend-mode: difference` keeps it
 * visible on both the cream page and the dark panels. The trailing is a soft
 * spring (lib/motion), stepped only while the ring is still catching up.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const ring = useRef<HTMLDivElement>(null);

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
    const x: Spring = { value: -100, velocity: 0 };
    const y: Spring = { value: -100, velocity: 0 };
    const target = { x: -100, y: -100 };
    let shown = false;
    let frame = 0;
    let last = 0;

    const place = () => {
      if (ring.current) ring.current.style.transform = `translate3d(${x.value}px, ${y.value}px, 0)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      // Small fixed sub-steps keep the spring steady on any refresh rate.
      for (let left = dt; left > 0; left -= 1 / 240) {
        const h = Math.min(1 / 240, left);
        springStep(x, target.x, h);
        springStep(y, target.y, h);
      }
      place();
      const settled =
        Math.abs(target.x - x.value) < 0.1 && Math.abs(target.y - y.value) < 0.1 && Math.abs(x.velocity) + Math.abs(y.velocity) < 1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      // Appearing (first move, or back into the window): start at the pointer instead of flying in.
      if (!shown) {
        x.value = target.x;
        y.value = target.y;
        x.velocity = y.velocity = 0;
        place();
        shown = true;
        setVisible(true);
      }
      wake();
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
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference will-change-transform">
      <div
        className={`h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white transition-[transform,opacity,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          pressed ? "scale-90" : hovering ? "scale-[1.6] bg-white/10" : "scale-100"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
