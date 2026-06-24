import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  DEFAULT_STATUS,
  type EntryStatus,
  type Guide,
  type GuideFrontmatter,
  type NewsFrontmatter,
  type NewsItem,
  type Peptide,
  type PeptideFrontmatter,
  type SearchRecord,
} from "./types";
import { normaliseResidues, readingTime } from "./utils";

// This module is server-only: it touches the filesystem and must never be
// bundled into a client component. It is consumed by Server Components,
// generateStaticParams, and generateMetadata — all of which run at build time.

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const PEPTIDES_DIR = path.join(CONTENT_ROOT, "peptides");
const GUIDES_DIR = path.join(CONTENT_ROOT, "guides");
const NEWS_DIR = path.join(CONTENT_ROOT, "news");

interface RawEntry<T> {
  slug: string;
  data: T;
  content: string;
}

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort();
}

function readEntries<T>(dir: string): RawEntry<T>[] {
  return listMdxFiles(dir).map((file) => {
    const fullPath = path.join(dir, file);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);
    const fileSlug = file.replace(/\.mdx?$/, "");
    const slug = (data as { slug?: string }).slug || fileSlug;
    return { slug, data: data as T, content };
  });
}

function statusOf(data: { status?: EntryStatus }): EntryStatus {
  return data.status ?? DEFAULT_STATUS;
}

/** Drafts are excluded everywhere; examples and published entries are kept. */
function isVisible(status: EntryStatus): boolean {
  return status !== "draft";
}

// ---------------------------------------------------------------------------
// Peptides
// ---------------------------------------------------------------------------
export function getAllPeptides(): Peptide[] {
  return readEntries<PeptideFrontmatter>(PEPTIDES_DIR)
    .map(({ slug, data }) => ({ ...data, slug, status: statusOf(data) }))
    .filter((p) => isVisible(p.status))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPeptideSlugs(): string[] {
  return getAllPeptides().map((p) => p.slug);
}

export function getPeptide(
  slug: string,
): { peptide: Peptide; content: string } | null {
  const entry = readEntries<PeptideFrontmatter>(PEPTIDES_DIR).find(
    (e) => e.slug === slug,
  );
  if (!entry) return null;
  const status = statusOf(entry.data);
  if (!isVisible(status)) return null;
  return {
    peptide: { ...entry.data, slug: entry.slug, status },
    content: entry.content,
  };
}

// ---------------------------------------------------------------------------
// Guides
// ---------------------------------------------------------------------------
export function getAllGuides(): Guide[] {
  return readEntries<GuideFrontmatter>(GUIDES_DIR)
    .map(({ slug, data, content }) => ({
      ...data,
      slug,
      status: statusOf(data),
      readingTime: readingTime(content),
    }))
    .filter((g) => isVisible(g.status))
    .sort(
      (a, b) =>
        (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title),
    );
}

export function getGuideSlugs(): string[] {
  return getAllGuides().map((g) => g.slug);
}

export function getGuide(
  slug: string,
): { guide: Guide; content: string } | null {
  const entry = readEntries<GuideFrontmatter>(GUIDES_DIR).find(
    (e) => e.slug === slug,
  );
  if (!entry) return null;
  const status = statusOf(entry.data);
  if (!isVisible(status)) return null;
  return {
    guide: {
      ...entry.data,
      slug: entry.slug,
      status,
      readingTime: readingTime(entry.content),
    },
    content: entry.content,
  };
}

// ---------------------------------------------------------------------------
// News (file-based, link-out only)
// ---------------------------------------------------------------------------
export function getAllNews(): NewsItem[] {
  return readEntries<NewsFrontmatter>(NEWS_DIR)
    .map(({ slug, data }) => ({ ...data, slug, status: statusOf(data) }))
    .filter((n) => isVisible(n.status))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ---------------------------------------------------------------------------
// Search index (lightweight, serialisable, embedded into pages)
// ---------------------------------------------------------------------------
export function getSearchIndex(): SearchRecord[] {
  const peptides: SearchRecord[] = getAllPeptides().map((p) => ({
    kind: "peptide",
    slug: p.slug,
    title: p.name,
    category: p.category,
    summary: p.summary,
    aliases: p.aliases ?? [],
    tags: p.tags ?? [],
    sequenceShort: normaliseResidues(p.sequenceShort) || undefined,
    status: p.status,
  }));

  const guides: SearchRecord[] = getAllGuides().map((g) => ({
    kind: "guide",
    slug: g.slug,
    title: g.title,
    summary: g.summary,
    aliases: [],
    tags: g.tags ?? [],
    status: g.status,
  }));

  return [...peptides, ...guides];
}
