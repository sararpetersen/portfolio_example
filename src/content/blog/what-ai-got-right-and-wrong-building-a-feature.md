---
title: What AI got right and wrong when I built one feature with it
excerpt: A follow-up to my first vibe coding post.
publishDate: 2026-07-11
draft: false
tags:
  - vibe coding
  - ai
  - process
  - accessibility
---

I wrote about _[what vibe coding is and what I think about it](/blog/vibe-coding)_ a while back, mostly in general terms. This time I want to walk through one actual feature, from start to finish, including the part where the AI got it wrong and I had to catch it. General reflections are easy to agree with. A real example is more useful.

### The feature: a reassurance line on the contact form

The brief was small: an accessibility poster I was checking this site against pointed out that forms should tell people what happens after they submit, and not leave them wondering whether anything happened at all. My contact form already promised a reply _"as soon as I can,"_ but never said what actually happens the instant you hit send. So: add a short line explaining that.

### What the AI got right, immediately

It found the right spot without me pointing at it— between the GDPR note and the submit button, matching the existing fine-print styling exactly rather than introducing a new visual pattern. It wrote both the English and Danish versions in one pass, correctly using this site's actual i18n key convention (`contact.form.next`, sitting next to the existing `contact.form.gdpr`) instead of inventing a new pattern. And the copy itself covered all 3 things the source guidance actually asked for— where the message goes, what confirmation looks like, and a timeframe —without me having to spell that checklist out explicitly. That's a genuinely strong first pass, and it's the part of vibe coding that still impresses me: it had clearly _"read"_ the surrounding code's conventions, not just the instruction.

### Where it went wrong, and why the mistake was subtle

Here's the part worth writing down. When I mentioned the spacing between the new note and the GDPR note above it looked off, the fix was to wrap both in a shared container with tighter internal spacing. Reasonable fix. But there was a dark-mode CSS rule on this page that specifically targeted the GDPR paragraph by its `data-i18n` attribute:

```css
:global(body.dark p[data-i18n="contact.form.gdpr"]) {
  color: var(--text-on-dark-soft, #c0c0c0);
}
```

The new paragraph had a different `data-i18n` value, so it wasn't covered by that rule. In light mode this was invisible— both paragraphs use the same gray on a light background regardless. In dark mode, the new note would have rendered as dark gray text on a dark background, nearly unreadable. Nobody would have caught this by looking at the page in the mode it was built in, because it only breaks in the _other_ mode.

This is exactly the failure mode I described in the first post: it's not that the AI wrote bad code. Both the markup and the styling approach were sound. It's that the AI— and, in the moment, me too —was reasoning about the one component in isolation and not tracing every existing rule that happened to scope itself narrowly to a sibling element. That's a _"hold the whole system in your head"_ problem, and it's still squarely a human judgment task, not a prompting task.

### What actually caught it

Not a smarter prompt. A dark-mode check, on purpose, as its own separate verification step— which is the same lesson from _[auditing my own portfolio for accessibility](/blog/auditing-my-portfolio-for-accessibility)_: most of the things that go wrong on this site are invisible in whichever mode you happened to be looking at when you built the feature. The fix was one line— widen the selector to cover both paragraphs —but finding it required deliberately switching modes and looking, not reading the diff and just assuming it was fine because it compiled and matched the design.

### The actual takeaway

Vibe coding didn't get slower because of this. The whole feature, mistake included, still took a fraction of the time it would have taken me to write from scratch. What it needed was the same thing every feature on this site needs regardless of who typed it: a specific check, done on purpose, for the exact kind of bug that doesn't show up unless you're really looking for it. The AI is very good at matching the pattern it can see. My job is still noticing which patterns it couldn't.
