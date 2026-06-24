import type { Metadata } from "next";

import { MediaWall, StanceLegend } from "@/components/media-wall";
import { SectionLabel } from "@/components/ui";
import { MEDIA_MENTIONS, REG_TIMELINE } from "@/lib/media";

export const metadata: Metadata = {
  title: "In the Media",
  description:
    "How public figures — podcasters, athletes, clinicians and officials — have discussed research peptides. Reference material, balanced and attributed; inclusion is not endorsement.",
};

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">In the media</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Peptides in the public conversation
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {MEDIA_MENTIONS.length} public figures — podcasters, athletes, clinicians, founders and
          officials — who have discussed peptides on the record. Quotes are verbatim and attributed.
        </p>
      </header>

      {/* Editorial / compliance framing */}
      <div className="mt-6 max-w-3xl rounded-lg border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-muted">
        <span className="font-medium text-ink">This is reference material, not endorsement.</span>{" "}
        Inclusion here does not mean a person endorses any product — by us or otherwise — and several
        of these voices are explicitly <span className="text-ink">cautionary</span> (Andrew Huberman
        and Peter Attia both stress the thin human evidence and real risks). Nothing on this page is
        medical advice or a recommendation to buy or use anything.
      </div>

      <div className="mt-6">
        <StanceLegend />
      </div>

      <div className="mt-8">
        <MediaWall />
      </div>

      {/* Regulatory backdrop */}
      <section className="mt-16 border-t border-line pt-10">
        <SectionLabel>Why now — the 2026 regulatory backdrop</SectionLabel>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Much of this coverage tracks a live regulatory story in the United States. Note that a
          policy move toward easing restrictions is <span className="text-ink">not</span> the same as
          FDA approval.
        </p>
        <ol className="mt-6 max-w-2xl space-y-3">
          {REG_TIMELINE.map((t) => (
            <li key={t.date} className="flex gap-4 text-sm">
              <span className="w-28 shrink-0 font-mono text-xs text-ink">{t.date}</span>
              <span className="text-muted">{t.event}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
