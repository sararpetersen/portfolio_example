import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL("../", import.meta.url));
const blogDir = path.join(root, "src/content/blog");
const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

const ids = new Map();
const slugs = new Map();

for (const file of files) {
  const id = path.basename(file, path.extname(file));
  ids.set(id, [...(ids.get(id) || []), file]);

  const content = fs.readFileSync(path.join(blogDir, file), "utf8");
  const slugMatch = content.match(/^slug:\s*(.+)$/m);
  if (slugMatch) {
    const slug = slugMatch[1].trim();
    if (slug) {
      slugs.set(slug, [...(slugs.get(slug) || []), file]);
    }
  }
}

const duplicateIds = [...ids.entries()].filter(([, fileList]) => fileList.length > 1);
const duplicateSlugs = [...slugs.entries()].filter(([, fileList]) => fileList.length > 1);

if (duplicateIds.length || duplicateSlugs.length) {
  console.error("\nDuplicate blog content detected:\n");

  for (const [id, fileList] of duplicateIds) {
    console.error(`- id ${id} is duplicated in: ${fileList.join(", ")}`);
  }

  for (const [slug, fileList] of duplicateSlugs) {
    console.error(`- slug ${slug} is duplicated in: ${fileList.join(", ")}`);
  }

  process.exit(1);
}

console.log("Blog content ids and slugs are unique.");
