import type { Metadata } from "next";

import { DISCLAIMER, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, how it is built, and its editorial stance.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">About</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          About {SITE.name}
        </h1>
      </header>

      <div className="prose prose-index mt-8 max-w-prose">
        <p>
          {SITE.name} is a file-based reference database of research peptides. Every entry is a
          plain Markdown/MDX file with structured frontmatter — there is no CMS and no database, so
          the whole catalogue is version-controlled and reviewable like code.
        </p>

        <h2>What you&rsquo;ll find</h2>
        <p>
          Each peptide entry collects its sequence, basic chemistry, aliases and citations alongside
          a plain-language overview. A colour-coded sequence “fingerprint” visualises the residue
          composition at a glance. Longer-form guides cover cross-cutting topics like nomenclature
          and handling.
        </p>

        <h2>Editorial stance</h2>
        <p>
          Entries are reference material, not recommendations. Copy is kept factual, claims are
          attributed to primary sources, and nothing is framed as dosing or medical advice. Where a
          figure has not been verified it should be marked as such.
        </p>

        <Disclaimer />

        <h2>How it&rsquo;s built</h2>
        <p>
          Next.js (App Router) with statically-exported output, Tailwind CSS for styling, and
          <code> next-mdx-remote</code> to render the MDX bodies. Because it builds to static files,
          it can be hosted anywhere.
        </p>
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="not-prose my-8 rounded-lg border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-muted">
      {DISCLAIMER}
    </div>
  );
}
