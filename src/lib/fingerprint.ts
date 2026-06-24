import { normaliseResidues } from "./utils";

// ---------------------------------------------------------------------------
// Amino-acid reference data
// ---------------------------------------------------------------------------
// Residues are coloured by physico-chemical class so the "fingerprint" strip
// encodes real structure (hydrophobic / polar / acidic / basic), not noise.

export type AAClass = "nonpolar" | "polar" | "acidic" | "basic" | "unknown";

export const AA_CLASS_META: Record<
  AAClass,
  { label: string; color: string }
> = {
  nonpolar: { label: "Nonpolar", color: "#9B9B8C" },
  polar: { label: "Polar", color: "#4FA9BD" },
  acidic: { label: "Acidic (−)", color: "#E0685F" },
  basic: { label: "Basic (+)", color: "#6E74D6" },
  unknown: { label: "Other", color: "#CFCFC4" },
};

interface AminoAcid {
  name: string;
  klass: AAClass;
}

export const AMINO_ACIDS: Record<string, AminoAcid> = {
  A: { name: "Alanine", klass: "nonpolar" },
  R: { name: "Arginine", klass: "basic" },
  N: { name: "Asparagine", klass: "polar" },
  D: { name: "Aspartic acid", klass: "acidic" },
  C: { name: "Cysteine", klass: "polar" },
  E: { name: "Glutamic acid", klass: "acidic" },
  Q: { name: "Glutamine", klass: "polar" },
  G: { name: "Glycine", klass: "nonpolar" },
  H: { name: "Histidine", klass: "basic" },
  I: { name: "Isoleucine", klass: "nonpolar" },
  L: { name: "Leucine", klass: "nonpolar" },
  K: { name: "Lysine", klass: "basic" },
  M: { name: "Methionine", klass: "nonpolar" },
  F: { name: "Phenylalanine", klass: "nonpolar" },
  P: { name: "Proline", klass: "nonpolar" },
  S: { name: "Serine", klass: "polar" },
  T: { name: "Threonine", klass: "polar" },
  W: { name: "Tryptophan", klass: "nonpolar" },
  Y: { name: "Tyrosine", klass: "polar" },
  V: { name: "Valine", klass: "nonpolar" },
};

export interface FingerprintCell {
  letter: string;
  name: string;
  klass: AAClass;
  color: string;
}

/** Resolve a single one-letter code to its class + colour. */
export function residueInfo(letter: string): FingerprintCell {
  const aa = AMINO_ACIDS[letter];
  const klass: AAClass = aa ? aa.klass : "unknown";
  return {
    letter,
    name: aa ? aa.name : "Unknown / non-standard",
    klass,
    color: AA_CLASS_META[klass].color,
  };
}

/**
 * Build the ordered list of cells for a sequence. Returns `null` when there is
 * no usable residue string — callers skip the fingerprint entirely in that case.
 */
export function buildFingerprint(sequenceShort?: string): FingerprintCell[] | null {
  const residues = normaliseResidues(sequenceShort);
  if (!residues) return null;
  return residues.split("").map(residueInfo);
}

/** Per-class residue counts, for the small composition summary. */
export function composition(cells: FingerprintCell[]): Record<AAClass, number> {
  const counts: Record<AAClass, number> = {
    nonpolar: 0,
    polar: 0,
    acidic: 0,
    basic: 0,
    unknown: 0,
  };
  for (const cell of cells) counts[cell.klass] += 1;
  return counts;
}
