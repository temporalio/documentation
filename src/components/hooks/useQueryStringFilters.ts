import { useCallback, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';

type FilterState = Record<string, string[]>;
type FilterUpdater<S extends FilterState> = (prev: S) => S;

function parseListParam(search: string, key: string): string[] | null {
  const raw = new URLSearchParams(search).get(key);
  if (!raw) return null;
  return raw.split(',').map((v) => v.trim()).filter(Boolean);
}

/**
 * Filter state backed by comma-separated query string params (one param per
 * synced key, e.g. ?tags=Agent+framework,MCP&sdks=Python), so a filtered view
 * like IntegrationsGrid or GuidesGrid can be deep-linked with a filter
 * pre-selected, and the current filters stay reflected in a shareable URL.
 *
 * `syncedKeys` may be a subset of `defaults`' keys — any key left out is never
 * read from or written to the URL, which is how a locked/hidden filter (e.g.
 * a grid pinned to one tag with its Tag pills hidden) stays out of the URL
 * entirely instead of showing up as a param the reader can't actually change.
 *
 * The URL is adopted once on mount (covering the deep-link case) and from
 * then on state drives the URL, not the other way around — filter changes use
 * history.replace so clicking through pills doesn't spam the back button.
 */
export function useQueryStringFilters<S extends FilterState>(
  syncedKeys: readonly (keyof S)[],
  defaults: S,
): [S, (updater: FilterUpdater<S>) => void] {
  const history = useHistory();
  const [state, setState] = useState<S>(defaults);

  useIsomorphicLayoutEffect(() => {
    setState((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const key of syncedKeys) {
        const fromUrl = parseListParam(history.location.search, key as string);
        if (fromUrl) {
          next[key] = fromUrl as S[keyof S];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
    // Adopt the URL's filters once, right after hydration. Deliberately
    // mount-only: afterward the URL mirrors state via history.replace below,
    // it doesn't drive it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback(
    (updater: FilterUpdater<S>) => {
      setState((prev) => {
        const next = updater(prev);
        const searchParams = new URLSearchParams(history.location.search);
        for (const key of syncedKeys) {
          const values = next[key] as string[];
          if (values.length > 0) {
            searchParams.set(key as string, values.join(','));
          } else {
            searchParams.delete(key as string);
          }
        }
        // URLSearchParams percent-encodes commas (sdks=Java%2CPython); commas
        // aren't actually reserved in a query value, so unescape them back for
        // a URL a person can read and hand-edit (sdks=Java,Python). Decoding
        // is unaffected either way — URLSearchParams.get() treats a literal
        // comma and %2C identically.
        const search = searchParams.toString().replace(/%2C/g, ',');
        history.replace({ ...history.location, search });
        return next;
      });
    },
    [history, syncedKeys],
  );

  return [state, update];
}
