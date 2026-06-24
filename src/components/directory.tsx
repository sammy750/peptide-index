"use client";

import { useEffect, useMemo, useState } from "react";

import { PeptideCard } from "@/components/cards";
import { searchRecords } from "@/lib/search";
import type { Peptide, SearchRecord } from "@/lib/types";
import { cn, normaliseResidues } from "@/lib/utils";

const ALL = "All";

function toRecord(p: Peptide): SearchRecord {
  return {
    kind: "peptide",
    slug: p.slug,
    title: p.name,
    category: p.category,
    summary: p.summary,
    aliases: p.aliases ?? [],
    tags: p.tags ?? [],
    sequenceShort: normaliseResidues(p.sequenceShort) || undefined,
    status: p.status,
  };
}

export function PeptideDirectory({ peptides }: { peptides: Peptide[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  // Honour deep links: /peptides?q=skin (tag chips) and /peptides?category=Metabolic (home tiles).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    const cat = params.get("category");
    if (cat) setCategory(cat);
  }, []);

  // Categories actually present, in display order, each with a count.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of peptides) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [peptides]);

  const index = useMemo(() => peptides.map(toRecord), [peptides]);
  const bySlug = useMemo(
    () => new Map(peptides.map((p) => [p.slug, p])),
    [peptides],
  );

  const filtered = useMemo(() => {
    let list: Peptide[];
    if (query.trim()) {
      list = searchRecords(index, query)
        .map((r) => bySlug.get(r.slug))
        .filter((p): p is Peptide => Boolean(p));
    } else {
      list = peptides;
    }
    if (category !== ALL) list = list.filter((p) => p.category === category);
    return list;
  }, [query, category, index, bySlug, peptides]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-muted focus:border-ink/40"
          placeholder="Filter by name, alias, tag, or residue string…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck={false}
          aria-label="Filter peptides"
        />

        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={category === ALL}
            label={ALL}
            count={peptides.length}
            onClick={() => setCategory(ALL)}
          />
          {categories.map(([cat, count]) => (
            <CategoryChip
              key={cat}
              active={category === cat}
              label={cat}
              count={count}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No peptides match the current filter.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PeptideCard key={p.slug} peptide={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink",
      )}
    >
      {label}
      <span className={cn("font-mono text-xs", active ? "text-paper/60" : "text-ink/35")}>
        {count}
      </span>
    </button>
  );
}
