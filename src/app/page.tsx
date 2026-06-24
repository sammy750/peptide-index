import Link from "next/link";

import { GuideCard, PeptideCard } from "@/components/cards";
import { SearchBox } from "@/components/search";
import { SectionLabel } from "@/components/ui";
import { MediaVideoGrid } from "@/components/media-video-grid";
import { HeroMolecule } from "@/components/hero-molecule";
import { CategoryShowcase } from "@/components/category-showcase";
import { getAllGuides, getAllNews, getAllPeptides, getSearchIndex } from "@/lib/content";
import { MEDIA_MENTIONS } from "@/lib/media";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const peptides = getAllPeptides();
  const guides = getAllGuides();
  const news = getAllNews();
  const index = getSearchIndex();

  return (
    <div className="mx-auto max-w-content px-5">
      {/* Hero */}
      <section className="pb-12 pt-14 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Research peptide reference
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A searchable index of research{" "}
              <span className="relative whitespace-nowrap">
                peptides
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full bg-volt/60"
                />
              </span>
              .
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Structured entries — sequences, chemistry, mechanism and citations — plus long-form
              guides and the latest news. Reference material only; nothing here is dosing or medical
              advice.
            </p>

            <div className="mt-8 max-w-2xl">
              <SearchBox records={index} />
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted">
              <span>{peptides.length} peptides</span>
              <span>{guides.length} guides</span>
              <span>{news.length} news</span>
              <Link href="/peptides" className="text-ink hover:underline">
                Browse all →
              </Link>
            </div>
          </div>

          {/* Authored peptide-chain illustration */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroMolecule className="w-full" />
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="border-t border-line py-12">
        <div className="flex items-end justify-between">
          <SectionLabel>Browse by category</SectionLabel>
          <Link href="/peptides" className="text-sm text-muted hover:text-ink">
            All {peptides.length} →
          </Link>
        </div>
        <div className="mt-6">
          <CategoryShowcase peptides={peptides} />
        </div>
      </section>

      {/* Peptides */}
      {peptides.length > 0 && (
        <section className="border-t border-line py-12">
          <div className="flex items-end justify-between">
            <SectionLabel>Peptides</SectionLabel>
            <Link href="/peptides" className="text-sm text-muted hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peptides.slice(0, 6).map((p) => (
              <PeptideCard key={p.slug} peptide={p} />
            ))}
          </div>
        </section>
      )}

      {/* Guides */}
      {guides.length > 0 && (
        <section className="border-t border-line py-12">
          <div className="flex items-end justify-between">
            <SectionLabel>Guides</SectionLabel>
            <Link href="/guides" className="text-sm text-muted hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {guides.slice(0, 4).map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* Latest news */}
      {news.length > 0 && (
        <section className="border-t border-line py-12">
          <div className="flex items-end justify-between">
            <SectionLabel>Latest news</SectionLabel>
            <Link href="/news" className="text-sm text-muted hover:text-ink">
              All news →
            </Link>
          </div>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {news.slice(0, 4).map((n) => (
              <li key={n.slug} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <time className="font-mono text-xs text-muted" dateTime={n.date}>
                  {formatDate(n.date)}
                </time>
                <div>
                  <a
                    href={n.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-ink hover:underline"
                  >
                    {n.title}
                  </a>
                  <span className="ml-2 font-mono text-xs text-muted">{n.source}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* In the media — video grid */}
      <section className="border-t border-line py-12">
        <div className="flex items-end justify-between">
          <SectionLabel>In the media — watch</SectionLabel>
          <Link href="/media" className="text-sm text-muted hover:text-ink">
            All {MEDIA_MENTIONS.length} figures →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          What public figures actually said about peptides — from Joe Rogan&rsquo;s BPC-157 story to
          Huberman&rsquo;s and Attia&rsquo;s cautions. Clips are real and sourced; reference only, not
          endorsement.
        </p>
        <div className="mt-6">
          <MediaVideoGrid limit={6} />
        </div>
      </section>
    </div>
  );
}
