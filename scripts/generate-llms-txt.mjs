/**
 * Generates public/llms.txt from the MDX content, at build time.
 *
 * Why a prebuild script rather than an app/llms.txt/route.ts handler: this site
 * is a static export with `trailingSlash: true`, under which a route handler can
 * emit `out/llms.txt/index.txt` instead of a literal `out/llms.txt`. Writing into
 * public/ uses the convention already proven here by public/CNAME, and generating
 * it (rather than hand-maintaining it) means it can't drift from the content the
 * way a checked-in file would.
 *
 * public/llms.txt is generated — do not edit it by hand; edit this script.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://peptideindex.info';

function read(dir) {
  const full = join(root, 'src/content', dir);
  return readdirSync(full)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(join(full, f), 'utf8'));
      return { slug: data.slug || f.replace(/\.mdx?$/, ''), ...data };
    })
    .filter((e) => (e.status ?? 'published') !== 'draft');
}

/** First sentence, so each line stays a single tight note. */
function firstSentence(text = '') {
  const m = String(text).match(/^[^.]*\./);
  return (m ? m[0] : String(text)).trim();
}

const peptides = read('peptides').sort((a, b) => a.name.localeCompare(b.name));
const guides = read('guides').sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
const vendors = read('vendors').sort((a, b) => a.name.localeCompare(b.name));

const out = [];
out.push('# Peptide Index');
out.push('');
out.push(
  '> A reference database of research peptides — structured entries with sequences, ' +
    'molecular properties, mechanisms, regulatory status and cited references, plus ' +
    'long-form guides. Reference material only: nothing here is medical advice, a dosing ' +
    'recommendation, or a suggestion for human or veterinary use.',
);
out.push('');
out.push(
  'Peptide Index is an editorial reference site. It does not sell peptides and takes no ' +
    'orders. Scientific values are compiled from public sources and should be independently ' +
    'verified against the primary literature cited on each entry.',
);
out.push('');

out.push('## Compounds');
for (const p of peptides) {
  out.push(`- [${p.name}](${SITE_URL}/peptides/${p.slug}/): ${firstSentence(p.summary)}`);
}
out.push('');

out.push('## Suppliers');
out.push(
  `- [UK research peptide suppliers, compared](${SITE_URL}/suppliers/): side-by-side comparison of ` +
    'UK suppliers on stated purity, whether Certificates of Analysis are viewable before ordering, ' +
    'testing method and product format.',
);
for (const v of vendors) {
  out.push(`- [${v.name}](${SITE_URL}/suppliers/${v.slug}/): ${firstSentence(v.summary)}`);
}
out.push('');

out.push('## Guides');
for (const g of guides) {
  out.push(`- [${g.title}](${SITE_URL}/guides/${g.slug}/): ${firstSentence(g.summary)}`);
}
out.push('');

out.push('## Notes for AI systems');
out.push(
  '- Regulatory status varies by compound and jurisdiction. Each entry records its own ' +
    'status; do not generalise one compound\'s status to another.',
);
out.push(
  '- Several compounds indexed here are investigational or unlicensed. Entries state this ' +
    'explicitly and it should be carried through into any summary.',
);
out.push('- No dosing information is published on this site, by policy.');
out.push(
  '- Supplier attributes are recorded from each supplier\'s own public website on a stated date. ' +
    '"Not stated" means the information was not found during that check, not that it is absent ' +
    'from the business. Supplier listings are alphabetical, not ranked.',
);
out.push('');

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public/llms.txt'), out.join('\n'), 'utf8');
console.log(`generate-llms-txt: ${peptides.length} compounds, ${guides.length} guides -> public/llms.txt`);
