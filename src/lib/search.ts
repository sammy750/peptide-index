import type { SearchRecord } from "./types";

// Pure, dependency-free, client-safe ranked search. No filesystem access here —
// the index is built on the server and passed into the client component.

interface Field {
  value: string;
  weight: number;
}

function fieldsFor(rec: SearchRecord): Field[] {
  return [
    { value: rec.title, weight: 10 },
    { value: rec.aliases.join(" "), weight: 8 },
    { value: rec.category ?? "", weight: 5 },
    { value: rec.tags.join(" "), weight: 4 },
    { value: rec.summary, weight: 2 },
  ];
}

/** Score one record against a normalised, tokenised query. Higher is better; 0 = no match. */
function scoreRecord(rec: SearchRecord, tokens: string[], residueQuery: string): number {
  const fields = fieldsFor(rec);
  let score = 0;

  for (const token of tokens) {
    let matchedThisToken = false;
    for (const { value, weight } of fields) {
      const haystack = value.toLowerCase();
      const idx = haystack.indexOf(token);
      if (idx === -1) continue;
      matchedThisToken = true;
      // Whole-word and prefix matches rank above mid-word substring hits.
      const isWordStart = idx === 0 || /\s/.test(haystack[idx - 1]);
      score += weight + (isWordStart ? weight * 0.5 : 0);
    }
    // Residue-string matching: a query like "GHK" hits the one-letter sequence.
    if (residueQuery && rec.sequenceShort) {
      if (rec.sequenceShort.toUpperCase().includes(residueQuery)) {
        score += 6;
        matchedThisToken = true;
      }
    }
    // Every token must match somewhere (AND semantics) or the record is dropped.
    if (!matchedThisToken) return 0;
  }

  return score;
}

export function searchRecords(
  records: SearchRecord[],
  query: string,
): SearchRecord[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const tokens = trimmed.split(/\s+/).filter(Boolean);
  // A pure-letter query may also be a residue lookup (e.g. "ghk", "gepppg").
  const residueQuery = /^[a-z]+$/.test(trimmed) ? trimmed.toUpperCase() : "";

  return records
    .map((rec) => ({ rec, score: scoreRecord(rec, tokens, residueQuery) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.rec.title.localeCompare(b.rec.title))
    .map((x) => x.rec);
}
