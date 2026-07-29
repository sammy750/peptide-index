import type { Metadata } from "next";
import Link from "next/link";

import { SectionLabel } from "@/components/ui";
import { ComparisonNote, VendorTable } from "@/components/vendor-table";
import { COMPARISONS, comparisonSlug } from "@/lib/comparisons";
import { getAllVendors, getVendor } from "@/lib/content";

export const metadata: Metadata = {
  title: "UK Research Peptide Suppliers — Compared",
  description:
    "A side-by-side comparison of UK research-peptide suppliers on checkable criteria: stated purity, whether Certificates of Analysis are publicly viewable, testing method and product format.",
  alternates: { canonical: "/suppliers/" },
};

export default function SuppliersPage() {
  const vendors = getAllVendors();
  const withPublicCoas = vendors.filter((v) => v.coaAccess === "public-library");
  const preMixed = vendors.filter(
    (v) => v.format === "pre-mixed" || v.format === "both",
  );

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Suppliers
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          UK research peptide suppliers, compared
        </h1>
        <p className="mt-4 text-muted">
          Suppliers compared on criteria you can check yourself rather than on
          marketing language. Every attribute below is recorded from the supplier&rsquo;s
          own public website, with the date it was checked.
        </p>
      </header>

      <section className="mt-10">
        <SectionLabel>Comparison</SectionLabel>
        <div className="mt-4">
          <VendorTable vendors={vendors} />
        </div>
        <ComparisonNote />
      </section>

      <section className="mt-12 max-w-2xl">
        <SectionLabel>Head to head</SectionLabel>
        <div className="mt-4 flex flex-col gap-2">
          {COMPARISONS.map((p) => {
            const a = getVendor(p.a)?.vendor;
            const b = getVendor(p.b)?.vendor;
            if (!a || !b) return null;
            return (
              <Link
                key={comparisonSlug(p)}
                href={`/compare/${comparisonSlug(p)}/`}
                className="text-sm text-ink hover:underline"
              >
                {a.name} vs {b.name} →
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 max-w-2xl">
        <SectionLabel>What these criteria mean</SectionLabel>
        <div className="prose prose-index mt-4 max-w-prose">
          <p>
            <strong>COA access</strong> is the one that separates suppliers most
            sharply. Almost every vendor states that a Certificate of Analysis ships
            with an order. Far fewer publish a library you can browse{" "}
            <em>before</em> buying — which is the only version that lets you check the
            testing format and purity figures while you are still deciding. Of the{" "}
            {vendors.length} suppliers listed here, {withPublicCoas.length}{" "}
            {withPublicCoas.length === 1 ? "does" : "do"} so.
          </p>
          <p>
            <strong>Stated purity</strong> is quoted verbatim. Note that a purity
            figure only means something when it is tied to a batch number you can
            match against the vial in front of you; a site-wide &ldquo;99%+&rdquo;
            claim with no per-batch document behind it is a marketing statement.
          </p>
          <p>
            <strong>Format</strong> records whether products ship as lyophilised
            (freeze-dried) powder needing reconstitution, or as a pre-mixed solution
            ready to use. {preMixed.length} of {vendors.length} listed suppliers ship
            pre-mixed at least some of their range. Neither format is simply better —
            they trade off differently on stability, shipping and handling error. See{" "}
            <a href="/guides/pre-mixed-vs-lyophilised-peptides/">
              pre-mixed vs lyophilised peptides
            </a>
            .
          </p>
          <p>
            <strong>Testing</strong> records the analytical method as the supplier
            describes it. HPLC quantifies purity; mass spectrometry confirms identity.
            The two answer different questions, and a supplier doing only the first
            has not confirmed the compound is what the label says.
          </p>
        </div>
      </section>
    </div>
  );
}
