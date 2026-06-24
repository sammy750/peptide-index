import Link from "next/link";

import { MEDIA_MENTIONS, STANCE_META, figureSlug } from "@/lib/media";
import { VideoEmbed } from "@/components/video-embed";

/** A grid of the verified video clips, each linking to the figure's profile. */
export function MediaVideoGrid({ limit }: { limit?: number }) {
  const withVideo = MEDIA_MENTIONS.filter((m) => m.youtubeId);
  const shown = typeof limit === "number" ? withVideo.slice(0, limit) : withVideo;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((m) => (
        <div key={m.name}>
          <VideoEmbed youtubeId={m.youtubeId!} title={m.videoTitle || `${m.name} on peptides`} />
          <div className="mt-2 flex items-center justify-between gap-2">
            <Link
              href={`/media/${figureSlug(m.name)}/`}
              className="truncate text-sm font-medium text-ink hover:underline"
            >
              {m.name}
            </Link>
            <span className="shrink-0 font-mono text-[11px] text-muted">
              {STANCE_META[m.stance].label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
