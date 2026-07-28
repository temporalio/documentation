import React, { useMemo, useState } from 'react';
import { usePrismTheme } from '@docusaurus/theme-common';
import styles from './annotated-code.module.css';

const TONES = ['indigo', 'magenta', 'blue', 'amber'];

const TONE_CLASS = {
  indigo: styles.toneIndigo,
  magenta: styles.toneMagenta,
  blue: styles.toneBlue,
  amber: styles.toneAmber,
};

function resolveTone(annotation, index) {
  const requested = annotation?.color;
  if (requested && TONE_CLASS[requested]) return requested;
  return TONES[index % TONES.length];
}

/** Pull plain text out of MDX/Docusaurus code-block children. */
function extractText(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) return extractText(node.props.children);
  return '';
}

/**
 * Highlightable code block. Put a normal Markdown fence as children so the
 * sample stays in the MDX (and in LLM markdown via strip-tag).
 *
 * @param {object} props
 * @param {{ label: string, description: string, lines: number[], color?: 'indigo'|'magenta'|'blue'|'amber' }[]} props.annotations
 * @param {string} [props.hint='Highlight a concept']
 * @param {React.ReactNode} props.children - Markdown code fence
 */
export default function AnnotatedCode({
  annotations = [],
  hint = 'Highlight a concept',
  children,
}) {
  const prismTheme = usePrismTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const code = useMemo(() => {
    const raw = extractText(children);
    return raw.replace(/^\n/, '').replace(/\n$/, '');
  }, [children]);

  const lines = code ? code.split('\n') : [];
  const active = activeIndex !== null ? annotations[activeIndex] : null;
  const activeTone =
    activeIndex !== null ? resolveTone(annotations[activeIndex], activeIndex) : null;
  const activeToneClass = activeTone ? TONE_CLASS[activeTone] : '';
  const activeLines = new Set(active?.lines ?? []);
  const hasActive = activeLines.size > 0;

  const codeSurfaceStyle = {
    backgroundColor: prismTheme.plain.backgroundColor,
    color: prismTheme.plain.color,
  };

  function toggle(i) {
    setActiveIndex((prev) => (prev === i ? null : i));
  }

  // If we couldn't extract fence text, fall back to rendering children as-is.
  if (!code) {
    return <div className={styles.root}>{children}</div>;
  }

  return (
    <div className={`${styles.root} ${activeToneClass}`.trim()}>
      {annotations.length > 0 && (
        <>
          <div className={styles.hint}>{hint}</div>
          <div className={styles.pills} role="group" aria-label={hint}>
            {annotations.map((annotation, i) => {
              const isActive = activeIndex === i;
              const tone = resolveTone(annotation, i);
              return (
                <button
                  key={annotation.label}
                  type="button"
                  className={[
                    styles.pill,
                    TONE_CLASS[tone],
                    isActive ? styles.pillActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isActive}
                  onClick={() => toggle(i)}
                >
                  {annotation.label}
                </button>
              );
            })}
          </div>
          {active && (
            <div className={styles.description} aria-live="polite">
              {active.description}
            </div>
          )}
        </>
      )}

      <div className={styles.codeWrap} style={codeSurfaceStyle}>
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
