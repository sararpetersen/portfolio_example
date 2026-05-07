---
title: Accessibility updates on the portfolio
excerpt: A quick overview of the new accessibility settings and why I added them.
publishDate: 2026-05-07
draft: false
tags:
  - accessibility
  - ux
  - portfolio
---

I just finished a new round of accessibility updates on this portfolio and wanted to quickly write down what changed and why. The goal was to make the site easier to adjust to different sensory and reading needs, without forcing one visual style on everyone. All the settings can be found in the accessibility bar in the header, so they're available from every page.

### Calm colors mode

This was the feature I was most curious about building. When enabled, it softens all the accent colors across the entire site— the warm reds, teals, and blues all shift to quieter, lower-saturation versions of themselves. The logo, the decorative kanji labels, the scroll-to-top button, tag chips, the contact box— everything adjusts together.

The inspiration came from thinking about how intense colors can feel for some people, especially those who're sensitive to visual stimulation. I wanted a mode that keeps the same layout and structure, but turns the visual intensity down a notch.

### Larger text toggle

A straightforward addition: bumps the base font size up slightly so text is easier to read. Because the site uses `rem`-based type, toggling it at the `html` level scales everything proportionally.

### OS preference detection

Previously, dark mode and reduced motion only applied after the user had manually toggled them. Now, on the first visit, the site checks system preferences using `prefers-color-scheme` and `prefers-reduced-motion` and applies the right settings automatically. Saved choices always take priority on return visits.

### Skip link discoverability

A 'skip-to-content' link has been in the markup for a while, but it was always invisible unless you were using a keyboard. It still works that way— which is correct behavior for accessibility —but now it briefly appears on the very first page load, so it's easier to notice it exists.

### Why this matters to me

Accessibility isn't an abstract concept to me— I notice when a site feels overwhelming or hard to parse. Building these features was partly practical and partly personal. Small choices like softer colors, readable text, and predictable motion can genuinely change whether a site feels usable or not.

This update isn't finished. But it's a stronger baseline than before.
