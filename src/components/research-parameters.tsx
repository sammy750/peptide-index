import type { ResearchParameter } from "@/lib/types";

/**
 * Renders reported research/handling parameters as a neutral, attributed table.
 * Deliberately framed as *reported parameters from the literature*, never as
 * dosing or usage guidance — see the standing caption below.
 */
export function ResearchParameters({
  parameters,
}: {
  parameters?: ResearchParameter[];
}) {
  if (!parameters?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <dl className="divide-y divide-line">
        {parameters.map((p, i) => (
          <div key={i} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-3">
            <dt className="text-sm text-muted sm:col-span-1">{p.label}</dt>
            <dd className="sm:col-span-2">
              <span className="text-sm text-ink">{p.value}</span>
              {p.source && (
                <span className="ml-2 rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                  {p.source}
                </span>
              )}
              {p.note && <p className="mt-0.5 text-xs text-muted">{p.note}</p>}
            </dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-line bg-paper px-4 py-2.5 text-xs leading-relaxed text-muted">
        Reported research parameters drawn from the cited literature — provided for reference
        only. These are <strong className="font-medium text-ink/80">not</strong> dosing,
        usage, or medical recommendations.
      </p>
    </div>
  );
}
