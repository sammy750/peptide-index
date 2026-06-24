"use client";

import { useState } from "react";

/** Lazy YouTube embed: shows a thumbnail facade, loads the iframe only on click. */
export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-line bg-ink"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
        loading="lazy"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-paper/90 shadow ring-1 ring-ink/10 transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-ink">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
