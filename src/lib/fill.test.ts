import { describe, expect, test } from "bun:test";
import { fill } from "./fill";

describe("fill", () => {
  test("puts each value in its placeholder", () => {
    expect(fill("Level {n}: {name}", { n: 2, name: "Tennis" })).toBe("Level 2: Tennis");
  });

  test("leaves a placeholder with no value as written", () => {
    expect(fill("Caught by {chaser}!", {})).toBe("Caught by {chaser}!");
  });
});
