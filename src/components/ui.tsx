import Link from "next/link";

import type { EntryStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Small rounded keyword pill. Optionally links to a search query. */
export function Chip({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-xs text-muted",
    href && "transition-colors hover:border-ink/30 hover:text-ink",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}

/** Inline marker for non-published entries. Published entries render nothing. */
export function StatusBadge({ status }: { status: EntryStatus }) {
  if (status === "published") return null;
  const label = status === "example" ? "Example data" : "Draft";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-volt/30 px-2.5 py-0.5 font-mono text-xs font-medium text-ink ring-1 ring-inset ring-volt">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink/70" />
      {label}
    </span>
  );
}

/** Full-width banner explaining seed/illustrative example data. */
export function ExampleBanner() {
  return (
    <div className="rounded-lg border border-volt bg-volt/15 px-4 py-3 text-sm text-ink">
      <span className="font-medium">Example entry.</span> The values and references below
      are illustrative seed data — replace them with your verified figures, then remove the{" "}
      <code className="rounded bg-ink/[0.06] px-1 py-0.5 font-mono text-xs">status</code> line.
    </div>
  );
}

/** Uppercase mono section label. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{children}</div>
  );
}
