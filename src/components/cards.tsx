import Link from "next/link";

import { buildFingerprint } from "@/lib/fingerprint";
import type { Guide, Peptide } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui";

/** Compact colour strip used inside cards — first N residues only. */
function MiniFingerprint({ sequenceShort }: { sequenceShort?: string }) {
  const cells = buildFingerprint(sequenceShort);
  if (!cells) return null;
  const shown = cells.slice(0, 28);
  return (
    <div className="flex gap-[2px]" aria-hidden>
      {shown.map((cell, i) => (
        <span
          key={i}
          className="h-3 w-1 rounded-[1px]"
          style={{ backgroundColor: cell.color }}
        />
      ))}
    </div>
  );
}

export function PeptideCard({ peptide }: { peptide: Peptide }) {
  return (
    <Link
      href={`/peptides/${peptide.slug}/`}
      className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-all hover:border-ink/25 hover:shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {peptide.category}
        </div>
        <StatusBadge status={peptide.status} />
      </div>

      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{peptide.name}</h3>

      {peptide.sequenceShort && (
        <div className="mt-3">
          <MiniFingerprint sequenceShort={peptide.sequenceShort} />
        </div>
      )}

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{peptide.summary}</p>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
        View entry
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}/`}
      className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-all hover:border-ink/25 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Guide</div>
        <StatusBadge status={guide.status} />
      </div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink group-hover:underline">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{guide.summary}</p>
      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
        <span>{guide.readingTime} min read</span>
        {guide.updated && (
          <>
            <span aria-hidden>·</span>
            <span>{formatDate(guide.updated)}</span>
          </>
        )}
      </div>
    </Link>
  );
}
