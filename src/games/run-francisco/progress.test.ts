import { describe, expect, test } from "bun:test";
import { completeLevel, completeRun, emptyProgress, parseProgress } from "./progress";

describe("progress", () => {
  test("finishing a level unlocks the next one", () => {
    const { progress } = completeLevel(emptyProgress, 0, "campus", 34.2);
    expect(progress.unlocked).toBe(1);
  });

  test("replaying an early level never locks later ones again", () => {
    const later = { ...emptyProgress, unlocked: 3 };
    expect(completeLevel(later, 0, "campus", 40).progress.unlocked).toBe(3);
  });

  test("a level's best time only ever improves", () => {
    const first = completeLevel(emptyProgress, 0, "campus", 34.2);
    expect(first.record).toBe(true);
    const slower = completeLevel(first.progress, 0, "campus", 36);
    expect(slower.record).toBe(false);
    expect(slower.progress.best.campus).toBe(34.2);
    const faster = completeLevel(slower.progress, 0, "campus", 31.5);
    expect(faster.record).toBe(true);
    expect(faster.progress.best.campus).toBe(31.5);
  });

  test("a full run's total is a record only when it beats the last one", () => {
    const first = completeRun(emptyProgress, 300);
    expect(first.record).toBe(true);
    expect(completeRun(first.progress, 310).record).toBe(false);
    expect(completeRun(first.progress, 290).progress.bestTotal).toBe(290);
  });

  test("saved data that is missing or broken starts fresh", () => {
    expect(parseProgress(null)).toEqual(emptyProgress);
    expect(parseProgress("{not json")).toEqual(emptyProgress);
    expect(parseProgress('{"unlocked":"lots"}')).toEqual(emptyProgress);
  });

  test("a saved time that isn't a real time is dropped, not shown as NaN", () => {
    const saved = JSON.stringify({ unlocked: 2, best: { campus: "fast", tennis: -3, port: 41.5, winter: null, nope: 9 }, bestTotal: "x" });
    expect(parseProgress(saved)).toEqual({ unlocked: 2, best: { port: 41.5 }, bestTotal: null });
  });

  test("saved data round-trips", () => {
    const { progress } = completeLevel(emptyProgress, 1, "tennis", 41.25);
    expect(parseProgress(JSON.stringify(progress))).toEqual(progress);
  });
});
