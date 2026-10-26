"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameShell, useGameActions, useGameShell } from "@/components/play/game-shell";
import { safeTop, StageButton, StageCard, stagePill, TOUCH_RESERVE, TouchButton } from "@/components/play/stage";
import { useFixedStep } from "@/components/play/use-fixed-step";
import { Icon } from "@/components/icon";
import { useI18n } from "@/i18n/provider";
import { fill } from "@/lib/fill";
import { tabPaths } from "@/lib/navigation";
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faMobileScreenButton, faRotateRight, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { copy, type RunFranciscoCopy } from "./copy";
import { Controls } from "./input";
import { levels } from "./levels";
import { completeLevel, completeRun, emptyProgress, parseProgress, PROGRESS_KEY, type Progress } from "./progress";
import { drawFrame, viewFor, type Pose } from "./render";
import { startRun, step, type RunState } from "./simulation";
import { heroSprites, SpriteBank } from "./sprites";
import { formatTime } from "./time";
import { buildTrack } from "./track";

type Phase = "title" | "intro" | "playing" | "caught" | "fell" | "complete" | "victory";
type Result = { time: number; record: boolean; total?: number; totalRecord?: boolean };

const STEP = 1 / 120;
/** Seconds of the level card before a run starts. */
const INTRO = 1.9;
/** Seconds the "Go!" stays up. */
const GO = 0.7;

/** Each level always uses the same seed, so it can be learned and times compared. */
function newRun(index: number): RunState {
  return startRun(buildTrack(levels[index], index + 1));
}

/**
 * Run, Francisco! A Pamplona-style chase in five levels. The simulation and
 * level layout are plain functions (simulation.ts, track.ts); the shell owns the
 * menu and pausing; this file runs the loop, draws, and shows the screens.
 */
export default function RunFrancisco() {
  const { t, locale } = useI18n();
  const card = t.games.runFrancisco;
  const words = copy[locale];
  return (
    <GameShell title={card.title} controls={words.controls}>
      <Stage words={words} title={card.title} tagline={card.tagline} />
    </GameShell>
  );
}

function Stage({ words, title, tagline }: { words: RunFranciscoCopy; title: string; tagline: string }) {
  const { t } = useI18n();
  const { paused } = useGameShell();

  const [phase, setPhase] = useState<Phase>("title");
  const [levelIndex, setLevelIndex] = useState(0);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [result, setResult] = useState<Result | null>(null);
  const [go, setGo] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const chaserMarkRef = useRef<HTMLSpanElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  const runRef = useRef<RunState | null>(null);
  if (runRef.current === null) runRef.current = newRun(0);
  const prevPose = useRef<Pose>({ px: 0, py: 0, cx: 0 });
  const introLeft = useRef(0);
  const goLeft = useRef(0);
  const pendingFocus = useRef(true);
  const phaseRef = useRef<Phase>("title");
  const pausedRef = useRef(true);
  /** A phone held upright mid-run: the game waits behind the rotate card. */
  const blockedRef = useRef(false);
  const [portraitTouch, setPortraitTouch] = useState(false);
  const [uprightOk, setUprightOk] = useState(false);
  const progressRef = useRef(progress);
  const levelRef = useRef(0);

  const touchRef = useMediaFlag("(pointer: coarse)");
  const calmRef = useMediaFlag("(prefers-reduced-motion: reduce)");
  const controls = useMemo(() => new Controls(), []);
  const sprites = useMemo(() => new SpriteBank(), []);
  const backgrounds = useRef(new Map<string, HTMLImageElement>());
  const playthrough = useRef<{ times: number[]; fromStart: boolean }>({ times: [], fromStart: true });

  const enter = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
    // Screens with a button get it focused, once every key has been let go (see the render loop).
    if (next !== "intro" && next !== "playing") pendingFocus.current = true;
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) controls.releaseAll();
    else pendingFocus.current = true;
  }, [paused, controls]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse) and (orientation: portrait)");
    const update = () => setPortraitTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const blocked = portraitTouch && !uprightOk && (phase === "intro" || phase === "playing");
  useEffect(() => {
    blockedRef.current = blocked;
    if (blocked) controls.releaseAll();
  }, [blocked, controls]);

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
        // The picture is drawn about 1.1x the stage's height: pick the file that covers that without upscaling.
        const height = canvasRef.current?.height ?? window.innerHeight;
        const image = new Image();
        image.decoding = "async";
        image.src = `/games/run-francisco/backgrounds/${level.id}-${height * 1.1 > 560 ? 2560 : 1280}.webp`;
        backgrounds.current.set(level.id, image);
      }
      if (index + 1 < levels.length) sprites.preload([levels[index + 1].chaser.sprite]);
    },
    [sprites],
  );

  useEffect(() => loadAssets(0), [loadAssets]);

  const startLevel = useCallback(
    (index: number) => {
      loadAssets(index);
      runRef.current = newRun(index);
      controls.releaseAll();
      levelRef.current = index;
      introLeft.current = INTRO;
      goLeft.current = 0;
      setLevelIndex(index);
      setResult(null);
      setGo(false);
      enter("intro");
    },
    [controls, enter, loadAssets],
  );

  const newGame = useCallback(
    (from: number) => {
      playthrough.current = { times: [], fromStart: from === 0 };
      startLevel(from);
    },
    [startLevel],
  );

  const actions = useMemo(
    () => (phase === "title" ? [] : [{ label: t.gameShell.restart, icon: faRotateRight, onSelect: () => startLevel(levelRef.current) }]),
    [phase, startLevel, t.gameShell.restart],
  );
  useGameActions(actions);

  const finish = (state: RunState) => {
    const index = levelRef.current;
    if (state.outcome === "caught" || state.outcome === "fell") {
      enter(state.outcome);
      return;
    }
    const level = levels[index];
    playthrough.current.times[index] = state.time;
    const done = completeLevel(progressRef.current, index, level.id, state.time);
    if (index < levels.length - 1) {
      save(done.progress);
      setResult({ time: state.time, record: done.record });
      enter("complete");
      return;
    }
    const { times, fromStart } = playthrough.current;
    const full = fromStart && times.filter((x) => x !== undefined).length === levels.length;
    const total = full ? times.reduce((sum, x) => sum + x, 0) : undefined;
    const run = total !== undefined ? completeRun(done.progress, total) : { progress: done.progress, record: false };
    save(run.progress);
    setResult({ time: state.time, record: done.record, total, totalRecord: run.record });
    enter("victory");
  };

  useFixedStep({
    step: STEP,
    active: () => !pausedRef.current && !blockedRef.current && (phaseRef.current === "intro" || phaseRef.current === "playing"),
    update: (dt) => {
      if (phaseRef.current === "intro") {
        introLeft.current -= dt;
        if (introLeft.current <= 0) {
          enter("playing");
          goLeft.current = GO;
          setGo(true);
        }
        return;
      }
      if (goLeft.current > 0) {
        goLeft.current -= dt;
        if (goLeft.current <= 0) setGo(false);
      }
      const state = runRef.current!;
      prevPose.current = { px: state.player.x, py: state.player.y, cx: state.chaser.x };
      step(state, controls.read(), dt);
      if (state.outcome !== "running") finish(state);
    },
    render: (alpha, clock) => {
      const canvas = canvasRef.current;
      const state = runRef.current!;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const playing = phaseRef.current === "playing";
      const prev = prevPose.current;
      const pose: Pose = playing
        ? {
            px: prev.px + (state.player.x - prev.px) * alpha,
            py: prev.py + (state.player.y - prev.py) * alpha,
            cx: prev.cx + (state.chaser.x - prev.cx) * alpha,
          }
        : { px: state.player.x, py: state.player.y, cx: state.chaser.x };
      const dpr = canvas.width / Math.max(1, canvas.clientWidth);
      const touch = touchRef.current;
      drawFrame(
        {
          ctx,
          view: viewFor(canvas.width, canvas.height, touch ? TOUCH_RESERVE * dpr : 0),
          sprites,
          background: backgrounds.current.get(state.track.level.id),
          clock,
          reducedMotion: calmRef.current,
          chasing: playing,
          pose,
          dpr,
        },
        state,
      );

      const length = state.track.level.length;
      if (timeRef.current) timeRef.current.textContent = formatTime(state.time);
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, pose.px / length))})`;
      if (chaserMarkRef.current) chaserMarkRef.current.style.left = `${Math.min(100, Math.max(0, (pose.cx / length) * 100))}%`;

      if (pendingFocus.current && !pausedRef.current && !controls.anyHeld() && primaryRef.current) {
        primaryRef.current.focus({ preventScroll: true });
        pendingFocus.current = false;
      }
    },
  });

  // Canvas pixels follow its box and the screen's density (capped at 2x), including a density change alone.
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
    const density = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    density.addEventListener("change", resize);
    return () => {
      observer.disconnect();
      density.removeEventListener("change", resize);
    };
  }, []);

  // Run and brake can already be held during the level card (no need for key repeat); jump and slide wait for Go.
  useEffect(
    () =>
      controls.attach((control) => {
        if (pausedRef.current || blockedRef.current) return false;
        if (phaseRef.current === "playing") return true;
        return phaseRef.current === "intro" && (control === "run" || control === "brake");
      }),
    [controls],
  );

  /** Touch jump and slide only count once the run has started (run and brake can be held during the card). */
  const pressAction = (control: "jump" | "slide", down: boolean) => {
    if (down && phaseRef.current !== "playing") return;
    controls.press(control, down);
  };

  const level = levels[levelIndex];
  const levelWords = words.levels[level.id];
  const best = progress.best[level.id];
  const inRun = phase !== "title";

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {inRun ? (
        <div className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center px-24 sm:px-28 ${safeTop}`}>
          <div className={`w-full max-w-md px-5 py-2.5 ${stagePill}`}>
            <div className="flex items-baseline justify-between gap-3 text-[13px] font-semibold text-ink">
              <span className="hidden truncate sm:inline">
                {words.hud.level} {levelIndex + 1} · {levelWords.name}
              </span>
              <span className="font-mono tabular-nums">
                <span className="sr-only">{words.hud.time} </span>
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
        <p
          className={`pointer-events-none absolute right-[max(0.75rem,env(safe-area-inset-right))] z-10 hidden px-4 py-2.5 text-xs font-semibold text-ink sm:right-[max(1.25rem,env(safe-area-inset-right))] md:block ${stagePill} ${safeTop}`}
        >
          {words.hud.best} <span className="font-mono tabular-nums">{formatTime(best)}</span>
        </p>
      ) : null}

      {go ? (
        <p className="pointer-events-none absolute inset-x-0 top-[30%] z-10 animate-rise text-center text-6xl font-semibold tracking-tight text-shell opacity-0 [text-shadow:0_4px_24px_rgba(35,31,26,0.45)]">
          {words.go}
        </p>
      ) : null}

      <div aria-live="polite" className="contents">
        {phase === "title" ? (
          <StageCard>
            <p className="eyebrow">{t.play.eyebrow}</p>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]">{title}</h1>
            <p className="mt-3 text-ink-soft short:hidden">{tagline}</p>
            {progress.bestTotal !== null ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-ink">
                <Icon icon={faTrophy} className="h-3 w-3 text-clay-deep" />
                {words.hud.best} <span className="font-mono tabular-nums">{formatTime(progress.bestTotal)}</span>
              </p>
            ) : null}
            <StageButton ref={primaryRef} onClick={() => newGame(0)}>
              {words.newGame}
            </StageButton>
            {progress.unlocked > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2 short:grid short:grid-cols-2">
                {levels.slice(1, progress.unlocked + 1).map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => newGame(i + 1)}
                    className="rounded-full border border-ink/40 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03]"
                  >
                    <span className="short:hidden">{fill(words.startFrom, { n: i + 2 })} · </span>
                    <span className="hidden short:inline" aria-hidden>{i + 2} · </span>
                    {words.levels[l.id].name}
                  </button>
                ))}
              </div>
            ) : null}
          </StageCard>
        ) : null}

        {phase === "intro" && !blocked ? (
          <StageCard compact>
            <p className="text-sm font-semibold text-clay-deep">{fill(words.intro, { n: levelIndex + 1, name: levelWords.name })}</p>
            <p className="mt-2 text-3xl font-medium tracking-tight">{fill(words.goal, { chaser: levelWords.chaser })}</p>
            <span className="mt-5 block h-1 overflow-hidden rounded-full bg-ink/10">
              <span
                className="block h-full origin-left animate-[grow_1.9s_linear_forwards] rounded-full bg-ink"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            </span>
          </StageCard>
        ) : null}

        {phase === "caught" || phase === "fell" ? (
          <StageCard compact>
            <p className="text-3xl font-medium tracking-tight">
              {phase === "caught" ? fill(words.caught, { chaser: levelWords.chaser }) : words.fell}
            </p>
            <StageButton ref={primaryRef} onClick={() => startLevel(levelIndex)}>
              {words.retry}
            </StageButton>
          </StageCard>
        ) : null}

        {phase === "complete" && result ? (
          <StageCard compact>
            <p className="text-sm font-semibold text-clay-deep">{fill(words.intro, { n: levelIndex + 1, name: levelWords.name })}</p>
            <p className="mt-2 text-3xl font-medium tracking-tight">{words.complete}</p>
            <TimeLine time={result.time} record={result.record} recordLabel={words.record} />
            <StageButton ref={primaryRef} onClick={() => startLevel(levelIndex + 1)}>
              {words.next}
            </StageButton>
          </StageCard>
        ) : null}

        {phase === "victory" && result ? (
          <StageCard>
            <p className="eyebrow">{title}</p>
            <p className="mt-3 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.04] tracking-[-0.035em]">{words.victory}</p>
            {result.total !== undefined ? (
              <TimeLine
                time={result.total}
                label={fill(words.totalTime, { time: "" }).trim()}
                record={result.totalRecord ?? false}
                recordLabel={words.record}
              />
            ) : (
              <TimeLine time={result.time} record={result.record} recordLabel={words.record} />
            )}
            <StageButton ref={primaryRef} onClick={() => newGame(0)}>
              {words.again}
            </StageButton>
            <Link href={tabPaths.play} className="link-underline mt-4 inline-block text-sm">
              {t.gameShell.allGames}
            </Link>
          </StageCard>
        ) : null}
      </div>

      {phase === "playing" || phase === "intro" ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden justify-between px-[max(1rem,env(safe-area-inset-left))] pb-[max(1rem,env(safe-area-inset-bottom))] [@media(pointer:coarse)]:flex">
          <div className="pointer-events-auto flex gap-3">
            <TouchButton label={words.buttons.left} icon={faCaretLeft} onChange={(down) => controls.press("brake", down)} />
            <TouchButton label={words.buttons.right} icon={faCaretRight} onChange={(down) => controls.press("run", down)} />
          </div>
          <div className="pointer-events-auto flex gap-3">
            <TouchButton label={words.buttons.slide} icon={faCaretDown} onChange={(down) => pressAction("slide", down)} />
            <TouchButton label={words.buttons.jump} icon={faCaretUp} onChange={(down) => pressAction("jump", down)} />
          </div>
        </div>
      ) : null}

      {blocked ? (
        <StageCard compact>
          <Icon icon={faMobileScreenButton} className="h-7 w-7 rotate-90 text-clay-deep" />
          <p className="mt-4 text-xl font-medium leading-snug tracking-tight">{t.gameShell.rotate}</p>
          <StageButton onClick={() => setUprightOk(true)}>{t.gameShell.playAnyway}</StageButton>
        </StageCard>
      ) : null}
    </>
  );
}

/** A media query's current answer in a ref, kept up to date, for reading every frame without asking again. */
function useMediaFlag(query: string) {
  const flag = useRef(false);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => {
      flag.current = list.matches;
    };
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return flag;
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
