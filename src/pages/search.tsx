import React, { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import {
  InstantSearch,
  useInfiniteHits,
  useSearchBox,
  useStats,
  Highlight,
  Configure,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { SDK_LANGUAGES, getInitialLanguageFilter, SDK_LANGUAGE_STORAGE_KEY } from '../theme/SearchBar/SDKLanguageFilter';
import '../theme/SearchBar/styles.css';

const ALGOLIA_APP_ID = 'T5D6KNJCQS';
const ALGOLIA_API_KEY = '4a2fa646f476d7756a7cdc599b625bec';
const ALGOLIA_INDEX_NAME = 'temporal';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

// Get the appropriate hierarchy attribute based on hit type
function getHierarchyAttribute(hit: any): string {
  if (hit.type && hit.type.startsWith('lvl')) {
    return `hierarchy.${hit.type}`;
  }
  const levels = ['lvl6', 'lvl5', 'lvl4', 'lvl3', 'lvl2', 'lvl1'];
  for (const level of levels) {
    if (hit.hierarchy?.[level]) {
      return `hierarchy.${level}`;
    }
  }
  return 'hierarchy.lvl1';
}

// Build breadcrumb path from hierarchy
function getBreadcrumbPath(hit: any): string[] {
  const path: string[] = [];
  const hierarchyAttr = getHierarchyAttribute(hit);
  const currentLevel = hierarchyAttr.replace('hierarchy.', '');
  const levelNum = parseInt(currentLevel.replace('lvl', ''), 10);

  // Add levels from lvl0 up to (but not including) the current level
  for (let i = 0; i < levelNum; i++) {
    const levelKey = `lvl${i}`;
    if (hit.hierarchy?.[levelKey]) {
      path.push(hit.hierarchy[levelKey]);
    }
  }

  return path;
}

function SearchResultItem({ hit }: { hit: any }) {
  const history = useHistory();
  const hierarchyAttr = getHierarchyAttribute(hit);
  const breadcrumbs = getBreadcrumbPath(hit);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const fullUrl = hit.url || hit.objectID;
    try {
      const url = new URL(fullUrl, window.location.origin);
      history.push(url.pathname + url.hash);
    } catch {
      history.push(fullUrl);
    }
  };

  return (
    <a
      href={hit.url || hit.objectID}
      onClick={handleClick}
      className="search-page-result"
    >
      <div className="search-page-result-title">
        <Highlight attribute={hierarchyAttr} hit={hit} />
      </div>
      {breadcrumbs.length > 0 && (
        <div className="search-page-result-breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="search-page-breadcrumb-separator">›</span>}
              <span>{crumb}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </a>
  );
}

function SearchResultsList() {
  const { items, isLastPage, showMore } = useInfiniteHits();
  const { query } = useSearchBox();
  const { nbHits } = useStats();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLastPage, showMore]);

  if (!query) {
    return (
      <div className="search-page-empty">
        Enter a search term to find documentation
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="search-page-no-results">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <>
      <div className="search-page-stats">
        {nbHits.toLocaleString()} documents found
      </div>
      <div className="search-page-results">
        {items.map((hit: any) => (
          <SearchResultItem key={hit.objectID} hit={hit} />
        ))}
      </div>
      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="search-page-sentinel">
        {!isLastPage && (
          <div className="search-page-loading">Loading more results...</div>
        )}
      </div>
    </>
  );
}

function SearchInput() {
  const { query, refine } = useSearchBox();
  const location = useLocation();
  const history = useHistory();
  const [inputValue, setInputValue] = useState(query);

  // Sync URL query param with search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q') || '';
    if (urlQuery !== query) {
      refine(urlQuery);
      setInputValue(urlQuery);
    }
  }, [location.search]);

  // Update URL when query changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    refine(newQuery);

    const params = new URLSearchParams(location.search);
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    history.replace({ search: params.toString() });
  };

  return (
    <div className="search-page-input-wrapper">
      <input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search documentation..."
        className="search-page-input"
        autoFocus
      />
    </div>
  );
}

function LanguageFilter({ selectedLanguages, onLanguageChange }: {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}) {
  const toggleLanguage = (langId: string) => {
    const newSelection = selectedLanguages.includes(langId)
      ? selectedLanguages.filter((id) => id !== langId)
      : [...selectedLanguages, langId];
    onLanguageChange(newSelection);
  };

  const clearAll = () => {
    onLanguageChange([]);
  };

  const selectedLabels = selectedLanguages
    .map(id => SDK_LANGUAGES.find(lang => lang.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div className="search-page-language-filter">
      <div className="search-page-language-filter-header">
        <span className="search-page-language-filter-title">Filter by SDK</span>
        {selectedLanguages.length > 0 && (
          <button
            className="search-page-language-filter-clear"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="search-page-language-filter-options">
        {SDK_LANGUAGES.map((lang) => (
          <label key={lang.id} className="search-page-language-filter-option">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(lang.id)}
              onChange={() => toggleLanguage(lang.id)}
            />
            <span>{lang.label}</span>
          </label>
        ))}
      </div>
      {selectedLanguages.length > 0 && (
        <div className="search-page-language-filter-note">
          Showing {selectedLabels} and language-agnostic content
        </div>
      )}
    </div>
  );
}

function SearchPageContent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(() => getInitialLanguageFilter());

  const handleLanguageChange = (languages: string[]) => {
    setSelectedLanguages(languages);
    try {
      localStorage.setItem(SDK_LANGUAGE_STORAGE_KEY, JSON.stringify(languages));
    } catch (e) {
      console.error('Failed to save language filter:', e);
    }
  };

  // Build facet filters based on selected languages
  const facetFilters = selectedLanguages.length > 0
    ? SDK_LANGUAGES
        .filter(lang => !selectedLanguages.includes(lang.id))
        .map(lang => `sdk_language:-${lang.id}`)
    : undefined;

  return (
    <div className="search-page-container">
      <h1 className="search-page-title">
        Search results{initialQuery && <> for "{initialQuery}"</>}
      </h1>
      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
        initialUiState={{
          [ALGOLIA_INDEX_NAME]: {
            query: initialQuery,
          },
        }}
      >
        <Configure
          hitsPerPage={50}
          facetFilters={facetFilters}
          attributesToRetrieve={[
            'hierarchy',
            'content',
            'anchor',
            'url',
            'url_without_anchor',
            'type',
            'sdk_language',
          ]}
        />
        <SearchInput />
        <LanguageFilter
          selectedLanguages={selectedLanguages}
          onLanguageChange={handleLanguageChange}
        />
        <SearchResultsList />
      </InstantSearch>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Layout title="Search" description="Search Temporal documentation">
      <SearchPageContent />
    </Layout>
  );
}
