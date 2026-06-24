import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Fingerprint } from "@/components/fingerprint";
import { Mdx } from "@/components/mdx";
import { ReferenceList } from "@/components/references";
import { ResearchParameters } from "@/components/research-parameters";
import { PeptideScience } from "@/components/peptide-science";
import { SpecTable } from "@/components/spec-table";
import { Chip, ExampleBanner, SectionLabel, StatusBadge } from "@/components/ui";
import { getAllPeptides, getPeptide, getPeptideSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getPeptideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const result = getPeptide(params.slug);
  if (!result) return {};
  const { peptide } = result;
  const aliasPart = peptide.aliases?.length ? ` (${peptide.aliases.join(", ")})` : "";
  return {
    title: peptide.name,
    description: peptide.summary,
    openGraph: { title: `${peptide.name}${aliasPart}`, description: peptide.summary },
  };
}

export default function PeptidePage({ params }: { params: { slug: string } }) {
  const result = getPeptide(params.slug);
  if (!result) notFound();
  const { peptide, content } = result;

  const allPeptides = getAllPeptides();
  const related = (peptide.relatedPeptides ?? [])
    .map((s) => allPeptides.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="mx-auto max-w-content px-5 py-10">
      <Link href="/peptides" className="font-mono text-xs text-muted hover:text-ink">
        ← Peptides
      </Link>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {peptide.category}
          </span>
          {peptide.prescription && (
            <span className="rounded-full bg-ink/[0.06] px-2.5 py-0.5 font-mono text-xs text-ink">
              ℞ Prescription medicine
            </span>
          )}
          <StatusBadge status={peptide.status} />
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">{peptide.name}</h1>
        {peptide.aliases?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {peptide.aliases.map((a) => (
              <Chip key={a}>{a}</Chip>
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-lg leading-relaxed text-muted">{peptide.summary}</p>
      </header>

      {peptide.status === "example" && (
        <div className="mt-6 max-w-3xl">
          <ExampleBanner />
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-12 lg:col-span-2">
          {peptide.sequenceShort && (
            <section>
              <SectionLabel>Sequence fingerprint</SectionLabel>
              <div className="mt-4 rounded-xl border border-line bg-white p-5">
                <Fingerprint sequenceShort={peptide.sequenceShort} />
                {peptide.sequence && (
                  <p className="mt-5 border-t border-line pt-4 font-mono text-xs leading-relaxed text-muted">
                    {peptide.sequence}
                  </p>
                )}
              </div>
            </section>
          )}

          <section>
            <SectionLabel>Overview</SectionLabel>
            <div className="mt-4">
              <Mdx source={content} />
            </div>
          </section>

          <PeptideScience peptide={peptide} />

          {peptide.research?.length ? (
            <section>
              <SectionLabel>Research parameters</SectionLabel>
              <div className="mt-4">
                <ResearchParameters parameters={peptide.research} />
              </div>
            </section>
          ) : null}

          {peptide.references?.length ? (
            <section>
              <SectionLabel>References</SectionLabel>
              <div className="mt-4">
                <ReferenceList references={peptide.references} />
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 lg:space-y-6">
            <div>
              <SectionLabel>Properties</SectionLabel>
              <div className="mt-3">
                <SpecTable peptide={peptide} />
              </div>
            </div>

            {related.length ? (
              <div>
                <SectionLabel>Related</SectionLabel>
                <div className="mt-3 flex flex-col gap-2">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/peptides/${p.slug}/`}
                      className="text-sm text-ink hover:underline"
                    >
                      {p.name} →
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {peptide.tags?.length ? (
              <div>
                <SectionLabel>Tags</SectionLabel>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {peptide.tags.map((t) => (
                    <Chip key={t} href={`/peptides?q=${encodeURIComponent(t)}`}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
