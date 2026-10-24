// Checks that the English text written in the page files still matches src/i18n/translations.ts.
//
// Every page keeps a copy of its English text (so it shows before any script runs, and for search engines),
// while the language switcher reads the same text from the dictionary. If the two drift apart, English
// visitors see one wording and anyone who switches language back and forth sees another. This fails the
// build when that happens, and when a data-i18n* key is missing from the dictionary or from Danish.
//
// Run with: npm run check-i18n

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translations } from "../src/i18n/translations.ts";

const root = fileURLToPath(new URL("../", import.meta.url));

function collect(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collect(full);
    return entry.name.endsWith(".astro") ? [full] : [];
  });
}

const files = ["src/pages", "src/components", "src/layouts"].flatMap((dir) => collect(path.join(root, dir)));

const entities = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&rarr;": "→",
  "&larr;": "←",
};

function plain(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-zA-Z#0-9]+;/g, (m) => entities[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

// End index (exclusive) of the opening tag that starts at `start`, skipping quotes and {expressions}.
function openingTagEnd(src, start) {
  let quote = null;
  let braces = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (braces > 0) {
      if (c === "{") braces++;
      else if (c === "}") braces--;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === "{") braces = 1;
    else if (c === ">") return i + 1;
  }
  return -1;
}

function innerHtml(src, tagName, from) {
  const re = new RegExp(`<(/?)${tagName.replace(/[.]/g, "\\.")}(?=[\\s>/])`, "g");
  re.lastIndex = from;
  let depth = 1;
  let m;
  while ((m = re.exec(src))) {
    if (m[1] === "/") depth--;
    else {
      const end = openingTagEnd(src, m.index);
      if (end > 0 && src[end - 2] !== "/") depth++;
    }
    if (depth === 0) return src.slice(from, m.index);
  }
  return null;
}

const attrMap = { "data-i18n-aria": "aria-label", "data-i18n-tooltip": "data-tooltip", "data-i18n-placeholder": "placeholder" };

const errors = [];
const used = new Set();
const rel = (f) => path.relative(root, f);

function checkKey(file, key, what) {
  used.add(key);
  if (translations.en[key] === undefined) errors.push(`${rel(file)}: ${what} uses "${key}", which is missing from the English dictionary`);
  if (translations.da[key] === undefined) errors.push(`${rel(file)}: ${what} uses "${key}", which is missing from the Danish dictionary`);
}

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const tagRe = /<([A-Za-z][\w.]*)\b/g;
  let t;
  while ((t = tagRe.exec(src))) {
    const end = openingTagEnd(src, t.index);
    if (end < 0) continue;
    const tag = src.slice(t.index, end);
    if (!/data-i18n/.test(tag)) continue;

    const body = tag.replace(/^<[A-Za-z][\w.]*/, "");

    // data-i18n="key": element text
    const textKey = body.match(/\sdata-i18n="([^"]+)"/);
    if (textKey) {
      const key = textKey[1];
      checkKey(file, key, "data-i18n");
      const selfClosing = src[end - 2] === "/";
      const inner = selfClosing ? "" : innerHtml(src, t[1], end);
      if (inner !== null && !selfClosing && !/[{}]/.test(inner) && translations.en[key] !== undefined) {
        const page = plain(inner);
        const dict = plain(translations.en[key]);
        if (page !== dict && !translations.en[key].includes("{year}")) {
          errors.push(`${rel(file)}: "${key}" differs\n    page:       ${page}\n    dictionary: ${dict}`);
        }
      }
    }

    // data-i18n-aria / -tooltip / -placeholder: the matching attribute
    for (const [i18nAttr, realAttr] of Object.entries(attrMap)) {
      const k = body.match(new RegExp(`\\s${i18nAttr}="([^"]+)"`));
      if (!k) continue;
      const key = k[1];
      checkKey(file, key, i18nAttr);
      const v = body.match(new RegExp(`\\s${realAttr}="([^"]*)"`));
      if (v && translations.en[key] !== undefined && plain(v[1]) !== plain(translations.en[key])) {
        errors.push(`${rel(file)}: ${realAttr} for "${key}" differs\n    page:       ${plain(v[1])}\n    dictionary: ${plain(translations.en[key])}`);
      }
    }
  }
}

for (const key of Object.keys(translations.en)) {
  if (translations.da[key] === undefined) errors.push(`src/i18n/translations.ts: "${key}" has English but no Danish`);
}
for (const key of Object.keys(translations.da)) {
  if (translations.en[key] === undefined) errors.push(`src/i18n/translations.ts: "${key}" has Danish but no English`);
}

// Keys can also be referenced without a data-i18n attribute in plain quotes: from data files (labProjects.ts),
// from scripts, or built in a template like data-i18n={`timeline.${n}.year`}. Count those as used too.
const everyFile = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return everyFile(full);
    return /\.(astro|ts|js)$/.test(e.name) && !full.endsWith("translations.ts") ? [full] : [];
  });
const allSource = everyFile(path.join(root, "src")).map((f) => fs.readFileSync(f, "utf8")).join("\n");
const templates = [...allSource.matchAll(/data-i18n(?:-aria|-tooltip|-placeholder)?=\{`([^`]+)`\}/g)].map(
  (m) =>
    new RegExp(
      "^" +
        m[1]
          .split(/\$\{[^}]*\}/)
          .map((part) => part.replace(/[.*+?^$()|[\]\\]/g, "\\$&"))
          .join("[^.]+") +
        "$",
    ),
);
for (const key of Object.keys(translations.en)) {
  if (allSource.includes(`"${key}"`) || allSource.includes(`'${key}'`) || templates.some((re) => re.test(key))) used.add(key);
}

const unused = Object.keys(translations.en).filter((k) => !used.has(k));

if (unused.length > 0) {
  console.warn(`i18n: ${unused.length} dictionary keys are not referenced by any data-i18n attribute (they may be used from scripts):`);
  console.warn("  " + unused.join(", "));
}

if (errors.length > 0) {
  console.error(`\ni18n check failed (${errors.length}):\n`);
  errors.forEach((e) => console.error("- " + e));
  process.exit(1);
}

console.log(`i18n is in sync (${Object.keys(translations.en).length} keys, ${used.size} used in ${files.length} files).`);
