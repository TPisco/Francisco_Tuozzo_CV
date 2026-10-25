"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@/components/icon";
import { safeTop, stagePill } from "@/components/play/stage";
import { useI18n } from "@/i18n/provider";
import type { Labelled } from "@/i18n/types";
import { tabPaths } from "@/lib/navigation";
import { faArrowLeft, faBars, faHouse, faPlay, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export type GameAction = { label: string; icon: IconDefinition; onSelect: () => void };

type ShellApi = {
  /** True while the menu or the controls card is open: the game must not advance. */
  paused: boolean;
  /** The game's own entries in the pause menu (e.g. Restart level); set them with useGameActions. */
  setActions: (actions: GameAction[]) => void;
};

const ShellContext = createContext<ShellApi | null>(null);

/** Whether the game is paused by its shell. */
export function useGameShell(): ShellApi {
  const api = useContext(ShellContext);
  if (!api) throw new Error("useGameShell must be used inside a GameShell");
  return api;
}

/** Puts the game's own entries in the pause menu while the calling component is mounted. */
export function useGameActions(actions: GameAction[]) {
  const { setActions } = useGameShell();
  useEffect(() => {
    setActions(actions);
  }, [actions, setActions]);
  useEffect(() => () => setActions([]), [setActions]);
}

/**
 * Everything a game on the site shares, so a new game only brings its stage:
 * - a Menu button always on screen, and Esc, both opening a pause menu
 *   (Resume, the game's actions, How to play, All games, Back to the portfolio);
 * - the controls card, shown before the first run and from the menu;
 * - pausing whenever the tab is hidden or the window loses focus;
 * - focus put back on the stage when a dialog closes, so a stray Space can't
 *   trigger the Menu button.
 * Games read `paused` from useGameShell().
 */
export function GameShell({
  title,
  controls,
  children,
}: {
  title: string;
  controls: { keyboard: Labelled[]; touch: Labelled[] };
  children: ReactNode;
}) {
  const { t } = useI18n();
  const shell = t.gameShell;
  const [menuOpen, setMenuOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [actions, setActions] = useState<GameAction[]>([]);
  const stageRef = useRef<HTMLElement>(null);

  const paused = menuOpen || controlsOpen;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !menuOpen && !controlsOpen) {
        e.preventDefault();
        setMenuOpen(true);
      }
    };
    const interrupt = () => {
      if (!controlsOpen) setMenuOpen(true);
    };
    const onHide = () => {
      if (document.hidden) interrupt();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("blur", interrupt);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("blur", interrupt);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [menuOpen, controlsOpen]);

  const backToStage = () => stageRef.current?.focus({ preventScroll: true });
  const closeMenu = () => {
    setMenuOpen(false);
    backToStage();
  };
  const closeControls = () => {
    setControlsOpen(false);
    backToStage();
  };

  const api = useMemo(() => ({ paused, setActions }), [paused]);

  return (
    <ShellContext.Provider value={api}>
      <main
        ref={stageRef}
        tabIndex={-1}
        aria-label={title}
        className="fixed inset-0 touch-none select-none overflow-hidden bg-ink outline-none"
      >
        {children}

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={`absolute left-[max(0.75rem,env(safe-area-inset-left))] z-20 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-shell active:scale-[0.97] sm:left-[max(1.25rem,env(safe-area-inset-left))] ${stagePill} ${safeTop}`}
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
                icon={action.icon}
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
                setMenuOpen(false);
                setControlsOpen(true);
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

        <ShellDialog open={controlsOpen} onClose={closeControls} labelledBy="game-controls-title">
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
            onClick={closeControls}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-clay-deep active:scale-[0.97]"
          >
            {shell.gotIt}
          </button>
        </ShellDialog>
      </main>
    </ShellContext.Provider>
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

  const cancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={cancel}
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
  icon: IconDefinition;
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

function MenuLink({ href, icon, children }: { href: string; icon: IconDefinition; children: ReactNode }) {
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
