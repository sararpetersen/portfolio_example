export interface LocalisedText {
  en: string;
  da: string;
}

export interface CaseSection {
  id: string;
  eyebrow: LocalisedText;
  title: LocalisedText;
  body: LocalisedText;
  points?: LocalisedText[];
  status?: "documented" | "reflection" | "pending";
}

export interface CaseStudy {
  slug: string;
  name: string;
  logo?: string;
  tagline: LocalisedText;
  summary: LocalisedText;
  year: string;
  role: LocalisedText;
  audience: LocalisedText;
  tools: string[];
  links: Array<{ label: LocalisedText; url: string; external?: boolean }>;
  sections: CaseSection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "steady",
    name: "Steady",
    logo: "/images/steady_logo.svg",
    tagline: {
      en: "A calmer daily companion for neurodivergent minds",
      da: "En roligere støtte til hverdagen for neurodivergente",
    },
    summary: {
      en: "Steady is an inclusive design case study about turning neurodivergent UX principles into a working daily-planning product. The current version combines adaptable structure, guest access, account sync and feedback-led iteration without using streaks or pressure-heavy language.",
      da: "Steady er en inkluderende designcase om at omsætte neurodivergente UX-principper til et fungerende planlægningsprodukt. Den nuværende version kombinerer tilpasningsbar struktur, gæsteadgang, kontosynkronisering og feedbackbaseret iteration uden streaks eller præstationspræget sprog.",
    },
    year: "2026",
    role: {
      en: "Concept, research, UX/UI direction, implementation and evaluation",
      da: "Koncept, research, UX/UI-retning, implementering og evaluering",
    },
    audience: {
      en: "Neurodivergent people and anyone who benefits from calmer daily structure",
      da: "Neurodivergente og andre, der har gavn af en roligere struktur i hverdagen",
    },
    tools: ["UX/UI", "React", "TypeScript", "Supabase", "Accessible design", "User testing", "AI-assisted development"],
    links: [
      {
        label: { en: "Explore the onboarding site", da: "Se onboarding-sitet" },
        url: "https://web-steady.netlify.app/",
      },
      {
        label: { en: "Open the app", da: "Åbn appen" },
        url: "https://app-steady.netlify.app/",
      },
      {
        label: { en: "Discuss a project with me", da: "Tal med mig om et projekt" },
        url: "/contact",
        external: false,
      },
    ],
    sections: [
      {
        id: "challenge",
        eyebrow: { en: "01 · Challenge", da: "01 · Udfordring" },
        title: { en: "Structure can become another source of pressure", da: "Struktur kan blive endnu en kilde til pres" },
        body: {
          en: "Many planning products reward consistency, streaks and productivity. For people dealing with executive-function challenges, sensory overload or anxiety, those mechanics can make a support tool feel like another system to fail. Steady started with a different question: how can structure remain useful on both manageable and difficult days?",
          da: "Mange planlægningsprodukter belønner stabilitet, streaks og produktivitet. For mennesker med eksekutive udfordringer, sensorisk overbelastning eller angst kan de mekanismer få et støtteværktøj til at føles som endnu et system, man kan fejle i. Steady begyndte derfor med et andet spørgsmål: Hvordan kan struktur være hjælpsom på både overskuelige og svære dage?",
        },
        status: "reflection",
      },
      {
        id: "principles",
        eyebrow: { en: "02 · Design principles", da: "02 · Designprincipper" },
        title: { en: "Calm, control and a low barrier to entry", da: "Ro, kontrol og en lav adgangstærskel" },
        body: {
          en: "3 principles guide the product and the decisions made during later iterations.",
          da: "3 principper styrer produktet og de beslutninger, der er taget i de senere iterationer.",
        },
        points: [
          {
            en: "<strong>Calm:</strong> focused screens, compassionate copy and no streaks to lose",
            da: "<strong>Ro:</strong> fokuserede skærme, omsorgsfuldt sprog og ingen streaks, der kan mistes",
          },
          {
            en: "<strong>Control:</strong> people choose the tools and accessibility settings that suit them",
            da: "<strong>Kontrol:</strong> brugeren vælger de værktøjer og tilgængelighedsindstillinger, der passer",
          },
          {
            en: "<strong>Low barrier:</strong> guest access works without an account and keeps guest data on the device",
            da: "<strong>Lav adgangstærskel:</strong> gæsteadgang virker uden konto og beholder gæstedata på enheden",
          },
        ],
        status: "documented",
      },
      {
        id: "solution",
        eyebrow: { en: "03 · Product system", da: "03 · Produktsystem" },
        title: { en: "Small tools that share one calm interaction model", da: "Små værktøjer med den samme rolige interaktionsmodel" },
        body: {
          en: "The current product has grown beyond its original 6 tools. 'Tasks' support substeps and recurring schedules; 'Routines' cover repeatable parts of the day; 'Habits' use streak-free progress; and 'Mood', 'Reflection' and 'Focus' support check-ins rather than productivity scoring. 'Important Dates', 'gentle insights', a weekly recap, 'Meal Guide' and 'Emergency Stock' provide optional support without crowding the primary navigation.",
          da: "Det nuværende produkt er vokset ud over de oprindelige seks værktøjer. 'Opgaver' understøtter deltrin og gentagelser; 'Rutiner' dækker tilbagevendende dele af dagen; 'Vaner' viser fremgang uden streaks; og 'Humør', 'Refleksion' og 'Fokus' støtter små tjek-ind frem for produktivitetsscorer. 'Vigtige datoer', 'nænsomme indsigter', en ugentlig opsamling, 'Måltidsguide' og 'Nødlager' giver valgfri støtte uden at overfylde den primære navigation.",
        },
        status: "documented",
      },
      {
        id: "accessibility",
        eyebrow: { en: "04 · Accessibility", da: "04 · Tilgængelighed" },
        title: { en: "Adaptation is part of the product, not an add-on", da: "Tilpasning er en del af produktet, ikke en tilføjelse" },
        body: {
          en: "Accessibility settings are introduced during onboarding and remain available later. The interface supports light and dark themes, normal or large text, optional spacious line spacing, Atkinson Hyperlegible, reduced motion and higher contrast. A later audit also improved keyboard reordering, focus indicators, dialog focus trapping, heading structure, live regions, touch targets and dark-mode contrast. These are implemented safeguards, not a claim of complete WCAG conformance.",
          da: "Tilgængelighedsindstillinger introduceres under onboarding og kan ændres senere. Brugerfladen understøtter lyst og mørkt tema, normal eller stor tekst, valgfri større linjeafstand, Atkinson Hyperlegible, reduceret bevægelse og højere kontrast. En senere audit forbedrede også tastaturstyret rækkefølge, fokusmarkeringer, fokusfastholdelse i dialoger, overskriftsstruktur, live regions, trykflader og kontrast i mørkt tema. Det er implementerede sikkerhedsnet og ikke en påstand om fuld WCAG-overholdelse.",
        },
        status: "documented",
      },
      {
        id: "method",
        eyebrow: { en: "05 · Test method", da: "05 · Testmetode" },
        title: { en: "A two-week user test with a deliberately low barrier", da: "En to-ugers brugertest med bevidst lav adgangstærskel" },
        body: {
          en: "3 people aged 45 or older volunteered through a short recruitment form and agreed to try the browser-based prototype for about two weeks. Two completed the follow-up evaluation. The test was exploratory rather than representative: it looked for confusion, skipped features and useful moments, but the sample is too small and narrow to support broad claims about neurodivergent users.",
          da: "3 personer på 45 år eller derover meldte sig gennem en kort rekrutteringsformular og accepterede at afprøve den browserbaserede prototype i cirka to uger. To gennemførte den efterfølgende evaluering. Testen var undersøgende frem for repræsentativ: Den ledte efter forvirring, oversete funktioner og nyttige øjeblikke, men udvalget er for lille og snævert til brede konklusioner om neurodivergente brugere.",
        },
        points: [
          {
            en: "Both respondents used Steady <strong>almost every day</strong>, primarily on mobile",
            da: "Begge respondenter brugte Steady <strong>næsten hver dag</strong>, primært på mobil",
          },
          {
            en: "Average ease-of-understanding rating: <strong>4/5</strong>",
            da: "Gennemsnitlig vurdering af, hvor let Steady var at forstå: <strong>4/5</strong>",
          },
          {
            en: "Average rating for improved daily overview: <strong>3.5/5</strong>",
            da: "Gennemsnitlig vurdering af bedre overblik i hverdagen: <strong>3,5/5</strong>",
          },
          {
            en: "Neither respondent reported a technical problem",
            da: "Ingen af respondenterne rapporterede tekniske problemer",
          },
        ],
        status: "documented",
      },
      {
        id: "findings",
        eyebrow: { en: "06 · Findings", da: "06 · Resultater" },
        title: {
          en: "'Tasks' were useful; the boundaries between tools were not clear enough",
          da: "'Opgaver' var nyttige; grænserne mellem værktøjerne var ikke tydelige nok",
        },
        body: {
          en: "<em>'Tasks'</em> were the clearest source of value. One respondent also used <em>'Mood'</em>, while <em>'Habit Tracker'</em> was difficult to interpret and <em>'Tasks'</em> and <em>'Routines'</em> felt too similar. The strongest engagement barrier was not a crash or layout failure, but remembering to return without notifications. Both respondents described the experience as calm; one said they would use a developed version and the other answered maybe.",
          da: "<em>'Opgaver'</em> var den tydeligste kilde til værdi. Én respondent brugte også <em>'Humør'</em>, mens formålet med <em>'Vaner'</em> var svært at forstå, og <em>'Opgaver'</em> og <em>'Rutiner'</em> føltes for ens. Den største barriere for engagement var ikke et nedbrud eller en layoutfejl, men at huske at vende tilbage uden notifikationer. Begge beskrev oplevelsen som rolig; én ville bruge en videreudviklet version, og den anden svarede måske.",
        },
        status: "documented",
      },
      {
        id: "iteration",
        eyebrow: { en: "07 · Iteration", da: "07 · Iteration" },
        title: { en: "The feedback changed both the wording and the product", da: "Feedbacken ændrede både sproget og produktet" },
        body: {
          en: "After the test, the descriptions of <em>'Tasks'</em>, <em>'Routines'</em> and <em>'Habit Tracker'</em> were updated, the overlap between <em>'Tasks'</em> and <em>'Routines'</em> and <em>'Habit Tracker'</em> were rewritten, duplicated behaviour between <em>'Tasks'</em> and <em>'Routines'</em> was reduced, and <em>'Habit Tracker's</em> growth payoff was made visible on its own screen. Steady also gained gentle on-screen reminders for important dates, stronger mobile behaviour, task and routine substeps, recurring schedules and a broader accessibility audit. The requested push notifications are not implemented; the current reminders only appear while the app is open.",
          da: "Efter testen blev beskrivelserne af <em>'Opgaver'</em>, <em>'Rutiner'</em> og <em>'Vaner'</em> omskrevet, overlappende adfærd mellem <em>'Opgaver'</em> og <em>'Rutiner'</em> blev reduceret, og <em>'Vaner's'</em> vækstbelønning blev synlig på selve skærmen. Steady fik også nænsomme påmindelser om vigtige datoer i appen, bedre mobiladfærd, deltrin i opgaver og rutiner, gentagelser og en bredere tilgængelighedsaudit. De efterspurgte push-notifikationer er ikke implementeret; de nuværende påmindelser vises kun, mens appen er åben.",
        },
        status: "documented",
      },
      {
        id: "outcome",
        eyebrow: { en: "08 · Outcome and limits", da: "08 · Resultat og begrænsninger" },
        title: {
          en: "Early adoption exists, but account counts are not the same as active users",
          da: "Der er tidlig brug, men konti er ikke det samme som aktive brugere",
        },
        body: {
          en: "A database review on 23 August 2026 found 10 registered accounts with a Steady data row. Seven had completed onboarding and six contained data in at least one feature. This is stronger evidence than form responses alone, but it cannot establish 10 active people: the project has no visit analytics, accounts may include tests, and guest use is not represented in Supabase. The next evaluation should recruit a larger and more varied sample, test the account-first entry screen, and measure return visits without collecting more personal data than necessary.",
          da: "En databasegennemgang den 23. august 2026 fandt 10 registrerede konti med en Steady-datarække. Syv havde gennemført onboarding, og seks indeholdt data i mindst én funktion. Det er stærkere evidens end formularsvar alene, men det dokumenterer ikke 10 aktive personer: Projektet har ingen besøgsanalyse, kontiene kan omfatte tests, og gæstebrug fremgår ikke af Supabase. Den næste evaluering bør rekruttere et større og mere varieret udvalg, teste den konto-fokuserede startskærm og måle tilbagevendende brug uden at indsamle flere persondata end nødvendigt.",
        },
        points: [
          {
            en: `<a href="/blog/testing-steady-on-real-people" class="underline hover:text-blue-500">Read about how the user test began</a>`,
            da: `<a href="/blog/testing-steady-on-real-people" class="underline hover:text-blue-500">Læs om hvordan brugertesten begyndte</a>`,
          },
        ],
        status: "reflection",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((caseStudy) => caseStudy.slug === slug);
