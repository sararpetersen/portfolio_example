export interface LabProject {
  slug: string;
  year: string;
  titleKey: string;
  titleFallback: string;
  linkKey: string;
  linkFallback: string;
  href: string;
  ariaLabel: string;
  featured?: boolean;
  wip?: boolean;
}

export const labProjects: LabProject[] = [
  {
    slug: "bivi",
    year: "2026",
    titleKey: "lab.bivi.title",
    titleFallback: "Bivi - Your Little Medication Sidekick",
    linkKey: "lab.bivi.link",
    linkFallback: "Visit site →",
    href: "https://web-bivi.netlify.app/",
    ariaLabel: "Visit Bivi website (opens in new tab)",
    featured: true,
  },
  {
    slug: "ephemeris",
    year: "2026",
    titleKey: "lab.ephemeris.title",
    titleFallback: "Ephemeris - Dragon Mood Journal",
    linkKey: "lab.ephemeris.link",
    linkFallback: "Visit site →",
    href: "https://web-ephemeris.netlify.app/",
    ariaLabel: "Visit Ephemeris (opens in new tab)",
  },
  {
    slug: "steady",
    year: "2026",
    titleKey: "lab.steady.title",
    titleFallback: "Steady - Daily Life Tracker App for Neurodivergents",
    linkKey: "lab.steady.link",
    linkFallback: "Read case →",
    href: "/steady",
    ariaLabel: "Read the Steady case study",
  },
  {
    slug: "vibeloop",
    year: "2025/2026",
    titleKey: "lab.vibeloop.title",
    titleFallback: "VibeLoop - Mood Based Social App",
    linkKey: "lab.vibeloop.link",
    linkFallback: "View case →",
    href: "/vibeloop",
    ariaLabel: "View the Vibeloop case study",
    wip: true,
  },
  {
    slug: "autismeguiden",
    year: "2025/2026",
    titleKey: "lab.autismeguiden.title",
    titleFallback: "AutismeGuiden - Your Guide to Autism and Neurodiversity",
    linkKey: "lab.autismeguiden.link",
    linkFallback: "Visit site (DK) →",
    href: "https://autisme-guiden.netlify.app/",
    ariaLabel: "Visit AutismeGuiden (opens in new tab)",
  },
];
