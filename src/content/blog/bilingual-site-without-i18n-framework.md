---
title: Building a bilingual site without an i18n framework
excerpt: How this portfolio switches between English and Danish with a plain JavaScript object and a data attribute — and where that approach breaks down.
publishDate: 2026-07-24
draft: true
tags:
  - astro
  - tutorial
  - process
---

This entire portfolio is bilingual — English and Danish, switchable instantly, no page reload. It doesn't use `astro-i18n`, `i18next`, or any routing-based localization. It's a plain JavaScript object and a `data-i18n` attribute. I want to walk through why that's held up, and where I know it'll eventually stop being enough.

### The mechanism

Every translatable element gets a key:

```html
<h1 data-i18n="hero.role">Multimedia Designer & Concept Developer</h1>
```

And a single inline script, loaded once in the layout, holds both languages as plain objects:

```js
var t = {
  en: {
    "hero.role": "Multimedia Designer & Concept Developer",
    // ...
  },
  da: {
    "hero.role": "Multimedia Designer & Konceptudvikler",
    // ...
  },
};

function apply(lang) {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (t[lang] && t[lang][key] !== undefined) {
      el.innerHTML = t[lang][key];
    }
  });
  document.documentElement.lang = lang === "da" ? "da" : "en";
}
```

Switching language is a matter of calling `apply("da")` and saving the choice:

```js
setLang: function (lang) {
  localStorage.setItem("lang", lang);
  apply(lang);
  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
},
```

That's genuinely the whole engine. No routes, no build step, no `[lang]` folder structure.

### Why not a real i18n framework

An Astro-native framework would give me proper URL-based locales (`/da/about` instead of one URL serving both languages), pluralization rules, and translation files instead of one growing JS object. I considered it and didn't do it, for two reasons specific to this project:

**The site is small enough that a real framework is mostly overhead.** A few hundred translation keys living in one object is honestly easier to search and edit than the same content spread across separate locale files, for a site this size.

**Content from the database doesn't route cleanly through a framework's language paths anyway.** My case studies live in Supabase, not in Astro's content collections, and they already store English and Danish text as sibling columns (`description` / `description_da`, `year` / `year_da`). That data needed its own translation-switching logic regardless of what I did for the static UI text — so a full i18n framework would have solved half the problem and left the other half exactly as custom as it is now.

### Where this approach genuinely breaks down

I want to be honest about the trade-offs, because they're real:

- **SEO only ever sees one language per URL.** Google indexes whatever the server-rendered HTML says — which is always English, since that's the default state before JavaScript runs. The Danish content is real and switchable, but a search engine crawling this page right now sees English. A URL-based approach (`/da/...`) would let each language be indexed and ranked on its own.
- **It doesn't scale to paragraphs of rich content.** This system is built for short, structured UI strings — button labels, headings, card copy. This very blog post *can't* use it, which is exactly why the Danish posts on this blog are separate files instead of one bilingual document with a toggle.
- **Every new string is two lines of duplicated bookkeeping.** Add one English string, and there's an implicit obligation to add its Danish counterpart in a second object, by hand, with no build-time check that you didn't forget it.

### What actually makes it work day to day

The trick that keeps it from feeling fragile is the `langchange` custom event. Anything on the page that renders language-dependent content from data — case card dates, tool tags — listens for it instead of hardcoding language logic into every component:

```js
window.addEventListener("langchange", (event) => {
  const lang = event.detail?.lang || getLang();
  applyCardTranslations(lang);
});
```

That decouples "the language changed" from "here's every place that needs to react," which is the one piece of real infrastructure this approach needed to stay maintainable.

Would I recommend this for a bigger site, or one that actually needs to rank in two languages? No — reach for a real framework. But for a personal portfolio where the goal was "switch languages instantly, keep it simple, and don't fight a build tool," a data attribute and an object did the job.
