import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import hero from "./assets/hero.json";
import props from "./assets/props.json";
import { levels } from "./levels";
import { heroSprites, type SpriteMeta } from "./sprites";

const catalog: Record<string, SpriteMeta> = { ...props.sprites, ...hero.sprites };

describe("sprites", () => {
  test("every sprite the levels and the hero use is in a manifest, and its sheet exists", () => {
    const names = new Set<string>([...heroSprites, "coffee", "tennisBall"]);
    for (const level of levels) {
      names.add(level.chaser.sprite);
      level.obstacles.forEach((o) => names.add(o.sprite));
    }
    for (const name of names) {
      const meta = catalog[name];
      expect(meta, name).toBeDefined();
      expect(existsSync(join(process.cwd(), "public", meta.file)), meta.file).toBe(true);
    }
  });

  test("each obstacle collides where its art is: within 10% of the rendered sprite's box", () => {
    for (const level of levels) {
      for (const o of level.obstacles) {
        const box = catalog[o.sprite].hitbox!;
        expect(Math.abs(o.w - box.w) / box.w, `${o.sprite} width`).toBeLessThanOrEqual(0.1);
        expect(Math.abs(o.h - box.h) / box.h, `${o.sprite} height`).toBeLessThanOrEqual(0.1);
      }
    }
  });
});
