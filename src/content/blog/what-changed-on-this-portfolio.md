---
title: What changed on this portfolio recently?
excerpt: Astro and Tailwind migrations, blog styling, and content cleanup.
publishDate: 2026-07-11
draft: false
tags:
  - updates
  - astro
  - tailwind
  - accessibility
---

This post is a quick note about the latest site updates you can now see on this portfolio.
I’d been avoiding this migration because I had tried it once before and the whole site just ended up crashing. That made me a bit skeptical about doing it again, but this time it actually landed cleanly and I wanted to explain what changed.

### Tailwind and Astro now match

The portfolio moved off the old `@astrojs/tailwind` integration and now uses `@tailwindcss/vite` in `astro.config.mjs`.
That means the site is built with Tailwind v4 configuration and the plugins are imported directly through ESM:

```js
tailwindcss();
```

The configuration still includes the same helpers for typography, forms, aspect ratio, and container queries, but now they're wired into Vite explicitly.

### Blog content rendering was improved

I added scoped markdown styles for blog posts so lists, code, blockquotes, and tables render as expected.
That includes:

- readable paragraph spacing
- bullets and nested list support
- a fixed inline `code` size inside headings
- dark mode-friendly blog text and links

The goal was to keep the blog readable without shrinking every single inline `code` snippet site-wide.

### Case cards and homepage selection

The case overlay now uses a Vite-compatible RGBA background class:

```css
bg-[rgba(15,23,42,0.75)]
```

And the homepage selected cases list is intentionally limited to 6 cards so the front page feels complete without overwhelming the visitor.

### Content cleanup

I also removed a stray empty file from `src/content/blog` that was breaking the build.
That file had no frontmatter, so Astro reported a schema validation failure before this cleanup.

### Why this matters

This was one of those updates I kept putting off because I knew the migration would be messy, and it would a be a long process. Now that it’s done, the site feels much more stable, the blog is easier to update, and the frontpage behaves exactly the way I actually want it to. If you’re reading this while the site is still a work in progress, consider this the note that explains what I fixed most recently.
