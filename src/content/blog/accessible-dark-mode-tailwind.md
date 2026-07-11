---
title: Accessible dark mode with Tailwind
excerpt: How this site's dark mode works.
publishDate: 2026-07-10
draft: false
tags:
  - accessibility
  - tailwind
  - tutorial
---

Dark mode looks like a solved problem— Tailwind itself even has its own `dark:` attribute —but doing it _accessibly_ involves three decisions that the utility classes don't make for you: who decides (system or user), how the choice persists, and how the toggle announces itself. Here's how it works on this site.

### Decision 1: system preference first, user choice forever

The rule that I settled on: on a first visit, follow the operating system's `prefers-color-scheme`. But the moment the visitor touches the toggle, their choice wins permanently, until they change it again.

```js
const saved = localStorage.getItem("darkMode");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDark = saved !== null ? saved === "true" : systemPrefersDark;
document.body.classList.toggle("dark", isDark);
```

The `saved !== null` check is an important line. A common mistake is `saved === "true" || systemPrefersDark`— that makes it impossible for a dark-system user to choose light mode. Respecting an explicit _"no"_ is just as much a part of accessibility as offering the feature.

Like every other setting on this site, this runs in an inline script before first paint, so there's no white flash before dark mode kicks in on a page load.

### Decision 2: a class, plus CSS variables for the values

Tailwind's `dark:` variant works just fine, but with a design this custom I ended up with a `body.dark` class and CSS custom properties for the recurring colors:

```css
body.dark {
  background: var(--dark-bg);
  color: var(--text-on-dark);
}
```

```css
body.dark .related-project-card {
  border-color: var(--dark-border);
  background: linear-gradient(to bottom right, var(--dark-gradient-start), var(--dark-gradient-end));
}
```

The variables (`--dark-bg`, `--dark-border`, `--text-on-dark`, `--text-on-dark-soft`) are the accessibility part itself: dark mode isn't inverted colors, it's a _second palette_ that has to pass contrast checks on its own. Having the palette in one place means when I check contrast ratios, I check four variables.. and not 400 class names. Two things I learned checking mine:

- **Pure white on pure black is too harsh:** My body text on dark is a soft off-white (`--text-on-dark-soft`), which reduces the halation effect that makes light-on-dark text hard to read for some people, including many dyslexic readers
- **Every new component needs a dark pass:** The most recent bug on this site was a fine-print paragraph that I added to the contact form that stayed dark gray on the dark background, because the dark-mode rule was scoped to the paragraph next to it. If your dark styles are per-component, _"did I style dark mode?"_ belongs on the checklist for every single addition

### Decision 3: a toggle that says what it is

The buttons in the accessibility-bar keeps `aria-pressed` in sync:

```js
document.getElementById("darkModeToggle")?.setAttribute("aria-pressed", String(isDark));
```

A sighted user sees the moon icon change state; a screen reader user hears _"Toggle dark mode, pressed."_ Without `aria-pressed`, they hear a button with no idea whether it's on. It's one line, and there's no excuse to skip it.

### The shape of the whole thing

System preference as the default, explicit choice in `localStorage` as the override, an inline script to beat first paint, one palette of variables to keep contrast auditable, and `aria-pressed` on the control. None of it is hard. It's just five small decisions that each default to the inaccessible option if you don't make them on purpose.

You can try it right now – the moon icon in the bar at the top of this page, or through the accessibility panel, accessed through the lower left-hand button on the page.
