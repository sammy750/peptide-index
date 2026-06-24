import type { Peptide } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface Row {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

export function SpecTable({ peptide }: { peptide: Peptide }) {
  const rows: Row[] = [];

  rows.push({ label: "Category", value: peptide.category });

  if (peptide.molecularFormula) {
    rows.push({ label: "Molecular formula", value: peptide.molecularFormula, mono: true });
  }
  if (peptide.molecularWeight !== undefined && peptide.molecularWeight !== "") {
    const mw =
      typeof peptide.molecularWeight === "number"
        ? `${peptide.molecularWeight} g/mol`
        : peptide.molecularWeight;
    rows.push({ label: "Molecular weight", value: mw, mono: true });
  }
  if (peptide.casNumber) {
    rows.push({ label: "CAS number", value: peptide.casNumber, mono: true });
  }
  if (peptide.pubchemCid) {
    rows.push({
      label: "PubChem CID",
      value: (
        <a
          href={`https://pubchem.ncbi.nlm.nih.gov/compound/${peptide.pubchemCid}`}
          target="_blank"
          rel="noreferrer"
          className="border-b border-line transition-colors hover:border-ink"
        >
          {peptide.pubchemCid}
        </a>
      ),
      mono: true,
    });
  }
  if (peptide.halfLife) {
    rows.push({ label: "Half-life", value: peptide.halfLife });
  }
  if (peptide.synonyms?.length) {
    rows.push({ label: "Synonyms", value: peptide.synonyms.join(", ") });
  }
  if (peptide.updated) {
    rows.push({ label: "Last reviewed", value: formatDate(peptide.updated) });
  }

  return (
    <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-3 gap-3 px-4 py-2.5 text-sm">
          <dt className="col-span-1 text-muted">{row.label}</dt>
          <dd className={row.mono ? "col-span-2 font-mono" : "col-span-2"}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
