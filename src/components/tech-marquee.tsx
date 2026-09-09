"use client";

import { useEffect, useRef, useState } from "react";
import { techLogos } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

/** Idle drift, in pixels per second. */
const AUTO_SPEED = 60;
/** How much of a flick's speed survives each 1/60 s. */
const DECAY = 0.94;
/** Ceiling on the speed a flick can launch at, in pixels per second. */
const MAX_FLING = 2600;

function LogoList({ clone }: { clone: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={clone || undefined}>
      {techLogos.map((logo) => (
        <li
          key={logo.file}
          className="flex w-28 shrink-0 flex-col items-center gap-3 px-2 sm:w-36 sm:px-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${logo.file}.svg`}
            alt=""
            width={40}
            height={40}
            decoding="async"
            draggable={false}
            className="h-9 w-9 select-none object-contain sm:h-11 sm:w-11"
          />
          <span className="select-none text-center text-xs font-medium text-ink-faint">
            {logo.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  const { t } = useI18n();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Wrapping works by jumping back exactly one copy-width, which is invisible
  // only while the copies after that jump still fill the viewport. Wide screens
  // therefore need more than two copies; the effect below measures and adds them.
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let copyWidth = track.scrollWidth / copies;
    let offset = 0;
    let velocity = AUTO_SPEED;
    let dragging = false;
    let paused = false;
    let onScreen = true;
    let pointerId: number | null = null;
    let lastX = 0;
    let lastMoveAt = 0;
    let lastFrameAt = 0;
    let frame = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const wrap = (value: number) =>
      copyWidth > 0 ? ((value % copyWidth) + copyWidth) % copyWidth : 0;

    const measure = () => {
      copyWidth = track.scrollWidth / copies;
      if (copyWidth > 0) {
        const needed = Math.max(
          2,
          Math.ceil(viewport.clientWidth / copyWidth) + 1,
        );
        if (needed !== copies) {
          setCopies(needed);
          return;
        }
      }
      offset = wrap(offset);
      viewport.scrollLeft = offset;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(viewport);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const elapsed = lastFrameAt ? Math.min((now - lastFrameAt) / 1000, 0.05) : 0;
      lastFrameAt = now;

      // Wheel, trackpad, touch and arrow keys move the element directly.
      // Adopt whatever they did instead of fighting it on the next frame.
      if (Math.abs(viewport.scrollLeft - offset) > 1) {
        offset = viewport.scrollLeft;
        velocity = 0;
      }

      if (dragging || !onScreen || document.hidden) return;

      const target = paused || reduceMotion.matches ? 0 : AUTO_SPEED;
      velocity = target + (velocity - target) * DECAY ** (elapsed * 60);
      if (Math.abs(velocity - target) < 0.5) velocity = target;
      if (velocity === 0) return;

      offset = wrap(offset + velocity * elapsed);
      viewport.scrollLeft = offset;
    };

    const onPointerDown = (event: PointerEvent) => {
      // Touch and pen already pan this element natively; only mice need help.
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      pointerId = event.pointerId;
      lastX = event.clientX;
      lastMoveAt = event.timeStamp;
      velocity = 0;
      try {
        viewport.setPointerCapture(event.pointerId);
      } catch {
        // Pointer already released; dragging still works without capture.
      }
      viewport.dataset.dragging = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const dx = event.clientX - lastX;
      const dt = (event.timeStamp - lastMoveAt) / 1000;
      lastX = event.clientX;
      lastMoveAt = event.timeStamp;

      offset = wrap(offset - dx);
      viewport.scrollLeft = offset;

      if (dt > 0) {
        const speed = -dx / dt;
        velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, speed));
      }
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      delete viewport.dataset.dragging;
      try {
        if (viewport.hasPointerCapture(event.pointerId)) {
          viewport.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Capture was never taken; nothing to release.
      }
      // A pointer that has been still for a moment is a placement, not a flick.
      if (event.timeStamp - lastMoveAt > 120) velocity = 0;
      paused = viewport.matches(":hover");
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      if (!dragging) paused = false;
    };
    const onFocusIn = () => {
      paused = true;
    };
    const onFocusOut = () => {
      paused = viewport.matches(":hover");
    };
    const onDragStart = (event: Event) => event.preventDefault();

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("focusin", onFocusIn);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("dragstart", onDragStart);

    measure();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("dragstart", onDragStart);
    };
  }, [copies]);

  return (
    <div className="border-y border-ink/[0.06] bg-gradient-to-b from-cream via-cream-deep to-cream-deep">
      <div
        ref={viewportRef}
        className="marquee py-5"
        role="region"
        aria-label={t.skills.marqueeLabel}
        tabIndex={0}
      >
        <div ref={trackRef} className="marquee-track">
          {Array.from({ length: copies }, (_, i) => (
            <LogoList key={i} clone={i > 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
