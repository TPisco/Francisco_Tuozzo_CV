# Francisco Tuozzo, portfolio

The portfolio at [francisco-tuozzo.com](https://francisco-tuozzo.com): my projects, my CV, and a small game, in English, French and Spanish.

- **Work** (`/`): the headline and every project as a large card, each with a case study at `/projects/<id>`.
- **Info** (`/info`): experience, education, events, skills and contact, one card per section.
- **Play** (`/play`): games in their own bubbles. The first is *Run, Francisco!*, a five-level chase through places from my CV, played full screen at `/play/run-francisco`.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router). Every page is rendered to HTML at build time.
- [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3.4](https://tailwindcss.com/): the palette, radii and breakpoints are in `tailwind.config.ts`
- [Font Awesome](https://fontawesome.com/) icons; Albert Sans and Gloock through `next/font`
- [Bun](https://bun.sh/) to install packages and run the unit tests; [Playwright](https://playwright.dev/) for the browser tests
- Hosted on [Vercel](https://vercel.com/)

There is no animation library and no translation library: effects are CSS plus `src/lib/motion.ts`, and the three dictionaries live in `src/i18n/`.

## Getting started

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Checks

All of these must pass before a commit:

```bash
bun run lint
bunx tsc --noEmit
bun test
bun run build
```

Browser tests build the site into `.next-e2e`, serve it on port 3100 and click through it in Chromium. They need Node.js, and Chromium installed once with `bunx playwright install chromium`:

```bash
bun run test:e2e
```

## Where things live

```
src/
  app/
    (site)/            pages with the navbar and footer: Work, Info, Play, case studies
    (game)/play/[game] full-screen game pages
  components/          sections, project cards, case study, navbar, intro, play shell
  data/
    portfolio.ts       facts that don't change with the language: projects, links, the site's address
    games.ts           the list of games on the Play page
  games/run-francisco/ the game: levels, track generator, rules, drawing, tests
  i18n/                every string, in en.ts, fr.ts and es.ts
  lib/                 small helpers, each with tests
public/
  previews/            project posters and clips (generated, see public/README.txt)
  games/               game sprites, backgrounds and covers
  CV_Francisco_Tuozzo_*.pdf
e2e/                   browser tests
scripts/               make-preview.ps1, which cuts the project clips
```

## Common changes

- **Text.** Edit `src/i18n/en.ts`, `fr.ts` and `es.ts`. Every string must exist in all three: `src/i18n/types.ts` makes a missing one fail the build.
- **A project.** Add its id and metadata in `src/data/portfolio.ts`, its text in the three dictionaries, and its poster and clip with `scripts/make-preview.ps1` (see `public/README.txt`).
- **A game.** Follow the steps at the top of `src/data/games.ts`: a folder in `src/games/<slug>/`, one entry in the list, one line in `components/play/game-loader.tsx`, its card text in the three dictionaries and its cover in `public/games/<slug>/`.
- **Game difficulty.** Levels are in `src/games/run-francisco/levels.ts`. `balance.test.ts` and `track.test.ts` check that a careful player can finish every level, that the first one stays a tutorial, and that every level after it stays hard.
- **The résumé.** Replace `public/CV_Francisco_Tuozzo_EN.pdf`, `_FR.pdf` or `_ES.pdf`.

## Deploying

Vercel builds the site from this repository. `https://francisco-tuozzo.com` (no www) is the primary domain, and `www` should redirect to it. The address is set once, as `siteUrl` in `src/data/portfolio.ts`, and used by the metadata, the sitemap and robots.txt.
