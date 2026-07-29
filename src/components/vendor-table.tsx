import Link from "next/link";

import type { CoaAccess, ProductFormat, Vendor } from "@/lib/types";
import { formatDate } from "@/lib/utils";

/**
 * Shared rendering for vendor attributes.
 *
 * Every field on a Vendor is optional on purpose: an attribute we could not
 * verify against the vendor's own site is absent, and absent renders as
 * "Not stated" — never as a negative claim. "Not stated" means we did not find
 * it, which is a statement about our check, not about the company.
 */

export function formatLabel(f?: ProductFormat): string {
  switch (f) {
    case "pre-mixed":
      return "Pre-mixed solution";
    case "lyophilised":
      return "Lyophilised powder";
    case "both":
      return "Both";
    default:
      return "Not stated";
  }
}

export function coaLabel(c?: CoaAccess): string {
  switch (c) {
    case "public-library":
      return "Public library";
    case "with-order":
      return "With order only";
    case "not-stated":
      return "Not stated";
    default:
      return "Not stated";
  }
}

export function value(v?: string | number | boolean): string {
  if (v === undefined || v === null || v === "") return "Not stated";
  if (typeof v === "boolean") return v ? "Yes" : "Not stated";
  return String(v);
}

/**
 * Dates specifically. gray-matter parses an unquoted YAML date into a real
 * Date object, so String()-ing it yields "Wed Jul 29 2026 01:00:00 GMT+0100
 * (British Summer Time)" rather than a date. Handle it here rather than
 * requiring every frontmatter author to remember to quote the value.
 */
export function dateValue(v?: string | Date): string {
  if (!v) return "Not stated";
  return formatDate(v instanceof Date ? v.toISOString() : v);
}

/** The comparison grid. Rows are alphabetical — the order is not a ranking. */
export function VendorTable({ vendors }: { vendors: Vendor[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wider text-muted">
            <th className="py-2 pr-4 font-normal">Supplier</th>
            <th className="py-2 pr-4 font-normal">Stated purity</th>
            <th className="py-2 pr-4 font-normal">COA access</th>
            <th className="py-2 pr-4 font-normal">Testing</th>
            <th className="py-2 pr-4 font-normal">Format</th>
            <th className="py-2 font-normal">Checked</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.slug} className="border-b border-line/60 align-top">
              <td className="py-3 pr-4">
                <Link href={`/suppliers/${v.slug}/`} className="text-ink hover:underline">
                  {v.name}
                </Link>
              </td>
              <td className="py-3 pr-4 text-muted">{value(v.purityClaim)}</td>
              <td className="py-3 pr-4 text-muted">{coaLabel(v.coaAccess)}</td>
              <td className="py-3 pr-4 text-muted">{value(v.testingMethod)}</td>
              <td className="py-3 pr-4 text-muted">{formatLabel(v.format)}</td>
              <td className="py-3 font-mono text-[11px] text-muted">
                {dateValue(v.verifiedOn)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Standing note rendered under every comparison surface. */
export function ComparisonNote() {
  return (
    <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted">
      Attributes are recorded from each supplier&rsquo;s own public website on the date
      shown, and go out of date. &ldquo;Not stated&rdquo; means we did not find the
      information on their site, not that it is absent from their business. Rows are
      alphabetical and the order is not a ranking. Company names and marks are the
      property of their respective owners. Verify anything that matters directly with
      the supplier before purchasing.
    </p>
  );
}
