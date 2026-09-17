/**
 * Parses a `lines` prop like "7-8,14-17,21-25" into the flat 1-based line
 * numbers it covers: [7, 8, 14, 15, 16, 17, 21, 22, 23, 24, 25].
 * A single number ("19") is a one-line range. Returns [] for an absent prop.
 */
export function parseLineRanges(str) {
  if (!str) return [];
  const out = [];
  for (const part of str.split(',')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      for (let n = start; n <= end; n++) out.push(n);
    } else {
      out.push(Number(trimmed));
    }
  }
  return out;
}
