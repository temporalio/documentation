import React, { useEffect, useState } from 'react';

// POC scaffolding. Delete with the pickers once a treatment is chosen.
export const VARIANTS = [
  { id: 'underline', label: 'A. Underline' },
  { id: 'segmented', label: 'B. Segmented' },
];

export const SURFACES = [
  { id: 'surfaceFlush', label: '1. Flush' },
  { id: 'surfaceRaised', label: '2. Raised' },
  { id: 'surfaceTint', label: '3. Indigo tint' },
  { id: 'surfaceGradient', label: '4. Gradient wash' },
  { id: 'surfaceInk', label: '5. Ink' },
];

// Read after mount so the server markup and first client render agree.
function useChoice(storageKey, options, fallback) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && options.some((option) => option.id === stored)) setValue(stored);
    } catch {
      // Blocked storage. Keep the default.
    }
  }, [storageKey, options]);

  const choose = (next) => {
    setValue(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Not worth surfacing in a POC control.
    }
  };

  return [value, choose];
}

export function useNavStyle() {
  const [variant, chooseVariant] = useChoice('poc-secondary-nav-variant', VARIANTS, 'underline');
  const [surface, chooseSurface] = useChoice('poc-secondary-nav-surface', SURFACES, 'surfaceFlush');
  return { variant, chooseVariant, surface, chooseSurface };
}

export function StylePickers({ styles, variant, chooseVariant, surface, chooseSurface }) {
  const picker = (value, options, onChange, label) => (
    <select className={styles.picker} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className={styles.pickers}>
      {picker(variant, VARIANTS, chooseVariant, 'Secondary nav style')}
      {picker(surface, SURFACES, chooseSurface, 'Secondary nav surface')}
    </div>
  );
}
