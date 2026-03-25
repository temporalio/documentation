import React from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };

const components = [
  {
    tag: 'tagBlue' as const,
    tagLabel: 'Endpoint',
    title: 'Nexus Endpoint',
    desc: 'A named, versioned router configured in the Temporal control plane. It maps a name (e.g. "fraud-service-endpoint") to a target namespace and task queue. This is the only thing Team A needs to know about Team B\'s infrastructure.',
    example: '"my-nexus-endpoint"',
  },
  {
    tag: 'tagPurple' as const,
    tagLabel: 'Service',
    title: 'Nexus Service',
    desc: 'A named collection of operations defined by an interface (Go) or decorated class (TypeScript, .NET). Think of it like a gRPC service definition or a typed REST API contract — it describes what\'s callable without exposing how.',
    example: '[NexusService] IHelloService',
  },
  {
    tag: 'tagGreen' as const,
    tagLabel: 'Operation',
    title: 'Nexus Operation',
    desc: 'A single callable unit within a service. Operations are either synchronous (run inline, return in < 10s) or asynchronous (start a Temporal Workflow, can run for days). The caller\'s code looks the same either way — just await the result.',
    example: 'Echo() | SayHello()',
  },
  {
    tag: 'tagBlue' as const,
    tagLabel: 'Registry',
    title: 'Nexus Registry',
    desc: 'The Temporal Cloud control plane (or OSS server config) that stores endpoint definitions, access policies, and routing rules. Admins configure which caller namespaces can reach which handler namespaces through which endpoints.',
    example: 'Temporal Cloud UI / tcld',
  },
];

export default function ComponentsSection({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '28%' }} />
      </div>

      <h1>The Four Building Blocks</h1>
      <p className={styles.lead}>
        Nexus is composed of four concepts. Once you understand these, the rest falls into place.
      </p>

      <div className={styles.cardGrid}>
        {components.map((c) => (
          <div key={c.title} className={styles.card}>
            <div className={`${styles.tag} ${styles[c.tag]}`}>{c.tagLabel}</div>
            <h3 style={{ fontSize: 15, marginBottom: 8 }}>{c.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: '0 0 10px', lineHeight: 1.6 }}>
              {c.desc}
            </p>
            <code
              style={{
                fontSize: 11,
                color: 'var(--nd-muted)',
                background: 'var(--nd-surface2)',
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              {c.example}
            </code>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionHeading}>Nexus vs. the Alternatives</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Durable</th>
            <th>Typed contract</th>
            <th>Cross-namespace</th>
            <th>Auto-retry</th>
            <th>Cancel propagation</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              name: 'Shared namespace',
              durable: true,
              typed: false,
              cross: false,
              retry: true,
              cancel: false,
            },
            {
              name: 'HTTP between teams',
              durable: false,
              typed: false,
              cross: true,
              retry: false,
              cancel: false,
            },
            {
              name: 'Child workflows',
              durable: true,
              typed: true,
              cross: false,
              retry: true,
              cancel: true,
            },
            {
              name: 'Temporal Nexus',
              durable: true,
              typed: true,
              cross: true,
              retry: true,
              cancel: true,
              highlight: true,
            },
          ].map((row) => (
            <tr key={row.name} style={row.highlight ? { background: 'var(--nd-primary-bg)' } : {}}>
              <td style={{ fontWeight: row.highlight ? 700 : 400 }}>{row.name}</td>
              <td className={row.durable ? styles.check : styles.cross}>
                {row.durable ? '✓' : '—'}
              </td>
              <td className={row.typed ? styles.check : styles.cross}>
                {row.typed ? '✓' : '—'}
              </td>
              <td className={row.cross ? styles.check : styles.cross}>
                {row.cross ? '✓' : '—'}
              </td>
              <td className={row.retry ? styles.check : styles.cross}>
                {row.retry ? '✓' : '—'}
              </td>
              <td className={row.cancel ? styles.check : styles.cross}>
                {row.cancel ? '✓' : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: How It Works →
        </button>
      </div>
    </div>
  );
}
