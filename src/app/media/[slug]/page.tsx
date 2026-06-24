import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { VideoEmbed } from "@/components/video-embed";
import { Chip, SectionLabel } from "@/components/ui";
import {
  MEDIA_MENTIONS,
  STANCE_META,
  figureSlug,
  getFigureBySlug,
  peptideSlugFor,
} from "@/lib/media";

export function generateStaticParams() {
  return MEDIA_MENTIONS.map((m) => ({ slug: figureSlug(m.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getFigureBySlug(params.slug);
  if (!m) return {};
  return {
    title: `${m.name} on peptides`,
    description: m.quote,
    openGraph: { title: `${m.name} on peptides`, description: m.quote },
  };
}

export default function FigurePage({ params }: { params: { slug: string } }) {
  const m = getFigureBySlug(params.slug);
  if (!m) notFound();

  const stance = STANCE_META[m.stance];

  return (
    <article className="mx-auto max-w-content px-5 py-10">
      <Link href="/media" className="font-mono text-xs text-muted hover:text-ink">
        ← In the media
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] text-ink"
            style={{ backgroundColor: `${stance.color}22` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stance.color }} />
            {stance.label}
          </span>
          <span className="font-mono text-xs text-muted">
            {m.date} · {m.confidence} confidence
          </span>
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">{m.name}</h1>
        <p className="mt-1 text-muted">{m.role}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-10 lg:col-span-2">
          {m.bio && <p className="max-w-prose text-lg leading-relaxed text-ink/85">{m.bio}</p>}

          {m.youtubeId && (
            <section>
              <SectionLabel>Watch</SectionLabel>
              <div className="mt-4 max-w-2xl">
                <VideoEmbed youtubeId={m.youtubeId} title={m.videoTitle || `${m.name} on peptides`} />
                {m.videoTitle && <p className="mt-2 text-xs text-muted">{m.videoTitle}</p>}
              </div>
            </section>
          )}

          <section>
            <SectionLabel>In their words</SectionLabel>
            <blockquote className="mt-4 max-w-prose border-l-2 border-volt pl-4 text-lg leading-relaxed text-ink/90">
              {m.quote}
            </blockquote>
          </section>

          {/* The stack */}
          {m.stack?.length ? (
            <section>
              <SectionLabel>The stack — peptides they&rsquo;ve named</SectionLabel>
              <div className="mt-4 space-y-3">
                {m.stack.map((s) => (
                  <div key={s.label} className="rounded-lg border border-line bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-ink">{s.label}</span>
                      {s.peptideSlug && (
                        <Link
                          href={`/peptides/${s.peptideSlug}/`}
                          className="shrink-0 font-mono text-xs text-ink hover:underline"
                        >
                          View entry →
                        </Link>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.note}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section>
              <SectionLabel>Peptides mentioned</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.peptides.map((p) => {
                  const slug = peptideSlugFor(p);
                  return (
                    <Chip key={p} href={slug ? `/peptides/${slug}/` : undefined}>
                      {p}
                    </Chip>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 lg:space-y-6">
            <div>
              <SectionLabel>Source</SectionLabel>
              <div className="mt-3 rounded-lg border border-line bg-white p-4 text-sm">
                {m.sourceUrl ? (
                  <a
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-line text-ink transition-colors hover:border-ink"
                  >
                    {m.sourceLabel} →
                  </a>
                ) : (
                  <span className="text-muted">{m.sourceLabel}</span>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-line bg-paper p-4 text-xs leading-relaxed text-muted">
              <span className="font-medium text-ink">Reference, not endorsement.</span> Documented
              from public statements. Inclusion does not imply this person endorses any product, and
              nothing here is medical advice.{" "}
              <Link href="/media" className="text-ink hover:underline">
                See all figures →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
