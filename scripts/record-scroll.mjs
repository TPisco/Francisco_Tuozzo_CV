/**
 * Records a smooth scroll through a live web page, as the video source for a
 * project's clip (see make-preview.ps1). Used for projects that are websites
 * and have no demo video of their own.
 *
 *   node scripts/record-scroll.mjs <slug> <url> <scrollTo>
 *
 * Writes .cache/previews/<slug>.mp4: a 1280x720 view rendered at 2x, 30 fps,
 * 5.5 s long. It holds on the first screen, eases down to <scrollTo> px, then
 * holds there. The page is shown with reduced motion, so marquees and reveals
 * stand still and every frame is sharp. Needs Node.js (to launch Chromium)
 * and ffmpeg.
 */
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const [slug, url, scrollTo] = process.argv.slice(2);
if (!slug || !url || !scrollTo) {
  console.error("Usage: node scripts/record-scroll.mjs <slug> <url> <scrollTo>");
  process.exit(1);
}

const FPS = 30;
const HOLD_START = 0.9;
const SCROLL = 3.8;
const HOLD_END = 0.8;
const target = Number(scrollTo);

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Scroll position at time `t` seconds into the clip. */
function scrollAt(t) {
  if (t <= HOLD_START) return 0;
  if (t >= HOLD_START + SCROLL) return target;
  return Math.round(target * easeInOutCubic((t - HOLD_START) / SCROLL));
}

const frames = mkdtempSync(join(tmpdir(), `${slug}-frames-`));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    locale: "en-US",
  });
  await page.goto(url, { waitUntil: "networkidle" });

  // Scroll through the filmed stretch once so its lazy images load, then wait for them.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Math.min(height, target + 1440); y += 400) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(100);
  }
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(
    (bottom) =>
      [...document.images]
        .filter((image) => image.getBoundingClientRect().top + window.scrollY < bottom)
        .every((image) => image.complete),
    target + 720,
  );

  const total = Math.round((HOLD_START + SCROLL + HOLD_END) * FPS);
  for (let frame = 0; frame < total; frame++) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), scrollAt(frame / FPS));
    await page.screenshot({ path: join(frames, `${String(frame).padStart(4, "0")}.png`) });
  }
} finally {
  await browser.close();
}

const cache = resolve(".cache", "previews");
mkdirSync(cache, { recursive: true });
const output = join(cache, `${slug}.mp4`);
execFileSync("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y",
  "-framerate", String(FPS), "-i", join(frames, "%04d.png"),
  "-c:v", "libx264", "-preset", "slow", "-crf", "12", "-pix_fmt", "yuv420p",
  output,
], { stdio: "inherit" });
rmSync(frames, { recursive: true, force: true });
console.log(`${slug}: recorded ${output}`);
