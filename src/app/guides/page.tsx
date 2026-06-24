import type { Metadata } from "next";

import { GuideCard } from "@/components/cards";
import { getAllGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides",
  description: "Long-form reference guides on research peptides.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Reading</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Guides</h1>
        <p className="mt-3 text-muted">
          Long-form, factual reference on sequences, nomenclature, handling and related topics.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No guides yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
