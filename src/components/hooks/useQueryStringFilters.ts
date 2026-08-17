import { useCallback, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';

type FilterState<K extends string> = Record<K, string[]>;
type FilterUpdater<K extends string> = (prev: FilterState<K>) => FilterState<K>;

function parseListParam(search: string, key: string): string[] | null {
  const raw = new URLSearchParams(search).get(key);
  if (!raw) return null;
  return raw.split(',').map((v) => v.trim()).filter(Boolean);
}

/**
 * Filter state backed by comma-separated query string params (one param per
 * key, e.g. ?tags=Agent+framework,MCP&sdks=Python), so a filtered view like
 * IntegrationsGrid or GuidesGrid can be deep-linked with a filter
 * pre-selected, and the current filters stay reflected in a shareable URL.
 *
 * The URL is adopted once on mount (covering the deep-link case) and from
 * then on state drives the URL, not the other way around — filter changes use
 * history.replace so clicking through pills doesn't spam the back button.
 */
export function useQueryStringFilters<K extends string>(
  keys: readonly K[],
  defaults: FilterState<K>,
): [FilterState<K>, (updater: FilterUpdater<K>) => void] {
  const history = useHistory();
  const [state, setState] = useState<FilterState<K>>(defaults);

  useIsomorphicLayoutEffect(() => {
    setState((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const key of keys) {
        const fromUrl = parseListParam(history.location.search, key);
        if (fromUrl) {
          next[key] = fromUrl;
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
    (updater: FilterUpdater<K>) => {
      setState((prev) => {
        const next = updater(prev);
        const searchParams = new URLSearchParams(history.location.search);
        for (const key of keys) {
          const values = next[key];
          if (values.length > 0) {
            searchParams.set(key, values.join(','));
          } else {
            searchParams.delete(key);
          }
        }
        history.replace({ ...history.location, search: searchParams.toString() });
        return next;
      });
    },
    [history, keys],
  );

  return [state, update];
}
