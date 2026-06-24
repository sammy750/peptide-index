// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
// Edit this list to change the categories available to peptide entries. The
// values are matched case-insensitively against each entry's `category`
// frontmatter field, and drive the filter on /peptides.
export const PEPTIDE_CATEGORIES = [
  "Growth hormone secretagogue",
  "Healing & repair",
  "Metabolic",
  "Cosmetic & skin",
  "Cognitive & nootropic",
  "Immune & longevity",
  "Structural",
  "Blends & stacks",
  "Other",
] as const;

export type PeptideCategory = (typeof PEPTIDE_CATEGORIES)[number];

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------
// `draft`     — hidden from every listing and not built into a page.
// `example`   — visible, but flagged in the UI as illustrative seed data.
// `published` — a normal, live entry (this is also the default when omitted).
export type EntryStatus = "draft" | "example" | "published";

export const DEFAULT_STATUS: EntryStatus = "published";

// ---------------------------------------------------------------------------
// References
// ---------------------------------------------------------------------------
export interface PeptideReference {
  /** Human-readable label, e.g. a paper title or "PubChem CID 9941957". */
  label: string;
  /** Destination URL. Placeholder `#` links are tolerated for example data. */
  url: string;
  /** Optional source tag rendered as a chip, e.g. "PubMed", "PubChem". */
  source?: string;
}

// ---------------------------------------------------------------------------
// Research parameters
// ---------------------------------------------------------------------------
// Free-form, citation-aware rows for handling/lab parameters reported in the
// literature (reconstitution, reported half-life, storage, solubility, etc.).
// Rendered in a neutral block captioned as reported research parameters — NOT
// dosing or usage recommendations. Keep `value` factual and attribute it.
export interface ResearchParameter {
  /** e.g. "Reconstitution (lab prep)", "Reported half-life", "Storage — lyophilised". */
  label: string;
  /** The reported figure or description, written factually. */
  value: string;
  /** Optional clarifier shown in muted text beneath the value. */
  note?: string;
  /** Optional citation tag, e.g. "Author et al., Year" or a reference label. */
  source?: string;
}

// ---------------------------------------------------------------------------
// Peptide frontmatter (raw, as authored in the MDX file)
// ---------------------------------------------------------------------------
export interface PeptideFrontmatter {
  /** Required. Display name. */
  name: string;
  /** Required. One of PEPTIDE_CATEGORIES (free text is tolerated). */
  category: string;
  /** Required. One- or two-sentence plain-language description. */
  summary: string;

  /** Overrides the filename as the URL slug. */
  slug?: string;
  /** Alternate names / brand names — searchable, shown as chips. */
  aliases?: string[];
  /** Free-form keyword tags — searchable, shown as chips. */
  tags?: string[];

  /** Full residue sequence, e.g. "Gly-Glu-Pro-Pro-Pro". Display only. */
  sequence?: string;
  /** One-letter residue string, e.g. "GEPPPGKPADDAGLV". Drives the fingerprint + residue search. */
  sequenceShort?: string;

  /** Structured chemistry fields — all optional, rendered as a spec table. */
  molecularFormula?: string;
  molecularWeight?: number | string;
  casNumber?: string;
  pubchemCid?: string | number;
  halfLife?: string;
  synonyms?: string[];

  /** Reported handling/lab parameters — rendered as a neutral, cited block. */
  research?: ResearchParameter[];

  /** Mechanism of action / molecular target (1–3 sentences). */
  mechanism?: string;
  /** Human-evidence level summary, e.g. "Animal studies; limited human data". */
  evidenceLevel?: string;
  /** Regulatory status summary (FDA / MHRA / compounding). */
  regulatoryStatus?: string;
  /** Whether this is a licensed/prescription medicine somewhere (shows an Rx tag). */
  prescription?: boolean;
  /** Key safety considerations (bulleted). */
  safety?: string[];
  /** Typical research applications (bulleted). */
  researchApplications?: string[];
  /** Slugs of related peptide entries. */
  relatedPeptides?: string[];

  /** Citations / further reading. */
  references?: PeptideReference[];

  status?: EntryStatus;
  /** ISO date (YYYY-MM-DD) the entry was last reviewed. */
  updated?: string;
}

/** A fully-resolved peptide record (slug + status guaranteed present). */
export interface Peptide extends PeptideFrontmatter {
  slug: string;
  status: EntryStatus;
}

// ---------------------------------------------------------------------------
// Guide frontmatter
// ---------------------------------------------------------------------------
export interface GuideFrontmatter {
  /** Required. Display title. */
  title: string;
  /** Required. Short description shown in the guides list and meta tags. */
  summary: string;

  slug?: string;
  tags?: string[];
  status?: EntryStatus;
  /** ISO date (YYYY-MM-DD). */
  updated?: string;
  /** Lower numbers sort first in the guides list. */
  order?: number;
}

export interface Guide extends GuideFrontmatter {
  slug: string;
  status: EntryStatus;
  /** Estimated reading time in minutes, derived from the body. */
  readingTime: number;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
/** Lightweight, client-safe record embedded into the page for search. */
export interface SearchRecord {
  kind: "peptide" | "guide";
  slug: string;
  title: string;
  category?: string;
  summary: string;
  aliases: string[];
  tags: string[];
  sequenceShort?: string;
  status: EntryStatus;
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------
export const NEWS_CATEGORIES = [
  "Regulatory",
  "Science",
  "Industry",
  "Culture",
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export interface NewsFrontmatter {
  /** Required. Headline. */
  title: string;
  /** Required. ISO date YYYY-MM-DD. */
  date: string;
  /** Required. Publisher, e.g. "NPR", "FDA", "CNN". */
  source: string;
  /** Required. Link to the original article (link-out only — never republish text). */
  sourceUrl: string;
  /** Required. One- to two-sentence neutral summary. */
  summary: string;
  category?: NewsCategory | string;
  tags?: string[];
  slug?: string;
  status?: EntryStatus;
}

export interface NewsItem extends NewsFrontmatter {
  slug: string;
  status: EntryStatus;
}
