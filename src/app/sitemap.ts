import type { MetadataRoute } from "next";

import { COMPARISONS, comparisonSlug } from "@/lib/comparisons";
import { getAllGuides, getAllPeptides, getAllVendors } from "@/lib/content";
import { MEDIA_MENTIONS, figureSlug } from "@/lib/media";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/peptides", "/suppliers", "/guides", "/news", "/media", "/about"].map((p) => ({
    url: `${base}${p}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const peptides = getAllPeptides().map((p) => ({
    url: `${base}/peptides/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // NOTE: the nine guides that carry a cross-domain `canonicalUrl` (pointing at
  // my-peptides.co.uk) are DELIBERATELY still listed here. Removing a URL from
  // the sitemap slows re-crawl, and re-crawl is exactly what has to happen for
  // Google to see the new canonical in the first place. Drop them only once GSC
  // reports "Alternate page with proper canonical tag" for them — typically a
  // few weeks. Removing them now risks leaving the pages in limbo for months.
  const guides = getAllGuides().map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const vendors = getAllVendors().map((v) => ({
    url: `${base}/suppliers/${v.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisons = COMPARISONS.map((p) => ({
    url: `${base}/compare/${comparisonSlug(p)}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const media = MEDIA_MENTIONS.map((m) => ({
    url: `${base}/media/${figureSlug(m.name)}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...peptides, ...vendors, ...comparisons, ...guides, ...media];
}
