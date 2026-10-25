import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * One card of the Info page's bento grid: near-white on the toned page, or ink
 * for the one dark card. Grid placement comes in through className.
 */
export function Bubble({
  children,
  className = "",
  dark = false,
  as: Tag = "div",
  id,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  as?: "div" | "article";
  id?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Tag
        id={id}
        className={`flex h-full scroll-mt-24 flex-col rounded-surface p-7 shadow-soft sm:p-9 ${
          dark ? "bg-ink text-cream" : "border border-ink/[0.06] bg-shell"
        }`}
      >
        {children}
      </Tag>
    </Reveal>
  );
}

/** The small caps label over a block of text inside a bubble ("WHO I AM"). */
export function BubbleLabel({ children, className = "text-ink-faint" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${className}`}>{children}</p>;
}

/** Heading over a group of bubbles: what the group is, then its one-line title. */
export function GroupHeader({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <Reveal>
      <div className="mb-6 sm:mb-8">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={id}
          className="mt-3 max-w-3xl text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.035em] [text-wrap:balance]"
        >
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
