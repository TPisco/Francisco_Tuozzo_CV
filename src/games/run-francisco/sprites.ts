import hero from "./assets/hero.json";
import props from "./assets/props.json";

/**
 * One sprite sheet: frames side by side in a single WebP, rendered in Blender
 * at `pxPerMeter` (see the manifests in ./assets). `anchorX/anchorY` is where
 * the thing touches the ground inside a frame.
 */
export type SpriteMeta = {
  file: string;
  frames: number;
  frameWidth: number;
  frameHeight: number;
  anchorX: number;
  anchorY: number;
  hitbox?: { w: number; h: number };
};

type Manifest = { pxPerMeter: number; sprites: Record<string, SpriteMeta> };

const manifests = [props, hero] as unknown as Manifest[];

/** Pixels per metre the sheets were rendered at. */
export const SPRITE_PX_PER_METER = 160;

const catalog: Record<string, SpriteMeta> = Object.assign({}, ...manifests.map((m) => m.sprites));

export type LoadedSprite = { meta: SpriteMeta; image: HTMLImageElement };

/**
 * Loads sheets on demand and hands back only finished ones, so the renderer can
 * draw a simple placeholder shape until (or unless) a sheet is there.
 */
export class SpriteBank {
  private images = new Map<string, HTMLImageElement>();
  private ready = new Set<string>();

  preload(names: string[]): void {
    for (const name of names) {
      const meta = catalog[name];
      if (!meta || this.images.has(name)) continue;
      const image = new Image();
      image.decoding = "async";
      image.onload = () => this.ready.add(name);
      image.src = meta.file;
      this.images.set(name, image);
    }
  }

  get(name: string): LoadedSprite | null {
    if (!this.ready.has(name)) return null;
    return { meta: catalog[name], image: this.images.get(name)! };
  }
}

/** Every hero animation, by the player's situation. */
export const heroSprites = ["heroRun", "heroJump", "heroSlide", "heroStumble", "heroFall", "heroCaught", "heroIdle"] as const;
export type HeroSprite = (typeof heroSprites)[number];
