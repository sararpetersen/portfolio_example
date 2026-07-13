---
title: Making a "skip-to-content"-link people can actually find
excerpt: A "skip to main content"-link is required by WCAG.
publishDate: 2026-07-14
draft: false
tags:
  - accessibility
  - tutorial
  - ux
---

Every accessible site is supposed to have a _"Skip to main content"_ link— a keyboard-only shortcut past the header and navigation, straight to the page's actual content. Mine has had one for a while. The mechanism is standard: visually hidden until it receives keyboard focus, then it appears.

```css
.skip-link {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  transform: translateY(-180%);
  transition: transform 0.2s ease;
}

.skip-link:focus-visible {
  transform: translateY(0);
}
```

That satisfies the letter of WCAG 2.4.1. It also has a real, practical flaw I didn't notice until I sat down and thought about it properly: if a link is only visible on focus, the only people who ever discover it exists are people who already know to look for it, because they've used a skip link on another site before, or because they're testing for one. Someone using a keyboard for the first time on an unfamiliar site has no reason to press _'Tab'_ and hope something appears. The link was compliant. It wasn't discoverable.

### The fix: show it once, uninvited

I didn't want to make the link permanently visible. That defeats the whole point, and it clutters the page for everyone who doesn't need it. Instead, it briefly reveals itself on a visitor's very first page load, whether or not they've touched a keyboard:

```js
const skipHintSeenKey = "skipLinkHintSeen";
if (localStorage.getItem(skipHintSeenKey) !== "true") {
  document.body.classList.add("show-skip-link-hint");
  setTimeout(() => {
    document.body.classList.remove("show-skip-link-hint");
    localStorage.setItem(skipHintSeenKey, "true");
  }, 2800);
}
```

And a small CSS rule slides it into view for that window, positioned just below the accessibility bar so it doesn't overlap anything:

```css
body.show-skip-link-hint .skip-link {
  transform: translateY(calc(36px + 0.5rem));
}
```

2.8 seconds, once per browser, ever. Long enough to register without becoming an animation people have to sit through on every visit.

### Why `localStorage` and not "just show it on every load"

I went back and forth on this. Showing the hint on every page load would guarantee visibility, but it would also mean every returning visitor— including the ones who navigate entirely with a mouse and will never touch that link —gets a moving element at the top of the page on every single visit. That's not a neutral cost. Uninvited motion is exactly the kind of thing the reduce-motion toggle on this site exists to prevent, and the hint respects that toggle too, since it's just another CSS transition. `localStorage` with a one-time flag gets the discoverability benefit without the recurring nuisance.

### The part that's easy to get wrong

The _'href'_ has to point at a real, focusable landing target, not just any random element:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
...
<main id="main-content" tabindex="-1">
  <slot />
</main>
```

`tabindex="-1"` on `<main>` is the detail that's easy to skip _(pun slightly intended😜)_. Without it, clicking the skip link scrolls the page down but doesn't move keyboard focus there, because `<main>` isn't naturally focusable. The visual result looks identical either way, which is exactly why this bug is so easy to ship without noticing: it only shows up when you test with an actual keyboard and actually watch where focus lands.

That's the whole feature: a link that's always there for anyone who presses _'Tab'_, and a one-time, brief, motion-respecting nudge so that people who'd never think to press _'Tab'_ get to find out it exists too. Compliance gets you the link. Discoverability is a separate design decision, and it's the one that actually determines whether the feature does anything for anyone.
