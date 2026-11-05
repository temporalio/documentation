/**
 * Mirrors the `isExternalHref` check temporal.io itself uses to decide which
 * links open in a new tab. A link only counts as external if its hostname
 * isn't `temporal.io` or a `*.temporal.io` subdomain — so links between
 * Temporal properties (docs.temporal.io, learn.temporal.io, community.temporal.io,
 * etc.) stay in the same tab, just like they do on temporal.io.
 */
export function isExternalHref(href: string | null | undefined): boolean {
  if (!href || !href.startsWith('http')) return false;
  try {
    const { hostname } = new URL(href);
    return hostname !== 'temporal.io' && !hostname.endsWith('.temporal.io');
  } catch {
    return false;
  }
}
