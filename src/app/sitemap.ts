import type { MetadataRoute } from "next";

import { getAllGuides, getAllPeptides } from "@/lib/content";
import { MEDIA_MENTIONS, figureSlug } from "@/lib/media";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/peptides", "/guides", "/news", "/media", "/about"].map((p) => ({
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

  const guides = getAllGuides().map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const media = MEDIA_MENTIONS.map((m) => ({
    url: `${base}/media/${figureSlug(m.name)}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...peptides, ...guides, ...media];
}
