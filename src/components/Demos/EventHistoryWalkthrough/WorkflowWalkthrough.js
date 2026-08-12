import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePrismTheme } from '@docusaurus/theme-common';
import { Highlight } from 'prism-react-renderer';
import { FaExpand } from 'react-icons/fa';
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
  const wrapRef = useRef(null);

  useEffect(() => {
    const container = wrapRef.current;
    if (!container) return;
    const activeEls = container.querySelectorAll('[data-active="true"]');
    if (activeEls.length === 0) return;

    // A step's active lines are usually a fresh statement, not a continuation
    // of whatever a previous long line scrolled to — start back at the left.
    container.scrollLeft = 0;

    const first = activeEls[0];
    const last = activeEls[activeEls.length - 1];
    const viewTop = container.scrollTop;
    const viewHeight = container.clientHeight;
    // `offsetTop` is relative to the nearest *positioned* ancestor, which
    // isn't necessarily this container (.demo needs `position: relative` for
    // the zoom button, which makes it the offsetParent instead) — measure
    // against the container's own box instead so this can't silently drift.
    const containerTop = container.getBoundingClientRect().top;
    const rangeTop = first.getBoundingClientRect().top - containerTop + viewTop;
    const rangeBottom = last.getBoundingClientRect().bottom - containerTop + viewTop;
    const padding = 12;

    let nextScrollTop = viewTop;
    if (rangeBottom - rangeTop > viewHeight || rangeTop < viewTop) {
      // Doesn't fit in one screen, or starts above the fold: lead with the
      // first active line rather than whichever end happens to be reachable.
      nextScrollTop = rangeTop - padding;
    } else if (rangeBottom > viewTop + viewHeight) {
      // Starts in view but runs past the bottom: pull its end into view.
      nextScrollTop = rangeBottom - viewHeight + padding;
    }
    container.scrollTop = Math.max(0, nextScrollTop);
  }, [lines]);

  return (
    <div
      ref={wrapRef}
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
                  data-active={isActive ? 'true' : 'false'}
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
 * Full-viewport version of the demo, portaled to `document.body` so it can be
 * much wider than the doc content column allows. Unlike the site's other
 * zoom modals (`ZoomableImage`, `MermaidZoomWrapper`), the content here is a
 * live, still-interactive copy of the walkthrough, not a static image or SVG
 * snapshot — so clicks inside it must not close the overlay the way clicking
 * an enlarged image does.
 */
function ZoomOverlay({ onClose, initialFocusRef, children }) {
  // Runs once, when the overlay itself mounts (i.e. exactly when zoom opens)
  // — not on every render of the parent, which stays mounted the whole time.
  useEffect(() => {
    initialFocusRef?.current?.focus();
  }, [initialFocusRef]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.zoomOverlay} onClick={onClose}>
      <div className={styles.zoomCard} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.zoomClose} aria-label="Close expanded view" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
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
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomButtonRef = useRef(null);
  const zoomedDemoRef = useRef(null);
  const step = steps[currentStep - 1];

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setCurrentStep((s) => Math.max(1, s - 1));
    if (event.key === 'ArrowRight') setCurrentStep((s) => Math.min(steps.length, s + 1));
  };

  // Return focus to the trigger button on close, matching standard dialog
  // behavior. (The reverse — focusing into the overlay on open — happens in
  // ZoomOverlay itself, keyed off its own mount.) This has to be an effect
  // rather than a plain call in the close handler: `setIsZoomed(false)`
  // hasn't committed yet at that point, so the trigger button's ancestor is
  // still `inert` and the focus() call would silently no-op. Skipping the
  // first render keeps it from also firing (and stealing focus) on mount.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isZoomed) {
      zoomButtonRef.current?.focus();
    }
  }, [isZoomed]);

  const closeZoom = () => setIsZoomed(false);

  const body = (
    <>
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
    </>
  );

  return (
    <>
      {/* `inert` while zoomed: without it this copy stays in the tab order,
          hidden behind the overlay backdrop, so keyboard/screen-reader users
          could still reach a widget they can't see. */}
      <div
        className={styles.demo}
        inert={isZoomed}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          ref={zoomButtonRef}
          className={styles.zoomButton}
          aria-label="Expand walkthrough"
          title="Expand walkthrough"
          onClick={() => setIsZoomed(true)}
        >
          <FaExpand aria-hidden="true" size="0.8rem" />
        </button>
        {body}
      </div>

      {isZoomed && (
        <ZoomOverlay onClose={closeZoom} initialFocusRef={zoomedDemoRef}>
          <div
            ref={zoomedDemoRef}
            className={styles.demo}
            role="group"
            aria-label={ariaLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {body}
          </div>
        </ZoomOverlay>
      )}
    </>
  );
}
