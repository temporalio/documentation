import React, { useState } from 'react';
import styles from './annotated-code.module.css';

/**
 * Single-pane code block with clickable concept annotations that highlight lines.
 *
 * @param {object} props
 * @param {string} props.code - Source code to display
 * @param {{ label: string, description: string, lines: number[] }[]} props.annotations
 * @param {string} [props.hint='Highlight a concept'] - Label above the pills
 */
export default function AnnotatedCode({
  code,
  annotations = [],
  hint = 'Highlight a concept',
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const lines = code.replace(/^\n/, '').replace(/\n$/, '').split('\n');
  const active = activeIndex !== null ? annotations[activeIndex] : null;
  const activeLines = new Set(active?.lines ?? []);
  const hasActive = activeLines.size > 0;

  function toggle(i) {
    setActiveIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className={styles.root}>
      {annotations.length > 0 && (
        <>
          <div className={styles.hint}>{hint}</div>
          <div className={styles.pills} role="group" aria-label={hint}>
            {annotations.map((annotation, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={annotation.label}
                  type="button"
                  className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
                  aria-pressed={isActive}
                  onClick={() => toggle(i)}
                >
                  {annotation.label}
                </button>
              );
            })}
          </div>
          <div
            className={`${styles.description} ${active ? styles.descriptionActive : ''}`}
            aria-live="polite"
          >
            {active ? active.description : null}
          </div>
        </>
      )}

      <div className={styles.codeWrap}>
        <pre className={styles.code}>
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isActive = activeLines.has(lineNum);
            return (
              <div
                key={i}
                className={[
                  styles.line,
                  isActive ? styles.lineActive : '',
                  hasActive && !isActive ? styles.lineDimmed : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {line || ' '}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
