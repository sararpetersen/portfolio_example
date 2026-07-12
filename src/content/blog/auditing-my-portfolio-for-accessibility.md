---
title: What I found auditing my own portfolio
excerpt: I checked this site against a set of accessibility posters.
publishDate: 2026-07-11
draft: false
tags:
  - accessibility
  - portfolio
  - process
---

I build accessibility features into this portfolio pretty regularly. The palette toggle, the font switcher, the skip link. It's easy to let that turn into a feeling that the site is _"done"_ from an accessibility standpoint. So I sat down with a set of accessibility _'Do/Don't'_-posters that I came across on LinkedIn— one each for low vision, screen readers, motor disabilities, anxiety, autism, and a general website accessibility checklist —and went through this site against them, page by page. Not a vibe check. An actual pass.

And I found 3 real bugs. Here they are, because _"I audited my site and it was fine"_ isn't a useful post, and it also wasn't true.

### Bug 1: a broken heading hierarchy on the Archive page

Screen readers let people jump between headings the way sighted users skim a page visually. That only works if the headings actually nest in order— h1, then h2, then h3, no skipping. At some point while iterating on the _'Archive'_-page's design, I'd removed the visible _"Older projects"_ heading because it didn't fit the layout I wanted, without registering that it was also the page's only h2. What was left was an h1 followed directly by h3s on each project card. A jump a sighted visitor would never notice, and a screen reader user absolutely would.

The fix didn't require bringing back a heading I didn't want visually. I just added it back as visually hidden instead:

```html
<h2 class="sr-only">Older projects</h2>
```

`sr-only` is a standard pattern— present in the DOM and announced by assistive tech, but positioned off-screen for everyone else. The hierarchy is intact again, and the layout didn't have to change at all.

### Bug 2: a mobile menu that only describes an action

The mobile navigation's `aria-label` said _"Open mobile-menu."_ That describes what a _button_ does, not what a _landmark_ is. And this label was on the `<nav>` element itself, the one a screen reader user reaches for when they want to jump straight to site navigation. Hearing _"Open mobile-menu, navigation"_ doesn't exactly tell you what you're about to enter. So I changed it to _"Mobile navigation,"_ which is what it actually is.

Small, one-word-feeling fix. But it's exactly the kind of label that's easy to write on autopilot— copy the button's label onto the nearby landmark —and easy to never notice is wrong, because sighted testing never reads it out loud.

### Bug 3: the wrong description in search results, for every single case study

This one had nothing to do with the posters directly. I actually found it while re-reading the case study page's code during the audit. Each case page passes props to the shared layout for the page `<title>` and meta description:

```astro
<MainLayout
  title={`${project.name} | SRP Portfolio`}
  description={project.name}
  description={project.description}
>
```

Two `description` props, back to back. In Astro (like React), the second one silently wins. But the first one wasn't a mistake I'd have caught by looking at the rendered page, because the visible content was never wrong. Only the `<meta name="description">` tag was, and only if you actually opened dev tools or clicked a shared link and looked at the preview text. Every single case study on this site had been showing its own _name_ as the search-result description instead of the actual project summary, since whenever that duplicate line was introduced. Deleting one line fixed 9 pages at once.

### Two things that were judgment calls, not bugs

The checklist recommends body text be at least 16px. The small uppercase year labels on project cards (`11px` at the time) technically fell under that. I don't think a strict reading is right here— that text is metadata, not body copy, and it passes contrast on its own —but I bumped it to 12px anyway as a reasonable middle ground, rather than defend an edge case nobody asked me to defend.

The anxiety-focused poster asks designs to explain what happens after a user completes an action, so people aren't left uncertain about the consequences of what they just did. My contact form already promised a reply _"as soon as I can,"_ but it never said what actually happens the moment you hit send. I added a line under the form: where the message goes, that a confirmation appears on the page, and roughly how long I take to reply. Small, but it's the difference between _"I think this worked?"_ and knowing it did.

### What I'd take away from this

None of these 3 bugs were things I would have caught by just looking at the site, because none of them are visual bugs. A heading hierarchy break, a mislabeled landmark, a shadowed prop.. they're all invisible unless you either use assistive tech yourself or actually read the accessibility tree and the code with that specific lens on. _"It looks fine"_ and _"it's accessible"_ are different claims, and this portfolio— the one built by someone who cares about this stuff and writes about it —had all 3 anyway. That's less a confession and more the actual point: audits catch things that intentions don't.
