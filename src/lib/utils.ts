import { clsx, type ClassValue } from "clsx";

/** Conditional className joiner. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "12 May 2026". Returns "" if absent/invalid. */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Estimate reading time in minutes from a body of text (≈200 wpm, min 1). */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Strip everything but A–Z and uppercase — the canonical residue string. */
export function normaliseResidues(seq?: string): string {
  if (!seq) return "";
  return seq.toUpperCase().replace(/[^A-Z]/g, "");
}
