/**
 * Head-to-head supplier comparisons.
 *
 * Deliberately an explicit list rather than every possible pair. N vendors give
 * N×(N−1)/2 combinations, and generating all of them would produce a mass of
 * near-identical thin pages — the exact pattern search engines treat as
 * doorway content, and it would bury the pairs anyone actually searches for.
 * Add a pair here only when the head-to-head is a real query.
 *
 * Both slugs must exist in src/content/vendors, or the build fails the check in
 * scripts/check-comparisons.mjs.
 */

export interface ComparisonPair {
  /** Vendor slug. Appears first in the URL and the table. */
  a: string;
  /** Vendor slug. */
  b: string;
  /**
   * Optional framing sentence for this specific pairing — what a reader
   * comparing these two is usually trying to decide between.
   */
  angle?: string;
}

export const COMPARISONS: ComparisonPair[] = [
  {
    a: "express-peptides",
    b: "my-peptides",
    angle:
      "The two suppliers on this index that ship pre-mixed rather than lyophilised material — so this is a comparison within the format, not between formats.",
  },
  {
    a: "my-peptides",
    b: "peptides-lab-uk",
    angle:
      "Both state 99%+ HPLC purity. They differ on whether you can read the certificates before ordering or only after.",
  },
  {
    a: "my-peptides",
    b: "uk-peptides",
    angle:
      "Both publish browsable certificate libraries. They differ on product format, on catalogue size, and on whether testing is in-house or third-party.",
  },
  {
    a: "uk-peptides",
    b: "uk-peptide-lab",
    angle:
      "Two suppliers with openly published batch certificates, differing on stated minimum purity and on whether testing is in-house or by named external laboratories.",
  },
];

export function comparisonSlug(p: ComparisonPair): string {
  return `${p.a}-vs-${p.b}`;
}

export function getComparison(slug: string): ComparisonPair | undefined {
  return COMPARISONS.find((p) => comparisonSlug(p) === slug);
}
