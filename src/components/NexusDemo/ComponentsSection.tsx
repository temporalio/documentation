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
        Nexus has four core concepts.
      </p>

      <div className={styles.compEList}>

        {/* 1: Service */}
        <div className={styles.compECard}>
          <div className={styles.compENumCol}>
            <div className={styles.compENum}>1</div>
          </div>
          <div className={styles.compEContent}>
            <h2 className={styles.componentTitle}>Nexus Service</h2>
            <p className={styles.compERole}>The contract you publish for others to consume</p>
            <p>
              A Service is a <strong>named collection of Nexus Operations</strong>, similar to an API
              interface. Multiple services can run in the same Worker. In supported SDKs, callers
              can import the service definition for type-safe calls.
            </p>
            <p>
              Example:{' '}
              <code style={{ color: 'var(--ifm-color-primary)' }}>fraud.v1</code> service exposes{' '}
              <code>checkTransaction</code>, <code>flagUser</code>, and <code>getScore</code>{' '}
              operations.
            </p>
          </div>
        </div>

        {/* 2: Operation */}
        <div className={styles.compECard}>
          <div className={styles.compENumCol}>
            <div className={styles.compENum}>2</div>
          </div>
          <div className={styles.compEContent}>
            <h2 className={styles.componentTitle}>Nexus Operation</h2>
            <p className={styles.compERole}>The individual action: sync or async</p>

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
                  <strong>Synchronous</strong> operations complete in under 10 seconds, measured
                  from when the caller's Nexus Machinery dispatches the request. Good for quick
                  lookups, scoring, or validations.
                </p>
                <div className={styles.compECode}>
                  Caller → [Nexus RPC] → Handler → result → Caller
                  <br />
                  Duration: milliseconds to &lt;10 seconds
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Asynchronous</strong> operations start a Workflow and return an
                  operation token. The caller Workflow is blocked at the await point. When the
                  handler Workflow completes, a callback delivers the result.
                </p>
                <div className={styles.compECode}>
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

        {/* 3: Endpoint */}
        <div className={styles.compECard}>
          <div className={styles.compENumCol}>
            <div className={styles.compENum}>3</div>
          </div>
          <div className={styles.compEContent}>
            <h2 className={styles.componentTitle}>Nexus Endpoint</h2>
            <p className={styles.compERole}>The named entry point callers use to reach a service</p>
            <p>
              An Endpoint is a <strong>named connection point</strong> registered in the Nexus
              Registry. Callers reference it by name. That's all they need. Temporal handles
              routing to the right team's Namespace and Task Queue behind the scenes.
            </p>
            <p>
              Unlike a general HTTP proxy, a Nexus Endpoint is managed entirely within the
              Temporal platform, with auth, retries, and observability built in. Routing is
              handled by the platform so callers never need connection details for the target Namespace.
            </p>
            <div className={styles.compECode}>
              Caller uses name:{' '}
              <span style={{ color: 'var(--ifm-color-primary)' }}>"fraud-detection-prod"</span>
              <br />
              Temporal routes to:{' '}
              <span style={{ color: 'var(--nd-muted)' }}>fraud-ns / fraud-task-queue</span>
              <br />
              <span style={{ color: 'var(--nd-muted)' }}>
                {'// callers never see the target, only the name'}
              </span>
            </div>
          </div>
        </div>

        {/* 4: Registry */}
        <div className={styles.compECard}>
          <div className={styles.compENumCol}>
            <div className={styles.compENum}>4</div>
          </div>
          <div className={styles.compEContent}>
            <h2 className={styles.componentTitle}>Nexus Registry</h2>
            <p className={styles.compERole}>The directory of all Endpoints in your account</p>
            <p>
              The Nexus Registry is scoped to your Temporal Cloud account or self-hosted cluster. Teams register
              Endpoints here. On Temporal Cloud, the Registry also provides access control and
              audit logging for all registered Endpoints.
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

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: How It Works →
        </button>
      </div>
    </div>
  );
}
