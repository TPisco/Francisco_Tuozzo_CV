"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

type Item = { id: string; name: string };

/**
 * A pill at the bottom of the screen while you're in the project list: dots
 * for where you are among the projects, and a button to the next one. It's
 * there because most visitors took the first big card for the whole list.
 * It leaves once the last card is in view. Clicking scrolls to the next card
 * and moves keyboard focus to its title, so Tab carries on from there.
 */
export function NextProject({ items, label }: { items: Item[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const cards = items.map((item) => document.getElementById(`project-${item.id}`));
      if (cards.some((c) => !c)) return;
      const h = window.innerHeight;
      const tops = cards.map((c) => c!.getBoundingClientRect().top);
      // The card you're on: the last one whose top has passed the middle of the screen.
      let index = 0;
      tops.forEach((top, i) => {
        if (top <= h * 0.5) index = i;
      });
      setCurrent(index);
      const lastTop = tops[tops.length - 1];
      setInList(tops[0] <= h * 0.55 && lastTop > h * 0.45);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const next = items[current + 1];
  const shown = inList && Boolean(next);

  const go = () => {
    if (!next) return;
    const card = document.getElementById(`project-${next.id}`);
    if (!card) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    card.querySelector<HTMLElement>("h3 a")?.focus({ preventScroll: true });
  };

  return (
    <div
      inert={!shown}
      // visibility (switched at the end of the fade) takes it out of the page for screen readers too.
      className={`pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex justify-center px-4 transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        shown ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={go}
        aria-label={next ? `${label}: ${next.name}` : label}
        className="pointer-events-auto inline-flex max-w-full items-center gap-3 rounded-full bg-ink py-2.5 pl-4 pr-2.5 text-sm font-semibold text-cream shadow-lift transition-[background-color,transform] duration-150 ease-out hover:bg-clay-deep active:scale-[0.97]"
      >
        <span aria-hidden className="flex items-center gap-1">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${i === current ? "w-4 bg-cream" : "w-1.5 bg-cream/40"}`}
            />
          ))}
        </span>
        <span aria-hidden className="truncate">
          {label} · <span className="font-medium text-cream/80">{next?.name}</span>
        </span>
        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-ink">
          <Icon icon={faArrowDown} className="h-3 w-3" />
        </span>
      </button>
    </div>
  );
}
