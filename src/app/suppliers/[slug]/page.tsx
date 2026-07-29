import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx";
import { SectionLabel } from "@/components/ui";
import { coaLabel, dateValue, formatLabel, value } from "@/components/vendor-table";
import { getAllPeptides, getVendor, getVendorSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getVendorSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const result = getVendor(params.slug);
  if (!result) return {};
  const { vendor } = result;
  return {
    title: `${vendor.name} — supplier profile`,
    description: vendor.summary,
    alternates: { canonical: `/suppliers/${params.slug}/` },
    openGraph: { title: `${vendor.name} — supplier profile`, description: vendor.summary },
  };
}

export default function VendorPage({ params }: { params: { slug: string } }) {
  const result = getVendor(params.slug);
  if (!result) notFound();
  const { vendor, content } = result;

  const stocks = getAllPeptides()
    .filter((p) => (p.stockedBy ?? []).includes(vendor.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const rows: [string, string][] = [
    ["Stated purity", value(vendor.purityClaim)],
    ["COA access", coaLabel(vendor.coaAccess)],
    ["Testing method", value(vendor.testingMethod)],
    ["Product format", formatLabel(vendor.format)],
    ["Dispatch", value(vendor.dispatch)],
    ["UK-based", value(vendor.ukBased)],
    ["Company number", value(vendor.companyNumber)],
    ["Catalogue size", vendor.catalogueSize ? `~${vendor.catalogueSize} products` : "Not stated"],
  ];

  return (
    <article className="mx-auto max-w-content px-5 py-10">
      <Link href="/suppliers" className="font-mono text-xs text-muted hover:text-ink">
        ← Suppliers
      </Link>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {vendor.name}
        </h1>
        <p className="mt-3 text-muted">{vendor.summary}</p>
        <a
          href={vendor.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-mono text-xs text-ink hover:underline"
        >
          {vendor.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} →
        </a>
      </header>

      <section className="mt-10 max-w-2xl">
        <SectionLabel>Recorded attributes</SectionLabel>
        <dl className="mt-4 divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-2.5 text-sm">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        {vendor.coaLibraryUrl ? (
          <a
            href={vendor.coaLibraryUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-ink hover:underline"
          >
            View their public COA library →
          </a>
        ) : null}
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
          Recorded from {vendor.name}&rsquo;s own public website
          {vendor.verifiedOn ? ` on ${dateValue(vendor.verifiedOn)}` : ""}. &ldquo;Not
          stated&rdquo; means we did not find the information on their site, not that
          it is absent from their business. Details change — verify anything that
          matters directly with the supplier. {vendor.name} and any related marks are
          the property of their owner.
        </p>
      </section>

      {vendor.notes?.length ? (
        <section className="mt-10 max-w-2xl">
          <SectionLabel>Notes</SectionLabel>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
            {vendor.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {content.trim() ? (
        <section className="mt-10 max-w-2xl">
          <Mdx source={content} />
        </section>
      ) : null}

      {stocks.length ? (
        <section className="mt-10 max-w-2xl">
          <SectionLabel>Compounds listed on this index</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {stocks.map((p) => (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}/`}
                className="text-sm text-ink hover:underline"
              >
                {p.name} →
              </Link>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Compounds this index covers that {vendor.name} is recorded as stocking.
            Not their full catalogue.
          </p>
        </section>
      ) : null}
    </article>
  );
}
