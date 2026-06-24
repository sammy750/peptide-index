# Peptide Index

A standalone reference site for research peptides: a searchable database of structured
entries plus long-form guides. Content is file-based MDX — no CMS, no database, fully
version-controlled.

Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and
**next-mdx-remote**. Statically generated, so it deploys as static output anywhere.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000

npm run build      # static export → ./out
npm run serve      # preview the built ./out locally
```

> Requires Node 18.18+ (Node 22 recommended — see `.nvmrc`).

## Where things live

```
src/
├── app/                     # Routes (App Router)
│   ├── page.tsx             # Home — hero, search, featured
│   ├── peptides/            # Directory + /peptides/[slug] detail
│   ├── guides/              # Guides list + /guides/[slug]
│   ├── about/               # About page
│   └── layout.tsx           # Root layout, fonts, metadata
├── components/              # Chrome, cards, search, fingerprint, MDX renderer…
├── content/
│   ├── peptides/<slug>.mdx  # One file per peptide
│   └── guides/<slug>.mdx    # One file per guide
└── lib/
    ├── types.ts             # Data model + PEPTIDE_CATEGORIES
    ├── content.ts           # Server-only MDX/filesystem loaders
    ├── search.ts            # Pure, client-safe ranked search
    ├── fingerprint.ts       # Amino-acid classes + fingerprint builder
    └── site.ts              # Site name, nav, disclaimer
```

Add a file, and it appears. The filename is the URL slug unless you set `slug` in
frontmatter.

## Adding a peptide

Create `src/content/peptides/<slug>.mdx`. Frontmatter drives the structured fields; the
body (Markdown/MDX) is the overview. Only `name`, `category`, and `summary` are required.

```mdx
---
name: BPC-157
category: Healing & repair
summary: A synthetic pentadecapeptide studied in preclinical models of tissue repair.
aliases: [Body Protection Compound 157, PL 14736]
tags: [pentadecapeptide, gastric]
sequence: Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val
sequenceShort: GEPPPGKPADDAGLV
molecularFormula: C62H98N16O22
molecularWeight: 1419.5
casNumber: 137525-51-0
pubchemCid: 108101
halfLife: Not well characterised in humans
research:
  - label: Storage — lyophilised
    value: Reported stable at −20 °C, protected from light.
    note: Optional clarifier shown in muted text.
    source: Author et al., Year
references:
  - label: Author et al., Journal, Year.
    url: https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/
    source: PubMed
status: published
updated: 2026-06-23
---

The body is the overview, written in Markdown/MDX. A `<Callout>…</Callout>` component is
available.
```

Notes:

- **No sequence?** Leave `sequence` / `sequenceShort` out — the fingerprint is skipped (see
  the `collagen-peptides` example).
- `status: draft` hides the entry. `status: example` shows a seed-data banner.
- Search matches `name`, `aliases`, `tags`, `category`, `summary`, and the residue string.
- **`research`** is an optional list of `{ label, value, note?, source? }` rows for reported
  handling/lab parameters (storage, solubility, reported half-life, reconstitution). It
  renders in a neutral "Research parameters" block captioned as reported, cited parameters —
  **not** dosing or usage guidance. Keep values factual and attributed.

## Adding a guide

Create `src/content/guides/<slug>.mdx`:

```mdx
---
title: How to read this index
summary: What each part of an entry means.
tags: [meta]
order: 1
status: published
updated: 2026-06-23
---

Body in Markdown/MDX. Tables, `<Callout>` and code blocks all work.
```

`order` sorts the guides list (lower first).

## The example content

The three peptides and two guides shipped here are examples (`status: example`, flagged in
the UI). Their scientific values are **illustrative** and the reference URLs are
**placeholders** — replace them with your verified data, then drop the `status` line or set
it to `published`.

## Editorial note

Entries are reference material, not recommendations. Keep copy factual, attribute claims,
and avoid anything that reads as dosing or medical advice. The footer carries a standing
research-use disclaimer (`src/lib/site.ts` → `src/components/chrome.tsx`).

## Customising

- **Palette:** `tailwind.config.ts` (colours `paper` / `ink` / `volt` / `line` / `muted`).
- **Fonts:** Geist Sans + Geist Mono, loaded via the bundled `geist` package in
  `src/app/layout.tsx` (no network fetch). To swap in a different face, replace the two
  `geist/font/*` imports there with `next/font/google` (or `next/font/local`) and update the
  `--font-geist-sans` / `--font-geist-mono` variable names in `tailwind.config.ts`.
- **Categories:** edit `PEPTIDE_CATEGORIES` in `src/lib/types.ts`.
- **Metadata / domain:** `metadataBase` and titles in `src/app/layout.tsx`; name, nav and
  disclaimer in `src/lib/site.ts`.
```

## Deploying

`npm run build` emits a fully static `out/` directory (`output: "export"`). Drop it on any
static host — Cloudflare Pages, GitHub Pages, S3 + CloudFront, Netlify, or nginx. There is
no server runtime to operate.
