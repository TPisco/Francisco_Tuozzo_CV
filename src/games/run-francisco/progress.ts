import { levels, type LevelId } from "./levels";

/** What the browser remembers between visits: how far you got and your best times. */
export type Progress = {
  /** Index of the furthest level you can start from. */
  unlocked: number;
  best: Partial<Record<LevelId, number>>;
  /** Best total over a full run from level 1. */
  bestTotal: number | null;
};

export const emptyProgress: Progress = { unlocked: 0, best: {}, bestTotal: null };

export const PROGRESS_KEY = "run-francisco";

export function completeLevel(progress: Progress, index: number, id: LevelId, time: number) {
  const previous = progress.best[id];
  const record = previous === undefined || time < previous;
  return {
    record,
    progress: {
      ...progress,
      unlocked: Math.max(progress.unlocked, Math.min(index + 1, levels.length - 1)),
      best: record ? { ...progress.best, [id]: time } : progress.best,
    },
  };
}

export function completeRun(progress: Progress, total: number) {
  const record = progress.bestTotal === null || total < progress.bestTotal;
  return { record, progress: record ? { ...progress, bestTotal: total } : progress };
}

/** Reads saved progress, ignoring anything that doesn't look right. */
export function parseProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress;
  try {
    const data = JSON.parse(raw) as Partial<Progress>;
    if (typeof data.unlocked !== "number" || typeof data.best !== "object" || data.best === null) return emptyProgress;
    return {
      unlocked: Math.min(Math.max(0, Math.floor(data.unlocked)), levels.length - 1),
      best: data.best,
      bestTotal: typeof data.bestTotal === "number" ? data.bestTotal : null,
    };
  } catch {
    return emptyProgress;
  }
}
