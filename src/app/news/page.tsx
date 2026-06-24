import type { Metadata } from "next";

import { Chip } from "@/components/ui";
import { getAllNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description:
    "Curated peptide news — regulatory moves, science, industry and culture. Headlines link out to the original source.",
};

export default function NewsPage() {
  const news = getAllNews();

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <header className="max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">News</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Peptide news
        </h1>
        <p className="mt-3 text-muted">
          A curated feed of regulatory, scientific, industry and cultural developments. Each item
          links out to its original source — we summarise, we don&rsquo;t republish.
        </p>
      </header>

      <ol className="mt-10 divide-y divide-line border-y border-line">
        {news.map((n) => (
          <li key={n.slug} className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[8rem_1fr]">
            <div className="flex flex-col gap-2">
              <time className="font-mono text-xs text-muted" dateTime={n.date}>
                {formatDate(n.date)}
              </time>
              {n.category && (
                <span className="w-fit rounded-full bg-ink/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                  {n.category}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium leading-snug text-ink">
                <a
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:underline"
                >
                  {n.title}
                </a>
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{n.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-ink hover:underline"
                >
                  {n.source} →
                </a>
                {n.tags?.slice(0, 3).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-xs text-muted">
        {news.length} items · summaries are neutral and link to the original reporting.
      </p>
    </div>
  );
}
