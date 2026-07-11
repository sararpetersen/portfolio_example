---
title: How to add a dyslexia-friendly font toggle in Astro
excerpt: A walkthrough of the reading-font switcher on this site.
publishDate: 2026-07-10
draft: false
tags:
  - accessibility
  - astro
  - tutorial
---

One of the accessibility features on this portfolio is a reading-font toggle: visitors can switch the whole site to Atkinson Hyperlegible, Verdana, or OpenDyslexic. It's one of those features that sounds really complicated but is really just 3 small pieces working together. Here's how I built it, so you can add the same thing to your own Astro site.

### The idea: a class on `<html>`, not a rerender

The whole mechanism is a CSS class on the root element. When the user picks OpenDyslexic, the site adds `opendyslexic-font` to `<html>`, and a stylesheet rule takes over:

```css
@font-face {
  font-family: "OpenDyslexic";
  src: url("https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.2.5/files/opendyslexic-latin-400-normal.woff2") format("woff2");
  font-display: swap;
}

html.opendyslexic-font body,
html.opendyslexic-font p,
html.opendyslexic-font li,
html.opendyslexic-font label,
html.opendyslexic-font input {
  font-family: "OpenDyslexic", sans-serif !important;
}
```

Yup, that's an `!important`— normally a code smell, but here it's the point: when someone explicitly asks for a readable font, it should win over every decorative font choice I've made. Accessibility settings are one of the few places where `!important` is the honest tool.

I load OpenDyslexic from Fontsource's CDN so it isn't part of the normal page weight. The browser only downloads it when a rule actually uses it.

### Remembering the choice

The toggle button saves the preference to `localStorage` and cycles through the options (default → Atkinson → Verdana → OpenDyslexic). The interesting part isn't the click handler— it's making the choice survive a page reload _without a flash of the wrong font. Because that has happened.. a lot_.

Astro sites are multi-page, so every navigation is a real page load. If you apply the saved font in a normal script, the page renders with the default font first and then visibly snaps. The fix for that is a tiny **inline, render-blocking script in the `<head>`**, before any content:

```html
<script is:inline>
  (() => {
    const root = document.documentElement;
    try {
      if (localStorage.getItem("opendyslexicFontEnabled") === "true") {
        root.classList.add("opendyslexic-font");
      } else if (localStorage.getItem("verdanaFontEnabled") === "true") {
        root.classList.add("verdana-font");
      } else if (localStorage.getItem("readableFontEnabled") === "true") {
        root.classList.add("readable-font");
      }
    } catch {
      // localStorage can be unavailable (private mode) — never break first paint.
    }
  })();
</script>
```

`is:inline` tells Astro not to bundle or defer it, so the class is on `<html>` before the first paint. No flash.

### The toggle button itself

Two accessibility details on the button: it uses `aria-pressed` so screen readers announce the state, and its `aria-label` describes what the next click does _("Reading font: Default. Click to cycle to the next option.")_. A toggle that doesn't announce its state is only half a toggle.

### Why these 3 fonts

Atkinson Hyperlegible was designed by the Braille Institute for low-vision readers and looks close enough to a _"normal"_ font that it doesn't feel like a special mode. Verdana is the pragmatic choice— familiar, wide, and installed everywhere. OpenDyslexic is the most distinctive one of the 3 fonts; research on its effectiveness is genuinely mixed, but some readers strongly prefer it, and preference matters. Offering a choice is the feature, not any single font.

That's the whole thing: a `@font-face`, a class on the root element, a `localStorage` flag, and an inline script to beat first paint. Try toggling it in the accessibility bar at the top of this page or via the accessibility panel, accessed through the lower left-hand button on the page – this post is just the demo.
