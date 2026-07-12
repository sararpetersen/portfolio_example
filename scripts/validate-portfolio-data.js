import { access } from "node:fs/promises";
import { caseStudies } from "../src/data/caseStudies.ts";

const errors = [];
const seenSlugs = new Set();

for (const caseStudy of caseStudies) {
  if (!caseStudy.slug || !/^[a-z0-9-]+$/.test(caseStudy.slug)) errors.push(`Invalid case slug: ${caseStudy.slug || "(missing)"}`);
  if (seenSlugs.has(caseStudy.slug)) errors.push(`Duplicate case slug: ${caseStudy.slug}`);
  seenSlugs.add(caseStudy.slug);

  for (const field of ["name", "year"]) {
    if (!caseStudy[field]) errors.push(`${caseStudy.slug}: missing ${field}`);
  }

  for (const field of ["tagline", "summary", "role", "audience"]) {
    if (!caseStudy[field]?.en || !caseStudy[field]?.da) errors.push(`${caseStudy.slug}: ${field} must have English and Danish text`);
  }

  if (!caseStudy.sections.length) errors.push(`${caseStudy.slug}: must contain at least one case section`);
  const sectionIds = new Set();
  for (const section of caseStudy.sections) {
    if (sectionIds.has(section.id)) errors.push(`${caseStudy.slug}: duplicate section id ${section.id}`);
    sectionIds.add(section.id);
    if (!section.title.en || !section.title.da || !section.body.en || !section.body.da) {
      errors.push(`${caseStudy.slug}/${section.id}: incomplete bilingual content`);
    }
  }

  if (caseStudy.logo?.startsWith("/")) {
    try {
      await access(new URL(`../public${caseStudy.logo}`, import.meta.url));
    } catch {
      errors.push(`${caseStudy.slug}: missing logo file ${caseStudy.logo}`);
    }
  }

  for (const link of caseStudy.links) {
    try {
      new URL(link.url, "https://sararingkow.dk");
    } catch {
      errors.push(`${caseStudy.slug}: invalid link ${link.url}`);
    }
  }
}

if (errors.length) {
  console.error("Portfolio data validation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Portfolio data is valid (${caseStudies.length} local case stud${caseStudies.length === 1 ? "y" : "ies"}).`);
