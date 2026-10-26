import { describe, expect, test } from "bun:test";
import { cardScale, springStep, type Spring } from "./motion";

describe("cardScale", () => {
  const vh = 1000;

  test("a card whose top is just entering at the bottom is at its smallest", () => {
    expect(cardScale(1000, vh)).toBeCloseTo(0.92, 5);
  });

  test("it reaches full size once its top is 35% down the screen, and stays there", () => {
    expect(cardScale(350, vh)).toBeCloseTo(1, 5);
    expect(cardScale(-400, vh)).toBe(1);
  });

  test("below the screen it stays at the smallest size", () => {
    expect(cardScale(1600, vh)).toBeCloseTo(0.92, 5);
  });

  test("in between, it grows steadily", () => {
    const half = cardScale(675, vh);
    expect(half).toBeGreaterThan(0.95);
    expect(half).toBeLessThan(0.97);
  });
});

describe("springStep", () => {
  const settle = (from: number, to: number, seconds: number) => {
    const spring: Spring = { value: from, velocity: 0 };
    const path: number[] = [];
    for (let t = 0; t < seconds; t += 1 / 120) {
      springStep(spring, to, 1 / 120);
      path.push(spring.value);
    }
    return { spring, path };
  };

  test("trails behind, then arrives at the target within half a second", () => {
    const { spring, path } = settle(0, 100, 0.5);
    expect(path[0]).toBeLessThan(10);
    expect(spring.value).toBeGreaterThan(98);
  });

  test("never noticeably overshoots", () => {
    const { path } = settle(0, 100, 1);
    expect(Math.max(...path)).toBeLessThan(101);
  });
});
