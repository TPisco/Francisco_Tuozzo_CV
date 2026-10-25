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

/**
 * Keyboard and on-screen buttons merged into one Input. Each source sets its
 * own flags, so letting go of a key doesn't release a finger still on a button.
 */
export class Controls {
  private keys: Input = { run: false, brake: false, jump: false, slide: false };
  private touch: Input = { run: false, brake: false, jump: false, slide: false };

  read(): Input {
    return {
      run: this.keys.run || this.touch.run,
      brake: this.keys.brake || this.touch.brake,
      jump: this.keys.jump || this.touch.jump,
      slide: this.keys.slide || this.touch.slide,
    };
  }

  press(control: Control, down: boolean): void {
    this.touch[control] = down;
  }

  releaseAll(): void {
    this.keys = { run: false, brake: false, jump: false, slide: false };
    this.touch = { ...this.keys };
  }

  /** Listens on the window; returns the function that stops listening. */
  attach(enabled: () => boolean): () => void {
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      const control = keyMap[e.code];
      if (!control) return;
      // A release always counts, or a key let go during an overlay would stay held.
      if (!down) {
        this.keys[control] = false;
        return;
      }
      // Presses only count while playing, so Space and arrows still work the overlays' buttons.
      if (!enabled()) return;
      e.preventDefault();
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
