---
title: The portfolio update that kept growing
excerpt: An animation fix turned into a larger rethink of the site.
publishDate: 2026-07-13
draft: false
tags:
  - portfolio
  - accessibility
  - process
---

This update was jut supposed to be about entrance animations..

Sections on the portfolio were pulling the page up or down while I scrolled, almost as if the site wanted me to wait for each animation before continuing. I tried changing the speed, delay, viewport threshold, and direction. None of it fixed the actual problem. A slower broken animation is still a broken animation.

So I removed the content entrance animations. Hover states and smaller interactions remain, but the content itself is now present and stable from the beginning. It's less dramatic, but it also means the site no longer asks visitors to trade control of their scrolling for decoration.

### The flicker wasn't only the animations

Removing the animations fixed the scrolling problem, but some text still flashed while pages loaded. That led me into font loading, translations, and interface states that were changing after the first render.

The biggest example was Nikumaru, the rounded font used for page headings. Its font file was 2.1 MB because it included a complete Japanese character set, even though I only use it for Latin text. I created a smaller subset instead, bringing it down to 35 KB. That gives the font a much better chance of being ready for the first render rather than replacing a fallback after the heading is already visible.

I also removed a few duplicate updates that were rewriting text or control states after the page had appeared. The broader fix was fairly simple: stop changing things after load unless they actually need to change.

### The portfolio needed clearer wording too

While checking the site, I also kept finding descriptions that called me a _'web developer'_ or _'front-end developer'_. I code and build websites, but neither is the professional title I want the portfolio to communicate.

The homepage now leads with:

> UX/UI designer focused on accessibility

And the supporting text explains what that means without repeating it:

> I turn complex ideas into clear, inclusive websites and interfaces by combining thoughtful structure, visual design, and hands-on implementation.

That distinction now runs through the visible copy, metadata, contact page, and Danish translations. It feels more specific to the work I actually do, without implying that I'm offering something I'm not.

### What I took away from it

What started as one visual bug became a reminder that polish is not always about adding more. Sometimes it's removing the animation that gets in the way, shortening the text that tries to explain too much, or making sure the first thing a page shows is already the correct thing.

The portfolio looks a little quieter now, but it also feels more deliberate— and much closer to what I wanted it to communicate in the first place.
