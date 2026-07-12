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
  links: Array<{ label: LocalisedText; url: string }>;
  sections: CaseSection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "steady",
    name: "Steady",
    logo: "/images/steady_logo.svg",
    tagline: {
      en: "A calmer daily companion for neurodivergent minds",
      da: "En roligere dagligdagsfølgesvend til neurodivergente",
    },
    summary: {
      en: "Steady brings tasks, routines, habits, mood check-ins, focus time and notes together in one adaptable interface. The concept explores how daily structure can feel supportive without adding pressure.",
      da: "Steady samler opgaver, rutiner, vaner, humørtjek, fokustid og noter i én tilpasningsbar brugerflade. Konceptet undersøger, hvordan struktur i hverdagen kan støtte uden at skabe mere pres.",
    },
    year: "2026",
    role: {
      en: "Concept, UX/UI direction and implementation",
      da: "Koncept, UX/UI-retning og implementering",
    },
    audience: {
      en: "Neurodivergent people and anyone who benefits from a calmer structure",
      da: "Neurodivergente og andre, der har gavn af en roligere struktur",
    },
    tools: ["UX/UI", "Accessible design", "AI-assisted development"],
    links: [
      {
        label: { en: "Explore the onboarding site", da: "Se onboarding-sitet" },
        url: "https://web-steady.netlify.app/",
      },
      {
        label: { en: "Open the app", da: "Åbn appen" },
        url: "https://app-steady.netlify.app/",
      },
    ],
    sections: [
      {
        id: "challenge",
        eyebrow: { en: "01 · Challenge", da: "01 · Udfordring" },
        title: { en: "Structure can become another source of pressure", da: "Struktur kan blive endnu en kilde til pres" },
        body: {
          en: "Many planning products reward consistency, streaks and productivity. For people dealing with executive-function challenges, sensory overload or anxiety, those mechanics can make a support tool feel like another system to fail.",
          da: "Mange planlægningsprodukter belønner stabilitet, streaks og produktivitet. For mennesker med eksekutive udfordringer, sensorisk overbelastning eller angst kan de mekanismer få et støtteværktøj til at føles som endnu et system, man kan fejle i.",
        },
        status: "reflection",
      },
      {
        id: "principles",
        eyebrow: { en: "02 · Design principles", da: "02 · Designprincipper" },
        title: { en: "Calm, control and a low barrier to entry", da: "Ro, kontrol og en lav adgangstærskel" },
        body: {
          en: "The product is organised around 3 principles that are visible in the current experience.",
          da: "Produktet er bygget op omkring 3 principper, som kan ses i den nuværende oplevelse.",
        },
        points: [
          {
            en: "<strong>Calm:</strong> short copy, focused screens and no pressure-heavy language",
            da: "<strong>Ro:</strong> korte tekster, fokuserede skærme og intet præstationspræget sprog",
          },
          {
            en: "<strong>Control:</strong> users can adjust the interface and choose which tools suit them",
            da: "<strong>Kontrol:</strong> brugeren kan tilpasse brugerfladen og vælge de værktøjer, der passer",
          },
          {
            en: "<strong>Low barrier:</strong> the app offers guest access and keeps guest data on the device",
            da: "<strong>Lav adgangstærskel:</strong> appen tilbyder gæsteadgang og gemmer gæstedata på enheden",
          },
        ],
        status: "documented",
      },
      {
        id: "solution",
        eyebrow: { en: "03 · Solution", da: "03 · Løsning" },
        title: { en: "6 small tools in one consistent system", da: "6 små værktøjer i ét sammenhængende system" },
        body: {
          en: "Tasks, routines, habits, mood check-ins, a focus timer and a daily note cover different needs without forcing every user into the same workflow. A 7-step onboarding flow introduces the experience gradually.",
          da: "Opgaver, rutiner, vaner, humørtjek, en fokustimer og en daglig note dækker forskellige behov uden at tvinge alle ind i samme arbejdsgang. Et onboarding-flow på 7 trin introducerer oplevelsen gradvist.",
        },
        status: "documented",
      },
      {
        id: "accessibility",
        eyebrow: { en: "04 · Accessibility", da: "04 · Tilgængelighed" },
        title: { en: "Adaptation is part of the product, not an add-on", da: "Tilpasning er en del af produktet, ikke en tilføjelse" },
        body: {
          en: "The onboarding site presents accessibility settings as core functionality. Users can change theme, reading font, text size and line spacing, reduce motion and increase contrast.",
          da: "Onboarding-sitet præsenterer tilgængelighedsindstillinger som kernefunktionalitet. Brugeren kan ændre tema, læseskrift, tekststørrelse og linjeafstand, reducere bevægelse og øge kontrasten.",
        },
        points: [
          { en: "Dark mode for lower glare and light sensitivity", da: "Mørkt tema ved genskin og lysfølsomhed" },
          { en: "Atkinson Hyperlegible as an optional reading font", da: "Atkinson Hyperlegible som valgfri læseskrift" },
          { en: "Three text sizes and optional spacious line spacing", da: "Tre tekststørrelser og valgfri større linjeafstand" },
          { en: "Reduced motion and high-contrast modes", da: "Reduceret bevægelse og høj kontrast" },
        ],
        status: "documented",
      },
      {
        id: "evaluation",
        eyebrow: { en: "05 · Evaluation", da: "05 · Evaluering" },
        title: { en: "The promise and the first screen don't fully align", da: "Løftet og den første skærm stemmer ikke helt overens" },
        body: {
          en: "The onboarding site repeatedly says that no account is required, while the app opens on a sign-up and login screen. Guest access is available, but appears after the account options. This may create unnecessary uncertainty about privacy and access requirements and should be tested in the next iteration.",
          da: "Onboarding-sitet gentager, at en konto ikke er nødvendig, mens appen åbner på en skærm med oprettelse og login. Gæsteadgang findes, men kommer efter kontomulighederne. Det kan skabe unødig usikkerhed om privatliv og adgangskrav og bør testes i næste iteration.",
        },
        status: "reflection",
      },
      {
        id: "validation",
        eyebrow: { en: "06 · Validation", da: "06 · Validering" },
        title: { en: "What still needs to be documented", da: "Det mangler stadig at blive dokumenteret" },
        body: {
          en: "A credible accessibility case must show evidence, not only intentions. The next version of this case should include the research basis, who tested the product, which assistive or adaptive settings were used, what changed after testing and which WCAG checks were completed.",
          da: "En troværdig tilgængelighedscase skal vise evidens og ikke kun intentioner. Den næste version bør beskrive researchgrundlaget, hvem der testede produktet, hvilke hjælpemidler eller tilpasninger der blev brugt, hvad testen ændrede, og hvilke WCAG-tjek der blev gennemført.",
        },
        status: "pending",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((caseStudy) => caseStudy.slug === slug);
