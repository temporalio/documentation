import React from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };

export default function Overview({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '14%' }} />
      </div>

      <h1>What is Temporal Nexus?</h1>
      <p className={styles.lead}>
        Nexus lets different teams share Temporal workflows across team, namespace, region,
        and cloud boundaries — without exposing internal implementation details.
      </p>

      <div
        className={styles.card}
        style={{
          borderColor: 'var(--ifm-color-primary)',
          background: 'var(--nd-primary-bg)',
          marginBottom: 32,
        }}
      >
        <h3 style={{ color: 'var(--ifm-color-primary)', marginBottom: 8, fontSize: 15 }}>
          The core idea in one sentence
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.7 }}>
          Team A can call Team B's workflows like a typed API — with full durability, retries,
          and fault-tolerance built in — without needing access to Team B's namespace or knowing
          how their code works.
        </p>
      </div>

      <h2 className={styles.sectionHeading}>The Problem Nexus Solves</h2>
      <div className={styles.cardGrid}>
        <div className={styles.card} style={{ borderColor: 'var(--nd-red)' }}>
          <div className={`${styles.tag} ${styles.tagRed}`}>Without Nexus</div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Siloed Teams</h3>
          <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: 0, lineHeight: 1.6 }}>
            Each team works in their own Temporal namespace. There's no clean way for the Payments
            team to trigger an action in the Fraud Detection team's workflow without tight coupling
            or shared credentials. Teams either share namespaces (messy) or build fragile HTTP
            bridges (unreliable).
          </p>
        </div>
        <div className={styles.card} style={{ borderColor: 'var(--nd-green)' }}>
          <div className={`${styles.tag} ${styles.tagGreen}`}>With Nexus</div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Modular and Safe</h3>
          <p style={{ fontSize: 13, color: 'var(--nd-muted)', margin: 0, lineHeight: 1.6 }}>
            The Fraud Detection team publishes a Nexus Service with a clear contract. The Payments
            team calls it from their workflow like any other operation. Nexus handles routing,
            retries, security, and observability — across any boundary.
          </p>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>What It Looks Like</h2>
      <div className={styles.nsContainer}>
        <div className={`${styles.nsBox} ${styles.nsBoxCaller}`}>
          <div className={`${styles.nsLabel} ${styles.nsLabelCaller}`}>Team A — Payments</div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconBlue}`}>W</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>PaymentWorkflow</div>
              <div style={{ fontSize: 11, color: 'var(--nd-muted)' }}>Caller Namespace</div>
            </div>
          </div>
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--nd-primary-bg)',
              borderRadius: 6,
              fontSize: 12,
              color: 'var(--nd-muted)',
            }}
          >
            Calls{' '}
            <code style={{ color: 'var(--ifm-color-primary)', fontSize: 11 }}>
              fraud.v1/checkTransaction
            </code>
            <br />
            Waits for result (sync or async)
          </div>
        </div>

        <div className={styles.nsArrow}>
          <div style={{ fontSize: 28, color: 'var(--nd-muted)' }}>→</div>
          <div className={styles.endpointBridge}>
            <div className={styles.endpointLabel}>Nexus Endpoint</div>
            <div className={styles.endpointSub}>Routes securely</div>
            <div className={styles.endpointSub}>Retries · Auth</div>
          </div>
          <div style={{ fontSize: 28, color: 'var(--nd-muted)' }}>→</div>
        </div>

        <div className={`${styles.nsBox} ${styles.nsBoxHandler}`}>
          <div className={`${styles.nsLabel} ${styles.nsLabelHandler}`}>
            Team B — Fraud Detection
          </div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconPurple}`}>S</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                Nexus Service:{' '}
                <code style={{ color: 'var(--nd-purple)', fontSize: 11 }}>fraud.v1</code>
              </div>
              <div style={{ fontSize: 11, color: 'var(--nd-muted)' }}>Handler Namespace</div>
            </div>
          </div>
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--nd-purple-bg)',
              borderRadius: 6,
              fontSize: 12,
              color: 'var(--nd-muted)',
            }}
          >
            Exposes{' '}
            <code style={{ color: 'var(--nd-purple)', fontSize: 11 }}>checkTransaction</code>
            <br />
            Internal workflows stay private
          </div>
        </div>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Components →
        </button>
      </div>
    </div>
  );
}
