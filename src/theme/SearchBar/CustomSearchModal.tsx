import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Snippet,
  Highlight,
  useSearchBox,
  useHits,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { useHistory } from '@docusaurus/router';
import AskAIButton from './AskAIButton';

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

function Hit({ hit, isSelected }: { hit: any; isSelected: boolean }) {
  const history = useHistory();
  const hitRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = hit.url || hit.objectID;
    history.push(url);
  };

  // Scroll into view when selected
  useEffect(() => {
    if (isSelected && hitRef.current) {
      hitRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [isSelected]);

  // Get the page title (hierarchy lvl0 or lvl1)
  const title = hit.hierarchy?.lvl1 || hit.hierarchy?.lvl0 || 'Untitled';

  // Build breadcrumb from hierarchy with highlighting
  const breadcrumbParts = [];
  if (hit.hierarchy?.lvl0 && hit.hierarchy?.lvl0 !== title) {
    breadcrumbParts.push({ attribute: 'hierarchy.lvl0', value: hit.hierarchy.lvl0 });
  }
  if (hit.hierarchy?.lvl2) {
    breadcrumbParts.push({ attribute: 'hierarchy.lvl2', value: hit.hierarchy.lvl2 });
  }
  if (hit.hierarchy?.lvl3) {
    breadcrumbParts.push({ attribute: 'hierarchy.lvl3', value: hit.hierarchy.lvl3 });
  }

  return (
    <a
      ref={hitRef}
      href={hit.url || hit.objectID}
      onClick={handleClick}
      className={`custom-search-hit ${isSelected ? 'custom-search-hit--selected' : ''}`}
      tabIndex={-1}
      role="option"
      aria-selected={isSelected}
    >
      <div className="custom-search-hit-content">
        <div className="custom-search-hit-title">
          <Highlight attribute="hierarchy.lvl1" hit={hit} />
        </div>
        {breadcrumbParts.length > 0 && (
          <div className="custom-search-hit-path">
            {breadcrumbParts.map((part, index) => (
              <React.Fragment key={part.attribute}>
                {index > 0 && ' › '}
                <Highlight attribute={part.attribute} hit={hit} />
              </React.Fragment>
            ))}
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

  // Get labels for selected languages
  const selectedLabels = selectedLanguages
    .map(id => SDK_LANGUAGES.find(lang => lang.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div className="custom-search-language-filter">
      <div className="custom-search-language-filter-header">
        <span className="custom-search-language-filter-title">Filter by SDK</span>
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
          Showing {selectedLabels} and language-agnostic content
        </div>
      )}
    </div>
  );
}

function GroupedHits({ selectedIndex }: { selectedIndex: number }) {
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

  let hitIndex = 0;

  return (
    <>
      {categories.map((category) => (
        <div key={category} className="custom-search-section">
          <div className="custom-search-section-header">
            {category}
          </div>
          <div className="custom-search-section-hits">
            {groupedHits[category].map((hit: any) => {
              const currentIndex = hitIndex++;
              return (
                <Hit
                  key={hit.objectID}
                  hit={hit}
                  isSelected={currentIndex === selectedIndex}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

function SearchResults({ onClose, selectedIndex, onResultsChange }: {
  onClose: () => void;
  selectedIndex: number;
  onResultsChange: (count: number) => void;
}) {
  const { items } = useHits();
  const { query } = useSearchBox();

  // Notify parent when results change
  useEffect(() => {
    onResultsChange(items.length);
  }, [items.length, onResultsChange]);

  return (
    <div className="custom-search-results" role="listbox" aria-label="Search results">
      <GroupedHits selectedIndex={selectedIndex} />
      {items.length === 0 && query && (
        <div className="custom-search-no-results">
          No results found for "{query}"
        </div>
      )}
      {query && items.length > 0 && (
        <div id="ai-footer">
          <AskAIButton query={query} closeDocSearch={onClose} />
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [resultCount, setResultCount] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [selectedLanguages]);

  // Handle results change - only reset selection when count actually changes
  const handleResultsChange = useCallback((count: number) => {
    setResultCount((prevCount) => {
      // Only reset selection if the result count changed
      if (prevCount !== count) {
        setSelectedIndex(-1);
      }
      return count;
    });
  }, []);

  // Keyboard navigation and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if the modal is mounted
      if (!modalRef.current) return;

      // Get all hits dynamically
      const hitElements = modalRef.current.querySelectorAll('.custom-search-hit');
      const totalHits = hitElements?.length || 0;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        if (totalHits > 0) {
          setSelectedIndex((prev) => (prev < totalHits - 1 ? prev + 1 : prev));
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        return;
      }

      if (e.key === 'Enter') {
        // Only handle Enter for navigation if a result is selected
        if (selectedIndex >= 0 && hitElements) {
          e.preventDefault();
          e.stopPropagation();
          const selectedHit = hitElements[selectedIndex] as HTMLAnchorElement;
          if (selectedHit) {
            const url = selectedHit.getAttribute('href');
            if (url) {
              history.push(url);
              onClose();
            }
          }
        }
        return;
      }

      if (e.key === 'Tab') {
        // Focus trap logic
        const focusableElements = modalRef.current.querySelectorAll(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift+Tab - if on first element, go to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab - if on last element, go to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    // Add event listener in capture phase to intercept before child elements
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose, selectedIndex, history]);

  // Build facet filters based on selected languages
  // Uses negative filters to exclude unselected languages
  // This shows selected languages + language-agnostic content (no sdk_language attribute)
  const allLanguages = ['go', 'python', 'typescript', 'java', 'php', 'dotnet', 'ruby'];
  let facetFilters: any = undefined;

  if (selectedLanguages.length > 0) {
    const unselectedLanguages = allLanguages.filter(lang => !selectedLanguages.includes(lang));
    facetFilters = unselectedLanguages.map(lang => `sdk_language:-${lang}`);
  }

  return (
    <div className="custom-search-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="custom-search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
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
          <SearchResults
            onClose={onClose}
            selectedIndex={selectedIndex}
            onResultsChange={handleResultsChange}
          />
          <SearchFooter />
          {/* Screen reader announcements */}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {resultCount > 0 ? `${resultCount} results found` : ''}
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
