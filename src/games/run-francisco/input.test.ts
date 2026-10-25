import { describe, expect, test } from "bun:test";
import { Controls } from "./input";

describe("Controls", () => {
  test("a tap that ends before the next step still jumps, once", () => {
    const controls = new Controls();
    controls.press("jump", true);
    controls.press("jump", false);
    expect(controls.read().jump).toBe(true);
    expect(controls.read().jump).toBe(false);
  });

  test("a held button stays held across steps", () => {
    const controls = new Controls();
    controls.press("run", true);
    expect(controls.read().run).toBe(true);
    expect(controls.read().run).toBe(true);
    expect(controls.anyHeld()).toBe(true);
    controls.press("run", false);
    expect(controls.anyHeld()).toBe(false);
  });

  test("releasing everything forgets taps too", () => {
    const controls = new Controls();
    controls.press("slide", true);
    controls.releaseAll();
    expect(controls.read()).toEqual({ run: false, brake: false, jump: false, slide: false });
  });
});
