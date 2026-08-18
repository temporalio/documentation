import { useState, useMemo } from "react";
import clsx from "clsx";
import guides, { type SDK, type Guide } from "./guides-data";
import SdkSvg from "../elements/SdkSvgs/SdkSvg";
import { SDK_BLOCK_NAMES } from "../elements/SdkSvgs/sdkBlockNames";
import GridCard from "../elements/GridCard/GridCard";
import { useQueryStringFilters } from "../hooks/useQueryStringFilters";
import styles from "./GuidesGrid.module.css";

const ALL_SDKS: SDK[] = ["Python", "TypeScript", "Go"];
const LANGUAGE_AGNOSTIC = "Language-agnostic";
type SdkFilter = SDK | typeof LANGUAGE_AGNOSTIC;
const ALL_SDK_FILTERS: SdkFilter[] = [...ALL_SDKS, LANGUAGE_AGNOSTIC];

const ALL_TAGS = Array.from(
  new Set(guides.flatMap((i) => i.tags)),
).sort();

const FILTER_GROUPS = [
  { label: "SDK", key: "sdks" as const, options: ALL_SDK_FILTERS as string[] },
  { label: "Tag", key: "tags" as const, options: ALL_TAGS },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20l-4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GuideCard({ item }: { item: Guide }) {
  return (
    <GridCard
      title={item.name}
      description={item.description}
      href={item.href}
      tags={item.tags}
      icon={item.sdk ? <SdkSvg name={SDK_BLOCK_NAMES[item.sdk]} /> : undefined}
    />
  );
}

function toggleIn<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function matchesSearch(item: Guide, q: string): boolean {
  if (!q) return true;
  const searchable = `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
  return searchable.includes(q);
}

function matchesSdks(item: Guide, sdkFilters: string[]): boolean {
  if (sdkFilters.length === 0) return true;
  const wantsAgnostic = sdkFilters.includes(LANGUAGE_AGNOSTIC);
  const sdkOnly = sdkFilters.filter((s): s is SDK => s !== LANGUAGE_AGNOSTIC);
  const matchesSdk = Boolean(item.sdk && sdkOnly.includes(item.sdk));
  const matchesAgnostic = wantsAgnostic && !item.sdk;
  return matchesSdk || matchesAgnostic;
}

function matchesTags(item: Guide, tagFilters: string[]): boolean {
  if (tagFilters.length === 0) return true;
  return tagFilters.some((t) => item.tags.includes(t));
}

type GuidesGridProps = {
  defaultSdks?: SDK[];
  defaultTags?: string[];
  /** Hide the SDK pill group and pin the filter to defaultSdks. */
  hideSdkFilter?: boolean;
  /** Hide the Tag pill group and pin the filter to defaultTags. */
  hideTagFilter?: boolean;
  /** Hide pills (in either visible group) that would match zero guides given the current filters. */
  hideEmptyOptions?: boolean;
};

export default function GuidesGrid({
  defaultSdks = [],
  defaultTags = [],
  hideSdkFilter = false,
  hideTagFilter = false,
  hideEmptyOptions = false,
}: GuidesGridProps) {
  const visibleFilterGroups = FILTER_GROUPS.filter(
    ({ key }) => !(key === "sdks" && hideSdkFilter) && !(key === "tags" && hideTagFilter),
  );
  // A hidden group has no pill UI to change it, so it's never worth syncing
  // to the URL — that's what keeps a locked-down embed from showing a param
  // the reader can't actually change.
  const syncedFilterKeys = visibleFilterGroups.map(({ key }) => key);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useQueryStringFilters(syncedFilterKeys, {
    sdks: defaultSdks,
    tags: defaultTags,
  });
  const q = query.toLowerCase().trim();

  const filtered = useMemo(() => {
    return guides
      .filter((item) => matchesSearch(item, q) && matchesSdks(item, filters.sdks) && matchesTags(item, filters.tags))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q, filters]);

  // With hideEmptyOptions, a pill for a value that would match nothing (given
  // search + the *other* group's current selection) doesn't render — except
  // one already selected, which stays visible so it can still be cleared even
  // if that combination happens to match zero guides.
  const isOptionVisible = (key: "sdks" | "tags", value: string): boolean => {
    if (!hideEmptyOptions || filters[key].includes(value)) return true;
    return guides.some((item) => {
      if (!matchesSearch(item, q)) return false;
      return key === "sdks"
        ? matchesSdks(item, [value]) && matchesTags(item, filters.tags)
        : matchesTags(item, [value]) && matchesSdks(item, filters.sdks);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search for a guide..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search guides"
        />
      </div>

      {visibleFilterGroups.length > 0 && (
        <div className={styles.filters}>
          {visibleFilterGroups.map(({ label, key, options }) => (
            <div key={key} className={styles.filterGroup}>
              <span className={styles.filterLabel}>{label}</span>
              {options.filter((value) => isOptionVisible(key, value)).map((value) => (
                <button
                  key={value}
                  type="button"
                  className={clsx(
                    styles.pill,
                    filters[key].includes(value) && styles.pillActive,
                  )}
                  onClick={() =>
                    setFilters((f) => ({ ...f, [key]: toggleIn(f[key], value) }))
                  }
                  aria-pressed={filters[key].includes(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <GuideCard key={`${item.name}-${item.sdk ?? ''}`} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No guides match your filters.</div>
      )}
    </div>
  );
}
