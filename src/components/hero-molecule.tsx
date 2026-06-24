// Authored, on-brand hero illustration: a stylised peptide chain whose beads are
// coloured by amino-acid class (matching the sequence-fingerprint visual language).
// Pure SVG — no external requests, crisp at any size, works with static export.

interface Node {
  x: number;
  y: number;
  r: number;
  c: string;
  t: string;
  /** dark bead → light text; light (volt) bead → ink text */
  dark?: boolean;
}

const NONPOLAR = "#9B9B8C";
const POLAR = "#4FA9BD";
const ACIDIC = "#E0685F";
const BASIC = "#6E74D6";
const VOLT = "#B6F300";

const NODES: Node[] = [
  { x: 44, y: 250, r: 17, c: NONPOLAR, t: "G", dark: true },
  { x: 96, y: 176, r: 14, c: POLAR, t: "S", dark: true },
  { x: 150, y: 232, r: 19, c: ACIDIC, t: "D", dark: true },
  { x: 208, y: 150, r: 15, c: BASIC, t: "R", dark: true },
  { x: 262, y: 214, r: 22, c: VOLT, t: "E" },
  { x: 320, y: 134, r: 14, c: NONPOLAR, t: "P", dark: true },
  { x: 372, y: 202, r: 17, c: POLAR, t: "T", dark: true },
  { x: 426, y: 140, r: 15, c: BASIC, t: "H", dark: true },
  { x: 470, y: 212, r: 13, c: ACIDIC, t: "D", dark: true },
];

export function HeroMolecule({ className }: { className?: string }) {
  const backbone =
    "M " + NODES.map((n) => `${n.x} ${n.y}`).join(" L ");

  return (
    <svg
      viewBox="0 0 514 360"
      role="img"
      aria-label="Stylised peptide chain — beads coloured by amino-acid class"
      className={className}
    >
      {/* soft halo behind the accent residue */}
      <circle cx="262" cy="214" r="60" fill={VOLT} opacity="0.16" />

      {/* faint side-chain rings on a few residues */}
      {[NODES[2], NODES[4], NODES[6]].map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y - n.r - 16}
          r="9"
          fill="none"
          stroke="#191A15"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
      ))}
      {[NODES[2], NODES[4], NODES[6]].map((n, i) => (
        <line
          key={`l${i}`}
          x1={n.x}
          y1={n.y - n.r}
          x2={n.x}
          y2={n.y - n.r - 7}
          stroke="#191A15"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
      ))}

      {/* backbone */}
      <path
        d={backbone}
        fill="none"
        stroke="#191A15"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* residue beads */}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} stroke="#191A15" strokeOpacity="0.08" />
          <text
            x={n.x}
            y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize={n.r * 0.9}
            fontWeight="600"
            fill={n.dark ? "#FCFCFA" : "#191A15"}
          >
            {n.t}
          </text>
        </g>
      ))}
    </svg>
  );
}
