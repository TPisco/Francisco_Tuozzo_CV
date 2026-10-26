import type { Input } from "./simulation";

type Control = keyof Input;

const keyMap: Record<string, Control> = {
  ArrowRight: "run",
  KeyD: "run",
  ArrowLeft: "brake",
  KeyA: "brake",
  Space: "jump",
  ArrowUp: "jump",
  KeyW: "jump",
  ArrowDown: "slide",
  KeyS: "slide",
};

const none = (): Input => ({ run: false, brake: false, jump: false, slide: false });

/**
 * Keyboard and on-screen buttons merged into one Input. Each source keeps its
 * own flags, so letting go of a key doesn't release a finger still on a button.
 * A jump or slide press is remembered until a simulation step reads it, so a
 * quick tap that falls between two frames still counts.
 */
export class Controls {
  private keys = none();
  private touch = none();
  private tapped = { jump: false, slide: false };

  /** The input for one simulation step; consumes remembered taps. */
  read(): Input {
    const input = {
      run: this.keys.run || this.touch.run,
      brake: this.keys.brake || this.touch.brake,
      jump: this.keys.jump || this.touch.jump || this.tapped.jump,
      slide: this.keys.slide || this.touch.slide || this.tapped.slide,
    };
    this.tapped = { jump: false, slide: false };
    return input;
  }

  /** True while any game key or button is still down. */
  anyHeld(): boolean {
    return Object.values(this.keys).some(Boolean) || Object.values(this.touch).some(Boolean);
  }

  press(control: Control, down: boolean): void {
    this.touch[control] = down;
    if (down && (control === "jump" || control === "slide")) this.tapped[control] = true;
  }

  releaseAll(): void {
    this.keys = none();
    this.touch = none();
    this.tapped = { jump: false, slide: false };
  }

  /**
   * Listens on the window; returns the function that stops listening.
   * `allows(control)` says whether a press counts right now (the game lets run
   * and brake be held during the level card, everything else only while playing).
   */
  attach(allows: (control: Control) => boolean): () => void {
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      const control = keyMap[e.code];
      if (!control) return;
      // A release always counts, or a key let go during an overlay would stay held.
      if (!down) {
        this.keys[control] = false;
        return;
      }
      // Other presses are left alone, so Space and arrows still work the overlays' buttons.
      if (!allows(control)) return;
      e.preventDefault();
      if (!e.repeat && (control === "jump" || control === "slide")) this.tapped[control] = true;
      this.keys[control] = true;
    };
    const keydown = onKey(true);
    const keyup = onKey(false);
    const blur = () => this.releaseAll();
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      window.removeEventListener("blur", blur);
    };
  }
}
