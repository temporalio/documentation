import React from 'react';
import styles from './WorkflowMessagingDemo.module.css';

type Props = { onNext: () => void };

export default function Overview({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '20%' }} />
      </div>

      <h1>What is Workflow Message Passing?</h1>
      <p className={styles.lead}>
        You've started a long-running Workflow. It's running. Now what? How do you check on
        its progress? How do you tell it something changed? How do you get a value out of it?
      </p>

      <div
        className={styles.card}
        style={{
          borderColor: 'var(--ifm-color-primary)',
          background: 'var(--nd-primary-bg)',
          marginBottom: 32,
        }}
      >
        <h3 style={{ color: 'var(--ifm-font-color-base)', marginBottom: 8, fontSize: 15 }}>
          The core idea in one sentence
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.7 }}>
          You define named handlers on your Workflow for three types of messages:{' '}
          <strong>Signals</strong> (push a notification in),{' '}
          <strong>Queries</strong> (read state out), and{' '}
          <strong>Updates</strong> (change state and get a result back).
          Your client calls them by name on a Workflow handle, and the running Workflow reacts.
        </p>
      </div>

      <h2 className={styles.sectionHeading}>A concrete way to see it</h2>
      <div className={styles.card} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', margin: '0 0 16px', lineHeight: 1.7 }}>
          Say you have a <strong>chef cooking a multi-course meal</strong>. The meal is in progress
          and the chef keeps working, but the rest of the restaurant still needs to reach them:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div className={`${styles.tag} ${styles.tagGreen}`} style={{ flexShrink: 0, marginBottom: 0 }}>Signal</div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ifm-font-color-base)', lineHeight: 1.6 }}>
              A waiter tells the chef "Table six would like more bread." The chef notes it and keeps cooking.
              No reply needed. The waiter moves on.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div className={`${styles.tag} ${styles.tagPurple}`} style={{ flexShrink: 0, marginBottom: 0 }}>Query</div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ifm-font-color-base)', lineHeight: 1.6 }}>
              A manager asks "How many courses have gone out?" The chef checks the board
              and answers without stopping work.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div className={`${styles.tag} ${styles.tagBlue}`} style={{ flexShrink: 0, marginBottom: 0 }}>Update</div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ifm-font-color-base)', lineHeight: 1.6 }}>
              A customer asks "Can you add a dessert?" The chef checks if there's still time.
              If yes: "Added." If no: "The order is already closed." The customer waits for that answer
              before leaving the table.
            </p>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>The three types, side by side</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Like saying...</th>
            <th>Gets a response?</th>
            <th>Can change state?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: 'var(--nd-green)', fontWeight: 600 }}>Signal</td>
            <td>"Hey, FYI"</td>
            <td style={{ color: 'var(--nd-muted)' }}>No</td>
            <td style={{ color: 'var(--nd-green)' }}>Yes</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--nd-purple)', fontWeight: 600 }}>Query</td>
            <td>"What's the current status?"</td>
            <td style={{ color: 'var(--nd-green)' }}>Yes (read-only)</td>
            <td style={{ color: 'var(--nd-muted)' }}>No</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--ifm-color-primary)', fontWeight: 600 }}>Update</td>
            <td>"Please change X and confirm it"</td>
            <td style={{ color: 'var(--nd-green)' }}>Yes (result or rejection)</td>
            <td style={{ color: 'var(--nd-green)' }}>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.sectionHeading}>What it looks like in code</h2>
      <div className={styles.nsContainer}>
        <div className={`${styles.nsBox} ${styles.nsBoxCaller}`}>
          <div className={`${styles.nsLabel} ${styles.nsLabelCaller}`}>Your client code</div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconBlue}`}>C</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Order Service</div>
              <div style={{ fontSize: 11, color: 'var(--nd-muted)' }}>sends messages to the Workflow</div>
            </div>
          </div>
          <div style={{ padding: '8px 12px', background: 'var(--nd-surface2)', fontSize: 12, color: 'var(--nd-muted)', lineHeight: 1.8 }}>
            <code style={{ color: 'var(--nd-green)', fontSize: 11 }}>handle.signal(approve)</code>
            <br />
            <code style={{ color: 'var(--nd-purple)', fontSize: 11 }}>handle.query(get_status)</code>
            <br />
            <code style={{ color: 'var(--ifm-color-primary)', fontSize: 11 }}>handle.execute_update(set_priority, 3)</code>
          </div>
        </div>

        <div className={styles.nsArrow}>
          <div style={{ fontSize: 28, color: 'var(--nd-muted)' }}>→</div>
          <div className={styles.endpointBridge}>
            <div className={styles.endpointLabel}>Temporal Server</div>
            <div className={styles.endpointSub}>Routes · Persists · Delivers</div>
          </div>
          <div style={{ fontSize: 28, color: 'var(--nd-muted)' }}>→</div>
        </div>

        <div className={`${styles.nsBox} ${styles.nsBoxHandler}`}>
          <div className={`${styles.nsLabel} ${styles.nsLabelHandler}`}>Your Workflow</div>
          <div className={styles.wfBlock}>
            <div className={`${styles.wfIcon} ${styles.wfIconPurple}`}>W</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>OrderWorkflow</div>
              <div style={{ fontSize: 11, color: 'var(--nd-muted)' }}>running, waiting for messages</div>
            </div>
          </div>
          <div style={{ padding: '8px 12px', background: 'var(--nd-surface2)', fontSize: 12, color: 'var(--nd-muted)', lineHeight: 1.8 }}>
            <code style={{ color: 'var(--nd-green)', fontSize: 11 }}>@workflow.signal approve()</code>
            <br />
            <code style={{ color: 'var(--nd-purple)', fontSize: 11 }}>@workflow.query get_status()</code>
            <br />
            <code style={{ color: 'var(--ifm-color-primary)', fontSize: 11 }}>@workflow.update set_priority()</code>
          </div>
        </div>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Message Types →
        </button>
      </div>
    </div>
  );
}
