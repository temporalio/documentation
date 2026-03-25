import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './NexusDemo.module.css';
import { asyncSteps, FlowMode, FlowStep, syncSteps } from './flowSteps';

type Props = { onNext: () => void };

const NODES = [
  { title: 'Caller Workflow', sub: 'caller namespace' },
  { title: 'Nexus Endpoint', sub: 'routes + retries' },
  { title: 'Handler Worker', sub: 'handler namespace' },
];

const AUTO_ADVANCE_MS = 1800;

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export default function HowItWorks({ onNext }: Props) {
  const [mode, setMode] = useState<FlowMode>('sync');
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [log, setLog] = useState<Array<{ ts: string; step: FlowStep }>>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const steps = mode === 'sync' ? syncSteps : asyncSteps;
  const currentStep = steps[stepIdx];

  const advance = useCallback(
    (idx: number) => {
      const next = Math.min(steps.length - 1, idx);
      setStepIdx(next);
      setLog((prev) => [...prev, { ts: getTimestamp(), step: steps[next] }]);
    },
    [steps],
  );

  // Auto-play
  useEffect(() => {
    if (playing) {
      timerRef.current = setTimeout(() => {
        if (stepIdx < steps.length - 1) {
          advance(stepIdx + 1);
        } else {
          setPlaying(false);
        }
      }, AUTO_ADVANCE_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, stepIdx, steps.length, advance]);

  // Scroll log to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  function handleModeChange(next: FlowMode) {
    setMode(next);
    setStepIdx(0);
    setPlaying(false);
    setLog([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function handlePlay() {
    if (stepIdx >= steps.length - 1) {
      // reset and play from start
      setStepIdx(0);
      setLog([]);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }

  function handleStep(dir: -1 | 1) {
    setPlaying(false);
    const next = stepIdx + dir;
    if (next >= 0 && next < steps.length) advance(next);
  }

  function handleReset() {
    setPlaying(false);
    setStepIdx(0);
    setLog([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  // Packet position: 0% = left edge of first track, 100% = right edge of second track
  // Node 0 → pct 0, node 1 → pct 50, node 2 → pct 100
  const packetPct = currentStep.packetPct;

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '42%' }} />
      </div>

      <h1>How It Works</h1>
      <p className={styles.lead}>
        Step through a live Nexus call to see exactly what happens at each stage — for both
        synchronous and asynchronous operations.
      </p>

      <div className={styles.flowOuter}>
        {/* Mode selector */}
        <div className={styles.flowModeTabs}>
          <button
            className={`${styles.flowModeTab} ${mode === 'sync' ? styles.flowModeTabActive : ''}`}
            onClick={() => handleModeChange('sync')}
          >
            Synchronous (fast)
          </button>
          <button
            className={`${styles.flowModeTab} ${mode === 'async' ? styles.flowModeTabActive : ''}`}
            onClick={() => handleModeChange('async')}
          >
            Asynchronous (long-running)
          </button>
        </div>

        {/* Flow diagram */}
        <div className={styles.flowDiagram}>
          {NODES.map((node, i) => (
            <React.Fragment key={node.title}>
              <div
                className={`${styles.flowNode} ${currentStep.activeNode === i ? styles.flowNodeActive : ''}`}
              >
                <div className={styles.flowNodeTitle}>{node.title}</div>
                <div className={styles.flowNodeSub}>{node.sub}</div>
              </div>
              {i < NODES.length - 1 && (
                <div className={styles.flowTrackWrap}>
                  <div className={styles.flowTrack}>
                    <div
                      className={styles.flowTrackFill}
                      style={{
                        width:
                          (i === 0 && packetPct >= 50) || (i === 0 && packetPct === 100)
                            ? '100%'
                            : i === 1 && packetPct === 100
                              ? '100%'
                              : '0%',
                      }}
                    />
                  </div>
                  {/* Packet rendered on first track only, spanning both */}
                  {i === 0 && (
                    <div
                      className={styles.packet}
                      style={{
                        // Map 0–50 to first track, 50–100 to second track
                        // We render the packet relative to the full diagram width
                        // but position it relative to flowTrackWrap
                        // Since there are 2 tracks each at flex:1, we use a wider container
                        // Actually position relative to the track:
                        left: `${Math.min(packetPct * 2, 100)}%`,
                        display: packetPct <= 50 ? 'block' : 'none',
                      }}
                    />
                  )}
                  {i === 1 && (
                    <div
                      className={styles.packet}
                      style={{
                        left: `${Math.max((packetPct - 50) * 2, 0)}%`,
                        display: packetPct >= 50 ? 'block' : 'none',
                      }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step detail */}
        <div className={styles.flowDetail}>
          <div className={styles.flowDetailLabel}>{currentStep.label}</div>
          <div className={styles.flowDetailText}>{currentStep.detail}</div>
        </div>

        {/* Controls */}
        <div className={styles.flowControls}>
          <button className={styles.btn} onClick={handlePlay}>
            {playing
              ? '⏸ Pause'
              : log.length === 0
                ? 'Run Demo'
                : stepIdx >= steps.length - 1
                  ? '↺ Replay'
                  : '▶ Resume'}
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => handleStep(-1)}
            disabled={stepIdx === 0}
          >
            ← Prev
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => handleStep(1)}
            disabled={stepIdx >= steps.length - 1}
          >
            Next →
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleReset}>
            Reset
          </button>
          <span className={styles.stepCounter}>
            {stepIdx + 1} / {steps.length}
          </span>
        </div>

        {/* Status log */}
        {log.length > 0 && (
          <div className={styles.statusLog} ref={logRef}>
            {log.map((entry, i) => (
              <div key={i} className={styles.logLine}>
                <span className={styles.logTs}>{entry.ts}</span>
                <span
                  className={`${styles.logEvent} ${
                    entry.step.log.level === 'success'
                      ? styles.logEventSuccess
                      : entry.step.log.level === 'warn'
                        ? styles.logEventWarn
                        : styles.logEventInfo
                  }`}
                >
                  {entry.step.log.event}
                </span>
                <span className={styles.logMsg}>{entry.step.log.msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        <div className={styles.timeline}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`${styles.tlStep} ${
                i < stepIdx
                  ? styles.tlStepDone
                  : i === stepIdx && log.length > 0
                    ? styles.tlStepActive
                    : ''
              }`}
            >
              <div className={styles.tlNum}>{i + 1}</div>
              <div className={styles.tlContent}>
                <div className={styles.tlTitle}>{step.label}</div>
                <div className={styles.tlDesc}>{step.log.msg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Run It →
        </button>
      </div>
    </div>
  );
}
