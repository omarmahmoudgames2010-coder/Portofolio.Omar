# Portofolio.Omar — Omar Dev.

Public portfolio of Omar Mahmoud — **Developer & Digital Creator**.
Static, client-side site (no backend, no database, no accounts), hosted free on GitHub Pages.

Live URL (after the first successful deployment):
`https://omarmahmoudgames2010-coder.github.io/Portofolio.Omar/`

## Status

Stage 1 of 5 — **foundation**. What exists today:

- Vite + React + TypeScript project, configured for the GitHub Pages sub-path `/Portofolio.Omar/`.
- Arabic (default, RTL) and English (LTR) with a central translation system and a language switch.
- Working WhatsApp and email links (URL-encoded, pre-filled, no fake form submissions).
- Central project data with an honesty rule: only verified projects can be public.
- GitHub Actions workflow that checks, builds and deploys.

Not built yet: the 3D world, portals, robot guide, About / Skills / Projects / Services sections, audio.

## Requirements

Node.js **20.19 or newer** (22 recommended) and npm.

## Commands

```bash
npm install        # install dependencies (creates package-lock.json the first time)
npm run dev        # local dev server
npm run check      # contact-link and content-integrity checks
npm run typecheck  # TypeScript, strict
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally to test the built site
```

`npm run dev` and `npm run preview` serve the site under `/Portofolio.Omar/`
(for example `http://localhost:5173/Portofolio.Omar/`). To test at the root instead,
run with `VITE_BASE=/` (macOS/Linux: `VITE_BASE=/ npm run dev`).

## Deploying to GitHub Pages

1. Push the files to the repository's default branch (`main` or `master`).
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one time).
3. Open the **Actions** tab and wait for "Build and deploy to GitHub Pages" to turn green.
4. Open the live URL above and check it in a browser.

After your first local `npm install`, commit the generated `package-lock.json`.
The workflow then uses `npm ci`, which gives reproducible builds.

The base path `/Portofolio.Omar/` is set in `vite.config.ts` and is case-sensitive.
If the repository is ever renamed, change it there.

## Project structure

```
index.html                 entry page (fonts, language pre-set, no-JS fallback links)
vite.config.ts             base path for GitHub Pages
scripts/check.ts           contact + content integrity checks (run in CI)
src/
  main.tsx, App.tsx        app entry and page
  components/              UI pieces (language switch, contact links)
  i18n/                    translation system: ar.ts, en.ts, provider, hook
  data/projects.ts         project data (single place to edit)
  lib/contact.ts           WhatsApp / mailto link builders
  styles/global.css        design tokens and base styles
.github/workflows/deploy.yml
```

## Everyday edits

**Add or edit a project** — open `src/data/projects.ts`, copy an entry, change the `id`,
write the Arabic and English text, list only technologies the project really uses, and set
`visible: true` once everything in the description is true. `npm run check` fails if a
visible project is incomplete or not marked `verified`.

**Edit texts / translations** — `src/i18n/ar.ts` (Arabic) and `src/i18n/en.ts` (English).
Both files must have the same keys; TypeScript fails the build if one is missing.

**Change contact details** — `src/lib/contact.ts` (email and WhatsApp number). The number is
written in the domestic format (`01070869799`) and converted to the international format
(`201070869799`) automatically; invalid numbers fail `npm run check`.

## Known limitations of this stage

- The build has not been run end-to-end in the environment where these files were written
  (package downloads were unavailable there); the first GitHub Actions run is the real build test.
- No automated browser tests yet; interaction, mobile and reduced-motion checks come with the later stages.
