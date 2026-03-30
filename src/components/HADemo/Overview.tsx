import React from 'react';
import styles from './HADemo.module.css';

type Props = { onNext: () => void };

export default function Overview({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '14%' }} />
      </div>

      <h1>What is Temporal High Availability?</h1>
      <p className={styles.lead}>
        Temporal Cloud High Availability gives every Namespace a synchronized replica — a standby
        that can take over in under 20 minutes, with less than 1 minute of data loss, regardless of
        whether an availability zone, an entire region, or a whole cloud provider fails.
      </p>

      <div
        className={styles.card}
        style={{
          borderColor: 'var(--ifm-color-primary)',
          background: 'var(--hd-primary-bg)',
          marginBottom: 32,
        }}
      >
        <h3 style={{ color: 'var(--ifm-font-color-base)', marginBottom: 8, fontSize: 15 }}>
          The core idea in one sentence
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.7 }}>
          Your Namespace asynchronously replicates all Workflow history to a replica in a separate
          isolation domain — so if the primary fails, Temporal promotes the replica and your
          Workflows keep running with minimal data loss.
        </p>
      </div>

      <h2 className={styles.sectionHeading}>The Problem HA Solves</h2>
      <div className={styles.cardGrid}>
        <div className={styles.card} style={{ borderColor: 'var(--hd-red)' }}>
          <div className={`${styles.tag} ${styles.tagRed}`}>Without HA</div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Single isolation domain</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.6 }}>
            Standard Namespaces replicate across three availability zones in one region, handling
            AZ-level failures automatically. But a cell-level bug, a regional outage, or a
            cloud-provider incident can take your Namespace offline with no automatic recovery path.
            Backups run every 4 hours — meaning hours of potential data loss.
          </p>
        </div>
        <div className={styles.card} style={{ borderColor: 'var(--hd-green)' }}>
          <div className={`${styles.tag} ${styles.tagGreen}`}>With HA</div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Active primary + synchronized replica</h3>
          <p style={{ fontSize: 13, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.6 }}>
            Every Workflow Execution is asynchronously replicated to a replica in a separate
            isolation domain. Temporal Cloud continuously monitors health and automatically fails
            over to the replica — restoring service within the RTO window with sub-1-minute data
            loss.
          </p>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>What It Looks Like</h2>
      <div className={styles.haDiagram}>
        <div className={`${styles.haNode} ${styles.haNodePrimary}`}>
          <div className={`${styles.haNodeLabel} ${styles.haNodeLabelPrimary}`}>
            Primary · Active
          </div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconBlue}`}>W</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Workflow Executions</div>
              <div style={{ fontSize: 11, color: 'var(--hd-muted)' }}>Writes accepted here</div>
            </div>
          </div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconBlue}`}>3</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>3-zone replication</div>
              <div style={{ fontSize: 11, color: 'var(--hd-muted)' }}>Within the isolation domain</div>
            </div>
          </div>
        </div>

        <div className={styles.haArrow}>
          <div style={{ fontSize: 22, color: 'var(--hd-muted)' }}>⇄</div>
          <div className={styles.haArrowLabel}>Async</div>
          <div className={styles.haArrowLabel}>replication</div>
          <div className={styles.haArrowLabel} style={{ marginTop: 4, color: 'var(--hd-amber)', fontSize: 10, fontWeight: 700 }}>
            p95 &lt; 1 min lag
          </div>
        </div>

        <div className={`${styles.haNode} ${styles.haNodeReplica}`}>
          <div className={`${styles.haNodeLabel} ${styles.haNodeLabelReplica}`}>
            Replica · Standby
          </div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconGreen}`}>W</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Workflow history mirror</div>
              <div style={{ fontSize: 11, color: 'var(--hd-muted)' }}>Ready to promote</div>
            </div>
          </div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconGreen}`}>3</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Separate isolation domain</div>
              <div style={{ fontSize: 11, color: 'var(--hd-muted)' }}>Different region or cell</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Standard vs. High Availability</h2>
      <table className={styles.slaTable}>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Standard Namespace</th>
            <th>HA Namespace</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Uptime SLA</td>
            <td>99.9%</td>
            <td className={styles.slaGreen}>99.99%</td>
          </tr>
          <tr>
            <td>AZ-level failure</td>
            <td className={styles.slaGreen}>✓ Automatic (zero RPO)</td>
            <td className={styles.slaGreen}>✓ Automatic (zero RPO)</td>
          </tr>
          <tr>
            <td>Cell / regional failure RPO</td>
            <td className={styles.slaAmber}>Up to 4 hours (backup)</td>
            <td className={styles.slaGreen}>&lt; 1 minute</td>
          </tr>
          <tr>
            <td>Cell / regional failure RTO</td>
            <td className={styles.slaAmber}>Manual intervention</td>
            <td className={styles.slaGreen}>20 minutes</td>
          </tr>
          <tr>
            <td>Automatic failover</td>
            <td>✗</td>
            <td className={styles.slaGreen}>✓ Temporal-initiated (default)</td>
          </tr>
          <tr>
            <td>Replication lag (p95)</td>
            <td>N/A</td>
            <td className={styles.slaGreen}>&lt; 1 minute</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Replication Types →
        </button>
      </div>
    </div>
  );
}
