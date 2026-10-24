import type { ReactNode } from "react";

/**
 * A rounded window with a thin title bar, used to frame the hero and every
 * project screenshot so they read as one family. The dots are neutral on
 * purpose: the palette keeps clay as its only accent.
 */
export function WindowFrame({
  children,
  className = "",
  barClassName = "h-7 px-3.5",
}: {
  children: ReactNode;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div className={`overflow-hidden border border-ink/10 bg-shell ${className}`}>
      <div aria-hidden className={`flex items-center gap-1.5 border-b border-ink/[0.07] ${barClassName}`}>
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
      </div>
      {children}
    </div>
  );
}
