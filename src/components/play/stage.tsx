"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode, Ref } from "react";
import { Icon } from "@/components/icon";

/**
 * The pieces every canvas game draws over its stage, in the site's bubble
 * style, so a new game looks like it belongs without restyling anything.
 */

/** A centred bubble over the game: level cards, results, the title screen. */
export function StageCard({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <div
        className={`w-full animate-rise rounded-surface border border-ink/[0.06] bg-shell/95 opacity-0 shadow-lift backdrop-blur-md ${
          compact ? "max-w-sm p-7" : "max-w-md p-8 sm:p-10"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/** The one main action of a card (Next level, Try again). */
export function StageButton({ children, onClick, ref }: { children: ReactNode; onClick: () => void; ref?: Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-clay-deep active:scale-[0.97]"
    >
      {children}
    </button>
  );
}

/** The frosted pill used for the Menu button and heads-up readouts. */
export const stagePill = "rounded-full bg-shell/90 shadow-soft backdrop-blur-md";

/** Keeps something clear of a phone's notch and rounded corners (needs viewport-fit=cover). */
export const safeTop = "top-[max(0.75rem,env(safe-area-inset-top))] sm:top-[max(1.25rem,env(safe-area-inset-top))]";

/**
 * A press-and-hold button for touch screens. Pointer capture keeps the press
 * alive if the finger slides a little; letting go anywhere releases it.
 */
export function TouchButton({ label, icon, onChange }: { label: string; icon: IconDefinition; onChange: (down: boolean) => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onChange(true);
      }}
      onPointerUp={() => onChange(false)}
      onPointerCancel={() => onChange(false)}
      onContextMenu={(e) => e.preventDefault()}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-shell/80 text-ink shadow-soft backdrop-blur-md active:scale-95 active:bg-shell"
    >
      <Icon icon={icon} className="h-7 w-7" />
    </button>
  );
}

/** Height kept free at the bottom of the stage for the touch buttons, in CSS pixels. */
export const TOUCH_RESERVE = 96;
