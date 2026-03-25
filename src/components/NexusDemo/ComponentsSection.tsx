import React, { useState } from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };

export default function ComponentsSection({ onNext }: Props) {
  const [opTab, setOpTab] = useState<'sync' | 'async'>('sync');

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '28%' }} />
      </div>

      <h1>The Four Building Blocks</h1>
      <p className={styles.lead}>
        Nexus has four key concepts. These four concepts are the foundation of everything in Nexus.
      </p>

      <div className={styles.componentLayout}>

        {/* 1 — Endpoint */}
        <div className={styles.card} style={{ borderLeft: '4px solid var(--ifm-color-primary)' }}>
          <div className={styles.componentRow}>
            <div
              className={styles.componentNum}
              style={{ background: 'var(--nd-primary-bg)', color: 'var(--ifm-color-primary)' }}
            >
              1
            </div>
            <div className={styles.componentContent}>
              <h2 className={styles.componentTitle}>Nexus Endpoint</h2>
              <p className={styles.componentRole}>The address you publish and route through</p>
              <p>
                Think of an Endpoint like a <strong>URL for your team's services</strong>. It's a
                named entry point registered in the Nexus Registry that routes requests to a
                specific namespace and task queue.
              </p>
              <p>
                It's <em>not</em> a general HTTP proxy — it's specifically designed for Nexus, with
                built-in auth, retries, and observability.
              </p>
              <div className={styles.componentCode}>
                Endpoint:{' '}
                <span style={{ color: 'var(--ifm-color-primary)' }}>fraud-detection-prod</span>
                <br />
                Routes to:{' '}
                <span style={{ color: 'var(--nd-purple)' }}>fraud-ns / fraud-task-queue</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 — Service */}
        <div className={styles.card} style={{ borderLeft: '4px solid var(--nd-purple)' }}>
          <div className={styles.componentRow}>
            <div
              className={styles.componentNum}
              style={{ background: 'var(--nd-purple-bg)', color: 'var(--nd-purple)' }}
            >
              2
            </div>
            <div className={styles.componentContent}>
              <h2 className={styles.componentTitle}>Nexus Service</h2>
              <p className={styles.componentRole}>The contract you publish for others to consume</p>
              <p>
                A Service is a <strong>named collection of Nexus Operations</strong> — like an API
                interface. Multiple services can run in the same worker. Callers import the service
                definition to get type safety.
              </p>
              <p>
                Example:{' '}
                <code style={{ color: 'var(--nd-purple)' }}>fraud.v1</code> service exposes{' '}
                <code>checkTransaction</code>, <code>flagUser</code>, and <code>getScore</code>{' '}
                operations.
              </p>
            </div>
          </div>
        </div>

        {/* 3 — Operation */}
        <div className={styles.card} style={{ borderLeft: '4px solid var(--nd-green)' }}>
          <div className={styles.componentRow}>
            <div
              className={styles.componentNum}
              style={{ background: 'var(--nd-green-bg)', color: 'var(--nd-green)' }}
            >
              3
            </div>
            <div className={styles.componentContent}>
              <h2 className={styles.componentTitle}>Nexus Operation</h2>
              <p className={styles.componentRole}>The individual action — sync or async</p>

              <div className={styles.opTabs}>
                <button
                  className={`${styles.opTab} ${opTab === 'sync' ? styles.opTabActive : ''}`}
                  onClick={() => setOpTab('sync')}
                >
                  Synchronous
                </button>
                <button
                  className={`${styles.opTab} ${opTab === 'async' ? styles.opTabActive : ''}`}
                  onClick={() => setOpTab('async')}
                >
                  Asynchronous
                </button>
              </div>

              {opTab === 'sync' ? (
                <>
                  <p>
                    <strong>Synchronous</strong> operations complete in under 10 seconds. The
                    result comes back in the same HTTP round-trip. Great for quick lookups, scoring,
                    or validations.
                  </p>
                  <div className={styles.componentCode}>
                    Caller → [Nexus RPC] → Handler → result → Caller
                    <br />
                    Duration: milliseconds to &lt;10 seconds
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>Asynchronous</strong> operations start a Workflow and return an
                    operation token. The caller workflow is suspended. When the handler workflow
                    completes, a callback delivers the result.
                  </p>
                  <div className={styles.componentCode}>
                    Caller → [start] → Handler starts Workflow → [token]
                    <br />
                    ...time passes (up to 60 days)...
                    <br />
                    Handler Workflow completes → [callback] → Caller resumes
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4 — Registry */}
        <div className={styles.card} style={{ borderLeft: '4px solid var(--nd-amber)' }}>
          <div className={styles.componentRow}>
            <div
              className={styles.componentNum}
              style={{ background: 'var(--nd-amber-bg)', color: 'var(--nd-amber)' }}
            >
              4
            </div>
            <div className={styles.componentContent}>
              <h2 className={styles.componentTitle}>Nexus Registry</h2>
              <p className={styles.componentRole}>The directory of all Endpoints in your account</p>
              <p>
                Scoped to your Temporal Cloud account or self-hosted cluster. Teams register
                Endpoints here. The Registry is the source of truth for endpoint discovery, access
                control, and audit logging.
              </p>
              <div className={styles.componentPills}>
                <div className={styles.componentPill}>fraud-detection-prod</div>
                <div className={styles.componentPill}>kyc-verification-v2</div>
                <div className={styles.componentPill}>notifications-global</div>
                <div className={`${styles.componentPill} ${styles.componentPillNew}`}>
                  + register new
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <h2 className={styles.sectionHeading} style={{ marginTop: 32 }}>Nexus vs. the Alternatives</h2>
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
            { name: 'Shared namespace', durable: true,  typed: false, cross: false, retry: true,  cancel: false },
            { name: 'HTTP between teams', durable: false, typed: false, cross: true,  retry: false, cancel: false },
            { name: 'Child workflows',    durable: true,  typed: true,  cross: false, retry: true,  cancel: true  },
            { name: 'Temporal Nexus',     durable: true,  typed: true,  cross: true,  retry: true,  cancel: true, highlight: true },
          ].map((row) => (
            <tr key={row.name} style={row.highlight ? { background: 'var(--nd-primary-bg)' } : {}}>
              <td style={{ fontWeight: row.highlight ? 700 : 400 }}>{row.name}</td>
              <td className={row.durable ? styles.check : styles.cross}>{row.durable ? '✓' : '—'}</td>
              <td className={row.typed  ? styles.check : styles.cross}>{row.typed  ? '✓' : '—'}</td>
              <td className={row.cross  ? styles.check : styles.cross}>{row.cross  ? '✓' : '—'}</td>
              <td className={row.retry  ? styles.check : styles.cross}>{row.retry  ? '✓' : '—'}</td>
              <td className={row.cancel ? styles.check : styles.cross}>{row.cancel ? '✓' : '—'}</td>
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
