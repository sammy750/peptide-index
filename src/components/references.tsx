import type { PeptideReference } from "@/lib/types";

export function ReferenceList({ references }: { references?: PeptideReference[] }) {
  if (!references?.length) return null;
  return (
    <ol className="space-y-3">
      {references.map((ref, i) => {
        const isPlaceholder = !ref.url || ref.url === "#";
        return (
          <li key={i} className="flex gap-3 text-sm">
            <span className="shrink-0 font-mono text-xs text-muted">[{i + 1}]</span>
            <span>
              {isPlaceholder ? (
                <span className="text-ink/80">{ref.label}</span>
              ) : (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-line text-ink transition-colors hover:border-ink"
                >
                  {ref.label}
                </a>
              )}
              {ref.source && (
                <span className="ml-2 rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                  {ref.source}
                </span>
              )}
              {isPlaceholder && (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                  placeholder
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
