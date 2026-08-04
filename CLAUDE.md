# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Sara Ringkow Petersen's personal portfolio site, built with Astro + Tailwind CSS v4 + Alpine.js. Deployed to Netlify at sararingkow.dk. Bilingual (English/Danish) throughout.

## Commands

- `npm run dev` / `npm start` — local dev server at `localhost:4321`
- `npm run build` — runs `validate-content` then `astro build`; output goes to `dist/`
- `npm run preview` — preview the production build locally
- `npm run validate-content` — runs both content checks below; this is a build gate, not optional tooling
  - `npm run check-blog-ids` (`scripts/check-blog-ids.js`) — fails the build on duplicate blog post ids or `slug` frontmatter values in `src/content/blog`
  - `npm run check-project-data` (`scripts/validate-portfolio-data.js`) — fails the build on invalid/duplicate case-study or Lab-project slugs, missing bilingual fields, missing logo files, or malformed links in `src/data/caseStudies.ts` and `src/data/labProjects.ts`
- `npm run astro -- <command>` — run any Astro CLI command (e.g. `astro check`)

There is no test suite; `validate-content` is the closest thing to CI and should be run after editing anything in `src/content/blog`, `src/data/caseStudies.ts`, or `src/data/labProjects.ts`.

## Architecture

**Content comes from three different places, each with its own validation:**
1. **Blog posts** — Markdown files in `src/content/blog`, defined as an Astro content collection (`src/content.config.ts`) with schema `{ title, excerpt, publishDate, draft, tags }`. Rendered via `src/pages/blog/[slug].astro` (draft posts are filtered out of static paths).
2. **Local case-study/Lab data** — TypeScript arrays in `src/data/caseStudies.ts` and `src/data/labProjects.ts`. Every bilingual field is an `{ en, da }` object; sections must have unique ids.
3. **Portfolio cases from Supabase** — `src/data/portfolioCases.ts` fetches from a public Supabase REST endpoint (`portfolio_cases` table) at build time via `fetchPortfolioCases()`. `ARCHIVED_CASE_SLUGS` and `NON_ACTIVE_CASE_SLUGS` control which fetched cases are excluded from prev/next navigation on `src/pages/[slug].astro`. The Supabase URL/anon key here are the public client-facing values, not secrets.

**Pages:** `src/pages/[slug].astro` is the dynamic case-study route driven by Supabase data (`getStaticPaths` fans out over `fetchPortfolioCases()`). `src/pages/blog/[slug].astro` is the equivalent for blog posts, driven by the content collection. Other routes (`index`, `about_me`, `contact`, `lab`, `steady`, `revisited-projects`, `terms`) are static `.astro` pages.

**Layout/components:** Every page wraps in `src/layouts/MainLayout.astro`, which owns global `<head>` metadata (title/description/OG tags) and is large — check it before adding new site-wide chrome. `Header.astro`, `Footer.astro`, and `AccessibilityPanel.astro` are similarly large, shared across all pages, and control language toggling, theming, and accessibility controls respectively — changes there are global in effect.

**Styling:** Tailwind v4 via `@tailwindcss/vite` (not the classic PostCSS-only setup — config lives in `tailwind.config.mjs` plus `src/styles/tailwind.css` / `tailwind-theme.css`). Custom color palette (`blue`, `pale`, etc.) is defined in `tailwind.config.mjs`, not Tailwind defaults — use those tokens rather than arbitrary hex values.

**i18n pattern:** There is no i18n framework. Bilingual content is modeled as parallel fields/objects (`{ en, da }` or `_da`-suffixed keys) rather than separate locale files, and language switching is handled client-side (Header/AccessibilityPanel). When adding user-facing copy, follow the existing bilingual-field convention rather than introducing a new i18n mechanism.
