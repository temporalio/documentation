import { useState, useMemo } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import integrations, { type SDK, type Integration } from "./integrations-data";
import SdkSvg from "../elements/SdkSvgs/SdkSvg";
import styles from "./IntegrationsGrid.module.css";

const ALL_SDKS: SDK[] = ["Java", "Python", "Ruby", "TypeScript"];

const SDK_BLOCK_NAMES: Record<SDK, string> = {
  Java: "javaBlock",
  Python: "pythonBlock",
  Ruby: "rubyBlock",
  TypeScript: "typeScriptBlock",
};

const ALL_CATEGORIES = Array.from(
  new Set(integrations.map((i) => i.category)),
).sort();

const FILTER_GROUPS = [
  { label: "SDK", key: "sdks" as const, options: ALL_SDKS },
  { label: "Tag", key: "categories" as const, options: ALL_CATEGORIES },
];

type FilterState = {
  sdks: SDK[];
  categories: string[];
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

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

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={styles.externalIcon}
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IntegrationCard({ item }: { item: Integration }) {
  const external = isExternal(item.href);
  return (
    <Link
      to={item.href}
      className={styles.card}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardName}>
          {item.name}
          {external && <ExternalLinkIcon />}
        </h3>
        {item.sdk && (
          <div className={styles.sdkIcons}>
            <SdkSvg name={SDK_BLOCK_NAMES[item.sdk]} />
          </div>
        )}
      </div>
      <p className={styles.cardDescription}>{item.description}</p>
      <div className={styles.cardMeta}>
        <span className={styles.badge}>{item.category}</span>
      </div>
    </Link>
  );
}

function toggleIn<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

type IntegrationsGridProps = {
  defaultSdks?: SDK[];
};

export default function IntegrationsGrid({
  defaultSdks = [],
}: IntegrationsGridProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    sdks: defaultSdks,
    categories: [],
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return integrations
      .filter((item) => {
        if (q) {
          const searchable =
            `${item.name} ${item.description} ${item.category}`.toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        if (filters.sdks.length > 0) {
          if (!item.sdk || !filters.sdks.includes(item.sdk)) return false;
        }
        if (filters.categories.length > 0) {
          if (!filters.categories.includes(item.category)) return false;
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, filters]);

  return (
    <div className={styles.container}>
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
        />
      </div>

      <div className={styles.filters}>
        {FILTER_GROUPS.map(({ label, key, options }) => (
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
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>

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
