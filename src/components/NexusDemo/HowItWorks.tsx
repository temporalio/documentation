import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './NexusDemo.module.css';
import { asyncSteps, FlowMode, FlowStep, syncSteps } from './flowSteps';

type Props = { onNext: () => void };

const NODES = [
  { id: 'caller',   title: 'Caller Workflow', sub: 'payments-ns' },
  { id: 'endpoint', title: 'Nexus Endpoint',  sub: 'Routing + Auth' },
  { id: 'handler',  title: 'Handler Worker',  sub: 'fraud-ns' },
];

const AUTO_ADVANCE_MS = 1400;

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

type LogEntry = { ts: string; step: FlowStep };

export default function HowItWorks({ onNext }: Props) {
  const [mode, setMode] = useState<FlowMode>('sync');
  const [stepIdx, setStepIdx] = useState(-1); // -1 = not started
  const [playing, setPlaying] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const steps = mode === 'sync' ? syncSteps : asyncSteps;
  const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;

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
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, stepIdx, steps.length, advance]);

  // Scroll log to bottom
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  function handleModeChange(next: FlowMode) {
    setMode(next);
    setStepIdx(-1);
    setPlaying(false);
    setLog([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function handleRunDemo() {
    if (playing) {
      setPlaying(false);
      return;
    }
    // Replay from start if done, otherwise resume / start
    if (stepIdx >= steps.length - 1) {
      setStepIdx(0);
      setLog([{ ts: getTimestamp(), step: steps[0] }]);
      setPlaying(true);
    } else if (stepIdx === -1) {
      advance(0);
      setPlaying(true);
    } else {
      setPlaying(true);
    }
  }

  function handleReset() {
    setPlaying(false);
    setStepIdx(-1);
    setLog([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  const packetPct = currentStep?.packetPct ?? 0;

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '42%' }} />
      </div>

      <h1>How a Nexus Call Works</h1>
      <p className={styles.lead}>
        Walk through the step-by-step lifecycle of a Nexus Operation. Choose sync or async.
      </p>

      {/* Underline tabs */}
      <div className={styles.runTabs}>
        <button
          className={`${styles.runTab} ${mode === 'sync' ? styles.runTabActive : ''}`}
          onClick={() => handleModeChange('sync')}
        >
          Synchronous Operation
        </button>
        <button
          className={`${styles.runTab} ${mode === 'async' ? styles.runTabActive : ''}`}
          onClick={() => handleModeChange('async')}
        >
          Asynchronous Operation
        </button>
      </div>

      <div className={styles.flowOuter}>
        {/* Flow diagram */}
        <div className={styles.flowDiagram}>
          {NODES.map((node, i) => (
            <React.Fragment key={node.id}>
              <div
                className={`${styles.flowNode} ${currentStep?.activeNode === i ? styles.flowNodeActive : ''}`}
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
                  {i === 0 && (
                    <div
                      className={styles.packet}
                      style={{
                        left: `${Math.min(packetPct * 2, 100)}%`,
                        opacity: currentStep && packetPct <= 50 ? 1 : 0,
                        transition: 'left 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                      }}
                    />
                  )}
                  {i === 1 && (
                    <div
                      className={styles.packet}
                      style={{
                        left: `${Math.max((packetPct - 50) * 2, 0)}%`,
                        opacity: currentStep && packetPct >= 50 ? 1 : 0,
                        transition: 'left 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                      }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Status log */}
        <div className={styles.statusLog} ref={logRef}>
          {log.length === 0 ? (
            <div className={styles.logLine}>
              <span className={styles.logTs}>[ready]&nbsp;</span>
              <span className={styles.logMsg}>Press "Run Demo" to start the animation</span>
            </div>
          ) : (
            log.map((entry, i) => (
              <div key={i} className={styles.logLine}>
                <span className={styles.logTs}>{entry.ts}&nbsp;</span>
                <span
                  className={`${styles.logEvent} ${
                    entry.step.log.level === 'success'
                      ? styles.logEventSuccess
                      : entry.step.log.level === 'warn'
                        ? styles.logEventWarn
                        : styles.logEventInfo
                  }`}
                >
                  {entry.step.log.event}&nbsp;
                </span>
                <span className={styles.logMsg}>{entry.step.log.msg}</span>
              </div>
            ))
          )}
        </div>

        {/* Controls */}
        <div className={styles.flowControls}>
          <button className={styles.btn} onClick={handleRunDemo}>
            {playing
              ? '⏸ Pause'
              : stepIdx === -1
                ? 'Run Demo'
                : stepIdx >= steps.length - 1
                  ? '↺ Replay'
                  : '▶ Resume'}
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`${styles.tlStep} ${
                i < stepIdx
                  ? styles.tlStepDone
                  : i === stepIdx
                    ? styles.tlStepActive
                    : ''
              }`}
            >
              <div className={styles.tlNum}>{i + 1}</div>
              <div className={styles.tlContent}>
                <div className={styles.tlTitle}>{step.label}</div>
                <div className={styles.tlDesc}>{step.detail}</div>
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
