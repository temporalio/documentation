import React from 'react';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

interface LanguageFilterProps {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function LanguageFilter({
  selectedLanguages,
  onLanguageChange,
  isCollapsed,
  onToggleCollapse,
}: LanguageFilterProps) {
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
    <div className={`custom-search-language-filter ${isCollapsed ? 'custom-search-language-filter--collapsed' : ''}`}>
      <div className="custom-search-language-filter-header">
        <button
          className="custom-search-language-filter-toggle"
          onClick={onToggleCollapse}
          type="button"
          aria-expanded={!isCollapsed}
        >
          <svg
            className={`custom-search-language-filter-chevron ${isCollapsed ? 'custom-search-language-filter-chevron--collapsed' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="custom-search-language-filter-title">Filter by SDK</span>
          {isCollapsed && selectedLanguages.length > 0 && (
            <span className="custom-search-language-filter-badge">
              {selectedLanguages.length} selected
            </span>
          )}
        </button>
        {!isCollapsed && selectedLanguages.length > 0 && (
          <button
            className="custom-search-language-filter-clear"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="custom-search-language-filter-content">
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
    </div>
  );
}
