import { OVERHEAD_CLEARANCE, type LevelConfig } from "./levels";
import { BALL_HEIGHT, BALL_SPEED, PLAYER_HEIGHT, SLIDE_HEIGHT } from "./physics";
import type { RunState } from "./simulation";
import { SPRITE_PX_PER_METER, type HeroSprite, type SpriteBank } from "./sprites";

/** How the world maps onto the canvas: Francisco stays at 30% of the width, the ground at 80% of the height. */
export type View = { width: number; height: number; ppm: number; groundY: number; anchorX: number };

/**
 * At least 17 m of track across and 6.5 m of height, whichever is tighter: with
 * Francisco at 30%, that's about 12 m (over a second at full speed) of warning ahead.
 * `bottomReserve` (device pixels) keeps the track above on-screen touch buttons.
 */
export function viewFor(width: number, height: number, bottomReserve = 0): View {
  const ppm = Math.min(height / 6.5, width / 17);
  const groundY = Math.round(Math.min(height * 0.8, height - bottomReserve));
  return { width, height, ppm, groundY, anchorX: width * 0.3 };
}

/** Where to draw the moving things this frame: between the last two simulation steps. */
export type Pose = { px: number; py: number; cx: number };

export type Backgrounds = Map<string, HTMLImageElement>;

type Scene = {
  ctx: CanvasRenderingContext2D;
  view: View;
  sprites: SpriteBank;
  background: HTMLImageElement | undefined;
  /** Seconds since the page opened, for idle animation. */
  clock: number;
  reducedMotion: boolean;
  /** The chase warnings (red edge, distance tag) only make sense during a run. */
  chasing: boolean;
  /** Interpolated positions; defaults to the state's own. */
  pose?: Pose;
  /** Device pixels per CSS pixel, so text and outlines keep a readable size on dense screens. */
  dpr: number;
};

const INK = "#231f1a";
const CREAM = "#efe8dd";
const CLAY = "#c2603f";

export function drawFrame(scene: Scene, state: RunState) {
  const { ctx, view } = scene;
  const level = state.track.level;
  const pose = scene.pose ?? { px: state.player.x, py: state.player.y, cx: state.chaser.x };
  const camera = pose.px;
  // A small shake on a stumble, unless the visitor asked for less motion.
  const shake = !scene.reducedMotion && state.player.stumble > 0.45 ? Math.sin(scene.clock * 90) * 3 : 0;

  const sx = (x: number) => view.anchorX + (x - camera) * view.ppm + shake;
  const sy = (y: number) => view.groundY - y * view.ppm;

  drawBackdrop(scene, level, camera);
  drawGround(scene, state, sx);
  drawFinish(scene, level, sx, sy);

  // On a night level, sprites get a soft light rim so they stand off the dark city.
  const rim = (draw: () => void) => {
    if (!level.night) return draw();
    ctx.save();
    ctx.shadowColor = "rgba(255,241,224,0.75)";
    ctx.shadowBlur = 5 * scene.dpr;
    draw();
    ctx.restore();
  };

  for (let i = 0; i < state.track.obstacles.length; i++) {
    const o = state.track.obstacles[i];
    const left = sx(o.x);
    if (left > view.width + 200 || left + o.spec.w * view.ppm < -200) continue;
    const base = o.spec.kind === "overhead" ? OVERHEAD_CLEARANCE : 0;
    if (o.spec.kind === "overhead") {
      // Cables up to the top of the screen, so a hanging hazard reads as hanging.
      ctx.strokeStyle = "rgba(35,31,26,0.45)";
      ctx.lineWidth = Math.max(1, view.ppm * 0.03);
      for (const fx of [0.15, 0.85]) {
        ctx.beginPath();
        ctx.moveTo(left + o.spec.w * view.ppm * fx, 0);
        ctx.lineTo(left + o.spec.w * view.ppm * fx, sy(base + o.spec.h));
        ctx.stroke();
      }
    }
    const knocked = state.obstaclesHit[i];
    if (o.spec.kind === "low") drawShadow(scene, sx(o.x + o.spec.w / 2), o.spec.w * 1.1, 0);
    rim(() =>
      drawThing(scene, o.spec.sprite, sx(o.x + o.spec.w / 2), sy(base), {
        w: o.spec.w,
        h: o.spec.h,
        alpha: knocked ? 0.45 : 1,
        tilt: knocked && o.spec.kind === "low" ? 0.35 : 0,
        color: level.palette.groundEdge,
      }),
    );
  }

  state.track.coffees.forEach((cup, i) => {
    if (state.coffeesTaken[i]) return;
    const bob = scene.reducedMotion ? 0 : Math.sin(scene.clock * 4 + i) * 0.06;
    drawThing(scene, "coffee", sx(cup.x), sy(cup.y - 0.16 + bob), { w: 0.22, h: 0.32, color: CREAM, glow: true });
  });

  for (const ball of state.balls) {
    const x = sx(ball.x);
    const y = sy(BALL_HEIGHT);
    const r = Math.max(5 * scene.dpr, view.ppm * 0.12);
    if (x < -r) {
      // Still off screen to the left: a pulsing chip at head height, about a second ahead of it.
      const secondsAway = -x / view.ppm / Math.max(1, BALL_SPEED - state.player.vx);
      if (secondsAway < 1.2) {
        const pulse = scene.reducedMotion ? 1 : 0.7 + Math.sin(scene.clock * 14) * 0.3;
        ctx.fillStyle = `rgba(255,253,250,${0.95 * pulse})`;
        ctx.beginPath();
        ctx.arc(14 * scene.dpr + r, y, r * 1.8, 0, Math.PI * 2);
        ctx.fill();
        drawBall(ctx, 14 * scene.dpr + r, y, r, scene.dpr);
      }
      continue;
    }
    ctx.fillStyle = "rgba(207,220,87,0.6)";
    ctx.fillRect(x - view.ppm * 1.1, y - r * 0.45, view.ppm * 1.1, r * 0.9);
    drawBall(ctx, x, y, r, scene.dpr);
  }

  rim(() => drawChaser(scene, state, pose, sx, sy));
  rim(() => drawHero(scene, state, pose, sx, sy));
  if (scene.chasing) drawDanger(scene, state, pose, sx);
  if (level.weather === "snow") drawSnow(scene, camera);
  if (state.player.boost > 0) drawSpeedLines(scene, state, sy);
}

function drawBackdrop(scene: Scene, level: LevelConfig, camera: number) {
  const { ctx, view, background } = scene;
  ctx.fillStyle = level.palette.sky;
  ctx.fillRect(0, 0, view.width, view.height);
  if (!background || !background.complete || background.naturalWidth === 0) return;
  const tile = backdropTile(background, level);
  // Scale so the picture's flat ground band meets the track, then tile it slowly behind (parallax 0.25).
  const scale = view.groundY / (background.naturalHeight * level.bandStart);
  const w = tile.width * scale;
  const h = tile.height * scale;
  const offset = (camera * view.ppm * 0.25) % w;
  for (let x = -offset; x < view.width; x += w) ctx.drawImage(tile, x, 0, w, h);
}

const tiles = new WeakMap<HTMLImageElement, HTMLCanvasElement>();
/** Share of the picture's width crossfaded into its start, so it repeats without a seam. */
const SEAM = 0.12;

/**
 * Prepares a level's background once: slightly softened (less saturation and
 * contrast), hazed toward the sky colour near the track so scenery never reads
 * as an obstacle, and made seamless by crossfading its right end into its left.
 */
function backdropTile(image: HTMLImageElement, level: LevelConfig): HTMLCanvasElement {
  const cached = tiles.get(image);
  if (cached) return cached;
  const W = image.naturalWidth;
  const H = image.naturalHeight;
  const overlap = Math.round(W * SEAM);
  const canvas = document.createElement("canvas");
  canvas.width = W - overlap;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.filter = "saturate(0.85) contrast(0.9)";
  ctx.drawImage(image, 0, 0);
  // The picture's right end, fading out over the first `overlap` pixels: continuous both ways.
  const fade = document.createElement("canvas");
  fade.width = overlap;
  fade.height = H;
  const f = fade.getContext("2d")!;
  f.filter = "saturate(0.85) contrast(0.9)";
  f.drawImage(image, W - overlap, 0, overlap, H, 0, 0, overlap, H);
  f.filter = "none";
  f.globalCompositeOperation = "destination-in";
  const mask = f.createLinearGradient(0, 0, overlap, 0);
  mask.addColorStop(0, "rgba(0,0,0,1)");
  mask.addColorStop(1, "rgba(0,0,0,0)");
  f.fillStyle = mask;
  f.fillRect(0, 0, overlap, H);
  ctx.filter = "none";
  ctx.drawImage(fade, 0, 0);
  // Haze from 55% of the height down to the ground band.
  const haze = ctx.createLinearGradient(0, H * 0.55, 0, H * level.bandStart);
  haze.addColorStop(0, hexToRgba(level.palette.sky, 0));
  haze.addColorStop(1, hexToRgba(level.palette.sky, level.night ? 0.22 : 0.32));
  ctx.fillStyle = haze;
  ctx.fillRect(0, H * 0.55, canvas.width, H * (level.bandStart - 0.55) + 2);
  tiles.set(image, canvas);
  return canvas;
}

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, dpr: number) {
  ctx.fillStyle = "#cfdc57";
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawGround(scene: Scene, state: RunState, sx: (x: number) => number) {
  const { ctx, view } = scene;
  const { palette } = state.track.level;
  const edge = Math.max(4, view.ppm * 0.16);
  ctx.fillStyle = palette.ground;
  ctx.fillRect(0, view.groundY, view.width, view.height - view.groundY);
  ctx.fillStyle = palette.groundEdge;
  ctx.fillRect(0, view.groundY, view.width, edge);

  // Ticks every 2 m sell the speed.
  ctx.fillStyle = "rgba(35,31,26,0.12)";
  const first = Math.floor((state.player.x - 15) / 2) * 2;
  for (let x = first; x < state.player.x + 25; x += 2) {
    ctx.fillRect(sx(x), view.groundY + edge + view.ppm * 0.25, view.ppm * 0.5, Math.max(2, view.ppm * 0.05));
  }

  for (const patch of state.track.ice) {
    const x = sx(patch.x);
    const w = patch.w * view.ppm;
    if (x > view.width || x + w < 0) continue;
    ctx.fillStyle = "rgba(214,235,248,0.85)";
    ctx.fillRect(x, view.groundY - 2, w, edge + 4);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    for (let i = 0.15; i < 1; i += 0.3) ctx.fillRect(x + w * i, view.groundY + 1, w * 0.12, 2);
  }

  for (const gap of state.track.gaps) {
    const x = sx(gap.x);
    const w = gap.w * view.ppm;
    if (x > view.width || x + w < 0) continue;
    ctx.fillStyle = palette.gap;
    ctx.fillRect(x, view.groundY, w, view.height - view.groundY);
    ctx.fillStyle = "rgba(35,31,26,0.35)";
    ctx.fillRect(x, view.groundY, Math.max(2, view.ppm * 0.06), view.height - view.groundY);
    ctx.fillRect(x + w - Math.max(2, view.ppm * 0.06), view.groundY, Math.max(2, view.ppm * 0.06), view.height - view.groundY);
  }
}

function drawFinish(scene: Scene, level: LevelConfig, sx: (x: number) => number, sy: (y: number) => number) {
  const { ctx, view } = scene;
  const x = sx(level.length);
  if (x < -200 || x > view.width + 200) return;
  const post = Math.max(3, view.ppm * 0.08);
  const top = sy(2.7);
  ctx.fillStyle = INK;
  ctx.fillRect(x - view.ppm * 1.6, top, post, view.groundY - top);
  ctx.fillRect(x + view.ppm * 1.6, top, post, view.groundY - top);
  const cell = view.ppm * 0.2;
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillStyle = (i + j) % 2 ? CREAM : INK;
      ctx.fillRect(x - view.ppm * 1.6 + i * cell, top + j * cell, cell, cell);
    }
  }
  ctx.fillStyle = CLAY;
  ctx.fillRect(x - view.ppm * 1.6, top + cell * 2, cell * 16 + post, cell * 0.6);
}

function drawChaser(scene: Scene, state: RunState, pose: Pose, sx: (x: number) => number, sy: (y: number) => number) {
  const { track } = state;
  const chaser = { x: pose.cx };
  const name = track.level.chaser.sprite;
  const frame = Math.floor(scene.clock * 14);
  if (name === "bug") {
    // A small swarm, each bug on its own beat.
    const offsets = [0, -0.7, -1.3, -0.4, -1.9];
    offsets.forEach((dx, i) => {
      const hop = (scene.reducedMotion ? 0 : Math.abs(Math.sin(scene.clock * 9 + i * 1.7)) * 0.18) + (i % 2) * 0.35;
      drawThing(scene, "bug", sx(chaser.x - 0.3 + dx), sy(hop), { w: 0.55, h: 0.4, color: INK, frame: frame + i * 3 });
    });
    return;
  }
  const size = chaserSizes[name] ?? { w: 2, h: 2 };
  drawShadow(scene, sx(chaser.x - size.w / 2), size.w * 1.05, 0);
  drawThing(scene, name, sx(chaser.x - size.w / 2), sy(0), { ...size, color: CLAY, frame });
}

const chaserSizes: Record<string, { w: number; h: number }> = {
  ballMachine: { w: 1.2, h: 1.3 },
  forklift: { w: 2.8, h: 2.3 },
  snowplow: { w: 4.85, h: 2.8 },
  deadlineClock: { w: 1.3, h: 1.95 },
};

function heroSpriteFor(state: RunState): HeroSprite {
  const p = state.player;
  if (state.outcome === "fell" || p.falling) return "heroFall";
  if (state.outcome === "caught") return "heroCaught";
  if (p.stumble > 0) return "heroStumble";
  if (p.slide > 0) return "heroSlide";
  if (!p.onGround) return "heroJump";
  if (p.vx > 0.4) return "heroRun";
  return "heroIdle";
}

function drawHero(scene: Scene, state: RunState, pose: Pose, sx: (x: number) => number, sy: (y: number) => number) {
  const { ctx, view } = scene;
  const p = state.player;
  const name = heroSpriteFor(state);
  const sprite = scene.sprites.get(name);
  const x = sx(pose.px);
  const y = sy(pose.py);
  if (!p.falling) drawShadow(scene, x, p.slide > 0 ? 1.3 : 0.7, pose.py);
  if (sprite) {
    let frame = 0;
    const count = sprite.meta.frames;
    // The run cycle advances with distance, so feet never skate.
    if (name === "heroRun") frame = Math.floor((pose.px / 2.4) * count) % count;
    else if (name === "heroJump") frame = Math.min(count - 1, Math.max(0, Math.round(((7 - p.vy) / 14) * (count - 1))));
    else frame = Math.floor(scene.clock * 12) % count;
    drawSprite(scene, name, x, y, frame);
    return;
  }

  // Placeholder: a rounded figure in Francisco's black tee, until the rendered sheets load.
  const h = (p.slide > 0 ? SLIDE_HEIGHT : PLAYER_HEIGHT) * view.ppm;
  const w = 0.45 * view.ppm;
  ctx.save();
  ctx.translate(x, y);
  if (p.stumble > 0) ctx.rotate(0.25);
  if (p.slide > 0) ctx.rotate(-0.15);
  ctx.fillStyle = INK;
  roundRect(ctx, -w / 2, -h * 0.82, w, h * 0.82, w * 0.4);
  ctx.fill();
  ctx.fillStyle = "#e9c3a3";
  ctx.beginPath();
  ctx.arc(0, -h * 0.88, w * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2e211a";
  ctx.beginPath();
  ctx.arc(-w * 0.05, -h * 0.97, w * 0.4, Math.PI, Math.PI * 2.1);
  ctx.fill();
  ctx.restore();
}

/** A soft contact shadow on the ground, smaller and fainter the higher the thing is. */
function drawShadow(scene: Scene, x: number, width: number, height: number) {
  const { ctx, view } = scene;
  const k = 1 / (1 + height * 0.8);
  ctx.fillStyle = `rgba(35,31,26,${0.22 * k})`;
  ctx.beginPath();
  ctx.ellipse(x, view.groundY + view.ppm * 0.02, (width * view.ppm * k) / 2, view.ppm * 0.07 * k, 0, 0, Math.PI * 2);
  ctx.fill();
}

/** A reddish edge and a distance tag when the chaser is close or off screen behind. */
function drawDanger(scene: Scene, state: RunState, pose: Pose, sx: (x: number) => number) {
  const { ctx, view } = scene;
  const lead = pose.px - pose.cx;
  const danger = Math.max(0, Math.min(1, 1 - (lead - 1) / 7));
  if (danger > 0) {
    const pulse = scene.reducedMotion ? 1 : 0.75 + Math.sin(scene.clock * 10) * 0.25;
    const gradient = ctx.createLinearGradient(0, 0, view.width * 0.25, 0);
    gradient.addColorStop(0, `rgba(164,73,44,${0.45 * danger * pulse})`);
    gradient.addColorStop(1, "rgba(164,73,44,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, view.width * 0.25, view.height);
  }
  if (sx(pose.cx) < 0 && state.outcome === "running") {
    const size = Math.max(14 * scene.dpr, view.ppm * 0.28);
    const y = view.groundY - view.ppm * 1.2;
    ctx.fillStyle = "rgba(255,253,250,0.92)";
    roundRect(ctx, 10, y - size, size * 3.6, size * 1.6, size * 0.8);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = `600 ${size * 0.8}px system-ui, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.fillText(`◀ ${Math.max(0, Math.round(lead))} m`, 10 + size * 0.5, y - size * 0.2);
  }
}

function drawSnow(scene: Scene, camera: number) {
  const { ctx, view } = scene;
  // With reduced motion the flakes stay put (a snowy scene, not a moving one).
  const t = scene.reducedMotion ? 0 : scene.clock;
  const pan = scene.reducedMotion ? 0 : camera * view.ppm * 0.6;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  for (let i = 0; i < 70; i++) {
    const seed = (i * 9301 + 49297) % 233280;
    const x = ((seed % view.width) - pan + t * 20 * (1 + (i % 3))) % view.width;
    const y = (((seed * 7) % view.height) + t * (40 + (i % 5) * 15)) % view.height;
    const size = (2 + (i % 2)) * scene.dpr;
    ctx.fillRect((x + view.width) % view.width, y, size, size);
  }
}

function drawSpeedLines(scene: Scene, state: RunState, sy: (y: number) => number) {
  const { ctx, view } = scene;
  ctx.strokeStyle = "rgba(255,253,250,0.7)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    const y = sy(state.player.y + 0.2 + i * 0.25);
    const x = view.anchorX - view.ppm * (0.6 + ((scene.clock * 8 + i * 0.37) % 1) * 1.2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - view.ppm * 0.7, y);
    ctx.stroke();
  }
}

type ThingOptions = { w: number; h: number; color: string; alpha?: number; tilt?: number; frame?: number; glow?: boolean };

/** Draws a sprite anchored at its base centre (x, y), or a labelled-free rounded block of the right size. */
function drawThing(scene: Scene, name: string, x: number, y: number, o: ThingOptions) {
  const { ctx, view } = scene;
  ctx.save();
  ctx.globalAlpha = o.alpha ?? 1;
  if (o.tilt) {
    ctx.translate(x, y);
    ctx.rotate(o.tilt);
    ctx.translate(-x, -y);
  }
  if (!drawSprite(scene, name, x, y, o.frame ?? 0)) {
    const w = o.w * view.ppm;
    const h = o.h * view.ppm;
    if (o.glow) {
      ctx.fillStyle = "rgba(255,241,224,0.6)";
      ctx.beginPath();
      ctx.arc(x, y - h / 2, Math.max(w, h) * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = o.color;
    ctx.strokeStyle = INK;
    ctx.lineWidth = Math.max(1.5, view.ppm * 0.025);
    roundRect(ctx, x - w / 2, y - h, w, h, Math.min(w, h) * 0.25);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

/** Draws frame `frame` of a loaded sheet with its anchor at (x, y), scaled to the view. Returns false if not loaded. */
function drawSprite(scene: Scene, name: string, x: number, y: number, frame: number): boolean {
  const sprite = scene.sprites.get(name);
  if (!sprite) return false;
  const { meta, image } = sprite;
  const scale = scene.view.ppm / SPRITE_PX_PER_METER;
  const f = ((frame % meta.frames) + meta.frames) % meta.frames;
  scene.ctx.drawImage(
    image,
    f * meta.frameWidth,
    0,
    meta.frameWidth,
    meta.frameHeight,
    x - meta.anchorX * scale,
    y - meta.anchorY * scale,
    meta.frameWidth * scale,
    meta.frameHeight * scale,
  );
  return true;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}
