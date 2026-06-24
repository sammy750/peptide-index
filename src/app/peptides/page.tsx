import type { Metadata } from "next";

import { PeptideDirectory } from "@/components/directory";
import { getAllPeptides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Peptides",
  description: "Browse and filter the full index of research peptide entries.",
};

export default function PeptidesPage() {
  const peptides = getAllPeptides();

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Directory</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Peptides
        </h1>
        <p className="mt-3 text-muted">
          Filter by category, or search by name, alias, tag, or one-letter residue string.
        </p>
      </header>

      <div className="mt-10">
        <PeptideDirectory peptides={peptides} />
      </div>
    </div>
  );
}
