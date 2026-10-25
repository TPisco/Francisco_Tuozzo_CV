import { describe, expect, test } from "bun:test";
import { getActiveTab } from "./navigation";

describe("getActiveTab", () => {
  test("the home page is Work", () => {
    expect(getActiveTab("/")).toBe("work");
  });

  test("a project case study belongs to Work", () => {
    expect(getActiveTab("/projects/phaseshift")).toBe("work");
  });

  test("the Info page is Info", () => {
    expect(getActiveTab("/info")).toBe("info");
  });

  test("the Play page is Play", () => {
    expect(getActiveTab("/play")).toBe("play");
  });

  test("a game belongs to Play", () => {
    expect(getActiveTab("/play/run-francisco")).toBe("play");
  });

  test("a trailing slash does not change the tab", () => {
    expect(getActiveTab("/info/")).toBe("info");
  });

  test("a page outside both has no active tab", () => {
    expect(getActiveTab("/not-a-page")).toBeNull();
  });
});
