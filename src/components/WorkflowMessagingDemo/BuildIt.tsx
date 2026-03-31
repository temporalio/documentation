import React, { useState } from 'react';
import styles from './WorkflowMessagingDemo.module.css';
import {
  LANGUAGES,
  MESSAGE_TYPE_DATA,
  type LangId,
  type MessageTypeId,
} from './buildData';

type Props = { onNext: () => void };

const MESSAGE_TABS: { id: MessageTypeId; label: string }[] = [
  { id: 'signal', label: 'Signal' },
  { id: 'query', label: 'Query' },
  { id: 'update', label: 'Update' },
];

/* ── Line-highlighted code pane ── */
function CodePane({
  title,
  code,
  activeLines,
  accentColor,
}: {
  title: string;
  code: string;
  activeLines: Set<number>;
  accentColor: string;
}) {
  const lines = code.split('\n');
  const hasActive = activeLines.size > 0;

  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--nd-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: 'var(--nd-surface)',
          border: '1px solid var(--nd-border)',
          borderRadius: 8,
          overflow: 'auto',
          maxHeight: 480,
        }}
      >
        <pre
          style={{
            margin: 0,
            padding: '14px 0',
            fontSize: 12,
            fontFamily: 'var(--ifm-font-family-monospace)',
            lineHeight: 1.65,
          }}
        >
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isActive = activeLines.has(lineNum);
            return (
              <div
                key={i}
                style={{
                  padding: '1px 16px',
                  borderLeft: isActive
                    ? `3px solid ${accentColor}`
                    : '3px solid transparent',
                  background: isActive
                    ? `color-mix(in srgb, ${accentColor} 14%, transparent)`
                    : 'transparent',
                  opacity: hasActive && !isActive ? 0.28 : 1,
                  transition: 'opacity 0.15s ease, background 0.15s ease',
                  whiteSpace: 'pre',
                  color: 'var(--ifm-font-color-base)',
                }}
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

export default function BuildIt({ onNext }: Props) {
  const [msgType, setMsgType] = useState<MessageTypeId>('signal');
  const [lang, setLang] = useState<LangId>('python');
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  function selectMsgType(id: MessageTypeId) {
    setMsgType(id);
    setActiveAnnotation(null);
  }

  function selectLang(id: LangId) {
    setLang(id);
    setActiveAnnotation(null);
  }

  function toggleAnnotation(i: number) {
    setActiveAnnotation((prev) => (prev === i ? null : i));
  }

  const data = MESSAGE_TYPE_DATA[msgType];
  const langCode = data.code[lang];
  const ann = activeAnnotation !== null ? data.annotations[activeAnnotation] : null;
  const annLines = ann?.lines[lang];
  const wfLines = new Set(annLines?.workflowLines ?? []);
  const clientLines = new Set(annLines?.clientLines ?? []);

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '80%' }} />
      </div>

      <h1>Build It</h1>
      <p className={styles.lead}>
        Code examples for all five SDKs. Select a message type and language, then click an
        annotation to highlight the relevant lines.
      </p>

      {/* Message type tabs */}
      <div className={styles.runTabs} style={{ marginBottom: 8 }}>
        {MESSAGE_TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.runTab} ${msgType === t.id ? styles.runTabActive : ''}`}
            onClick={() => selectMsgType(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Language tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {LANGUAGES.map((l) => (
          <button
            key={l.id}
            onClick={() => selectLang(l.id)}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: `1px solid ${lang === l.id ? data.accentColor : 'var(--nd-border)'}`,
              background: lang === l.id
                ? `color-mix(in srgb, ${data.accentColor} 12%, transparent)`
                : 'transparent',
              color: lang === l.id ? data.accentColor : 'var(--nd-muted)',
              fontSize: 12,
              fontWeight: lang === l.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.12s ease',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', margin: '0 0 16px', lineHeight: 1.7 }}>
        {data.description}
      </p>

      {/* Two-column code view */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <CodePane
          title="Workflow definition"
          code={langCode.workflowCode}
          activeLines={wfLines}
          accentColor={data.accentColor}
        />
        <CodePane
          title="Client code"
          code={langCode.clientCode}
          activeLines={clientLines}
          accentColor={data.accentColor}
        />
      </div>

      {/* Annotation pills */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--nd-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 8,
          }}
        >
          Highlight a concept
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {data.annotations.map((a, i) => {
            const isActive = activeAnnotation === i;
            return (
              <button
                key={i}
                onClick={() => toggleAnnotation(i)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1px solid ${isActive ? data.accentColor : 'var(--nd-border)'}`,
                  background: isActive
                    ? `color-mix(in srgb, ${data.accentColor} 15%, transparent)`
                    : 'var(--nd-surface)',
                  color: isActive ? data.accentColor : 'var(--ifm-font-color-base)',
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Annotation description box */}
      <div
        style={{
          minHeight: 52,
          padding: ann ? '12px 16px' : '0',
          background: ann
            ? `color-mix(in srgb, ${data.accentColor} 8%, transparent)`
            : 'transparent',
          border: ann
            ? `1px solid color-mix(in srgb, ${data.accentColor} 50%, transparent)`
            : '1px solid transparent',
          borderRadius: 8,
          transition: 'all 0.15s ease',
          marginBottom: 16,
        }}
      >
        {ann && (
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ifm-font-color-base)', lineHeight: 1.7 }}>
            {ann.description}
          </p>
        )}
      </div>

      <div className={styles.buildNote}>{data.note}</div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Test Yourself →
        </button>
      </div>
    </div>
  );
}
