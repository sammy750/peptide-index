import Link from "next/link";

import {
  MEDIA_MENTIONS,
  STANCE_META,
  figureSlug,
  type MediaMention,
  type MediaStance,
} from "@/lib/media";
import { Chip } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";

function StanceChip({ stance }: { stance: MediaStance }) {
  const meta = STANCE_META[stance];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] text-ink"
      style={{ backgroundColor: `${meta.color}22` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
}

function MentionCard({ m }: { m: MediaMention }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/media/${figureSlug(m.name)}/`}
            className="text-lg font-semibold tracking-tight text-ink hover:underline"
          >
            {m.name}
          </Link>
          <p className="mt-0.5 text-xs leading-snug text-muted">{m.role}</p>
        </div>
        <StanceChip stance={m.stance} />
      </div>

      {m.youtubeId && (
        <div className="mt-4">
          <VideoEmbed youtubeId={m.youtubeId} title={`${m.name} on peptides`} />
        </div>
      )}

      <blockquote className="mt-4 border-l-2 border-volt pl-3 text-sm leading-relaxed text-ink/85">
        {m.quote}
      </blockquote>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {m.peptides.map((p) => (
          <Chip key={p}>{p}</Chip>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 font-mono text-xs text-muted">
        <Link href={`/media/${figureSlug(m.name)}/`} className="shrink-0 text-ink hover:underline">
          Full profile →
        </Link>
        {m.sourceUrl ? (
          <a
            href={m.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-ink hover:underline"
          >
            {m.youtubeId ? "Source" : "Watch / read"} →
          </a>
        ) : (
          <span className="shrink-0 truncate" title={m.sourceLabel}>
            {m.sourceLabel}
          </span>
        )}
      </div>
    </article>
  );
}

export function StanceLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
      {(Object.keys(STANCE_META) as MediaStance[]).map((s) => (
        <li key={s} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: STANCE_META[s].color }}
          />
          {STANCE_META[s].label}
        </li>
      ))}
    </ul>
  );
}

export function MediaWall() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MEDIA_MENTIONS.map((m) => (
        <MentionCard key={m.name} m={m} />
      ))}
    </div>
  );
}
