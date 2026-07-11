---
title: Sådan byggede jeg en tosproget hjemmeside uden et i18n-framework
excerpt: Hvordan denne portfolio skifter mellem engelsk og dansk.
publishDate: 2026-07-14
draft: true
tags:
  - astro
  - tutorial
  - process
  - danish
---

Denne portfolio er tosproget— engelsk og dansk, med øjeblikkeligt sprogskift og ingen genindlæsning af siden. Den bruger hverken `astro-i18n`, `i18next` eller nogen form for rute-baseret lokalisering. Det er et helt almindeligt JavaScript-objekt og et `data-i18n`-attribut. Her er, hvordan det virker, og hvor jeg ved, at løsningen en dag ikke længere er nok.

### Selve mekanikken

Ethvert oversætteligt element får en nøgle:

```html
<h1 data-i18n="hero.role">Multimedia Designer & Concept Developer</h1>
```

Og ét enkelt inline-script, som kun indlæses én gang i layoutet, indeholder begge sprog som almindelige objekter:

```js
var t = {
  en: {
    "hero.role": "Multimedia Designer & Concept Developer",
    // ...
  },
  da: {
    "hero.role": "Multimediedesigner & Konceptudvikler",
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

At skifte sprog er blot at kalde `apply("da")` og gemme valget:

```js
setLang: function (lang) {
  localStorage.setItem("lang", lang);
  apply(lang);
  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
},
```

Det er reelt hele motoren. Ingen ruter, intet build-trin, ingen `[lang]`-mappestruktur.

### Hvorfor ikke et rigtigt i18n-framework

Et Astro-framework ville give mig ordentlige URL-baserede sprogversioner (`/da/about` i stedet for én URL, der server begge sprog), pluralis-regler og oversættelsesfiler i stedet for ét voksende JS-objekt. Jeg overvejede det og lod med vilje være, af to grunde specifikt for dette projekt:

- **Siden er lille nok til, at et rigtigt framework mest ville være overhead:** Nogle hundrede oversættelsesnøgler i ét objekt er ærligt talt lettere at søge i og redigere end det samme indhold spredt ud over separate sprogfiler, for en side af denne størrelse

- **Indhold fra databasen ruter alligevel ikke pænt gennem et frameworks sprog-stier:** Mine cases er linket op i Supabase, ikke i Astros _'content collections'_, og de gemmer allerede engelsk og dansk tekst som søskende-kolonner (`description` / `description_da`, `year` / `year_da`). De data skulle have deres egen oversættelseslogik uanset hvad jeg gjorde med den statiske UI-tekst, så et fuldt i18n-framework ville kun have løst den halve opgave og efterladt den anden halvdel lige så tilpasset, som den er nu.

### Hvor løsningen reelt ikke slår til

Jeg vil gerne være ærlig om afvejningerne, for de er reelle:

- **SEO ser kun ét sprog per URL:** Google indekserer, hvad den server-renderede HTML siger— hvilket altid er engelsk, fordi det er standardtilstanden, før JavaScript kører. Det danske indhold er reelt og skiftbart, men en søgemaskine, der crawler siden lige nu, ser engelsk. En URL-baseret løsning (`/da/...`) ville lade hvert sprog blive indekseret og rangeret for sig.
- **Den skalerer ikke til lange, indholdstunge tekster:** Systemet er bygget til korte, strukturerede UI-strenge: knaptekster, overskrifter, korttekst – selve dette blogindlæg _kan_ ikke bruge det, hvilket netop er grunden til, at de danske indlæg på denne blog er separate filer i stedet for ét tosproget dokument med et toggle
- **Hver ny tekststreng er dobbelt bogføring:** Tilføj én engelsk streng, og der følger en underforstået forpligtelse til at tilføje dens danske modstykke i et andet objekt, i hånden, uden nogen build-tids-kontrol af, om du glemte det

### Det, der reelt holder det kørende i hverdagen

Det, der forhindrer løsningen i at føles skrøbelig, er en custom event ved navn `langchange`. Alt på siden, der viser sprogafhængigt indhold fra data— kortdatoer, værktøjs-tags, mm. —lytter efter den i stedet for at hardcode sproglogik ind i hver enkelt komponent:

```js
window.addEventListener("langchange", (event) => {
  const lang = event.detail?.lang || getLang();
  applyCardTranslations(lang);
});
```

Det adskiller _"sproget skiftede"_ fra _"her er alle de steder, der skal reagere,"_ hvilket er den ene reelle infrastruktur-brik, denne løsning havde brug for for at forblive vedligeholdelsesvenlig.

Ville jeg anbefale det til en større side, eller én der reelt skal ranke på to sprog? Nej, ikke rigtig— brug et rigtigt framework. Men til en personlig portfolio, hvor målet var at skifte sprog øjeblikkeligt, holde det simpelt og undgå at kæmpe mod et build-værktøj, klarede et data-attribut og et objekt blot opgaven.
