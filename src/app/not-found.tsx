import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-start px-5 py-24">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">404</div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Not found</h1>
      <p className="mt-3 max-w-md text-muted">
        That entry doesn&rsquo;t exist — it may have been a draft, or the URL may be wrong.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <Link href="/peptides" className="border-b border-ink/30 hover:border-ink">
          Browse peptides
        </Link>
        <Link href="/guides" className="border-b border-ink/30 hover:border-ink">
          Read guides
        </Link>
      </div>
    </div>
  );
}
