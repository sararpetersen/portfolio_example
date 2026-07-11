---
title: Designing a calm colors mode for sensory-sensitive visitors
excerpt: How the low-stimulation palette toggle on this site works, and why it's a second palette rather than a filter.
publishDate: 2026-07-17
draft: true
tags:
  - accessibility
  - ux
  - tailwind
  - tutorial
---

Most accessibility toggles on this site solve a specific, well-documented problem— dark mode, larger text, a dyslexia-friendly font. Calm colors mode is different. It exists because intense, saturated color can be genuinely uncomfortable for some visitors— people who are sensitive to visual stimulation, including a lot of neurodivergent people. There's no single WCAG success criterion that covers this the way contrast ratios do. It's a design decision, not a checklist item.

### Not a filter — a second palette

My first instinct was to reach for a CSS filter: `filter: saturate(0.5)` on the whole page. It's one line and it "works." I didn't do that, for a reason worth explaining.

A blanket desaturation filter also dulls things that need to stay legible— status colors, focus rings, anything relying on hue to communicate meaning. So calm mode is a real second palette, defined as CSS custom properties scoped to a class:

```css
body.calm-mode.site-shell {
  --washi-highlight: rgba(251, 249, 247, 0.82);
  --ink-indigo: rgba(51, 72, 87, 0.08);
  --seal-vermilion: #c56b71;
  --seal-vermilion-soft: rgba(197, 107, 113, 0.1);
  --brand-primary: #5f7e8b;
  --brand-primary-tint: #e6eff2;
  --brand-primary-soft: #afc2cb;
  --brand-primary-strong: #4a6370;
}
```

Every accent color on the site is redefined here, by hand, as a quieter version of itself. It has its own dark-mode variant too:

```css
body.dark.calm-mode.site-shell {
  --brand-primary: #7f9eab;
  --brand-primary-soft: #b7c9d0;
  --brand-primary-strong: #98b2bc;
}
```

### The part a filter can't fix: hardcoded Tailwind colors

Here's the problem a `saturate()` filter genuinely can't solve, and the reason this mode took longer to build than I expected: not every color on the site is a CSS variable. Plenty are Tailwind utility classes — `text-red-500`, `text-blue-600`, `bg-blue-100` — baked directly into the markup because that's how the rest of the site was built before calm mode existed.

So calm mode also has to override specific utility classes, one at a time, wherever they show up:

```css
body.calm-mode .text-red-500 {
  color: #b87c78;
}

body.calm-mode .border-blue-300 {
  border-color: #b3c8d6;
}

body.calm-mode .bg-blue-100 {
  background-color: #e8f2f7;
}
```

It's not elegant. Every time I add a new component with a hardcoded Tailwind color, I have to remember to add a calm-mode override for it, the same way I have to remember a dark-mode override. It's a maintenance cost I accepted knowingly, in exchange for not touching a single filter and getting exact, chosen colors everywhere instead of "whatever saturate(0.5) happens to produce."

### Images get the filter treatment — deliberately

Photos and screenshots are the one place I *do* use a CSS filter, because hand-picking colors for every image would be absurd:

```css
body.calm-mode img:not(.logo-light):not(.logo-dark):not([aria-hidden="true"]) {
  filter: saturate(0.45);
}
```

The `:not()` exclusions matter as much as the rule itself — the logo and decorative images are excluded on purpose, so brand identity doesn't wash out along with everything else.

### A toggle like any other

Mechanically, calm mode is the same pattern as every other accessibility toggle on the site: a class on `<body>`, a `localStorage` flag, and an inline script that applies it before first paint so there's no flash of the "wrong" palette:

```js
function makeToggle(btnId, className, key) {
  const btn = document.getElementById(btnId);
  btn.addEventListener("click", () => {
    const on = document.body.classList.toggle(className);
    btn.setAttribute("aria-checked", String(on));
    localStorage.setItem(key, String(on));
  });
}
makeToggle("a11y-calm", "calm-mode", "calmModeEnabled");
```

What's different is the *content* of the mode, not the mechanism. That's the actual lesson here: the hardest part of an accessibility feature is rarely the toggle infrastructure — it's usually done well before you reach for a color picker. It's finding every single place your normal design already committed to a specific, unquestioned color, and deciding what it should become when someone asks for less.

Try it — the palette toggle is in the accessibility bar at the top of this page.
