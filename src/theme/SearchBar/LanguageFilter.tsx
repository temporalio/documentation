import React from 'react';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

interface LanguageFilterProps {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

export function LanguageFilter({ selectedLanguages, onLanguageChange }: LanguageFilterProps) {
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
