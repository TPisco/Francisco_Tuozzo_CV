# What changed, why, and what it gained

Everything that changed on the `Redesing` branch, compared with the live site on `main` (last updated September 24, 2026). Grouped by part of the site. For each change: what it was before, why it changed, and what the site gained.

Numbers come from measurements on production builds, not estimates.

---

## Projects

### Two featured cards and a "few more" list → one list with a hover preview
- **Before:** two big featured projects, then the rest in a short "A few more, in brief" list. Visitors had to read before they saw anything.
- **Why:** recruiters skim. Every project should be one glance and one click away.
- **Gained:** one list where every row opens its case study. With a mouse, a card with a short clip followed the cursor, so you could see a project without opening it.

### Hover list → large project cards
- **Before:** the hover list above.
- **Why:** you chose a new presentation after perryw-2023.webflow.io, keeping the cream, ink and clay palette.
- **Gained:** every project now leads with real footage. Each card plays its silent clip only while it's on screen and grows slightly into place as you scroll. With reduced motion, it stays still and shows a poster instead.

### Soft 720 px clips → sharp 1280 px clips
- **Before:** the clips were cut for the small hover card.
- **Why:** on the large cards, up to about 980 px wide, they looked blurry.
- **Gained:** sharp clips that stay light (about 1 MB at most), all made by one script (`scripts/make-preview.ps1`).

### A list people didn't scroll → a list that says it's a list
- **Before:** the first project card filled the screen.
- **Why:** 4 of the 5 people you showed the site to thought the first project was the only one.
- **Gained:** "Selected work" with the number of projects and a jump link to each one, a counter like "01 / 07" on every card, and a "Next project" button that walks through the list.

### Missing recent work → Phase Shift, Orbital and the hackathon result
- **Before:** the site stopped at older projects, and the Qollab × IonQ result wasn't mentioned.
- **Why:** they are your newest and strongest work, and a judged result counts with recruiters.
- **Gained:** two new case studies with their own clips, the 2nd-of-14 result in Events, and a badge on Phase Shift that links to it.

### No client work → Lunayla's official site
- **Before:** Luna's site was left out of the first audit, because it wasn't clear it was live or that she agreed to it being shown.
- **Why:** it is live, and she agreed. It's the only project built for a real client, and recruiters can open it in one click.
- **Gained:** a case study in three languages with a "See it live" button (renamed from "Try it live" so it fits a website too) and a link to the public repo. Its clip is a scroll through the live site, recorded by `scripts/record-scroll.mjs`, so it can be re-recorded whenever her site changes.

### YouTube loading with every case study → a play button
- **Before:** each case study loaded YouTube's player straight away: 5.2 MB per page, 4.2 MB of it YouTube.
- **Why:** the page was heavy and slow, and set YouTube cookies before anyone pressed play.
- **Gained:** the same page now weighs 0.9 MB. The video loads only on click, through YouTube's privacy-enhanced player.

---

## Navigation

### One long page → Work, Info and Play
- **Before:** everything was on one long page, with six links to jump around it.
- **Why:** it followed the reference's structure, and the page had grown too long to scan.
- **Gained:** three clear destinations in a sliding pill, with the current page marked. Each one is short enough to take in.

### A navbar that broke in French → one line everywhere
- **Before:** at some widths the French and Spanish labels wrapped onto two lines or overflowed.
- **Why:** it looked broken in two of the three languages.
- **Gained:** the navbar stays on one line from 320 px phones to desktop, in every language.

### Missing logos → the original GitHub, LinkedIn and résumé logos
- **Before:** the first version of the redesign had dropped them.
- **Why:** you wanted them back, each sitting right next to its own label.
- **Gained:** each link is recognisable at a glance.

---

## Info page

### Sections on the home page → an Info page of bubbles
- **Before:** experience, education, events and contact were sections of the long home page.
- **Why:** you wanted the feel of marco.fyi/about, without photos.
- **Gained:** your whole CV fits in one short scroll on its own page. Skills were kept exactly as they were, as you asked.

### Many small bubbles → one card per section, two side by side
- **Before:** the first version split sections into many small cards.
- **Why:** you asked for one bubble per section.
- **Gained:** a calmer page with less repeated text. Hackathons sit next to education, so it reads faster.

### Pale background → a darker paper tone
- **Before:** near-white cards on a near-white page.
- **Why:** the cards didn't stand out, and some small grey text was too faint to read.
- **Gained:** the cards read clearly as cards, and every small label passes the WCAG AA contrast standard.

---

## Look and feel

### Inter and Fraunces → Albert Sans with a Gloock accent
- **Why:** the old pair is a very common default. The reference uses one sans-serif with a single serif accent word.
- **Gained:** a distinct look. One accent word per headline, like "why." in clay.

### A plain first load → your name written out
- **Why:** you wanted an intro like func.media.
- **Gained:** a memorable first impression that never gets in the way. It plays only on the home page, once per visit, and never for people who ask for reduced motion.

### Default pointer → a trailing circle
- **Why:** you asked for one.
- **Gained:** a small touch of polish. It appears only with a mouse and turns off with reduced motion.

---

## Accessibility

- **Before:** some text was below the contrast standard. An early version of the cards stayed stuck at 92% size with reduced motion. Menus didn't hand focus back when they closed.
- **Why:** you asked that everything be readable and usable by everyone, including blind and disabled visitors.
- **Gained:**
  - A "Skip to content" link.
  - Screen-reader text for icons, new-tab links and the "01 / 07" counters.
  - Menus that close on Escape and return focus to their button.
  - Menu rows at least 44 px tall on touch screens.
  - Contrast that passes WCAG AA.
  - Reduced motion respected everywhere: intro, cursor, card scaling and the game's background.

---

## Play and the game

### No games → a Play tab with Run, Francisco!
- **Why:** you wanted a quick, fun game like Extreme Pamplona, starring you, like dotconor.com's play section.
- **Gained:** the portfolio shows game development by being one. A recruiter can play it in about five minutes, with a keyboard or on a phone.

### One game → room for more
- **Why:** you want to add more games later as more bubbles.
- **Gained:**
  - Adding a game takes a folder, one line in `src/data/games.ts`, one line in the loader, and its card text.
  - A shared shell gives every game the same menu, pause, tutorial and way back to the site.

### Generated jump and slide → hand-posed moves
- **Before:** the generated animations bent the arms oddly and folded the body in on itself.
- **Why:** it looked wrong, as you pointed out.
- **Gained:** jump, slide, stumble, caught and fall are posed by hand in Blender and look natural.

### Flat levels → climbing levels
- **Why:** you wanted Extreme Pamplona's floors and platforms.
- **Gained:** blocks, stairs, and crossings over water and rooftops. A test checks that every climb is within jump reach, so no level is impossible.

### Easy-to-hard curve → a tutorial, then four hard levels
- **Before:** the levels got harder one by one, and only the last was truly hard.
- **Why:** you wanted every level after the first to be as hard as the last.
- **Gained:** the campus teaches the controls. Every level after it is at least as hard as the old final level, and the hackathon is harder still. A test bot proves each is still finishable with careful play, and that missing 1 obstacle in 8 gets you caught.

### Phones and fairness fixes
- **Before:** the chaser started before you could react, portrait phones were cramped, and scenery could be mistaken for obstacles.
- **Why:** a design review played it on phones.
- **Gained:**
  - The chaser waits for your first step.
  - A "rotate your phone" card, with "Play anyway".
  - Calmer backgrounds near the track.
  - Bigger, outlined tennis balls, with a warning before they arrive.

### Way out hidden in the menu → a button on the end screens
- **Before:** after getting caught or finishing all five levels, the only way back to the portfolio was through the Menu.
- **Why:** a visitor who is done playing shouldn't have to hunt for the exit.
- **Gained:** "Back to the portfolio" sits right under "Try again" and "Play again". The English pause menu's Resume button, which wrongly read "Résumé", was fixed at the same time.

---

## Speed

### Animation library → CSS and a few lines of code
- **Before:** framer-motion was shipped on every page for four simple effects.
- **Why:** it was a large download for fades and slides that CSS does natively.
- **Gained:** the same animations with less code (see the next change for the numbers).

### All three languages on every page → only the visitor's
- **Before:** every visitor downloaded English, French and Spanish.
- **Why:** each visitor reads one language.
- **Gained:** together with the change above, JavaScript per page went from about 200 KB to about 148 KB, and clicks got 15 to 40% faster on a throttled phone.

---

## Behind the scenes

### No tests → unit tests and browser tests
- **Before:** nothing checked the site automatically.
- **Why:** the redesign touched every page, in three languages.
- **Gained:**
  - 100 unit tests: translations complete, links, motion maths, game physics and level balance.
  - 21 browser tests that click through a real production build.
  - Lint, typecheck and build pass after every commit.

### Small robustness fixes
- **Before:** the site could fail with browser storage blocked (some private modes), and the footer year caused a warning after New Year.
- **Gained:** neither happens any more.

### Housekeeping
- **Before:**
  - The site's address was typed in four files.
  - The README described the old site.
  - `package.json` still had GitHub Pages scripts.
  - There were two lock files, one of them stale.
  - Text for a removed project was still in the dictionaries.
- **Why:** each was a trap for the next change.
- **Gained:**
  - The address is set once (`siteUrl` in `src/data/portfolio.ts`).
  - The README matches the site.
  - `bun.lock` is the only lock file.
  - No dead text left.
