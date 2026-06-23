import React, { useState, useRef } from 'react';
import styles from './WorkflowMessagingDemo.module.css';

type MsgType = 'signal' | 'query' | 'update';
type Props = { onNext: () => void };

const ACCENT: Record<MsgType, string> = {
  signal: 'var(--nd-green)',
  query: 'var(--nd-purple)',
  update: 'var(--ifm-color-primary)',
};

const STATE_KEY: Record<MsgType, string> = {
  signal: 'approved',
  query: 'status',
  update: 'priority',
};

const STATE_BEFORE: Record<MsgType, string> = {
  signal: 'false',
  query: '"processing"',
  update: '1',
};

const STATE_AFTER: Record<MsgType, string> = {
  signal: 'true',
  query: '"processing"',
  update: '3',
};

const METHOD: Record<MsgType, string> = {
  signal: 'approve()',
  query: 'get_status()',
  update: 'set_priority(3)',
};

const SUMMARY: Record<MsgType, { valid?: string; invalid?: string; default?: string }> = {
  signal: {
    default: 'Signal written to event history. Worker picked it up and updated Workflow state. Client moved on immediately — no reply.',
  },
  query: {
    default: 'Query went to a live Worker. Current state was read and returned synchronously. Nothing was written to history.',
  },
  update: {
    valid: 'Validator ran first and approved the input. State changed. Result returned to the client.',
    invalid: 'Validator ran first and rejected the input. State is unchanged. Error returned to the client.',
  },
};

export default function HowItWorks({ onNext }: Props) {
  const [msgType, setMsgType] = useState<MsgType>('signal');
  const [updateValid, setUpdateValid] = useState(true);

  // Animation progress values (0–1)
  const [fwdA, setFwdA] = useState(0);  // forward: full for signal/query; left half for update
  const [fwdB, setFwdB] = useState(0);  // forward: right half for update only
  const [rev, setRev] = useState(0);    // return arrow

  // Update validator state
  const [valResult, setValResult] = useState<null | 'accept' | 'reject'>(null);

  // Visual state
  const [stateChanged, setStateChanged] = useState(false);
  const [clientReceived, setClientReceived] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function schedule(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setFwdA(0);
    setFwdB(0);
    setRev(0);
    setValResult(null);
    setStateChanged(false);
    setClientReceived(null);
    setPlaying(false);
  }

  function changeType(t: MsgType) {
    setMsgType(t);
    reset();
  }

  function play() {
    reset();
    schedule(() => setPlaying(true), 30);
    schedule(() => setFwdA(1), 80); // triggers CSS transition

    if (msgType === 'signal') {
      schedule(() => setStateChanged(true), 850);
      schedule(() => setPlaying(false), 950);
    } else if (msgType === 'query') {
      schedule(() => setRev(1), 850);
      schedule(() => setClientReceived('"processing"'), 1600);
      schedule(() => setPlaying(false), 1700);
    } else {
      // update: fwdA goes to validator (left half)
      schedule(() => setValResult(updateValid ? 'accept' : 'reject'), 850);
      if (updateValid) {
        schedule(() => setFwdB(1), 1200);
        schedule(() => setStateChanged(true), 1950);
        schedule(() => setRev(1), 2050);
        schedule(() => setClientReceived('"Priority set to 3"'), 2800);
        schedule(() => setPlaying(false), 2900);
      } else {
        schedule(() => setRev(1), 1350);
        schedule(() => setClientReceived('Error: invalid priority'), 2100);
        schedule(() => setPlaying(false), 2200);
      }
    }
  }

  const isUpdate = msgType === 'update';
  const color = ACCENT[msgType];
  const hasRun = fwdA > 0;
  const stateValue = stateChanged ? STATE_AFTER[msgType] : STATE_BEFORE[msgType];
  const stateActuallyChanged = stateChanged && msgType !== 'query';
  const revColor = valResult === 'reject' ? 'var(--nd-red)' : color;

  // Forward arrow widths
  const fwdAWidth = isUpdate ? `${fwdA * 50}%` : `${fwdA * 100}%`;
  const fwdBLeft = 'calc(50% + 30px)'; // right of validator badge
  const fwdBWidth = `calc(${fwdB * 50}% - 30px)`;

  const summaryText = msgType === 'update'
    ? (valResult === 'reject' ? SUMMARY.update.invalid : SUMMARY.update.valid)
    : SUMMARY[msgType].default;

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '60%' }} />
      </div>

      <h1>How It Works</h1>
      <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', marginBottom: 20, lineHeight: 1.7 }}>
        Watch how each message type travels between your client code and a running Workflow.
      </p>

      {/* Type tabs */}
      <div className={styles.runTabs} style={{ marginBottom: 16 }}>
        {(['signal', 'query', 'update'] as MsgType[]).map(t => (
          <button
            key={t}
            className={`${styles.runTab} ${msgType === t ? styles.runTabActive : ''}`}
            onClick={() => changeType(t)}
            style={msgType === t ? { borderColor: ACCENT[t], color: ACCENT[t] } : {}}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Update: valid/invalid toggle */}
      {isUpdate && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {([true, false] as const).map(v => {
            const active = updateValid === v;
            const c = v ? color : 'var(--nd-red)';
            return (
              <button
                key={String(v)}
                onClick={() => { setUpdateValid(v); reset(); }}
                style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${active ? c : 'var(--nd-border)'}`,
                  background: active ? `color-mix(in srgb, ${c} 12%, transparent)` : 'transparent',
                  color: active ? c : 'var(--nd-muted)',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s ease',
                }}
              >
                {v ? 'Valid input (priority: 3)' : 'Invalid input (priority: 6)'}
              </button>
            );
          })}
        </div>
      )}

      {/* Diagram */}
      <div style={{
        border: '1px solid var(--nd-border)',
        borderRadius: 12,
        background: 'var(--nd-surface)',
        padding: '32px 24px 24px',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 90 }}>

          {/* CLIENT box */}
          <div style={{
            width: 108, flexShrink: 0,
            border: `1.5px solid ${hasRun ? color : 'var(--nd-border)'}`,
            borderRadius: 8,
            padding: '10px 12px',
            background: hasRun ? `color-mix(in srgb, ${color} 8%, var(--nd-surface))` : 'var(--nd-surface2)',
            transition: 'border-color 0.3s ease, background 0.3s ease',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--nd-muted)', marginBottom: 5 }}>
              Client
            </div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ifm-font-color-base)', marginBottom: 4 }}>
              {METHOD[msgType]}
            </div>
            {clientReceived && (
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: revColor, fontWeight: 600, marginTop: 4 }}>
                ← {clientReceived}
              </div>
            )}
            {!clientReceived && playing && msgType !== 'signal' && (
              <div style={{ fontSize: 10, color: 'var(--nd-muted)', marginTop: 4 }}>waiting…</div>
            )}
          </div>

          {/* Arrow track */}
          <div style={{ flex: 1, position: 'relative', height: 90, minWidth: 0 }}>

            {/* ── Forward arrow ── */}
            {/* Track background */}
            <div style={{ position: 'absolute', top: 27, left: 0, right: 0, height: 1, background: 'var(--nd-border)' }} />

            {/* Segment A fill (full for signal/query; left half for update) */}
            <div style={{
              position: 'absolute', top: 26, left: 0,
              width: fwdAWidth, height: 3,
              background: color,
              borderRadius: '0 2px 2px 0',
              transition: 'width 700ms ease',
            }} />

            {/* Segment B fill (update only: right half, validator → workflow) */}
            {isUpdate && (
              <div style={{
                position: 'absolute', top: 26,
                left: fwdBLeft,
                width: fwdBWidth, height: 3,
                background: valResult === 'accept' ? color : 'transparent',
                borderRadius: '0 2px 2px 0',
                transition: 'width 700ms ease',
              }} />
            )}

            {/* Arrowhead (right end of forward arrow) */}
            {fwdA >= 0.99 && !isUpdate && (
              <div style={{
                position: 'absolute', top: 23, right: -1,
                width: 0, height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: `7px solid ${color}`,
              }} />
            )}
            {isUpdate && fwdB >= 0.99 && valResult === 'accept' && (
              <div style={{
                position: 'absolute', top: 23, right: -1,
                width: 0, height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: `7px solid ${color}`,
              }} />
            )}

            {/* Method name label */}
            {fwdA > 0.3 && (
              <div style={{
                position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                fontSize: 10, fontFamily: 'monospace', color: 'var(--nd-muted)',
                whiteSpace: 'nowrap', pointerEvents: 'none',
                background: 'var(--nd-surface)',
                padding: '0 4px',
              }}>
                {METHOD[msgType]}
              </div>
            )}

            {/* Validator badge (update only) */}
            {isUpdate && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 52, height: 52, borderRadius: '50%',
                border: `2px solid ${
                  valResult === 'accept' ? 'var(--nd-green)'
                  : valResult === 'reject' ? 'var(--nd-red)'
                  : 'var(--nd-border)'
                }`,
                background: valResult
                  ? `color-mix(in srgb, ${valResult === 'accept' ? 'var(--nd-green)' : 'var(--nd-red)'} 15%, var(--nd-surface))`
                  : 'var(--nd-surface2)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.35s ease',
                zIndex: 2, flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 15, lineHeight: 1,
                  color: valResult === 'accept' ? 'var(--nd-green)'
                    : valResult === 'reject' ? 'var(--nd-red)'
                    : 'var(--nd-muted)',
                }}>
                  {valResult === 'accept' ? '✓' : valResult === 'reject' ? '✗' : '?'}
                </span>
                <span style={{ fontSize: 8, color: 'var(--nd-muted)', marginTop: 2 }}>validate</span>
              </div>
            )}

            {/* ── Return arrow ── */}
            {(msgType === 'query' || msgType === 'update') && (
              <>
                {/* Track background */}
                <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, height: 1, background: 'var(--nd-border)' }} />

                {/* Return fill (grows right → left) */}
                <div style={{
                  position: 'absolute', bottom: 11, right: 0,
                  width: `${rev * 100}%`, height: 3,
                  background: revColor,
                  borderRadius: '2px 0 0 2px',
                  transition: 'width 700ms ease',
                }} />

                {/* Arrowhead (left end) */}
                {rev >= 0.99 && (
                  <div style={{
                    position: 'absolute', bottom: 8, left: -1,
                    width: 0, height: 0,
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderRight: `7px solid ${revColor}`,
                  }} />
                )}

                {/* Return label */}
                {clientReceived && (
                  <div style={{
                    position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, fontFamily: 'monospace', color: revColor,
                    whiteSpace: 'nowrap', pointerEvents: 'none',
                    background: 'var(--nd-surface)', padding: '0 4px',
                  }}>
                    {clientReceived}
                  </div>
                )}
              </>
            )}

            {/* "No reply" label for signal */}
            {msgType === 'signal' && fwdA >= 0.99 && (
              <div style={{
                position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                fontSize: 10, color: 'var(--nd-muted)', whiteSpace: 'nowrap',
                fontStyle: 'italic',
              }}>
                no reply
              </div>
            )}
          </div>

          {/* WORKFLOW box */}
          <div style={{
            width: 120, flexShrink: 0,
            border: `1.5px solid ${stateActuallyChanged ? color : 'var(--nd-border)'}`,
            borderRadius: 8,
            padding: '10px 12px',
            background: stateActuallyChanged
              ? `color-mix(in srgb, ${color} 8%, var(--nd-surface))`
              : 'var(--nd-surface2)',
            transition: 'border-color 0.4s ease, background 0.4s ease',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--nd-muted)', marginBottom: 5 }}>
              Workflow
            </div>
            <div style={{ fontSize: 11, fontFamily: 'monospace' }}>
              <span style={{ color: 'var(--nd-muted)' }}>{STATE_KEY[msgType]}:</span>
              {' '}
              <span style={{
                color: stateActuallyChanged ? color : 'var(--ifm-font-color-base)',
                fontWeight: stateActuallyChanged ? 700 : 400,
                transition: 'color 0.3s ease',
              }}>
                {stateValue}
              </span>
            </div>
            {msgType === 'query' && fwdA > 0 && (
              <div style={{ fontSize: 9, color: 'var(--nd-muted)', marginTop: 5, fontStyle: 'italic' }}>
                read only
              </div>
            )}
          </div>
        </div>

        {/* Summary after animation */}
        {hasRun && !playing && summaryText && (
          <div style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--nd-border)',
            fontSize: 13,
            color: 'var(--ifm-font-color-base)',
            lineHeight: 1.7,
          }}>
            {summaryText}
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button
          className={styles.btn}
          onClick={play}
          disabled={playing}
          style={{ opacity: playing ? 0.6 : 1 }}
        >
          {playing ? 'Running…' : hasRun ? 'Replay →' : 'Send →'}
        </button>
        {hasRun && !playing && (
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset} style={{ fontSize: 12 }}>
            Reset
          </button>
        )}
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Build It →
        </button>
      </div>
    </div>
  );
}
