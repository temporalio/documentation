import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Snippet,
  Highlight,
  useSearchBox,
  useHits,
  useInstantSearch,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import AskAIButton from './AskAIButton';

// Debug component to inspect InstantSearch state
function SearchDebugger() {
  const { results } = useInstantSearch();

  useEffect(() => {
    if (results) {
      console.group('[Algolia Response]');
      console.log('Query:', results.query);
      console.log('Hits returned:', results.hits.length);
      console.log('Total hits (nbHits):', results.nbHits);
      console.log('Params object:', results.params);
      console.log('Params.facetFilters:', results.params?.facetFilters);
      console.log('Params string:', results.params);
      if (results.hits.length > 0) {
        console.log('First 3 hits:', results.hits.slice(0, 3).map(h => ({
          title: h.hierarchy?.lvl0 || h.hierarchy?.lvl1,
          sdk_language: h.sdk_language,
          url: h.url?.substring(0, 50)
        })));
      }
      console.groupEnd();
    }
  }, [results]);

  return null;
}

// Clear button component
function ClearButton() {
  const { query, refine } = useSearchBox();

  if (!query) return null;

  return (
    <button
      className="custom-search-clear"
      onClick={() => refine('')}
      type="button"
    >
      Clear the query
    </button>
  );
}

interface CustomSearchModalProps {
  appId: string;
  apiKey: string;
  indexName: string;
  onClose: () => void;
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

const SDK_LANGUAGES = [
  { id: 'go', label: 'Go' },
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'java', label: 'Java' },
  { id: 'php', label: 'PHP' },
  { id: 'dotnet', label: '.NET' },
  { id: 'ruby', label: 'Ruby' },
];

function Hit({ hit }: { hit: any }) {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = hit.url || hit.objectID;
    history.push(url);
  };

  // Get the page title (hierarchy lvl0 or lvl1)
  const title = hit.hierarchy?.lvl1 || hit.hierarchy?.lvl0 || 'Untitled';

  // Build breadcrumb from hierarchy, excluding the title
  const breadcrumbParts = [];
  if (hit.hierarchy?.lvl0 && hit.hierarchy?.lvl0 !== title) {
    breadcrumbParts.push(hit.hierarchy.lvl0);
  }
  if (hit.hierarchy?.lvl2) breadcrumbParts.push(hit.hierarchy.lvl2);
  if (hit.hierarchy?.lvl3) breadcrumbParts.push(hit.hierarchy.lvl3);

  return (
    <a href={hit.url || hit.objectID} onClick={handleClick} className="custom-search-hit">
      <div className="custom-search-hit-content">
        <div className="custom-search-hit-title">
          <Highlight attribute="hierarchy.lvl1" hit={hit} />
        </div>
        {breadcrumbParts.length > 0 && (
          <div className="custom-search-hit-path">
            {breadcrumbParts.join(' › ')}
          </div>
        )}
        {hit.content && (
          <div className="custom-search-hit-text">
            <Snippet attribute="content" hit={hit} />
          </div>
        )}
      </div>
    </a>
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

  return (
    <div className="custom-search-language-filter">
      <div className="custom-search-language-filter-header">
        <span className="custom-search-language-filter-title">Filter by SDK:</span>
        {selectedLanguages.length > 0 && (
          <button
            className="custom-search-language-filter-clear"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="custom-search-language-filter-options">
        {SDK_LANGUAGES.map((lang) => (
          <label key={lang.id} className="custom-search-language-filter-option">
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
        <div className="custom-search-language-filter-note">
          Showing {selectedLanguages.map(l => l.toUpperCase()).join(', ')} + language-agnostic content
        </div>
      )}
    </div>
  );
}

function GroupedHits() {
  const { items } = useHits();

  // Group hits by their top-level category (hierarchy.lvl0)
  const groupedHits = items.reduce((acc: any, hit: any) => {
    const category = hit.hierarchy?.lvl0 || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(hit);
    return acc;
  }, {});

  const categories = Object.keys(groupedHits);

  if (categories.length === 0) {
    return null;
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category} className="custom-search-section">
          <div className="custom-search-section-header">
            {category}
          </div>
          <div className="custom-search-section-hits">
            {groupedHits[category].map((hit: any) => (
              <Hit key={hit.objectID} hit={hit} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function SearchResults({ onClose }: { onClose: () => void }) {
  const { results, items } = useHits();
  const { query } = useSearchBox();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  // TODO: Implement keyboard navigation
  // TODO: Add loading state

  return (
    <div className="custom-search-results" ref={resultsRef}>
      <GroupedHits />
      {items.length === 0 && query && (
        <div className="custom-search-no-results">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}

function SearchFooter() {
  return (
    <div className="custom-search-footer">
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">↑</span>
        <span className="custom-search-footer-key">↓</span>
        <span className="custom-search-footer-label">Navigate</span>
      </div>
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">↵</span>
        <span className="custom-search-footer-label">Select</span>
      </div>
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">ESC</span>
        <span className="custom-search-footer-label">Close</span>
      </div>
    </div>
  );
}

export function CustomSearchModal({
  appId,
  apiKey,
  indexName,
  onClose,
  selectedLanguages,
  onLanguageChange,
}: CustomSearchModalProps) {
  const searchClient = algoliasearch(appId, apiKey);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when modal opens
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // TODO: Add arrow key navigation
      // TODO: Add Enter to select highlighted result
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Build facet filters based on selected languages
  const allLanguages = ['go', 'python', 'typescript', 'java', 'php', 'dotnet', 'ruby'];
  let facetFilters: any = undefined;

  if (selectedLanguages.length > 0) {
    // MODE 2: Negative filters with CORRECT syntax (exclude unselected languages)
    // Correct syntax: facet:-value (NOT -facet:value)
    const unselectedLanguages = allLanguages.filter(lang => !selectedLanguages.includes(lang));
    facetFilters = unselectedLanguages.map(lang => `sdk_language:-${lang}`);

    console.group('[SDK Filter Debug - Mode 2 FIXED]');
    console.log('Selected languages:', selectedLanguages);
    console.log('Unselected languages:', unselectedLanguages);
    console.log('Negative filters (CORRECT SYNTAX):', facetFilters);
    console.log('JSON:', JSON.stringify(facetFilters));
    console.groupEnd();
  }

  console.log('[Configure Component] About to render with facetFilters:', facetFilters);

  return (
    <div className="custom-search-overlay" onClick={onClose}>
      <div className="custom-search-modal" onClick={(e) => e.stopPropagation()}>
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Configure
            hitsPerPage={20}
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
          <div className="custom-search-header">
            <SearchBox
              placeholder="Search documentation..."
              autoFocus
              classNames={{
                root: 'custom-search-box',
                form: 'custom-search-form',
                input: 'custom-search-input',
                submit: 'custom-search-submit',
                reset: 'custom-search-reset',
              }}
            />
            <ClearButton />
            <button
              className="custom-search-close"
              onClick={onClose}
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
              </svg>
            </button>
          </div>
          <LanguageFilter
            selectedLanguages={selectedLanguages}
            onLanguageChange={onLanguageChange}
          />
          <SearchDebugger />
          <SearchResults onClose={onClose} />
          <SearchFooter />
        </InstantSearch>
      </div>
    </div>
  );
}
