---
title: The bug that looked like two bugs
excerpt: A flicker and a reset that turned out to be the same mistake.
publishDate: 2026-07-25
draft: false
tags:
  - process
  - accessibility
  - ux
---

Two separate reports came in around the same time, about two parts of the blog that have nothing to do with each other. One: the tag pills on individual posts, and the filter buttons on the blog index, flash and rebuild themselves for a split second after the page loads. Two: pick a category filter, click into a post, come back, and it's silently reset to _"All."_ Different symptoms, different pages, different code paths. I went looking for two bugs. There was one.

## The flicker

Blog posts and the filter bar are server-rendered in English by default, then a small script checks your stored language preference and swaps the text to Danish if that's what you've picked. Reasonable plan. Except that script was a deferred module script sitting at the bottom of the page, which only runs _after_ the browser has already painted the English version. For anyone with Danish selected, that's an English pill, replaced by a Danish one, on every single load. Not broken, exactly— just late enough to be visible.

## The reset

The filter itself only ever lived in the DOM: a CSS class toggled on whichever button you clicked, and a matching class hiding the cards that didn't match. Nothing about that selection was written down anywhere. So the moment you left the page and came back, there was nothing left to restore it from. The fresh page load just did what it always does, which is render _"All."_

## Same fix, twice

Both of these turned out to be the same mistake wearing different clothes: code that was entirely correct, just running at the wrong moment— after the browser had already committed to showing the default state. The actual fix wasn't new logic in either case. For the flicker, I just moved the initial language check into a small blocking script placed immediately after the markup it affects, so it runs while the page is still being parsed, before that part of it paints. For the reset, I first had to give the filter somewhere to live— `sessionStorage`, so a category choice survives navigating away and back —and then apply that exact same trick: restore it synchronously, before paint, instead of after everything's already loaded and visibly wrong for a moment.

The second one had a sharper edge to it, too. The restore script has to run after the post cards actually exist in the DOM, which meant it now runs before a piece of bookkeeping the older filter script depended on— specifically, which cards were supposed to start out hidden by pagination. Moving one script earlier quietly broke an assumption in another, so that had to move with it.

## The actual takeaway

Neither bug was a logic error. Both were a timing error dressed up as something else— a visual glitch, a state that _"just resets."_ The lesson isn't really about language toggles or filter buttons specifically. It's that when something on this site behaves inconsistently instead of just being wrong, the first question worth asking isn't _"what's the code doing?,"_ it's _"when is the code doing it, relative to what the visitor already sees?"_ Those two things looked like unrelated bugs for exactly as long as I hadn't asked that question yet.
