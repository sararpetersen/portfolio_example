-- Case details for the portfolio_cases table.
-- Run in the Supabase SQL editor. Safe to re-run (add column if not exists, updates are by slug).
--
-- 1. Adds optional context / role / outcome columns (English + Danish). The site hides each block
--    when its column is empty, so you can fill these in at your own pace.
-- 2. Rewrites the descriptions so they no longer repeat the semester (the page already shows it).
--
-- Context comes from the About-page timeline (titles, dates, institutions); the Folkaet outcome comes from
-- the blog post "What I'm actually working on at Folkaet". Outcome is left empty (null) where there is
-- nothing to say beyond the description yet; the site simply hides the Outcome tile for those cases.

begin;

alter table public.portfolio_cases
  add column if not exists context text,
  add column if not exists context_da text,
  add column if not exists role text,
  add column if not exists role_da text,
  add column if not exists outcome text,
  add column if not exists outcome_da text;

-- Kadaver ----------------------------------------------------------------
update public.portfolio_cases set
  description = $q$This was the first project I did during my internship at the advertising agency Kadaver. Here, I had to come up with a redesign for Kadaver's current website. The site hadn't been updated in 5 years, so I had to make it look modern and up-to-date. It was also originally done in Squarespace, so translating that into code was very interesting.$q$,
  description_da = $q$Dette var det første projekt, jeg arbejdede med under mit praktikophold hos reklamebureauet Kadaver. Her skulle jeg komme op med et redesign til Kadavers eksisterende hjemmeside. Hjemmesiden var ikke blevet opdateret i fem år, så jeg skulle få den til at fremstå moderne og tidssvarende. Den var oprindeligt lavet i Squarespace, så det var meget interessant at skulle omsætte den til kode.$q$,
  context = $q$Software Developer Intern at Folkæt · May 2026 – present$q$,
  context_da = $q$Softwareudvikler-praktikant hos Folkæt · maj 2026 – nu$q$,
  role = $q$Designer and developer$q$,
  role_da = $q$Designer og udvikler$q$,
  outcome = null,
  outcome_da = null
where slug = 'kadaver';

-- Superheltedagen --------------------------------------------------------
update public.portfolio_cases set
  description = $q$This was the second project I did during my internship at the advertising agency Kadaver. Here, I had to redesign a page for Børneulykkesfondens annual charity event 'Superheltedagen'. This was yet another site done in a CMS system. But overall, it was a really fun and special project to be a part of.$q$,
  description_da = $q$Dette var det andet projekt, jeg arbejdede med under mit praktikophold hos reklamebureauet Kadaver. Her skulle jeg redesigne en side til Børneulykkesfondens årlige velgørenhedsarrangement 'Superheltedagen'. Det var endnu en hjemmeside, der var blevet udviklet i et CMS-system. Men alt i alt var det et rigtig sjovt og specielt projekt at være en del af.$q$,
  context = $q$Internship project for Børneulykkesfonden's annual charity event, Superheltedagen$q$,
  context_da = $q$Praktikprojekt til Børneulykkesfondens årlige velgørenhedsarrangement, Superheltedagen$q$,
  role = $q$Designer and developer$q$,
  role_da = $q$Designer og udvikler$q$,
  outcome = null,
  outcome_da = null
where slug = 'superheltedagen';

-- CP Danmark (description already has no semester, so it is left as is) ---
update public.portfolio_cases set
  context = $q$Final exam project: a case from CP Danmark, with help from people at Kadaver$q$,
  context_da = $q$Afsluttende eksamensprojekt: en case fra CP Danmark, med hjælp fra folk hos Kadaver$q$,
  role = $q$Designer and developer$q$,
  role_da = $q$Designer og udvikler$q$,
  outcome = null,
  outcome_da = null
where slug = 'cpdanmark';

-- VibeLoop ---------------------------------------------------------------
update public.portfolio_cases set
  description = $q$This project was the very first digital product made during my studies. Here, we had to design and develop a concept for an app, with a topic of our own choice. I decided to create an app called VibeLoop that supports social connection and local engagement.$q$,
  description_da = $q$Dette projekt var det allerførste digitale produkt, jeg udviklede under mit studie. Her skulle vi designe og udvikle et koncept til en app med et emne, vi selv valgte. Jeg besluttede at lave en app ved navn VibeLoop, der fremmer sociale relationer og lokalt engagement.$q$,
  context = $q$Course project: an app concept on a topic of my own choice$q$,
  context_da = $q$Kursusprojekt: et appkoncept inden for et selvvalgt emne$q$,
  role = $q$Concept and UX/UI design$q$,
  role_da = $q$Koncept og UX/UI-design$q$,
  outcome = null,
  outcome_da = null
where slug = 'vibeloop';

-- UngeForum --------------------------------------------------------------
update public.portfolio_cases set
  description = $q$This was the exam project at the start of my studies. Here, I worked on redesigning and restructuring a digital solution for Køge Bibliotekerne. The focus of the project was to improve usability, information architecture, and accessibility, while creating a clearer and more user-friendly experience for visitors across different age groups.$q$,
  description_da = $q$Dette var eksamensprojektet i starten af mit studie. Her arbejdede jeg med at redesigne og omstrukturere en digital løsning til Køge Bibliotekerne. Projektets fokus var at forbedre brugervenligheden, informationsarkitekturen og tilgængeligheden, samtidig med at der skabtes en klarere og mere brugervenlig oplevelse for besøgende i forskellige aldersgrupper.$q$,
  context = $q$Exam project for Køge Bibliotekerne$q$,
  context_da = $q$Eksamensprojekt for Køge Bibliotekerne$q$,
  role = $q$UX/UI designer$q$,
  role_da = $q$UX/UI-designer$q$,
  outcome = null,
  outcome_da = null
where slug = 'ungeforum';

-- Pinterest AI Verification ----------------------------------------------
update public.portfolio_cases set
  description = $q$This project was made as part of one of my two electives, Strategic Design. Here, we had to design a digital concept based on future scenarios. My group chose to work with Pinterest and focus on trust, verification, and transparency.$q$,
  description_da = $q$Dette projekt blev lavet som en del af det ene af mine to valgfag, strategisk design. Her skulle vi designe et digitalt koncept med udgangspunkt i fremtidsscenarier. Min gruppe valgte at arbejde med Pinterest og fokusere på tillid, verifikation og gennemsigtighed.$q$,
  context = $q$Elective course (Strategic Design), group project$q$,
  context_da = $q$Valgfag (strategisk design), gruppeprojekt$q$,
  role = $q$Concept designer in a group$q$,
  role_da = $q$Konceptdesigner i en gruppe$q$,
  outcome = null,
  outcome_da = null
where slug = 'pinterest-ai';

-- Pace (Duolingo) --------------------------------------------------------
update public.portfolio_cases set
  description = $q$This project was made as part of the second of my two electives, Behavioural Design. Here, I had to redesign an existing digital product based on behavioural principles. I chose to work with Duolingo and developed Pace— a calmer, more inclusive learning concept.$q$,
  description_da = $q$Dette projekt blev lavet som en del af det andet af mine to valgfag, adfærdsdesign. Her skulle jeg redesigne et eksisterende digitalt produkt ud fra adfærdsmæssige principper. Jeg valgte at arbejde med Duolingo og udviklede Pace— et mere roligt og inkluderende læringskoncept.$q$,
  context = $q$Elective course (Behavioural Design)$q$,
  context_da = $q$Valgfag (adfærdsdesign)$q$,
  role = $q$Concept and UX/UI design$q$,
  role_da = $q$Koncept og UX/UI-design$q$,
  outcome = null,
  outcome_da = null
where slug = 'pace-duolingo';

-- Folkæt -----------------------------------------------------------------
update public.portfolio_cases set
  description = $q$This was the main project I worked on during my internship at Folkæt. Here, I designed a page for neurodivergent users, focusing on accessibility and how individual preferences and support needs can be communicated in teams. The work also included pictograms and accessibility settings to support a more inclusive user experience.$q$,
  description_da = $q$Dette var mit hovedprojekt under min praktik hos Folkæt. Her designede jeg en side til neurodivergente brugere med fokus på tilgængelighed og på, hvordan individuelle præferencer og skånebehov kan formidles i teams. Arbejdet omfattede også piktogrammer og tilgængelighedsindstillinger, der skulle understøtte en mere inkluderende brugeroplevelse.$q$,
  context = $q$Internship project at Folkæt$q$,
  context_da = $q$Praktikprojekt hos Folkæt$q$,
  role = $q$UX/UI designer$q$,
  role_da = $q$UX/UI-designer$q$,
  outcome = $q$Still in progress: the page is being iterated, and a questionnaire is helping to show which preference and accessibility information people actually find useful.$q$,
  outcome_da = $q$Stadig under udvikling: siden bliver itereret, og et spørgeskema er med til at vise, hvilken information om præferencer og tilgængelighed folk faktisk finder brugbar.$q$
where slug = 'folkaet';

commit;

-- Check the result:
-- select slug, context, role, outcome from public.portfolio_cases order by id;
