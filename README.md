# Francisco Tuozzo — Portfolio

A modern, responsive personal portfolio website built to present Francisco Tuozzo's skills, projects, experience, and education to recruiters and potential employers.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for subtle animations
- [Lucide](https://lucide.dev/) icons

## Features

- Hero, About, Skills, Projects, Experience, Education, and Contact sections
- Dark mode by default with a light/dark toggle
- Fully responsive (mobile → desktop)
- Accessible markup, semantic HTML, and keyboard-friendly navigation
- SEO-ready: metadata, Open Graph tags, JSON-LD structured data, sitemap, and robots
- All content lives in one place: `src/data/portfolio.ts`

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Customizing content

Edit `src/data/portfolio.ts` to update your name, links, skills, projects,
experience, and education. The whole site reads from that single file.

### Add your assets

Drop these files into the `public/` folder (see `public/README.txt`):

- `Francisco-Tuozzo-Resume.pdf` — enables the résumé download buttons
- `profile.jpg` — optional profile photo
- `og-image.png` — optional social share image (1200×630)

## Build & deploy

```bash
npm run build
npm run start
```

The site is ready to deploy on [Vercel](https://vercel.com/) — just import the
repository and deploy. Remember to update the canonical URL in
`src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` to your
real domain.
