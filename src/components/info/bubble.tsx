import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * One section of the Info page as a single card: near-white on the toned
 * page. The page decides where each card sits (see app/info/page.tsx), so
 * placement comes in through className.
 *
 * Cards below the fold reveal on scroll. The first one passes `onLoad`: a CSS
 * entrance that runs before hydration, so the page is never blank while the
 * script loads.
 */
export function Bubble({
  children,
  className = "",
  id,
  labelledBy,
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const card = (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="flex h-full scroll-mt-24 flex-col rounded-surface border border-ink/[0.06] bg-shell p-7 shadow-soft sm:p-10"
    >
      {children}
    </section>
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

/** The section's name at the top of its card ("EDUCATION"). */
export function BubbleHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="eyebrow">
      {children}
    </h2>
  );
}

/** The small caps label over a block of text inside a card ("WHO I AM"). */
export function BubbleLabel({ children, className = "text-ink-faint" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${className}`}>{children}</p>;
}

/** Entries inside one card (two hackathons, five jobs), split by hairlines. */
export function BubbleList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mt-6 divide-y divide-ink/10 ${className}`}>{children}</div>;
}

/** Spacing for one entry of a BubbleList. */
export const bubbleEntry = "py-6 first:pt-0 last:pb-0";
