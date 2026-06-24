import { SectionLabel } from "@/components/ui";
import type { Peptide } from "@/lib/types";

/** Mechanism / evidence / regulatory status, research applications, and safety. */
export function PeptideScience({ peptide }: { peptide: Peptide }) {
  const hasStatus = peptide.mechanism || peptide.evidenceLevel || peptide.regulatoryStatus;
  const hasApps = !!peptide.researchApplications?.length;
  const hasSafety = !!peptide.safety?.length;
  if (!hasStatus && !hasApps && !hasSafety) return null;

  return (
    <>
      {hasStatus && (
        <section>
          <SectionLabel>Mechanism, evidence &amp; status</SectionLabel>
          {peptide.mechanism && (
            <p className="mt-4 max-w-prose leading-relaxed text-ink/85">{peptide.mechanism}</p>
          )}
          {(peptide.evidenceLevel || peptide.regulatoryStatus) && (
            <dl className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line">
              {peptide.evidenceLevel && (
                <div className="grid grid-cols-1 gap-1 px-4 py-2.5 text-sm sm:grid-cols-3 sm:gap-3">
                  <dt className="text-muted">Human evidence</dt>
                  <dd className="sm:col-span-2">{peptide.evidenceLevel}</dd>
                </div>
              )}
              {peptide.regulatoryStatus && (
                <div className="grid grid-cols-1 gap-1 px-4 py-2.5 text-sm sm:grid-cols-3 sm:gap-3">
                  <dt className="text-muted">Regulatory status</dt>
                  <dd className="sm:col-span-2">{peptide.regulatoryStatus}</dd>
                </div>
              )}
            </dl>
          )}
        </section>
      )}

      {hasApps && (
        <section>
          <SectionLabel>Research applications</SectionLabel>
          <ul className="mt-4 max-w-prose space-y-1.5 text-sm text-ink/85">
            {peptide.researchApplications!.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-muted">
                  —
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasSafety && (
        <section>
          <SectionLabel>Safety considerations</SectionLabel>
          <ul className="mt-4 max-w-prose space-y-2 rounded-lg border border-volt bg-volt/10 p-4 text-sm text-ink/85">
            {peptide.safety!.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>⚠</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
