// ⚠️  LLM MARKDOWN PIPELINE: the generated .md output renders this grid via
// scripts/component-handlers/integrations.mjs, which reads the same
// integrations-data.json and mirrors the `defaultSdks` filtering below. If you
// change the data source or filter logic here, update that handler too.
// See MARKDOWN_PIPELINE.md.
import { useState, useMemo } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import integrations, { type SDK, type Integration } from "./integrations-data";
import SdkSvg from "../elements/SdkSvgs/SdkSvg";
import styles from "./IntegrationsGrid.module.css";

const ALL_SDKS: SDK[] = ["Java", "Python", "Ruby", "TypeScript"];
const LANGUAGE_AGNOSTIC = "Language-agnostic";
type SdkFilter = SDK | typeof LANGUAGE_AGNOSTIC;
const ALL_SDK_FILTERS: SdkFilter[] = [...ALL_SDKS, LANGUAGE_AGNOSTIC];

const SDK_BLOCK_NAMES: Record<SDK, string> = {
  Java: "javaBlock",
  Python: "pythonBlock",
  Ruby: "rubyBlock",
  TypeScript: "typeScriptBlock",
};

const ALL_TAGS = Array.from(
  new Set(integrations.flatMap((i) => i.tags)),
).sort();

const FILTER_GROUPS = [
  { label: "SDK", key: "sdks" as const, options: ALL_SDK_FILTERS as string[] },
  { label: "Tag", key: "tags" as const, options: ALL_TAGS },
];

type FilterState = {
  sdks: SdkFilter[];
  tags: string[];
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
        {item.tags.map((tag) => (
          <span key={tag} className={styles.badge}>{tag}</span>
        ))}
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
    tags: [],
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
