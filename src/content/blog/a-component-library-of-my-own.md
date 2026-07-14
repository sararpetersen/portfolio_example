---
title: A component library of my own
excerpt: A standalone library meant to grow with future projects.
publishDate: 2026-07-14
draft: false
tags:
  - react
  - components
  - process
  - lab
---

I've spent a lot of time on this portfolio building things I never reuse anywhere else. A card here, a toggle there, a panel that only ever gets mounted once. That's fine for a portfolio— it only has to work in one place —but it started to bother me that every component I build lives and dies inside this one Astro project, with no separation between _"this is a button"_ and _"this is a button styled exactly for this site."_

So I started a separate project: a standalone React component library, published on its own at <a href="https://srp-library.netlify.app/" target="_blank" rel="noopener noreferrer">srp-library.netlify.app</a>. It's linked from the nav now, under _"Library."_ It's not a one-off either. The plan is to keep adding to it as other projects come along, so it becomes the shared place components live instead of getting rebuilt from scratch each time.

## Why pull it out of the portfolio

Building inside a portfolio means every component is entangled with the page it lives on. The same Tailwind config, the same dark mode class on `body`, the same i18n dictionary. That's convenient until you want to know whether a component actually stands on its own. Pulling it into its own repo forces the question: does this thing work if I strip away every assumption the portfolio was quietly making for it?

Mostly, no. Not at first. Which was the whole point.

## What's actually in it

Right now: a set of React components I'd otherwise keep reinventing— the kind of UI pieces that show up in almost every project regardless of what the project is actually about. Nothing exotic yet. But _"right now"_ is doing some work in that sentence, because the whole point of the library is that it's not meant to stay this small. As I build other things, whatever's reusable from them is meant to land here instead of staying buried in whichever project it started in.

## Why this is worth a separate post

I didn't want to just drop a new nav link with no explanation and let people wonder what it is or why it's there, especially since it'll keep changing shape as I add to it. This site has a _"Lab"_ for a similar reason, because not everything I build needs to be a polished case study, but it also shouldn't show up unannounced. The library isn't a case study either, and it isn't finished by design. It's infrastructure: the place future projects are supposed to pull from instead of starting over.

If you're curious what's in there: <a href="https://srp-library.netlify.app/" target="_blank" rel="noopener noreferrer">see the library →</a>
