import Link from "next/link";

import { CategoryGlyph } from "@/components/category-art";
import { PEPTIDE_CATEGORIES, type Peptide } from "@/lib/types";

/** A visual "browse by category" grid with authored glyphs and live counts. */
export function CategoryShowcase({ peptides }: { peptides: Peptide[] }) {
  const counts = new Map<string, number>();
  for (const p of peptides) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  const cats: string[] = (PEPTIDE_CATEGORIES as readonly string[]).filter((c) => counts.has(c));
  for (const c of counts.keys()) if (!cats.includes(c)) cats.push(c);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {cats.map((cat) => (
        <Link
          key={cat}
          href={`/peptides?category=${encodeURIComponent(cat)}`}
          className="group flex flex-col gap-3 rounded-xl border border-line bg-white p-4 transition-all hover:border-ink/25 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper text-ink transition-colors group-hover:border-volt group-hover:bg-volt/20">
            <CategoryGlyph category={cat} className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium leading-snug text-ink">{cat}</span>
            <span className="font-mono text-xs text-muted">
              {counts.get(cat)} {counts.get(cat) === 1 ? "entry" : "entries"}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
