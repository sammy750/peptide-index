// Central site configuration. Change the name, description and URL here and in
// src/app/layout.tsx's metadataBase to rebrand or point at a real domain.
export const SITE = {
  name: "Peptide Index",
  tagline: "A reference database of research peptides",
  description:
    "A searchable, file-based reference database of research peptides — structured entries, sequences, and long-form guides. Reference material only.",
  // Used for canonical URLs, sitemaps and Open Graph.
  url: "https://peptideindex.info",
  nav: [
    { href: "/peptides", label: "Peptides" },
    { href: "/guides", label: "Guides" },
    { href: "/news", label: "News" },
    { href: "/media", label: "Media" },
    { href: "/about", label: "About" },
  ],
} as const;

export const DISCLAIMER =
  "All entries are reference material for research and educational purposes only. " +
  "Nothing here is medical advice, a dosing recommendation, or a suggestion for human " +
  "or veterinary use. Scientific values should be independently verified against primary sources.";
