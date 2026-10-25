"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { GameShell } from "@/components/play/game-shell";
import { Icon } from "@/components/icon";
import { useI18n } from "@/i18n/provider";
import { fill } from "@/lib/fill";
import { tabPaths } from "@/lib/navigation";
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Controls } from "./input";
import { levels } from "./levels";
import { completeLevel, completeRun, emptyProgress, parseProgress, PROGRESS_KEY, type Progress } from "./progress";
import { drawFrame, viewFor } from "./render";
import { startRun, step, type Input, type RunState } from "./simulation";
import { heroSprites, SpriteBank } from "./sprites";
import { formatTime } from "./time";
import { buildTrack } from "./track";

type Phase = "title" | "intro" | "playing" | "caught" | "fell" | "complete" | "victory";
type Result = { time: number; record: boolean; total?: number; totalRecord?: boolean };

const STEP = 1 / 120;
const INTRO_MS = 1900;

/** Each level always uses the same seed, so it can be learned and times compared. */
function newRun(index: number): RunState {
  return startRun(buildTrack(levels[index], index + 1));
}

/**
 * Run, Francisco! A Pamplona-style chase in five levels. The simulation and
 * level layout are plain functions (simulation.ts, track.ts); this component
 * runs the loop, draws to the canvas and shows the screens between runs.
 */
export default function RunFrancisco() {
  const { t } = useI18n();
  const copy = t.games.runFrancisco;

  const [phase, setPhase] = useState<Phase>("title");
  const [levelIndex, setLevelIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [result, setResult] = useState<Result | null>(null);
  const [go, setGo] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const chaserMarkRef = useRef<HTMLSpanElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  const runRef = useRef<RunState>(newRun(0));
  const controls = useMemo(() => new Controls(), []);
  const sprites = useMemo(() => new SpriteBank(), []);
  const backgrounds = useRef(new Map<string, HTMLImageElement>());
  const playthrough = useRef<{ times: number[]; fromStart: boolean }>({ times: [], fromStart: true });
  const timers = useRef<number[]>([]);

  const phaseRef = useRef(phase);
  const pausedRef = useRef(true);
  const progressRef = useRef(progress);
  phaseRef.current = phase;
  pausedRef.current = menuOpen || controlsOpen;
  progressRef.current = progress;

  useEffect(() => {
    try {
      setProgress(parseProgress(window.localStorage.getItem(PROGRESS_KEY)));
    } catch {
      /* storage blocked: progress just isn't kept */
    }
  }, []);

  const save = useCallback((next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked */
    }
  }, []);

  const loadAssets = useCallback(
    (index: number) => {
      const level = levels[index];
      sprites.preload([...heroSprites, level.chaser.sprite, ...level.obstacles.map((o) => o.sprite), "coffee", "tennisBall"]);
      if (!backgrounds.current.has(level.id)) {
        const image = new Image();
        image.decoding = "async";
        image.src = `/games/run-francisco/backgrounds/${level.id}-${window.innerWidth * (window.devicePixelRatio || 1) > 1600 ? 2560 : 1280}.webp`;
        backgrounds.current.set(level.id, image);
      }
      // Warm up the next level while this one plays.
      if (index + 1 < levels.length) sprites.preload([levels[index + 1].chaser.sprite]);
    },
    [sprites],
  );

  useEffect(() => loadAssets(0), [loadAssets]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const startLevel = useCallback(
    (index: number) => {
      clearTimers();
      loadAssets(index);
      runRef.current = newRun(index);
      controls.releaseAll();
      setLevelIndex(index);
      setResult(null);
      setGo(false);
      setPhase("intro");
      timers.current.push(
        window.setTimeout(() => {
          setPhase("playing");
          setGo(true);
        }, INTRO_MS),
        window.setTimeout(() => setGo(false), INTRO_MS + 700),
      );
    },
    [controls, loadAssets],
  );

  const newGame = useCallback(
    (from: number) => {
      playthrough.current = { times: [], fromStart: from === 0 };
      startLevel(from);
    },
    [startLevel],
  );

  useEffect(() => clearTimers, []);

  // What happens when a run ends; kept in a ref so the animation loop always calls the latest one.
  const onOutcome = useRef<(state: RunState) => void>(() => {});
  onOutcome.current = (state: RunState) => {
    const index = levelIndex;
    if (state.outcome === "caught" || state.outcome === "fell") {
      setPhase(state.outcome);
      return;
    }
    const level = levels[index];
    playthrough.current.times[index] = state.time;
    const level1 = completeLevel(progressRef.current, index, level.id, state.time);
    if (index < levels.length - 1) {
      save(level1.progress);
      setResult({ time: state.time, record: level1.record });
      setPhase("complete");
      return;
    }
    const { times, fromStart } = playthrough.current;
    const full = fromStart && times.filter((x) => x !== undefined).length === levels.length;
    const total = full ? times.reduce((sum, x) => sum + x, 0) : undefined;
    const run = total !== undefined ? completeRun(level1.progress, total) : { progress: level1.progress, record: false };
    save(run.progress);
    setResult({ time: state.time, record: level1.record, total, totalRecord: run.record });
    setPhase("victory");
  };

  // The loop: fixed 1/120 s physics steps, one draw per frame, HUD updated without React renders.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let clock = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const state = runRef.current;

      if (phaseRef.current === "playing" && !pausedRef.current && state.outcome === "running") {
        acc += dt;
        const input: Input = controls.read();
        while (acc >= STEP && state.outcome === "running") {
          step(state, input, STEP);
          acc -= STEP;
        }
        if (state.outcome !== "running") onOutcome.current(state);
      } else {
        acc = 0;
      }

      const view = viewFor(canvas.width, canvas.height);
      drawFrame(
        {
          ctx,
          view,
          sprites,
          background: backgrounds.current.get(state.track.level.id),
          clock,
          reducedMotion,
          chasing: phaseRef.current === "playing",
        },
        state,
      );

      const length = state.track.level.length;
      if (timeRef.current) timeRef.current.textContent = formatTime(state.time);
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, state.player.x / length))})`;
      if (chaserMarkRef.current) chaserMarkRef.current.style.left = `${Math.min(100, Math.max(0, (state.chaser.x / length) * 100))}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controls, sprites]);

  // Canvas pixels follow its box and the screen's density (capped at 2x).
  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => controls.attach(() => phaseRef.current === "playing" && !pausedRef.current), [controls]);
  useEffect(() => {
    if (menuOpen || controlsOpen) controls.releaseAll();
  }, [menuOpen, controlsOpen, controls]);

  // Put focus on each screen's main button, so Enter or Space continues.
  useEffect(() => {
    if (!menuOpen && !controlsOpen) primaryRef.current?.focus();
  }, [phase, menuOpen, controlsOpen]);

  const level = levels[levelIndex];
  const levelCopy = copy.levels[level.id];
  const best = progress.best[level.id];
  const inRun = phase !== "title";

  return (
    <GameShell
      title={copy.title}
      controls={copy.controls}
      controlsOpen={controlsOpen}
      onControlsOpen={() => setControlsOpen(true)}
      onControlsClose={() => setControlsOpen(false)}
      menuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      actions={inRun ? [{ label: t.gameShell.restart, onSelect: () => startLevel(levelIndex) }] : []}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {inRun ? (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-28 sm:top-5">
          <div className="w-full max-w-md rounded-full bg-shell/90 px-5 py-2.5 shadow-soft backdrop-blur-md">
            <div className="flex items-baseline justify-between gap-3 text-xs font-semibold text-ink">
              <span className="truncate">
                {copy.hud.level} {levelIndex + 1} · {levelCopy.name}
              </span>
              <span className="font-mono tabular-nums">
                <span className="sr-only">{copy.hud.time} </span>
                <span ref={timeRef}>0:00.00</span>
              </span>
            </div>
            <span className="relative mt-2 block h-1.5 overflow-hidden rounded-full bg-ink/10">
              <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 rounded-full bg-clay" />
              <span ref={chaserMarkRef} className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </span>
          </div>
        </div>
      ) : null}

      {best !== undefined && inRun ? (
        <p className="pointer-events-none absolute right-3 top-3 z-10 hidden rounded-full bg-shell/90 px-4 py-2.5 text-xs font-semibold text-ink shadow-soft backdrop-blur-md sm:right-5 sm:top-5 md:block">
          {copy.hud.best} <span className="font-mono tabular-nums">{formatTime(best)}</span>
        </p>
      ) : null}

      {go ? (
        <p
          aria-live="polite"
          className="pointer-events-none absolute inset-x-0 top-[30%] z-10 animate-rise text-center text-6xl font-semibold tracking-tight text-shell opacity-0 [text-shadow:0_4px_24px_rgba(35,31,26,0.45)]"
        >
          {copy.go}
        </p>
      ) : null}

      <div aria-live="polite" className="contents">
        {phase === "title" ? (
          <Card>
            <p className="eyebrow">{t.play.eyebrow}</p>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]">{copy.title}</h1>
            <p className="mt-3 text-ink-soft">{copy.tagline}</p>
            {progress.bestTotal !== null ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-ink">
                <Icon icon={faTrophy} className="h-3 w-3 text-clay-deep" />
                {copy.hud.best} <span className="font-mono tabular-nums">{formatTime(progress.bestTotal)}</span>
              </p>
            ) : null}
            <PrimaryButton ref={primaryRef} onClick={() => newGame(0)}>
              {copy.newGame}
            </PrimaryButton>
            {progress.unlocked > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {levels.slice(1, progress.unlocked + 1).map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => newGame(i + 1)}
                    className="rounded-full border border-ink/15 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
                  >
                    {fill(copy.startFrom, { n: i + 2 })} · {copy.levels[l.id].name}
                  </button>
                ))}
              </div>
            ) : null}
          </Card>
        ) : null}

        {phase === "intro" ? (
          <Card compact>
            <p className="text-sm font-semibold text-clay-deep">{fill(copy.intro, { n: levelIndex + 1, name: levelCopy.name })}</p>
            <p className="mt-2 text-3xl font-medium tracking-tight">{fill(copy.goal, { chaser: levelCopy.chaser })}</p>
            <span className="mt-5 block h-1 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full origin-left animate-[grow_1.9s_linear_forwards] rounded-full bg-ink" />
            </span>
          </Card>
        ) : null}

        {phase === "caught" || phase === "fell" ? (
          <Card compact>
            <p className="text-3xl font-medium tracking-tight">
              {phase === "caught" ? fill(copy.caught, { chaser: levelCopy.chaser }) : copy.fell}
            </p>
            <PrimaryButton ref={primaryRef} onClick={() => startLevel(levelIndex)}>
              {copy.retry}
            </PrimaryButton>
          </Card>
        ) : null}

        {phase === "complete" && result ? (
          <Card compact>
            <p className="text-sm font-semibold text-clay-deep">{fill(copy.intro, { n: levelIndex + 1, name: levelCopy.name })}</p>
            <p className="mt-2 text-3xl font-medium tracking-tight">{copy.complete}</p>
            <TimeLine time={result.time} record={result.record} recordLabel={copy.record} />
            <PrimaryButton ref={primaryRef} onClick={() => startLevel(levelIndex + 1)}>
              {copy.next}
            </PrimaryButton>
          </Card>
        ) : null}

        {phase === "victory" && result ? (
          <Card>
            <p className="eyebrow">{copy.title}</p>
            <p className="mt-3 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.04] tracking-[-0.035em]">{copy.victory}</p>
            {result.total !== undefined ? (
              <TimeLine
                time={result.total}
                label={fill(copy.totalTime, { time: "" }).trim()}
                record={result.totalRecord ?? false}
                recordLabel={copy.record}
              />
            ) : (
              <TimeLine time={result.time} record={result.record} recordLabel={copy.record} />
            )}
            <PrimaryButton ref={primaryRef} onClick={() => newGame(0)}>
              {copy.again}
            </PrimaryButton>
            <Link href={tabPaths.play} className="link-underline mt-4 inline-block text-sm">
              {t.gameShell.allGames}
            </Link>
          </Card>
        ) : null}
      </div>

      {phase === "playing" ? <TouchPad controls={controls} labels={copy.buttons} /> : null}
    </GameShell>
  );
}

function Card({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
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

function PrimaryButton({ children, onClick, ref }: { children: ReactNode; onClick: () => void; ref: React.Ref<HTMLButtonElement> }) {
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

function TimeLine({ time, record, recordLabel, label }: { time: number; record: boolean; recordLabel: string; label?: string }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-3">
      {label ? <span className="text-sm text-ink-soft">{label}</span> : null}
      <span className="font-mono text-2xl font-semibold tabular-nums">{formatTime(time)}</span>
      {record ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-2.5 py-1 text-xs font-semibold text-clay-deep">
          <Icon icon={faTrophy} className="h-3 w-3" />
          {recordLabel}
        </span>
      ) : null}
    </p>
  );
}

/** On-screen buttons for touch screens: brake and run on the left, slide and jump on the right. */
function TouchPad({ controls, labels }: { controls: Controls; labels: { left: string; right: string; jump: string; slide: string } }) {
  const button = (control: keyof Input, label: string, icon: typeof faCaretUp) => (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        controls.press(control, true);
      }}
      onPointerUp={() => controls.press(control, false)}
      onPointerCancel={() => controls.press(control, false)}
      onContextMenu={(e) => e.preventDefault()}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-shell/80 text-ink shadow-soft backdrop-blur-md active:scale-95 active:bg-shell sm:h-20 sm:w-20"
    >
      <Icon icon={icon} className="h-7 w-7" />
    </button>
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-between p-4 pb-[max(1rem,env(safe-area-inset-bottom))] [@media(pointer:coarse)]:flex">
      <div className="pointer-events-auto flex gap-3">
        {button("brake", labels.left, faCaretLeft)}
        {button("run", labels.right, faCaretRight)}
      </div>
      <div className="pointer-events-auto flex gap-3">
        {button("slide", labels.slide, faCaretDown)}
        {button("jump", labels.jump, faCaretUp)}
      </div>
    </div>
  );
}
