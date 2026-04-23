import CodeBlock from '@theme/CodeBlock';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './standalone-activity-demo.module.css';

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

function generateSdkCode(language, config) {
  const { activityId, taskQueue, greeting, name, timeout, timeoutType, simulateFailures, maxRetries } = config;
  const expectedResult = `${greeting}, ${name}!`;

  if (language === 'go') {
    const timeoutField =
      timeoutType === 'start_to_close'
        ? `StartToCloseTimeout:    ${timeout} * time.Second,`
        : `ScheduleToCloseTimeout: ${timeout} * time.Second,`;
    const retryPolicy =
      simulateFailures && maxRetries > 0
        ? `\n\tRetryPolicy: &temporal.RetryPolicy{\n\t\tMaximumAttempts: ${maxRetries + 1},\n\t},`
        : '';
    return `activityOptions := client.StartActivityOptions{
\tID:        "${activityId}",
\tTaskQueue: "${taskQueue}",
\t${timeoutField}${retryPolicy}
}

handle, err := c.ExecuteActivity(ctx, activityOptions,
\thelloworld.Activity, "${greeting}", "${name}")
if err != nil {
\tlog.Fatalln("Unable to execute activity", err)
}

var result string
err = handle.Get(ctx, &result)
// result: "${expectedResult}"`;
  }

  if (language === 'python') {
    const timeoutField =
      timeoutType === 'start_to_close'
        ? `start_to_close_timeout=timedelta(seconds=${timeout}),`
        : `schedule_to_close_timeout=timedelta(seconds=${timeout}),`;
    const retryPolicy =
      simulateFailures && maxRetries > 0
        ? `\n    retry_policy=RetryPolicy(\n        maximum_attempts=${maxRetries + 1},\n    ),`
        : '';
    return `result = await client.execute_activity(
    compose_greeting,
    args=[ComposeGreetingInput("${greeting}", "${name}")],
    id="${activityId}",
    task_queue="${taskQueue}",
    ${timeoutField}${retryPolicy}
)
# result: "${expectedResult}"`;
  }

  if (language === 'dotnet') {
    const timeoutField =
      timeoutType === 'start_to_close'
        ? `StartToCloseTimeout = TimeSpan.FromSeconds(${timeout}),`
        : `ScheduleToCloseTimeout = TimeSpan.FromSeconds(${timeout}),`;
    const retryPolicy =
      simulateFailures && maxRetries > 0
        ? `\n        MaximumAttempts = ${maxRetries + 1},`
        : '';
    return `var result = await client.ExecuteActivityAsync(
    () => MyActivities.ComposeGreetingAsync(
        new ComposeGreetingInput("${greeting}", "${name}")),
    new("${activityId}", "${taskQueue}")
    {
        ${timeoutField}${retryPolicy}
    });
// result: "${expectedResult}"`;
  }

  return '';
}

function generateCliCode(config) {
  const { activityId, taskQueue, name, timeout, timeoutType } = config;
  const timeoutFlag =
    timeoutType === 'start_to_close'
      ? `--start-to-close-timeout ${timeout}s`
      : `--schedule-to-close-timeout ${timeout}s`;
  return `temporal activity execute \\
  --type Activity \\
  --activity-id ${activityId} \\
  --task-queue ${taskQueue} \\
  ${timeoutFlag} \\
  --input '"${name}"'`;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LANGUAGES = [
  { id: 'go', label: 'Go' },
  { id: 'python', label: 'Python' },
  { id: 'dotnet', label: '.NET' },
];

const FLOW_NODES = [
  { label: 'Client', sub: 'Your App' },
  { label: 'Server', sub: 'Temporal' },
  { label: 'Task Queue', sub: '' },
  { label: 'Worker', sub: '' },
  { label: 'Activity', sub: 'Function' },
];

const IDLE_NODES = ['pending', 'pending', 'pending', 'pending', 'pending'];

const DEFAULT_CONFIG = {
  activityId: 'my-activity-id',
  taskQueue: 'my-task-queue',
  greeting: 'Hello',
  name: 'World',
  timeout: 10,
  timeoutType: 'start_to_close',
  simulateFailures: false,
  failCount: 1,
  maxRetries: 2,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function StandaloneActivityDemo() {
  const [language, setLanguage] = useState('go');
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG });

  const [sim, setSim] = useState({
    running: false,
    nodeStates: [...IDLE_NODES],
    log: [],
    status: 'idle', // 'idle' | 'running' | 'completed' | 'failed'
    result: null,
  });

  const [history, setHistory] = useState([]);

  const runIdRef = useRef(0);
  const logScrollRef = useRef(null);

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [sim.log]);

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleExecute = useCallback(() => {
    const runId = ++runIdRef.current;
    const isCancelled = () => runIdRef.current !== runId;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startTime = Date.now();
    const logEntries = [];

    const elapsed = () => ((Date.now() - startTime) / 1000).toFixed(2);

    /** Push a log entry and update React state atomically with nodeStates */
    const update = (nodeStates, msg, type = 'info') => {
      if (isCancelled()) return;
      if (msg) logEntries.push({ time: elapsed(), msg, type });
      setSim((prev) => ({
        ...prev,
        running: true,
        nodeStates,
        log: [...logEntries],
        status: 'running',
      }));
    };

    /** Push a log-only entry (no node state change) */
    const addLog = (msg, type = 'info') => {
      if (isCancelled()) return;
      logEntries.push({ time: elapsed(), msg, type });
      setSim((prev) => ({ ...prev, log: [...logEntries] }));
    };

    // Reset UI immediately
    setSim({
      running: true,
      nodeStates: [...IDLE_NODES],
      log: [],
      status: 'running',
      result: null,
    });

    (async () => {
      let attempt = 1;

      // ── Step 0: connect ──────────────────────────────────────────────────
      update(
        ['active', 'pending', 'pending', 'pending', 'pending'],
        'Connecting to Temporal Server at localhost:7233...'
      );
      await sleep(400);
      if (isCancelled()) return;

      // ── Step 1: schedule ─────────────────────────────────────────────────
      update(
        ['completed', 'active', 'pending', 'pending', 'pending'],
        `Scheduling activity "${config.activityId}" on task queue "${config.taskQueue}"...`
      );
      await sleep(600);
      if (isCancelled()) return;

      update(['completed', 'completed', 'pending', 'pending', 'pending'], null);

      // ── Retry loop ───────────────────────────────────────────────────────
      while (true) {
        if (isCancelled()) return;

        // Step 2: worker poll
        update(
          ['completed', 'completed', 'active', 'pending', 'pending'],
          attempt === 1
            ? 'Worker polling task queue for activity tasks...'
            : `[Retry ${attempt - 1}] Worker polling task queue...`
        );
        await sleep(550);
        if (isCancelled()) return;

        // Step 3: execute
        update(
          ['completed', 'completed', 'completed', 'active', 'pending'],
          `[Attempt ${attempt}] Executing Activity("${config.greeting}", "${config.name}")...`
        );
        await sleep(750);
        if (isCancelled()) return;

        const shouldFail = config.simulateFailures && attempt <= config.failCount;
        const maxAttempts = config.maxRetries + 1;

        if (shouldFail) {
          const retriesLeft = maxAttempts - attempt;
          update(
            ['completed', 'completed', 'pending', 'failed', 'pending'],
            `[Attempt ${attempt}/${maxAttempts}] Activity failed: ApplicationError`,
            'error'
          );
          await sleep(350);
          if (isCancelled()) return;

          if (retriesLeft <= 0) {
            logEntries.push({
              time: elapsed(),
              msg: `Activity exhausted all ${maxAttempts} attempt(s). No more retries.`,
              type: 'error',
            });
            setSim((prev) => ({
              ...prev,
              running: false,
              status: 'failed',
              log: [...logEntries],
            }));
            setHistory((prev) =>
              [
                {
                  activityId: config.activityId,
                  status: 'Failed',
                  duration: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
                  attempts: attempt,
                  result: '—',
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...prev,
              ].slice(0, 10)
            );
            return;
          }

          addLog(
            `Scheduling retry in 1s… (${retriesLeft} retry attempt${retriesLeft > 1 ? 's' : ''} remaining)`,
            'warn'
          );
          await sleep(1000);
          if (isCancelled()) return;

          attempt++;
          continue; // jump back to worker poll
        }

        // ── Success ───────────────────────────────────────────────────────
        update(
          ['completed', 'completed', 'completed', 'completed', 'active'],
          `[Attempt ${attempt}] Activity function returned successfully!`,
          'success'
        );
        await sleep(400);
        if (isCancelled()) return;

        const result = `${config.greeting}, ${config.name}!`;
        logEntries.push({ time: elapsed(), msg: `Result: "${result}"`, type: 'success' });

        setSim({
          running: false,
          nodeStates: ['completed', 'completed', 'completed', 'completed', 'completed'],
          log: [...logEntries],
          status: 'completed',
          result,
        });

        setHistory((prev) =>
          [
            {
              activityId: config.activityId,
              status: 'Completed',
              duration: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
              attempts: attempt,
              result,
              timestamp: new Date().toLocaleTimeString(),
            },
            ...prev,
          ].slice(0, 10)
        );
        return;
      }
    })();
  }, [config]);

  const codeLanguage = language === 'dotnet' ? 'csharp' : language;

  const failureNote =
    config.simulateFailures
      ? config.failCount > config.maxRetries
        ? `⚠ All ${config.maxRetries + 1} attempt(s) will fail — failCount exceeds maxRetries.`
        : `ℹ Activity will fail ${config.failCount} time(s), then succeed on attempt ${config.failCount + 1}.`
      : null;

  return (
    <div className={styles.demo}>
      {/* Language tabs */}
      <div className={styles.languageTabs}>
        {LANGUAGES.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.langTab} ${language === id ? styles.langTabActive : ''}`}
            onClick={() => setLanguage(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.columns}>
        {/* ── Left column: configure + code ── */}
        <div className={styles.leftCol}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Configure Activity</h3>
            <div className={styles.configGrid}>
              <ConfigField
                label="Activity ID"
                value={config.activityId}
                onChange={(v) => updateConfig('activityId', v)}
              />
              <ConfigField
                label="Task Queue"
                value={config.taskQueue}
                onChange={(v) => updateConfig('taskQueue', v)}
              />
              <ConfigField
                label="Greeting"
                value={config.greeting}
                onChange={(v) => updateConfig('greeting', v)}
              />
              <ConfigField
                label="Name"
                value={config.name}
                onChange={(v) => updateConfig('name', v)}
              />
              <ConfigField
                label="Timeout (seconds)"
                value={config.timeout}
                type="number"
                min={1}
                max={300}
                onChange={(v) => updateConfig('timeout', Number(v))}
              />
              <div className={styles.configRow}>
                <label className={styles.configLabel}>Timeout Type</label>
                <select
                  className={styles.configSelect}
                  value={config.timeoutType}
                  onChange={(e) => updateConfig('timeoutType', e.target.value)}
                >
                  <option value="start_to_close">Start-to-Close</option>
                  <option value="schedule_to_close">Schedule-to-Close</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Failure Simulation</h3>
            <div className={styles.configGrid}>
              <div className={styles.configRow}>
                <label className={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={config.simulateFailures}
                    onChange={(e) => updateConfig('simulateFailures', e.target.checked)}
                    className={styles.checkbox}
                  />{' '}
                  Simulate failures
                </label>
              </div>
              {config.simulateFailures && (
                <>
                  <ConfigField
                    label="Fail on first N attempts"
                    value={config.failCount}
                    type="number"
                    min={1}
                    max={10}
                    onChange={(v) => updateConfig('failCount', Number(v))}
                  />
                  <ConfigField
                    label="Max Retries"
                    value={config.maxRetries}
                    type="number"
                    min={0}
                    max={10}
                    onChange={(v) => updateConfig('maxRetries', Number(v))}
                  />
                </>
              )}
            </div>
            {failureNote && <p className={styles.simNote}>{failureNote}</p>}
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>SDK Code</h3>
            <CodeBlock language={codeLanguage}>{generateSdkCode(language, config)}</CodeBlock>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>CLI Command</h3>
            <CodeBlock language="bash">{generateCliCode(config)}</CodeBlock>
          </section>
        </div>

        {/* ── Right column: simulation ── */}
        <div className={styles.rightCol}>
          <section className={styles.section}>
            <button
              className={`${styles.executeBtn} ${sim.running ? styles.executeBtnDisabled : ''}`}
              onClick={handleExecute}
              disabled={sim.running}
            >
              {sim.running ? (
                <>
                  <span className={styles.spinner} />
                  Running…
                </>
              ) : (
                '▶  Execute Activity'
              )}
            </button>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Execution Flow</h3>
            <div className={styles.flowDiagram}>
              {FLOW_NODES.map((node, i) => (
                <React.Fragment key={i}>
                  <div
                    className={[
                      styles.flowNode,
                      styles['flowNode_' + sim.nodeStates[i]],
                    ].join(' ')}
                  >
                    <div className={styles.flowNodeLabel}>{node.label}</div>
                    {node.sub && (
                      <div className={styles.flowNodeSub}>{node.sub}</div>
                    )}
                  </div>
                  {i < FLOW_NODES.length - 1 && (
                    <div
                      className={[
                        styles.flowArrow,
                        sim.nodeStates[i] === 'completed' ? styles.flowArrowLit : '',
                      ].join(' ')}
                    >
                      ›
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Activity Log</h3>
            <div className={styles.log} ref={logScrollRef}>
              {sim.log.length === 0 ? (
                <div className={styles.logPlaceholder}>
                  Click "Execute Activity" to run the simulation
                </div>
              ) : (
                sim.log.map((entry, i) => (
                  <div
                    key={i}
                    className={[
                      styles.logLine,
                      styles['logLine_' + entry.type],
                    ].join(' ')}
                  >
                    <span className={styles.logTime}>[{entry.time}s]</span>
                    <span className={styles.logMsg}>{entry.msg}</span>
                  </div>
                ))
              )}
            </div>

            {sim.status === 'completed' && sim.result && (
              <div className={styles.resultSuccess}>
                ✅ Result: <strong>"{sim.result}"</strong>
              </div>
            )}
            {sim.status === 'failed' && (
              <div className={styles.resultFailed}>
                ❌ Activity failed after exhausting all retry attempts
              </div>
            )}
          </section>

          {history.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Activity History{' '}
                <span className={styles.historyCount}>({history.length})</span>
              </h3>
              <div className={styles.historyWrapper}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr>
                      <th>Activity ID</th>
                      <th>Status</th>
                      <th>Duration</th>
                      <th>Attempts</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i}>
                        <td className={styles.historyId}>{h.activityId}</td>
                        <td>
                          <span
                            className={
                              h.status === 'Completed'
                                ? styles.badgeSuccess
                                : styles.badgeFailed
                            }
                          >
                            {h.status}
                          </span>
                        </td>
                        <td>{h.duration}</td>
                        <td>{h.attempts}</td>
                        <td className={styles.historyResult}>{h.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ConfigField({ label, value, onChange, type = 'text', min, max }) {
  return (
    <div className={styles.configRow}>
      <label className={styles.configLabel}>{label}</label>
      <input
        className={styles.configInput}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
