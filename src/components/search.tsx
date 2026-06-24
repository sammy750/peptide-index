"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { searchRecords } from "@/lib/search";
import type { SearchRecord } from "@/lib/types";

const MAX_RESULTS = 12;

export function SearchBox({
  records,
  placeholder = "Search peptides, aliases, tags or a residue string (e.g. GHK)…",
  autoFocus = false,
}: {
  records: SearchRecord[];
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchRecords(records, query).slice(0, MAX_RESULTS);
  }, [query, records]);

  const active = query.trim().length > 0;

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm focus-within:border-ink/40">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 text-muted"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          // 16px font-size avoids iOS zoom-on-focus.
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={autoFocus}
          spellCheck={false}
          aria-label="Search the index"
        />
        {active && (
          <button
            onClick={() => setQuery("")}
            className="shrink-0 rounded-md px-1.5 font-mono text-xs text-muted hover:text-ink"
            aria-label="Clear search"
          >
            esc
          </button>
        )}
      </div>

      {active && (
        <div className="mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted">
              No matches for “{query.trim()}”.
            </p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-line overflow-auto">
              {results.map((r) => (
                <li key={`${r.kind}-${r.slug}`}>
                  <Link
                    href={`/${r.kind === "guide" ? "guides" : "peptides"}/${r.slug}/`}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-ink/[0.03]"
                  >
                    <span className="mt-0.5 shrink-0 rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                      {r.kind}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="font-medium text-ink">{r.title}</span>
                        {r.category && (
                          <span className="truncate font-mono text-[11px] text-muted">
                            {r.category}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-sm text-muted">
                        {r.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
