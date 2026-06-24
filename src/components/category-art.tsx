// Authored line glyphs, one per peptide category. Stroke = currentColor so they
// inherit the surrounding text colour. viewBox 0 0 24 24.

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export function CategoryGlyph({ category, className }: { category: string; className?: string }) {
  switch (category) {
    case "Growth hormone secretagogue":
      // rising bars
      return (
        <Svg className={className}>
          <line x1="6" y1="19" x2="6" y2="14" {...S} />
          <line x1="12" y1="19" x2="12" y2="10" {...S} />
          <line x1="18" y1="19" x2="18" y2="5" {...S} />
          <polyline points="4 8 9 5 14 7 20 3" {...S} />
        </Svg>
      );
    case "Healing & repair":
      // plus / cross
      return (
        <Svg className={className}>
          <path d="M12 5v14M5 12h14" {...S} />
        </Svg>
      );
    case "Metabolic":
      // atom / energy
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="2.4" {...S} />
          <ellipse cx="12" cy="12" rx="9" ry="4" {...S} />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" {...S} />
        </Svg>
      );
    case "Cosmetic & skin":
      // droplet
      return (
        <Svg className={className}>
          <path d="M12 3.5C8 9 7 12 7 14.5a5 5 0 0 0 10 0C17 12 16 9 12 3.5Z" {...S} />
        </Svg>
      );
    case "Cognitive & nootropic":
      // node network
      return (
        <Svg className={className}>
          <circle cx="6" cy="8" r="2" {...S} />
          <circle cx="18" cy="7" r="2" {...S} />
          <circle cx="12" cy="17" r="2" {...S} />
          <path d="M7.6 9.3 10.7 15M16.4 8.4 13.3 15M8 8h8" {...S} />
        </Svg>
      );
    case "Immune & longevity":
      // shield
      return (
        <Svg className={className}>
          <path d="M12 3 19 6v5c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6Z" {...S} />
        </Svg>
      );
    case "Blends & stacks":
      // stacked layers
      return (
        <Svg className={className}>
          <path d="M12 4 21 8.5 12 13 3 8.5 12 4Z" {...S} />
          <path d="M3 13 12 17.5 21 13" {...S} />
        </Svg>
      );
    case "Structural":
      // hexagon
      return (
        <Svg className={className}>
          <path d="M12 3.5 19 7.5v9L12 20.5 5 16.5v-9Z" {...S} />
        </Svg>
      );
    default:
      // other — spark
      return (
        <Svg className={className}>
          <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" {...S} />
        </Svg>
      );
  }
}
