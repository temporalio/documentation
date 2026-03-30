import React from 'react';
import styles from './HADemo.module.css';

type Props = { onNext: () => void };

export default function ReplicationTypes({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '28%' }} />
      </div>

      <h1>Three Ways to Deploy High Availability</h1>
      <p className={styles.lead}>
        Temporal Cloud offers three replication models. Each protects against a different failure
        scope. Choose based on what level of isolation your workload requires.
      </p>

      {/* 1: Same-region */}
      <div className={styles.rtCard}>
        <div className={styles.rtNumCol}>
          <div className={styles.rtNum}>1</div>
        </div>
        <div className={styles.rtContent}>
          <h2 className={styles.rtTitle}>
            Same-region Replication
            <span className={`${styles.statusBadge} ${styles.statusBadgePreview}`}>Public Preview</span>
          </h2>
          <p className={styles.rtRole}>Isolation domains within a single region</p>
          <p>
            The Primary and Replica Namespaces live in <strong>separate isolation domains (cells)
            within the same region</strong>. Each cell is an independent deployment of the Temporal
            service — different databases, different compute, different failure blast radius.
          </p>
          <p>
            This protects against cell-level software bugs or sub-component database failures that
            survive all three availability zones in a single cell. Because the replica stays in the
            same region, Workers don't need multi-region connectivity and latency impact is minimal.
          </p>
          <div className={styles.rtCode}>
            Primary cell: aws-us-east-1 (cell A)<br />
            Replica cell: aws-us-east-1 (cell B)<br />
            <span style={{ color: 'var(--hd-muted)' }}>// same region, separate isolation domains</span>
          </div>
        </div>
      </div>

      {/* 2: Multi-region */}
      <div className={styles.rtCard}>
        <div className={styles.rtNumCol}>
          <div className={styles.rtNum}>2</div>
        </div>
        <div className={styles.rtContent}>
          <h2 className={styles.rtTitle}>
            Multi-region Replication
            <span className={`${styles.statusBadge} ${styles.statusBadgeGA}`}>General Availability</span>
          </h2>
          <p className={styles.rtRole}>Isolation domains in separate regions of the same cloud</p>
          <p>
            The Primary and Replica Namespaces run in <strong>different geographic regions</strong> of
            the same cloud provider (e.g. AWS us-east-1 and AWS us-west-2). This protects against
            everything same-region covers, plus full region-wide incidents.
          </p>
          <p>
            During failover, the Namespace CNAME record updates to the new active region. Workers
            deployed in the replica region resume processing with near-zero latency. Workers only
            in the primary region will experience cross-region latency until they are relocated or
            replicas are deployed.
          </p>
          <div className={styles.rtCode}>
            Primary: aws-us-east-1 → ha-namespace.acct.tmprl.cloud<br />
            After failover: aws-us-west-2 → ha-namespace.acct.tmprl.cloud<br />
            <span style={{ color: 'var(--hd-muted)' }}>// endpoint unchanged; CNAME target updates (15 s TTL)</span>
          </div>
        </div>
      </div>

      {/* 3: Multi-cloud */}
      <div className={styles.rtCard}>
        <div className={styles.rtNumCol}>
          <div className={styles.rtNum}>3</div>
        </div>
        <div className={styles.rtContent}>
          <h2 className={styles.rtTitle}>
            Multi-cloud Replication
            <span className={`${styles.statusBadge} ${styles.statusBadgePreview}`}>Public Preview</span>
          </h2>
          <p className={styles.rtRole}>Isolation domains across different cloud providers</p>
          <p>
            The Primary and Replica run on <strong>entirely different cloud providers</strong> (e.g.
            AWS and GCP). Traffic automatically shifts to the replica if the entire primary cloud
            provider experiences a widespread outage. This is the broadest failure protection
            available.
          </p>
          <p>
            Multi-cloud replication carries the highest operational complexity, including managing
            worker fleets on two cloud providers and routing inter-cloud network traffic. Use this
            when contractual obligations require cloud-provider-level redundancy.
          </p>
          <div className={styles.rtCode}>
            Primary: AWS us-east-1<br />
            Replica: GCP us-central1<br />
            <span style={{ color: 'var(--hd-muted)' }}>// independent cloud providers, maximum blast-radius isolation</span>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Failure Coverage by Replication Type</h2>
      <div className={styles.coverageGrid}>
        <div className={styles.coverageHeader}>Failure type</div>
        <div className={styles.coverageHeader}>Same-region</div>
        <div className={styles.coverageHeader}>Multi-region</div>
        <div className={styles.coverageHeader}>Multi-cloud</div>

        <div className={`${styles.coverageCell} ${styles.coverageRow}`}>Single AZ failure</div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span> (also standard)</div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>

        <div className={`${styles.coverageCell} ${styles.coverageRow}`}>Cell / sub-component failure</div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>

        <div className={`${styles.coverageCell} ${styles.coverageRow}`}>Regional outage</div>
        <div className={styles.coverageCell}><span className={styles.coverageDash}>—</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>

        <div className={`${styles.coverageCell} ${styles.coverageRow}`}>Cloud-provider outage</div>
        <div className={styles.coverageCell}><span className={styles.coverageDash}>—</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageDash}>—</span></div>
        <div className={styles.coverageCell}><span className={styles.coverageCheck}>✓</span></div>
      </div>

      <div
        className={styles.card}
        style={{ borderColor: 'var(--hd-amber)', background: 'var(--hd-amber-bg)' }}
      >
        <div className={`${styles.tag} ${styles.tagAmber}`}>Worker deployment tip</div>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          For multi-region and multi-cloud replication, Temporal <strong>strongly recommends</strong> deploying
          Workers in both the primary and replica regions. Workers in the primary region will
          experience cross-region latency after failover until they are updated to point at the new
          active region. Workers already running in the replica region pick up tasks immediately.
        </p>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: How Replication Works →
        </button>
      </div>
    </div>
  );
}
