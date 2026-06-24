import {
  AA_CLASS_META,
  buildFingerprint,
  composition,
  type AAClass,
} from "@/lib/fingerprint";

const CLASS_ORDER: AAClass[] = ["nonpolar", "polar", "acidic", "basic", "unknown"];

/**
 * The sequence "fingerprint": a residue-by-residue colour strip encoding amino
 * acid class, plus a colour-coded one-letter string and a composition bar.
 * Renders nothing when there is no usable residue string.
 */
export function Fingerprint({
  sequenceShort,
  className,
}: {
  sequenceShort?: string;
  className?: string;
}) {
  const cells = buildFingerprint(sequenceShort);
  if (!cells) return null;

  const counts = composition(cells);
  const total = cells.length;

  return (
    <div className={className}>
      {/* Colour strip */}
      <div className="flex flex-wrap gap-[3px]" role="img" aria-label={`Sequence fingerprint, ${total} residues`}>
        {cells.map((cell, i) => (
          <span
            key={i}
            title={`${i + 1}. ${cell.letter} · ${cell.name}`}
            className="h-7 w-2.5 rounded-[2px] ring-1 ring-inset ring-ink/5"
            style={{ backgroundColor: cell.color }}
          />
        ))}
      </div>

      {/* Colour-coded one-letter sequence */}
      <p className="mt-3 break-all font-mono text-sm leading-relaxed">
        {cells.map((cell, i) => (
          <span key={i} style={{ color: cell.color }} className="font-medium">
            {cell.letter}
          </span>
        ))}
      </p>

      {/* Composition bar */}
      <div className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full">
        {CLASS_ORDER.map((klass) =>
          counts[klass] > 0 ? (
            <span
              key={klass}
              style={{
                backgroundColor: AA_CLASS_META[klass].color,
                width: `${(counts[klass] / total) * 100}%`,
              }}
            />
          ) : null,
        )}
      </div>

      {/* Legend */}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
        {CLASS_ORDER.map((klass) =>
          counts[klass] > 0 ? (
            <li key={klass} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: AA_CLASS_META[klass].color }}
              />
              {AA_CLASS_META[klass].label}
              <span className="text-ink/40">{counts[klass]}</span>
            </li>
          ) : null,
        )}
        <li className="flex items-center gap-1.5 font-medium text-ink">
          {total} residues
        </li>
      </ul>
    </div>
  );
}
