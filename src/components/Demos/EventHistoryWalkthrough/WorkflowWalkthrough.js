import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePrismTheme } from '@docusaurus/theme-common';
import { Highlight } from 'prism-react-renderer';
import Prism from './prism-languages';
import styles from './workflow-walkthrough.module.css';

const KIND_LABEL = {
  internal: 'Internal step',
  command: 'Sends a Command',
  service: 'Temporal Service',
  crash: 'Worker crash',
  replay: 'Replay',
};

const KIND_CLASS = {
  internal: styles.kindChipInternal,
  command: styles.kindChipCommand,
  service: styles.kindChipService,
  crash: styles.kindChipCrash,
  replay: styles.kindChipReplay,
};

const TONE_CLASS = {
  command: styles.entryCommand,
  direct: styles.entryDirect,
  indirect: styles.entryIndirect,
  plain: styles.entryPlain,
};

const STATUS_MARK = { matched: '✓', mismatch: '✗' };

/** Entries for one column, accumulated across every step up to `currentStep`. */
function collectEntries(steps, columnKey, currentStep) {
  const entries = [];
  steps.slice(0, currentStep).forEach((step) => {
    (step.adds?.[columnKey] ?? []).forEach((entry, i) => {
      entries.push({ ...entry, key: `${step.number}-${i}`, isNew: step.number === currentStep });
    });
  });
  return entries;
}

function CodePanel({ code, lines, language }) {
  const prismTheme = usePrismTheme();
  const active = useMemo(() => new Set(lines ?? []), [lines]);
  const hasActive = active.size > 0;

  return (
    <div
      className={styles.codeWrap}
      style={{
        backgroundColor: prismTheme.plain.backgroundColor,
        color: prismTheme.plain.color,
      }}
    >
      <Highlight prism={Prism} theme={prismTheme} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={styles.code}>
            {tokens.map((line, i) => {
              const isActive = active.has(i + 1);
              const lineProps = getLineProps({ line });
              return (
                <div
                  {...lineProps}
                  key={i}
                  className={[
                    styles.line,
                    lineProps.className,
                    isActive ? styles.lineActive : '',
                    hasActive && !isActive ? styles.lineDimmed : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.lineNo}>{i + 1}</span>
                  {line.length === 0 ? (
                    <span> </span>
                  ) : (
                    line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)
                  )}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function Column({ title, entries }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const newest = container.querySelectorAll('[data-new="true"]');
    const target = newest[newest.length - 1];
    if (!target) return;
    // Scroll within the column only, never the page.
    container.scrollTop = Math.max(0, target.offsetTop - container.clientHeight + target.offsetHeight + 8);
  }, [entries]);

  return (
    <div className={styles.column}>
      <div className={styles.columnTitle}>{title}</div>
      <div className={styles.columnScroll} ref={scrollRef}>
        {entries.length === 0 ? (
          <p className={styles.columnEmpty}>Nothing yet.</p>
        ) : (
          <ol className={styles.entryList}>
            {entries.map((entry) =>
              entry.divider ? (
                <li key={entry.key} className={styles.divider}>
                  <span>{entry.divider}</span>
                </li>
              ) : (
                <li
                  key={entry.key}
                  data-new={entry.isNew ? 'true' : 'false'}
                  className={[
                    styles.entry,
                    TONE_CLASS[entry.tone ?? 'plain'],
                    entry.isNew ? styles.entryNew : '',
                    entry.status ? styles[`entry${entry.status === 'matched' ? 'Matched' : 'Mismatch'}`] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.entryLabel}>
                    {entry.status && (
                      <span className={styles.entryStatus} aria-hidden="true">
                        {STATUS_MARK[entry.status]}
                      </span>
                    )}
                    {entry.label}
                  </span>
                  {entry.details && <span className={styles.entryDetails}>{entry.details}</span>}
                  {entry.expected && <span className={styles.entryExpected}>Expected: {entry.expected}</span>}
                </li>
              )
            )}
          </ol>
        )}
      </div>
    </div>
  );
}

function StepPanel({ step, total, columns, steps }) {
  return (
    <div className={styles.detailsPanel} aria-live="polite">
      <div className={styles.stepMeta}>
        <span className={styles.stepBadge}>
          Step {step.number}/{total}
        </span>
        {step.kind && (
          <span className={`${styles.kindChip} ${KIND_CLASS[step.kind] ?? ''}`}>{KIND_LABEL[step.kind]}</span>
        )}
        {step.phase && <span className={styles.phaseChip}>{step.phase}</span>}
      </div>

      <h4 className={styles.stepTitle}>{step.title}</h4>
      <p className={styles.note}>{step.note}</p>

      {step.bullets && (
        <ul className={styles.bullets}>
          {step.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      <div className={`${styles.columns} ${columns.length > 1 ? styles.columnsSplit : ''}`}>
        {columns.map((column) => (
          <Column key={column.key} title={column.title} entries={collectEntries(steps, column.key, step.number)} />
        ))}
      </div>
    </div>
  );
}

function Controls({ steps, currentStep, onStep, onPrev, onNext }) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.navBtn}
        onClick={onPrev}
        disabled={currentStep === 1}
        aria-label="Previous step"
      >
        ← Previous
      </button>

      <div className={styles.stepDots}>
        {steps.map((step) => (
          <button
            key={step.number}
            type="button"
            className={`${styles.stepDot} ${step.number === currentStep ? styles.stepDotActive : ''}`}
            onClick={() => onStep(step.number)}
            aria-label={`Step ${step.number}: ${step.title}`}
            aria-current={step.number === currentStep ? 'step' : undefined}
          >
            {step.number}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navBtn}
        onClick={onNext}
        disabled={currentStep === steps.length}
        aria-label="Next step"
      >
        Next →
      </button>
    </div>
  );
}

/**
 * Step-by-step walkthrough of a Workflow Definition: highlights the lines the
 * Worker is running and accumulates whatever the walkthrough tracks alongside
 * them (Commands, Events, or both).
 *
 * @param {object} props
 * @param {string} props.code - Source sample; step `lines` are 1-based into it.
 * @param {string} props.language - Prism language for the sample, such as `go` or `csharp`.
 * @param {object[]} props.steps - See the steps-*.js files for the shape.
 * @param {{ key: string, title: string }[]} props.columns - Ledger columns.
 * @param {string} props.ariaLabel - Label for the demo region.
 */
export default function WorkflowWalkthrough({ code, language, steps, columns = [], ariaLabel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const step = steps[currentStep - 1];

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setCurrentStep((s) => Math.max(1, s - 1));
    if (event.key === 'ArrowRight') setCurrentStep((s) => Math.min(steps.length, s + 1));
  };

  return (
    <div className={styles.demo} role="group" aria-label={ariaLabel} tabIndex={0} onKeyDown={onKeyDown}>
      <div className={styles.content}>
        <CodePanel code={code} language={language} lines={step.lines} />
        <StepPanel step={step} total={steps.length} columns={columns} steps={steps} />
      </div>

      <Controls
        steps={steps}
        currentStep={currentStep}
        onStep={setCurrentStep}
        onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
      />
    </div>
  );
}
