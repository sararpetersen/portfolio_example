---
title: "Canny, not uncanny: the return of the archive page"
excerpt: Bringing 3 old school projects back onto the site.
publishDate: 2026-07-16
draft: false
tags:
  - portfolio
  - process
  - ux
---

This site has had two different homes for old school work, and it's worth being precise about which one this post is actually about. The first was an _"Archive"_-page: a spot for old projects, shown more or less as-is, untouched. The second was a small section on the [Lab](/lab) page, for a handful of those same early projects, but revamped rather than just left alone. Different purpose, different page— one preserved, the other rebuilt.

Both came down in the same round of portfolio cleanup. Not because anything was wrong with either, I just felt like the site had too much going on, and old work with no upkeep was the part that felt least necessary. _"More or less as-is"_ was doing some quiet work in that sentence, too: the _"Archive"_ page is also where I found a broken heading hierarchy while [auditing this site for accessibility](/blog/auditing-my-portfolio-for-accessibility)— the kind of thing that slips through the cracks, when a page isn't getting that much attention. That bug existed before the page came down, not the reason it did, but it's a fair example of what _"least necessary"_ looked like in practice.

The _"Archive"_-page stayed gone. But the revamped section didn't. I decided to bring it back, not onto the _"Lab"_-page, but as its own page this time. And if it was coming back at all, it had to actually earn its spot, not just get dumped back in the way it left.

So, here's what earning that spot looks like: [Revisited Projects](/revisited-projects), a showcase of 3 of my earliest Multimedia Design projects— my entrance-exam project about computer history, a Super Mario fan-wiki, and a _'Personal Professional Profile'_ (digital resume) —rebuilt with what I actually know now. It got its own callout at the bottom of the _"Lab"_-page: its own title, its own blurb, deliberately left out of the main navigation but not hidden either. Funnily enough, that puts the projects back within reach of the very page they started on. One page, one callout, nothing sprawling.

### Why bring them back at all?

I could've just left them deleted. But a portfolio of only-the-best-work hides the part that's actually useful to show: what changed, and why. So instead of dumping the old work back with minimal care, the way the _"Archive"_-page did, each project gets a card with the original idea intact, a short _"what I changed"_-list, and a link to the rebuilt version. Not a rewrite pretending the old one never existed, and not the same low-effort presentation that let a heading bug sit unnoticed for who knows how long.

### The uncanny part, avoided on purpose

Reviving old work can go wrong in a specific way: you touch it just enough that it's still recognisably the old project, but not enough that it feels intentional, and the result sits in an uncomfortable in-between. That's the trap the title is poking fun at, and it's the same trap the _"Archive"_-page fell into by just showing things _"as-is."_ The fix wasn't to disguise the age of these projects. It was to lean into it, on purpose this time. Each card carries its own context line— _"1st semester entrance exam · Multimedia Design"_, _"3rd semester project · Multimedia Design"_ —so nobody mistakes a rebuilt student project for current professional work. The number badge, the semester label, the little browser-mockup preview with the project's own colour palette: all of it exists to say _"this is clearly labelled as a revamped project,"_ not _"this is new,"_ and not _"this is just sitting here because I never got around to removing it."_

```astro
<div class:list={["project-preview", project.palette]} aria-hidden="true">
  <div class="browser-frame">
    <div class="preview-content">
      <span class="preview-kicker">{project.number} / revisited</span>
      <strong>{project.title}</strong>
      ...
    </div>
  </div>
</div>
```

Each project gets its own `palette` value (`computer`, `mario`, `profile`), so the mock browser preview actually looks like the project it represents instead of just one generic placeholder card repeated 3 times.

### What "revisited" actually means

Not a full rebuild from nothing, and not just a fresh coat of paint either. Each project kept its original concept and mostly its content, and got the same 3-part treatment: stronger information architecture, a genuine responsive layout instead of a desktop-only one, and an accessibility pass— focus states, contrast, keyboard navigation —that simply wasn't part of my process back then, and definitely wasn't part of how the _"Archive"_-page got built. The _"what I changed"_-list on each card is deliberately specific rather than a generic _"improved design,"_ because the specific part is actually the interesting bit, and the part the _"Archive"_-page never bothered to spell out.

### Why bother?

The honest answer is on the page itself, in the closing note: **_"progress is easier to see when the starting point stays part of the story"_**. Hiding the early work doesn't necessarily make the current work look better by comparison, it just removes the comparison. Keeping it, clearly labelled, and kept to one contained corner of the site, does the opposite— without bringing back the clutter that the cleanup got rid of in the first place.
