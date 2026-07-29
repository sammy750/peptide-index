/**
 * Build-time guard for cross-file slug references.
 *
 * The content model has several places where one file names another by slug —
 * `stockedBy` on a compound, `relatedPeptides`, and the vendor slugs in
 * COMPARISONS. None of these are type-checked, because they are strings in
 * frontmatter. A typo silently renders nothing rather than failing, which on a
 * comparison site means a supplier quietly disappears from a compound page and
 * nobody notices.
 *
 * Runs on prebuild alongside generate-llms-txt.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'src/content');

function entries(dir) {
  const full = join(contentDir, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(join(full, f), 'utf8'));
      return { slug: data.slug || f.replace(/\.mdx?$/, ''), file: `${dir}/${f}`, data };
    });
}

const peptides = entries('peptides');
const vendors = entries('vendors');
const vendorSlugs = new Set(vendors.map((v) => v.slug));
const peptideSlugs = new Set(peptides.map((p) => p.slug));

const errors = [];

for (const p of peptides) {
  for (const s of p.data.stockedBy ?? []) {
    if (!vendorSlugs.has(s)) {
      errors.push(`${p.file}: stockedBy "${s}" has no entry in src/content/vendors`);
    }
  }
  for (const s of p.data.relatedPeptides ?? []) {
    if (!peptideSlugs.has(s)) {
      errors.push(`${p.file}: relatedPeptides "${s}" has no matching compound entry`);
    }
  }
}

// A vendor page asserts facts about a named third party, so a missing
// verifiedOn date means we'd publish undated claims about a real company.
for (const v of vendors) {
  if (!v.data.verifiedOn) {
    errors.push(`vendors/${v.slug}: missing verifiedOn — never publish undated claims about a named company`);
  }
  if (!v.data.url) {
    errors.push(`vendors/${v.slug}: missing url`);
  }
}

// Comparison pairs reference vendor slugs from a .ts file, parsed as source.
const cmpFile = join(root, 'src/lib/comparisons.ts');
if (existsSync(cmpFile)) {
  const src = readFileSync(cmpFile, 'utf8');
  for (const m of src.matchAll(/\{\s*a:\s*['"]([^'"]+)['"]\s*,\s*b:\s*['"]([^'"]+)['"]/g)) {
    for (const s of [m[1], m[2]]) {
      if (!vendorSlugs.has(s)) {
        errors.push(`comparisons.ts: pair references unknown vendor "${s}"`);
      }
    }
  }
}

if (errors.length) {
  console.error('\ncheck-content-refs FAILED\n');
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `check-content-refs: ${peptides.length} compounds, ${vendors.length} vendors, all references resolve.`,
);
