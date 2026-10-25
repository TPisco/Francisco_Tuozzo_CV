import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * One card of the Info page's bento grid: near-white on the toned page, or ink
 * for the one dark card. Grid placement comes in through className.
 *
 * Cards below the fold reveal on scroll. The first row passes `onLoad`: a CSS
 * entrance that runs before hydration, so the page is never blank while the
 * script loads.
 */
export function Bubble({
  children,
  className = "",
  dark = false,
  as: Tag = "div",
  id,
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  as?: "div" | "article";
  id?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const card = (
    <Tag
      id={id}
      className={`flex h-full scroll-mt-24 flex-col rounded-surface p-7 shadow-soft sm:p-9 ${
        dark ? "bg-ink text-cream" : "border border-ink/[0.06] bg-shell"
      }`}
    >
      {children}
    </Tag>
  );

  if (onLoad) {
    return (
      <div className={`animate-rise opacity-0 ${className}`} style={{ animationDelay: `${delay * 1000}ms` }}>
        {card}
      </div>
    );
  }

  return (
    <Reveal delay={delay} className={className}>
      {card}
    </Reveal>
  );
}

/** The small caps label over a block of text inside a bubble ("WHO I AM"). */
export function BubbleLabel({ children, className = "text-ink-faint" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${className}`}>{children}</p>;
}

/**
 * Names a group of bubbles for screen readers only. Visually the Info page is
 * one continuous grid, like the reference; each card's label says what it is.
 */
export function GroupHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="sr-only">
      {children}
    </h2>
  );
}
