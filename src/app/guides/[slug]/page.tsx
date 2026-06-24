import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx";
import { ExampleBanner } from "@/components/ui";
import { getGuide, getGuideSlugs } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const result = getGuide(params.slug);
  if (!result) return {};
  return {
    title: result.guide.title,
    description: result.guide.summary,
    openGraph: { title: result.guide.title, description: result.guide.summary },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const result = getGuide(params.slug);
  if (!result) notFound();
  const { guide, content } = result;

  return (
    <article className="mx-auto max-w-content px-5 py-10">
      <Link href="/guides" className="font-mono text-xs text-muted hover:text-ink">
        ← Guides
      </Link>

      <header className="mx-auto mt-6 max-w-prose">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink">
          {guide.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span>{guide.readingTime} min read</span>
          {guide.updated && (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(guide.updated)}</span>
            </>
          )}
        </div>
      </header>

      {guide.status === "example" && (
        <div className="mx-auto mt-6 max-w-prose">
          <ExampleBanner />
        </div>
      )}

      <div className="mx-auto mt-8 max-w-prose">
        <Mdx source={content} />
      </div>
    </article>
  );
}
