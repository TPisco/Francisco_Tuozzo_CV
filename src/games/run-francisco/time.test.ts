import { describe, expect, test } from "bun:test";
import { formatTime } from "./time";

describe("formatTime", () => {
  test("shows minutes, seconds and hundredths", () => {
    expect(formatTime(34.216)).toBe("0:34.21");
    expect(formatTime(125.5)).toBe("2:05.50");
  });

  test("starts at zero", () => {
    expect(formatTime(0)).toBe("0:00.00");
  });
});
