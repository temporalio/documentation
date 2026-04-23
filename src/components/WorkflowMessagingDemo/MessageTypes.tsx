import React, { useState } from 'react';
import styles from './WorkflowMessagingDemo.module.css';

type Props = { onNext: () => void };
type TypeId = 'signal' | 'query' | 'update';

const TYPES: { id: TypeId; label: string }[] = [
  { id: 'signal', label: 'Signal' },
  { id: 'query', label: 'Query' },
  { id: 'update', label: 'Update' },
];

const TYPE_CONTENT = {
  signal: {
    tagLabel: 'Async · No response',
    headline: 'One-way notification, no response needed.',
    description:
      `A Signal is a one-way message to a running Workflow. You send it and your code keeps going. No waiting, no response. Temporal writes the signal to the Workflow's event history, so delivery is guaranteed even if the Worker is down when you send it. The handler runs as soon as the Worker is back.`,
    properties: [
      { label: 'Direction', value: 'Caller to Workflow (one-way)' },
      { label: 'Response', value: 'None' },
      { label: 'Buffered?', value: 'Yes, delivered even if Worker is offline' },
      { label: 'Can change state?', value: 'Yes' },
      { label: 'Can be async?', value: 'Yes' },
    ],
    useCases: [
      'Approve or reject a pending order',
      'Tell a Workflow that a payment cleared',
      'Cancel or pause a long-running job',
      'Unblock a Workflow waiting on a human decision',
    ],
    code: `@workflow.defn
class OrderWorkflow:

    @workflow.signal
    async def approve(self) -> None:
        self._approved = True
        self._status = "approved"

    @workflow.signal
    async def cancel(self, reason: str) -> None:
        self._status = f"cancelled: {reason}"`,
    clientCode: `# Send it. No waiting for a response.
await handle.signal(OrderWorkflow.approve)
await handle.signal(OrderWorkflow.cancel, "out of stock")`,
    accentColor: 'var(--nd-green)',
    bgColor: 'var(--nd-green-bg)',
  },
  query: {
    tagLabel: 'Sync · Read-only',
    headline: 'Ask a question. Get an answer.',
    description:
      `A Query reads the current in-memory state of a running Workflow. Your code sends the query and waits synchronously for the value. Query handlers must be plain synchronous functions: no async, no side effects, no state changes. If no Worker is running when you query, it fails. Queries are not buffered.`,
    properties: [
      { label: 'Direction', value: 'Caller to Workflow, back to Caller' },
      { label: 'Response', value: 'The return value of the handler' },
      { label: 'Buffered?', value: 'No, requires a live Worker' },
      { label: 'Can change state?', value: 'No, read-only' },
      { label: 'Can be async?', value: 'No, must be a regular def' },
    ],
    useCases: [
      'Check the current status of an order',
      'Read how far along a long job is',
      'Pull counters or config for a status dashboard',
      'Inspect state before deciding what to do next',
    ],
    code: `@workflow.defn
class OrderWorkflow:

    @workflow.query
    def get_status(self) -> str:
        return self._status

    @workflow.query
    def get_details(self) -> dict:
        return {
            "status": self._status,
            "approved": self._approved,
        }`,
    clientCode: `# Waits synchronously for the response
status = await handle.query(OrderWorkflow.get_status)
details = await handle.query(OrderWorkflow.get_details)`,
    accentColor: 'var(--nd-purple)',
    bgColor: 'var(--nd-purple-bg)',
  },
  update: {
    tagLabel: 'Sync · Validated · Returns result',
    headline: 'Change state and get confirmation.',
    description:
      `An Update is the most capable type: it can change Workflow state (like a Signal) and return a result to the caller (like a Query). It also has an optional validator that runs before any changes happen. If the validator rejects the input, the Workflow state is untouched and the caller gets a clean error. The caller waits for the outcome.`,
    properties: [
      { label: 'Direction', value: 'Caller to Workflow, back to Caller' },
      { label: 'Response', value: 'Return value of the handler, or a rejection error' },
      { label: 'Buffered?', value: 'Yes, durable like a Signal' },
      { label: 'Can change state?', value: 'Yes' },
      { label: 'Has validator?', value: 'Optional, runs before the handler' },
    ],
    useCases: [
      'Change a setting and confirm the new value',
      'Reserve a slot and get back a confirmation ID',
      'Apply a correction to a running job and verify it took effect',
      'Extend a deadline only if the Workflow is still in a valid state',
    ],
    code: `@workflow.defn
class OrderWorkflow:

    @workflow.update
    async def set_priority(self, priority: int) -> str:
        self._priority = priority
        return f"Priority set to {priority}"

    @set_priority.validator
    def validate_priority(self, priority: int) -> None:
        if not (1 <= priority <= 5):
            raise ValueError(f"Priority must be 1-5")`,
    clientCode: `# Waits for a result or a rejection
try:
    result = await handle.execute_update(
        OrderWorkflow.set_priority, 3
    )
    print(result)  # "Priority set to 3"
except Exception as e:
    print(e)      # "Priority must be 1-5"`,
    accentColor: 'var(--ifm-color-primary)',
    bgColor: 'var(--nd-primary-bg)',
  },
};

export default function MessageTypes({ onNext }: Props) {
  const [active, setActive] = useState<TypeId>('signal');
  const content = TYPE_CONTENT[active];

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '40%' }} />
      </div>

      <h1>The Three Message Types</h1>
      <p className={styles.lead}>
        Each type handles a different situation. Pick based on whether you need a response,
        whether you need to change state, and whether the caller can wait.
      </p>

      <div className={styles.runTabs}>
        {TYPES.map((t) => (
          <button
            key={t.id}
            className={`${styles.runTab} ${active === t.id ? styles.runTabActive : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.card} style={{ borderColor: content.accentColor, background: content.bgColor, marginBottom: 24 }}>
        <div className={styles.tag} style={{ background: content.bgColor, color: content.accentColor, border: `1px solid ${content.accentColor}` }}>
          {content.tagLabel}
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 10, color: 'var(--ifm-font-color-base)' }}>{content.headline}</h2>
        <p style={{ fontSize: 14, color: 'var(--ifm-font-color-base)', margin: 0, lineHeight: 1.7 }}>{content.description}</p>
      </div>

      <div className={styles.cardGrid} style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 24 }}>
        <div className={styles.card}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ifm-font-color-base)' }}>Properties</h3>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <tbody>
              {content.properties.map((p) => (
                <tr key={p.label}>
                  <td style={{ padding: '6px 0', color: 'var(--nd-muted)', paddingRight: 16, whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {p.label}
                  </td>
                  <td style={{ padding: '6px 0', color: 'var(--ifm-font-color-base)', verticalAlign: 'top' }}>
                    {p.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.card}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ifm-font-color-base)' }}>Good for</h3>
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: 'var(--ifm-font-color-base)', lineHeight: 1.8 }}>
            {content.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Quick reference</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Use</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Push a notification, no response needed</td>
            <td style={{ color: 'var(--nd-green)', fontWeight: 600 }}>Signal</td>
            <td>Async, durable delivery, no waiting</td>
          </tr>
          <tr>
            <td>Read current state without touching it</td>
            <td style={{ color: 'var(--nd-purple)', fontWeight: 600 }}>Query</td>
            <td>Synchronous read, no history entry written</td>
          </tr>
          <tr>
            <td>Change state and confirm it worked</td>
            <td style={{ color: 'var(--ifm-color-primary)', fontWeight: 600 }}>Update</td>
            <td>Validates input, returns a result, durable</td>
          </tr>
          <tr>
            <td>One Workflow triggers work in another</td>
            <td style={{ color: 'var(--nd-green)', fontWeight: 600 }}>Signal</td>
            <td>Standard pattern for Workflow-to-Workflow communication</td>
          </tr>
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
