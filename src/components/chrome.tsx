import Link from "next/link";

import { DISCLAIMER, SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-5">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-4 w-4 rounded-[3px] bg-volt ring-1 ring-ink/10 transition-transform group-hover:rotate-45"
          />
          <span>{SITE.name}</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-5 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2 font-mono text-sm font-medium">
              <span aria-hidden className="inline-block h-3.5 w-3.5 rounded-[3px] bg-volt" />
              {SITE.name}
            </div>
            <p className="mt-2 text-sm text-muted">{SITE.tagline}.</p>
          </div>
          <nav className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              {SITE.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Standing research-use disclaimer. */}
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">{DISCLAIMER}</p>
      </div>
    </footer>
  );
}
