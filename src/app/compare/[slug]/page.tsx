import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionLabel } from "@/components/ui";
import { coaLabel, dateValue, formatLabel, value } from "@/components/vendor-table";
import { COMPARISONS, comparisonSlug, getComparison } from "@/lib/comparisons";
import { getVendor } from "@/lib/content";
import type { Vendor } from "@/lib/types";

export function generateStaticParams() {
  return COMPARISONS.map((p) => ({ slug: comparisonSlug(p) }));
}

function pairFor(slug: string): { a: Vendor; b: Vendor; angle?: string } | null {
  const pair = getComparison(slug);
  if (!pair) return null;
  const a = getVendor(pair.a)?.vendor;
  const b = getVendor(pair.b)?.vendor;
  if (!a || !b) return null;
  return { a, b, angle: pair.angle };
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = pairFor(params.slug);
  if (!p) return {};
  const title = `${p.a.name} vs ${p.b.name} — UK peptide suppliers compared`;
  const description = `${p.a.name} and ${p.b.name} compared on checkable criteria: stated purity, whether Certificates of Analysis are viewable before ordering, testing method and product format.`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${params.slug}/` },
    openGraph: { title, description },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const p = pairFor(params.slug);
  if (!p) notFound();
  const { a, b, angle } = p;

  const rows: [string, string, string][] = [
    ["Stated purity", value(a.purityClaim), value(b.purityClaim)],
    ["COA access", coaLabel(a.coaAccess), coaLabel(b.coaAccess)],
    ["Testing method", value(a.testingMethod), value(b.testingMethod)],
    ["Product format", formatLabel(a.format), formatLabel(b.format)],
    ["Dispatch", value(a.dispatch), value(b.dispatch)],
    ["UK-based", value(a.ukBased), value(b.ukBased)],
    ["Company number", value(a.companyNumber), value(b.companyNumber)],
    ["Checked on", dateValue(a.verifiedOn), dateValue(b.verifiedOn)],
  ];

  return (
    <article className="mx-auto max-w-content px-5 py-10">
      <Link href="/suppliers" className="font-mono text-xs text-muted hover:text-ink">
        ← Suppliers
      </Link>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {a.name} vs {b.name}
        </h1>
        <p className="mt-4 text-muted">
          {angle ??
            `${a.name} and ${b.name} compared on criteria you can verify yourself, recorded from each supplier's own public website.`}
        </p>
      </header>

      <section className="mt-10">
        <SectionLabel>Side by side</SectionLabel>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wider text-muted">
                <th className="py-2 pr-4 font-normal"> </th>
                <th className="py-2 pr-4 font-normal">{a.name}</th>
                <th className="py-2 font-normal">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, av, bv]) => (
                <tr key={label} className="border-b border-line/60 align-top">
                  <td className="py-3 pr-4 text-muted">{label}</td>
                  <td className="py-3 pr-4 text-ink">{av}</td>
                  <td className="py-3 text-ink">{bv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 max-w-2xl">
        <SectionLabel>Profiles</SectionLabel>
        <div className="mt-4 flex flex-col gap-2">
          <Link href={`/suppliers/${a.slug}/`} className="text-sm text-ink hover:underline">
            {a.name} profile →
          </Link>
          <Link href={`/suppliers/${b.slug}/`} className="text-sm text-ink hover:underline">
            {b.name} profile →
          </Link>
          <Link href="/suppliers/" className="text-sm text-ink hover:underline">
            All suppliers compared →
          </Link>
        </div>
      </section>

      <p className="mt-10 max-w-2xl font-mono text-[11px] leading-relaxed text-muted">
        Attributes are recorded from each supplier&rsquo;s own public website on the
        dates shown and go out of date. &ldquo;Not stated&rdquo; means the information
        was not found on their site, not that it is absent from their business. This
        page compares published criteria and does not rank the two suppliers or
        recommend either. {a.name} and {b.name}, and any related names or marks, are
        the property of their respective owners; neither is affiliated with or
        endorses this index. Verify anything that matters directly with the supplier
        before purchasing.
      </p>
    </article>
  );
}
