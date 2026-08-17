// ⚠️  LLM MARKDOWN PIPELINE: the generated .md output renders this grid via
// scripts/component-handlers/integrations.mjs, which reads the same
// integrations-data.json and mirrors the `defaultSdks`/`defaultTags` filtering
// below (hideSdkFilter/hideTagFilter only affect which pills render, not the
// underlying filtered set, so the handler doesn't need to know about them).
// If you change the data source or filter logic here, update that handler too.
// See readme/MARKDOWN_PIPELINE.md.
import { useState, useMemo } from "react";
import clsx from "clsx";
import integrations, { type SDK, type Integration } from "./integrations-data";
import SdkSvg from "../elements/SdkSvgs/SdkSvg";
import { SDK_BLOCK_NAMES } from "../elements/SdkSvgs/sdkBlockNames";
import GridCard from "../elements/GridCard/GridCard";
import { useQueryStringFilters } from "../hooks/useQueryStringFilters";
import styles from "./IntegrationsGrid.module.css";

const ALL_SDKS: SDK[] = ["Go", "Java", "Python", "Ruby", "TypeScript"];
const LANGUAGE_AGNOSTIC = "Language-agnostic";
type SdkFilter = SDK | typeof LANGUAGE_AGNOSTIC;
const ALL_SDK_FILTERS: SdkFilter[] = [...ALL_SDKS, LANGUAGE_AGNOSTIC];

const ALL_TAGS = Array.from(
  new Set(integrations.flatMap((i) => i.tags)),
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

function IntegrationCard({ item }: { item: Integration }) {
  return (
    <GridCard
      title={item.name}
      description={item.description}
      href={item.href}
      tags={item.tags}
      icon={item.sdk ? <SdkSvg name={SDK_BLOCK_NAMES[item.sdk]} /> : undefined}
      analyticsId={`integrations-card-${item.name}`}
    />
  );
}

function toggleIn<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

type IntegrationsGridProps = {
  defaultSdks?: SDK[];
  defaultTags?: string[];
  /** Hide the SDK pill group and pin the filter to defaultSdks. */
  hideSdkFilter?: boolean;
  /** Hide the Tag pill group and pin the filter to defaultTags. */
  hideTagFilter?: boolean;
};

export default function IntegrationsGrid({
  defaultSdks = [],
  defaultTags = [],
  hideSdkFilter = false,
  hideTagFilter = false,
}: IntegrationsGridProps) {
  const visibleFilterGroups = FILTER_GROUPS.filter(
    ({ key }) => !(key === "sdks" && hideSdkFilter) && !(key === "tags" && hideTagFilter),
  );
  // A hidden group has no pill UI to change it, so it's never worth syncing
  // to the URL — that's what keeps a locked-down embed (e.g. an "Agent
  // framework" grid on another page) from showing a `tags=` param the reader
  // can't actually change.
  const syncedFilterKeys = visibleFilterGroups.map(({ key }) => key);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useQueryStringFilters(syncedFilterKeys, {
    sdks: defaultSdks,
    tags: defaultTags,
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return integrations
      .filter((item) => {
        if (q) {
          const searchable =
            `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        if (filters.sdks.length > 0) {
          const wantsAgnostic = filters.sdks.includes(LANGUAGE_AGNOSTIC);
          const sdkFilters = filters.sdks.filter((s): s is SDK => s !== LANGUAGE_AGNOSTIC);
          const matchesSdk = item.sdk && sdkFilters.includes(item.sdk);
          const matchesAgnostic = wantsAgnostic && !item.sdk;
          if (!matchesSdk && !matchesAgnostic) return false;
        }
        if (filters.tags.length > 0) {
          if (!filters.tags.some((t) => item.tags.includes(t))) return false;
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, filters]);

  return (
    <div className={styles.container} data-analytics-component="integrations-grid">
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search for an integration..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search integrations"
          data-analytics-id="integrations-search"
          data-analytics-action="input"
        />
      </div>

      {visibleFilterGroups.length > 0 && (
        <div className={styles.filters}>
          {visibleFilterGroups.map(({ label, key, options }) => (
            <div key={key} className={styles.filterGroup}>
              <span className={styles.filterLabel}>{label}</span>
              {options.map((value) => (
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
                  data-analytics-id={`integrations-filter-${key}-${value}`}
                  data-analytics-action="click"
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
            <IntegrationCard key={`${item.name}-${item.sdk ?? ''}`} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No integrations match your filters.</div>
      )}
    </div>
  );
}
