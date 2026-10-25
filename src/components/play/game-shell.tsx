"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { tabPaths } from "@/lib/navigation";
import { useI18n } from "@/i18n/provider";
import type { Labelled } from "@/i18n/types";
import { faArrowLeft, faBars, faHouse, faPlay, faRotateRight, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export type GameAction = { label: string; onSelect: () => void };

/**
 * What every game on the site shares, so a new game only brings its canvas:
 * - a Menu button that is always on screen, and Esc, both opening a pause menu
 *   (Resume, the game's own actions, How to play, All games, Back to the portfolio);
 * - the controls card, shown before the first run and from the menu;
 * - leaving the tab pauses the game.
 * The game owns both open states and pauses while either is open.
 */
export function GameShell({
  title,
  controls,
  controlsOpen,
  onControlsOpen,
  onControlsClose,
  menuOpen,
  onMenuOpenChange,
  actions = [],
  children,
}: {
  title: string;
  controls: { keyboard: Labelled[]; touch: Labelled[] };
  controlsOpen: boolean;
  onControlsOpen: () => void;
  onControlsClose: () => void;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  actions?: GameAction[];
  children: ReactNode;
}) {
  const { t } = useI18n();
  const shell = t.gameShell;

  // Esc opens the menu during play (an open dialog handles its own Esc).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !menuOpen && !controlsOpen) {
        e.preventDefault();
        onMenuOpenChange(true);
      }
    };
    const onHide = () => {
      if (document.hidden && !controlsOpen) onMenuOpenChange(true);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [menuOpen, controlsOpen, onMenuOpenChange]);

  const closeMenu = useCallback(() => onMenuOpenChange(false), [onMenuOpenChange]);

  return (
    <main className="fixed inset-0 touch-none select-none overflow-hidden bg-ink" aria-label={title}>
      {children}

      <button
        type="button"
        onClick={() => onMenuOpenChange(true)}
        className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full bg-shell/90 px-4 py-2.5 text-sm font-semibold text-ink shadow-soft backdrop-blur-md transition-[background-color,transform] duration-150 ease-out hover:bg-shell active:scale-[0.97] sm:left-5 sm:top-5"
      >
        <Icon icon={faBars} className="h-3.5 w-3.5" />
        {shell.menu}
      </button>

      <ShellDialog open={menuOpen} onClose={closeMenu} labelledBy="game-menu-title">
        <p className="eyebrow">{title}</p>
        <h2 id="game-menu-title" className="mt-2 text-3xl font-medium tracking-tight">
          {shell.paused}
        </h2>
        <div className="mt-6 grid gap-2">
          <MenuButton icon={faPlay} onClick={closeMenu} primary autoFocus>
            {shell.resume}
          </MenuButton>
          {actions.map((action) => (
            <MenuButton
              key={action.label}
              icon={faRotateRight}
              onClick={() => {
                action.onSelect();
                closeMenu();
              }}
            >
              {action.label}
            </MenuButton>
          ))}
          <MenuButton
            icon={faTableCellsLarge}
            onClick={() => {
              closeMenu();
              onControlsOpen();
            }}
          >
            {shell.howToPlay}
          </MenuButton>
          <div className="mt-2 grid gap-2 border-t border-ink/10 pt-4 sm:grid-cols-2">
            <MenuLink href={tabPaths.play} icon={faArrowLeft}>
              {shell.allGames}
            </MenuLink>
            <MenuLink href={tabPaths.work} icon={faHouse}>
              {shell.backToSite}
            </MenuLink>
          </div>
        </div>
      </ShellDialog>

      <ShellDialog open={controlsOpen} onClose={onControlsClose} labelledBy="game-controls-title">
        <p className="eyebrow">{title}</p>
        <h2 id="game-controls-title" className="mt-2 text-3xl font-medium tracking-tight">
          {shell.howToPlay}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <ControlList heading={shell.keyboard} items={controls.keyboard} />
          <ControlList heading={shell.touch} items={controls.touch} />
        </div>
        <p className="mt-5 hidden rounded-frame bg-cream px-4 py-3 text-sm text-ink-soft [@media(pointer:coarse)_and_(orientation:portrait)]:block">
          {shell.rotate}
        </p>
        <button
          type="button"
          autoFocus
          onClick={onControlsClose}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-clay-deep active:scale-[0.97]"
        >
          {shell.gotIt}
        </button>
      </ShellDialog>
    </main>
  );
}

/** A native modal dialog (focus trap, Esc, inert page) styled as one of the site's bubbles. */
function ShellDialog({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="m-auto max-h-[92dvh] w-[min(92vw,32rem)] overflow-y-auto rounded-surface border border-ink/[0.06] bg-shell p-7 text-ink shadow-lift backdrop:bg-ink/55 backdrop:backdrop-blur-sm sm:p-9"
    >
      {open ? children : null}
    </dialog>
  );
}

function MenuButton({
  icon,
  onClick,
  primary = false,
  autoFocus = false,
  children,
}: {
  icon: typeof faPlay;
  onClick: () => void;
  primary?: boolean;
  autoFocus?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      autoFocus={autoFocus}
      className={`inline-flex w-full items-center gap-3 rounded-full px-5 py-3 text-left text-[15px] font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] ${
        primary ? "bg-ink text-cream hover:bg-clay-deep" : "bg-cream text-ink hover:bg-sand"
      }`}
    >
      <Icon icon={icon} className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

function MenuLink({ href, icon, children }: { href: string; icon: typeof faPlay; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink no-underline transition-[background-color,border-color] duration-150 ease-out hover:border-ink/40 hover:bg-ink/[0.03]"
    >
      <Icon icon={icon} className="h-3 w-3" />
      {children}
    </Link>
  );
}

function ControlList({ heading, items }: { heading: string; items: Labelled[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">{heading}</p>
      <dl className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="inline-block rounded-md border border-ink/15 bg-cream px-2 py-0.5 font-mono text-xs font-semibold text-ink">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm leading-snug text-ink-soft">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
