import React, { useState } from 'react';
import styles from './HADemo.module.css';

type Props = { onNext: () => void };
type FailoverMode = 'hybrid' | 'graceful' | 'forced';

const MODES: { id: FailoverMode; label: string }[] = [
  { id: 'hybrid', label: 'Hybrid (Default)' },
  { id: 'graceful', label: 'Graceful' },
  { id: 'forced', label: 'Forced' },
];

type StepDef = { text: string; note: string };

const modeSteps: Record<FailoverMode, StepDef[]> = {
  hybrid: [
    {
      text: 'Temporal detects Primary unhealthy',
      note: 'Health checks on error rates, latency, and infrastructure trigger the decision.',
    },
    {
      text: 'Graceful handover attempted',
      note: 'Primary stops accepting new writes. System waits up to 10 seconds for in-flight replication tasks to drain to the Replica.',
    },
    {
      text: 'Forced failover if 10 s window expires',
      note: 'If replication has not drained within 10 seconds, the system switches to a forced failover to prioritize availability.',
    },
    {
      text: 'Replica promoted to active',
      note: 'The Replica Namespace begins accepting Workflow writes. Existing and new Workers can start polling.',
    },
    {
      text: 'DNS CNAME updated (~30 s convergence)',
      note: '15-second TTL; most clients converge to the new active region within ~30 seconds.',
    },
    {
      text: 'Conflict resolution on unreplicated events',
      note: 'Highest-version history branch wins. Signals are re-injected. Some Activity progress may roll back and be retried.',
    },
  ],
  graceful: [
    {
      text: 'Primary stops accepting new writes',
      note: 'Clients will receive retryable "service unavailable" errors during the handover window.',
    },
    {
      text: 'Wait for all replication tasks to drain',
      note: 'The system waits until the Replica is fully caught up with the Primary. Default timeout is 10 seconds.',
    },
    {
      text: 'Replica promoted to active',
      note: 'Because all events are replicated before the switch, there is zero data loss (RPO = 0 for the events in-flight).',
    },
    {
      text: 'Brief unavailability window (~10 s)',
      note: 'Workflows pause during the handover. Temporal returns retryable errors. Workers and SDK retries handle this automatically.',
    },
    {
      text: 'Full consistency guaranteed',
      note: 'No conflict resolution needed — every event was replicated before the switch.',
    },
  ],
  forced: [
    {
      text: 'Replica promoted immediately',
      note: 'No waiting. The Replica becomes active right away, regardless of replication lag.',
    },
    {
      text: 'Zero unavailability window',
      note: 'The replica accepts traffic instantly. Use this when availability matters more than strict consistency.',
    },
    {
      text: 'Unreplicated events undergo conflict resolution',
      note: 'Events that did not reach the Replica before promotion are handled via conflict resolution. The highest-version branch is authoritative.',
    },
    {
      text: 'Potential for some Workflow progress rollback',
      note: 'Activity Executions that completed in the Primary but were not yet replicated will re-run. Idempotent Activities handle this safely.',
    },
    {
      text: 'Signals are re-injected',
      note: 'Temporal re-injects external events like Signals into the new history before discarding conflicting replication tasks.',
    },
  ],
};

const modeDescriptions: Record<FailoverMode, { title: string; summary: string; tradeoff: string; consistency: string; availability: string; bestFor: string }> = {
  hybrid: {
    title: 'Hybrid Failover',
    summary:
      'The default mode. Attempts a graceful handover first (up to 10 seconds), then automatically falls back to a forced failover if the window expires.',
    tradeoff: 'Balances consistency and availability',
    consistency: 'High — zero loss if drain succeeds, bounded loss otherwise',
    availability: 'High — forced path kicks in if graceful stalls',
    bestFor: 'Most production workloads',
  },
  graceful: {
    title: 'Graceful Failover (Handover)',
    summary:
      'Prioritizes consistency. The Primary stops writes and waits for the Replica to fully catch up before switching. Workflows see a brief unavailability window while the drain completes.',
    tradeoff: 'Prioritizes consistency over availability',
    consistency: 'Maximum — all in-flight events replicated before switch',
    availability: 'Brief unavailability (~10 s) while draining',
    bestFor: 'Financial or compliance workloads where data integrity is critical',
  },
  forced: {
    title: 'Forced Failover',
    summary:
      'Prioritizes availability. The Replica is promoted immediately with no drain window. Unreplicated events undergo conflict resolution after the switch.',
    tradeoff: 'Prioritizes availability over consistency',
    consistency: 'Lower — some Activity progress may roll back',
    availability: 'Maximum — zero service interruption',
    bestFor: 'Workloads where uptime is paramount and activities are idempotent',
  },
};

export default function FailoverSection({ onNext }: Props) {
  const [mode, setMode] = useState<FailoverMode>('hybrid');
  const desc = modeDescriptions[mode];
  const steps = modeSteps[mode];

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '57%' }} />
      </div>

      <h1>Failover Types</h1>
      <p className={styles.lead}>
        When Temporal Cloud detects that a Namespace is unhealthy, it triggers a failover. There
        are three modes — each making a different trade-off between consistency and availability.
      </p>

      <div className={styles.runTabs}>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`${styles.runTab} ${mode === m.id ? styles.runTabActive : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.failoverCard}>
        <div
          className={`${styles.tag} ${
            mode === 'hybrid'
              ? styles.tagBlue
              : mode === 'graceful'
                ? styles.tagGreen
                : styles.tagAmber
          }`}
        >
          {desc.tradeoff}
        </div>
        <h2 style={{ fontSize: 18, margin: '8px 0 8px' }}>{desc.title}</h2>
        <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.7 }}>
          {desc.summary}
        </p>

        <div className={styles.failoverGrid}>
          <div className={styles.failoverMetric}>
            <div className={styles.failoverMetricLabel}>Consistency</div>
            <div className={styles.failoverMetricValue} style={{ fontSize: 14, fontWeight: 400, color: 'var(--ifm-font-color-base)' }}>
              {desc.consistency}
            </div>
          </div>
          <div className={styles.failoverMetric}>
            <div className={styles.failoverMetricLabel}>Availability</div>
            <div className={styles.failoverMetricValue} style={{ fontSize: 14, fontWeight: 400, color: 'var(--ifm-font-color-base)' }}>
              {desc.availability}
            </div>
          </div>
          <div className={styles.failoverMetric}>
            <div className={styles.failoverMetricLabel}>Best for</div>
            <div className={styles.failoverMetricValue} style={{ fontSize: 14, fontWeight: 400, color: 'var(--ifm-font-color-base)' }}>
              {desc.bestFor}
            </div>
          </div>
        </div>

        <div className={styles.failoverSteps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.failoverStep}>
              <div className={styles.failoverStepNum}>{i + 1}</div>
              <div>
                <div className={styles.failoverStepText}>{s.text}</div>
                <div className={styles.failoverStepNote}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className={styles.sectionHeading}>How to Trigger a Failover</h2>
      <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', marginBottom: 16, lineHeight: 1.6 }}>
        Temporal-initiated automatic failover is enabled by default. You can also trigger one
        manually via the UI, CLI, or API. Manual failovers follow standard failover procedures for
        failback.
      </p>
      <div className={styles.triggerGrid}>
        <div className={styles.triggerCard}>
          <div className={styles.triggerCardTitle}>Web UI</div>
          <p style={{ fontSize: 13, color: 'var(--hd-muted)', margin: 0, lineHeight: 1.6 }}>
            Navigate to your Namespace detail page and click <strong>"Trigger a failover"</strong>.
            Select the target region and confirm.
          </p>
        </div>
        <div className={styles.triggerCard}>
          <div className={styles.triggerCardTitle}>tcld CLI</div>
          <div className={styles.cmdBlock} style={{ marginTop: 8 }}>
            <span className={styles.cmdPrompt}>$&nbsp;</span>
            <span className={styles.cmdText}>
              {'tcld namespace failover \\\n  --namespace <id>.<acct> \\\n  --region <target-region>'}
            </span>
          </div>
        </div>
        <div className={styles.triggerCard}>
          <div className={styles.triggerCardTitle}>Cloud Ops API</div>
          <p style={{ fontSize: 13, color: 'var(--hd-muted)', margin: 0, lineHeight: 1.6 }}>
            POST to the <code>FailoverNamespaceRegion</code> endpoint via the Temporal Cloud Ops
            API. The Terraform provider does not support failover triggering.
          </p>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Automatic vs. Manual Failover</h2>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagGreen}`}>Temporal-initiated (default)</div>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.6 }}>
            Temporal Cloud continuously monitors Namespace health and automatically triggers a
            failover when thresholds are breached. <strong>Temporal strongly recommends keeping
            automatic failover enabled.</strong> Disabling it means Temporal cannot guarantee RPO/RTO
            objectives — your team becomes responsible for detecting and responding to failures.
          </p>
        </div>
        <div className={styles.card}>
          <div className={`${styles.tag} ${styles.tagAmber}`}>Manual failover</div>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: '0 0 10px', lineHeight: 1.6 }}>
            You can disable Temporal-initiated failovers for full manual control. Trigger via UI,
            CLI, or API on your own schedule.
          </p>
          <div className={styles.cmdBlock}>
            <span className={styles.cmdPrompt}>$&nbsp;</span>
            <span className={styles.cmdText}>
              {'tcld namespace update-high-availability \\\n  --namespace <id>.<acct> \\\n  --disable-auto-failover=true'}
            </span>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Post-failover Considerations</h2>
      <div className={styles.card}>
        <ul style={{ fontSize: 14, lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
          <li>
            <strong>Namespace endpoint unchanged</strong> — your gRPC address and credentials stay
            the same after any failover.
          </li>
          <li>
            <strong>Multi-region CNAME changes</strong> — the underlying CNAME target updates from
            (e.g.) <code>aws-us-west-1</code> to <code>aws-us-east-1</code>. DNS converges in ~30 s.
            Same-region failovers are not affected.
          </li>
          <li>
            <strong>Activities re-run</strong> — outstanding Activity Executions will time out and
            be retried on the new primary. Make Activities idempotent.
          </li>
          <li>
            <strong>Failback</strong> — Temporal automatically fails back after incident resolution
            for auto-initiated failovers. Manual failovers require manually triggering the return
            failover.
          </li>
          <li>
            <strong>Replication lag before forced failover</strong> — monitor{' '}
            <code>temporal_cloud_v1_replication_lag_bucket</code> before manually triggering a
            forced failover to understand how much progress may roll back.
          </li>
        </ul>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Enable It →
        </button>
      </div>
    </div>
  );
}
