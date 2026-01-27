import React, { useEffect } from 'react';

const SDK_LANGUAGES = [
  { id: 'go', label: 'Go' },
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'java', label: 'Java' },
  { id: 'php', label: 'PHP' },
  { id: 'dotnet', label: '.NET' },
  { id: 'ruby', label: 'Ruby' },
];

const STORAGE_KEY = 'temporal-docs-sdk-language-filter';

interface SDKLanguageFilterProps {
  selectedLanguages: string[];
  onFilterChange: (languages: string[]) => void;
}

export function SDKLanguageFilter({ selectedLanguages, onFilterChange }: SDKLanguageFilterProps) {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedLanguages));
    } catch (e) {
      console.error('Failed to save SDK language filter:', e);
    }
  }, [selectedLanguages]);

  const toggleLanguage = (langId: string) => {
    const newSelection = selectedLanguages.includes(langId)
      ? selectedLanguages.filter((id) => id !== langId)
      : [...selectedLanguages, langId];
    onFilterChange(newSelection);
  };

  const clearAll = () => {
    onFilterChange([]);
  };

  return (
    <div className="sdk-language-filter">
      <div className="sdk-language-filter-header">
        <span className="sdk-language-filter-title">SDK Language:</span>
        {selectedLanguages.length > 0 && (
          <button
            className="sdk-language-filter-clear"
            onClick={clearAll}
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="sdk-language-filter-options">
        {SDK_LANGUAGES.map((lang) => (
          <label key={lang.id} className="sdk-language-filter-option">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(lang.id)}
              onChange={() => toggleLanguage(lang.id)}
            />
            <span>{lang.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function getInitialLanguageFilter(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
