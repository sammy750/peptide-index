// Central site configuration. Change the name, description and URL here and in
// src/app/layout.tsx's metadataBase to rebrand or point at a real domain.
export const SITE = {
  name: "Peptide Index",
  tagline: "A reference database of research peptides",
  description:
    "A searchable, file-based reference database of research peptides — structured entries, sequences, and long-form guides. Reference material only.",
  // Used for canonical URLs, sitemaps and Open Graph.
  url: "https://peptideindex.info",
  /**
   * Google Search Console verification token — the `content` value from the
   * "HTML tag" method, NOT the whole <meta> element. Paste the token here and
   * layout.tsx emits the tag; leave empty and no tag is emitted.
   *
   * This route needs no DNS access, which matters because the alternative
   * (a DNS TXT record) depends on registrar credentials. The "HTML file"
   * method also works here — drop the file Google gives you into public/,
   * alongside CNAME, and it ships with the static export.
   */
  googleSiteVerification: "",
  nav: [
    { href: "/peptides", label: "Peptides" },
    { href: "/suppliers", label: "Suppliers" },
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
