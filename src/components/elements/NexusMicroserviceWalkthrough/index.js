import React, {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './walkthrough.module.css';

/**
 * Temporal neon accents — mint, lime, cyan, purple, indigo, pink, etc.
 * Each numbered step gets its own color when active.
 */
const NEON = [
  { accent: '#1FF1A5', onAccent: '#0b0b14' }, // mint
  { accent: '#C3FF62', onAccent: '#0b0b14' }, // lime
  { accent: '#44D5FF', onAccent: '#0b0b14' }, // cyan
  { accent: '#B664FF', onAccent: '#ffffff' }, // purple
  { accent: '#7F86F1', onAccent: '#0b0b14' }, // soft indigo
  { accent: '#FF6BCB', onAccent: '#0b0b14' }, // pink
  { accent: '#FF8A3D', onAccent: '#0b0b14' }, // neon orange
  { accent: '#5B8CFF', onAccent: '#0b0b14' }, // bright blue
  { accent: '#E8FF47', onAccent: '#0b0b14' }, // electric yellow-lime
  { accent: '#00E5A8', onAccent: '#0b0b14' }, // aqua
];

const PLAIN = { accent: '#7F86F1', onAccent: '#0b0b14' };

/**
 * Marker for a walkthrough step. Rendered only when selected by the parent.
 */
export function WalkthroughStep({ children }) {
  return <>{children}</>;
}
WalkthroughStep.displayName = 'WalkthroughStep';

function isWalkthroughStep(child) {
  if (!isValidElement(child)) return false;
  if (child.type === WalkthroughStep) return true;
  return (
    child.type?.displayName === 'WalkthroughStep' ||
    child.props?.mdxType === 'WalkthroughStep'
  );
}

function readStepFromUrl(steps) {
  if (typeof window === 'undefined') return steps[0]?.props?.id ?? null;
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('step');
  if (fromQuery && steps.some((s) => s.props.id === fromQuery)) {
    return fromQuery;
  }
  return steps[0]?.props?.id ?? null;
}

function colorForStep(steps, id) {
  // Every tab (including Finish / Tips) gets its own neon by position.
  const idx = steps.findIndex((s) => s.props.id === id);
  if (idx === -1) return PLAIN;
  return NEON[idx % NEON.length];
}

/**
 * Full-page multi-step walkthrough (Priority & Fairness pattern).
 * Deep link: ?step=<id>
 */
export default function NexusMicroserviceWalkthrough({
  children,
  title = 'Walkthrough',
}) {
  const steps = Children.toArray(children).filter(isWalkthroughStep);

  const [activeId, setActiveId] = useState(() => readStepFromUrl(steps));

  const selectStep = useCallback(
    (id, { push = true } = {}) => {
      if (!steps.some((s) => s.props.id === id)) return;
      setActiveId(id);
      if (typeof window === 'undefined') return;
      const url = new URL(window.location.href);
      url.searchParams.set('step', id);
      url.hash = '';
      if (push) {
        window.history.pushState({ step: id }, '', url);
      } else {
        window.history.replaceState({ step: id }, '', url);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [steps],
  );

  useEffect(() => {
    const onPop = () => setActiveId(readStepFromUrl(steps));
    window.addEventListener('popstate', onPop);
    const current = readStepFromUrl(steps);
    if (current) {
      const url = new URL(window.location.href);
      if (url.searchParams.get('step') !== current) {
        url.searchParams.set('step', current);
        window.history.replaceState({ step: current }, '', url);
      }
    }
    return () => window.removeEventListener('popstate', onPop);
  }, [steps]);

  useEffect(() => {
    function onClick(event) {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.pathname !== window.location.pathname) return;
      const step = url.searchParams.get('step');
      if (!step || !steps.some((s) => s.props.id === step)) return;
      event.preventDefault();
      selectStep(step, { push: true });
      if (url.hash) {
        requestAnimationFrame(() => {
          const el = document.getElementById(url.hash.slice(1));
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [selectStep, steps]);

  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.props.id === activeId),
  );
  const active = steps[activeIndex] ?? steps[0];
  const next = activeIndex < steps.length - 1 ? steps[activeIndex + 1] : null;

  if (!active) return null;

  const numberedIds = steps
    .filter((s) => s.props.numbered !== false)
    .map((s) => s.props.id);

  function stepNumber(id) {
    const idx = numberedIds.indexOf(id);
    return idx === -1 ? null : String(idx + 1).padStart(2, '0');
  }

  const activeColor = colorForStep(steps, active.props.id);
  const nextColor = next ? colorForStep(steps, next.props.id) : null;

  return (
    <div
      className={styles.shell}
      style={{
        '--nmw-accent': activeColor.accent,
        '--nmw-on-accent': activeColor.onAccent,
      }}
    >
      <nav className={styles.nav} aria-label={`${title} sections`}>
        {steps.map((step) => {
          const isActive = step.props.id === active.props.id;
          const num = stepNumber(step.props.id);
          const color = colorForStep(steps, step.props.id);
          return (
            <button
              key={step.props.id}
              type="button"
              className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''} ${
                num ? '' : styles.navBtnPlain
              }`}
              style={{
                '--nmw-tab-accent': color.accent,
                '--nmw-tab-on-accent': color.onAccent,
              }}
              onClick={() => selectStep(step.props.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {num ? (
                <span className={styles.navNum} aria-hidden="true">
                  {num}
                </span>
              ) : null}
              <span className={styles.navLabel}>{step.props.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.section}>
        <div className={styles.stepBody}>{active.props.children}</div>

        {next ? (
          <button
            type="button"
            className={styles.nextBtn}
            style={
              nextColor
                ? {
                    '--nmw-accent': nextColor.accent,
                    '--nmw-on-accent': nextColor.onAccent,
                  }
                : undefined
            }
            onClick={() => selectStep(next.props.id)}
          >
            {stepNumber(next.props.id) ? (
              <span className={styles.nextNum} aria-hidden="true">
                {stepNumber(next.props.id)}
              </span>
            ) : null}
            {next.props.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}
