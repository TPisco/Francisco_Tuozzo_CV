Place static assets here.

The "Download résumé" buttons serve one PDF per language. The paths are wired
up in src/data/portfolio.ts (resumeByLocale):
  public/CV_Francisco_Tuozzo_EN.pdf
  public/CV_Francisco_Tuozzo_FR.pdf
  public/CV_Francisco_Tuozzo_ES.pdf

logos/  holds the SVGs for the scrolling tech strip (devicon, MIT licensed).

previews/  holds the project media: <id>.mp4 (silent 1280px clip, played in the
project cards) and <id>-720.webp / <id>-1440.webp (posters, also used on the
detail pages).
Don't edit them by hand. Set the source and timing in scripts/previews.json,
then regenerate from the repo root (PowerShell; needs yt-dlp and ffmpeg):
  powershell -ExecutionPolicy Bypass -File .\scripts\make-preview.ps1 -Slug <id>     one project
  powershell -ExecutionPolicy Bypass -File .\scripts\make-preview.ps1 -All           every project
  powershell -ExecutionPolicy Bypass -File .\scripts\make-preview.ps1 -Slug <id> -ContactSheet
      (a grid of frames, to pick a new start time)

You can also add:
  public/profile.jpg   (profile photo)
  public/og-image.png  (social share / Open Graph image, 1200x630)
