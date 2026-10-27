import Chart from "chart.js/auto";
import React, { useState, useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./priority-fairness-simulator.module.css";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_META = {
  1: { color: "#ef4444", textColor: "#fff", label: "Critical" },
  2: { color: "#f97316", textColor: "#fff", label: "High" },
  3: { color: "#3b82f6", textColor: "#fff", label: "Normal" },
  4: { color: "#22c55e", textColor: "#000", label: "Low" },
  5: { color: "#94a3b8", textColor: "#fff", label: "Batch" },
};

const FAIRNESS_PALETTE = [
  "#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#06b6d4",
];

const PRESETS = [
  {
    label: "Choose a scenario…",
    queue: [],
    fairnessKeys: [],
  },
  {
    label: "Priority only — Payments vs Inventory",
    queue: [
      { priorityKey: 5, fairnessKey: "" },
      { priorityKey: 5, fairnessKey: "" },
      { priorityKey: 5, fairnessKey: "" },
      { priorityKey: 3, fairnessKey: "" },
      { priorityKey: 3, fairnessKey: "" },
      { priorityKey: 1, fairnessKey: "" },
      { priorityKey: 5, fairnessKey: "" },
      { priorityKey: 1, fairnessKey: "" },
      { priorityKey: 2, fairnessKey: "" },
      { priorityKey: 3, fairnessKey: "" },
    ],
    fairnessKeys: [],
  },
  {
    label: "Fairness only — Multi-tenant (equal weights)",
    queue: [
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-big" },
      { priorityKey: 3, fairnessKey: "tenant-mid" },
      { priorityKey: 3, fairnessKey: "tenant-mid" },
      { priorityKey: 3, fairnessKey: "tenant-small" },
      { priorityKey: 3, fairnessKey: "tenant-small" },
    ],
    fairnessKeys: [
      { key: "tenant-big", weight: 1 },
      { key: "tenant-mid", weight: 1 },
      { key: "tenant-small", weight: 1 },
    ],
  },
  {
    label: "Fairness only — Tiered weights (Premium 5×, Basic 3×, Free 1×)",
    queue: [
      { priorityKey: 3, fairnessKey: "premium" },
      { priorityKey: 3, fairnessKey: "premium" },
      { priorityKey: 3, fairnessKey: "premium" },
      { priorityKey: 3, fairnessKey: "premium" },
      { priorityKey: 3, fairnessKey: "basic" },
      { priorityKey: 3, fairnessKey: "basic" },
      { priorityKey: 3, fairnessKey: "basic" },
      { priorityKey: 3, fairnessKey: "free" },
      { priorityKey: 3, fairnessKey: "free" },
      { priorityKey: 3, fairnessKey: "free" },
    ],
    fairnessKeys: [
      { key: "premium", weight: 5 },
      { key: "basic", weight: 3 },
      { key: "free", weight: 1 },
    ],
  },
  {
    label: "Priority + Fairness — E-commerce platform",
    queue: [
      { priorityKey: 1, fairnessKey: "vendor-a" },
      { priorityKey: 1, fairnessKey: "vendor-a" },
      { priorityKey: 1, fairnessKey: "vendor-b" },
      { priorityKey: 2, fairnessKey: "vendor-a" },
      { priorityKey: 2, fairnessKey: "vendor-b" },
      { priorityKey: 2, fairnessKey: "vendor-c" },
      { priorityKey: 3, fairnessKey: "vendor-a" },
      { priorityKey: 3, fairnessKey: "vendor-a" },
      { priorityKey: 3, fairnessKey: "vendor-b" },
      { priorityKey: 3, fairnessKey: "vendor-c" },
      { priorityKey: 5, fairnessKey: "vendor-a" },
      { priorityKey: 5, fairnessKey: "vendor-c" },
    ],
    fairnessKeys: [
      { key: "vendor-a", weight: 3 },
      { key: "vendor-b", weight: 2 },
      { key: "vendor-c", weight: 1 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _seed = 0;
function makeTask(priorityKey, fairnessKey) {
  return { id: ++_seed, priorityKey: +priorityKey, fairnessKey: (fairnessKey || "").trim() };
}

/**
 * Weighted Fair Queue dispatch simulation.
 * Returns tasks in dispatch order respecting priority (lower = first),
 * then within each priority tier uses WFQ (lowest dispatched/weight wins).
 */
function simulateDispatches(initialQueue, fairnessKeys) {
  const order = [];
  let queue = [...initialQueue];
  const counters = {};

  const weightOf = (key) => {
    const fk = fairnessKeys.find((f) => f.key === key);
    return fk ? fk.weight : 1;
  };

  while (queue.length > 0) {
    const minPriority = Math.min(...queue.map((t) => t.priorityKey));
    const tier = queue.filter((t) => t.priorityKey === minPriority);
    const rest = queue.filter((t) => t.priorityKey !== minPriority);

    // Group tier by fairness key
    const groups = {};
    tier.forEach((t) => {
      const k = t.fairnessKey || "__none__";
      if (!groups[k]) groups[k] = [];
      groups[k].push(t);
    });

    const keys = Object.keys(groups);
    let chosenKey = keys[0];

    // If multiple fairness keys exist within this priority tier, use WFQ
    const hasRealFairness = keys.some((k) => k !== "__none__");
    if (keys.length > 1 && hasRealFairness) {
      let lowestRatio = Infinity;
      for (const k of keys) {
        const ratio = (counters[k] || 0) / weightOf(k === "__none__" ? "" : k);
        if (ratio < lowestRatio) {
          lowestRatio = ratio;
          chosenKey = k;
        }
      }
    }

    const task = groups[chosenKey][0];
    counters[chosenKey] = (counters[chosenKey] || 0) + 1;
    order.push(task);
    queue = [...tier.filter((t) => t !== task), ...rest];
  }

  return order;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriorityFairnessSimulator() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const chartRef = useRef(null);

  // Config state
  const [queue, setQueue] = useState([]);
  const [fairnessKeys, setFairnessKeys] = useState([]);
  const [newTaskPriority, setNewTaskPriority] = useState(3);
  const [newTaskFairnessKey, setNewTaskFairnessKey] = useState("");
  const [newFkName, setNewFkName] = useState("");
  const [newFkWeight, setNewFkWeight] = useState(1);

  // Simulation state
  const [dispatchOrder, setDispatchOrder] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [simStarted, setSimStarted] = useState(false);

  const dispatched = dispatchOrder.slice(0, stepIndex);
  const remainingIds = new Set(dispatchOrder.slice(stepIndex).map((t) => t.id));

  // ── Derived fairness key color map
  const fkColorMap = {};
  fairnessKeys.forEach((fk, i) => {
    fkColorMap[fk.key] = FAIRNESS_PALETTE[i % FAIRNESS_PALETTE.length];
  });

  // ── Preset loader
  function loadPreset(idx) {
    if (!+idx) return;
    const p = PRESETS[+idx];
    const newQueue = p.queue.map((t) => makeTask(t.priorityKey, t.fairnessKey));
    setQueue(newQueue);
    setFairnessKeys(p.fairnessKeys.map((fk) => ({ ...fk })));
    resetSim(newQueue, p.fairnessKeys);
  }

  // ── Task management
  function addTask() {
    const task = makeTask(newTaskPriority, newTaskFairnessKey);
    const newQ = [...queue, task];
    setQueue(newQ);
    resetSim(newQ, fairnessKeys);
  }

  function removeTask(id) {
    const newQ = queue.filter((t) => t.id !== id);
    setQueue(newQ);
    resetSim(newQ, fairnessKeys);
  }

  // ── Fairness key management
  function addFairnessKey() {
    if (!newFkName.trim() || fairnessKeys.find((f) => f.key === newFkName.trim())) return;
    const updated = [...fairnessKeys, { key: newFkName.trim(), weight: +newFkWeight || 1 }];
    setFairnessKeys(updated);
    setNewFkName("");
    setNewFkWeight(1);
    resetSim(queue, updated);
  }

  function removeFairnessKey(key) {
    const updated = fairnessKeys.filter((f) => f.key !== key);
    setFairnessKeys(updated);
    resetSim(queue, updated);
  }

  function updateWeight(key, weight) {
    const updated = fairnessKeys.map((f) => (f.key === key ? { ...f, weight: +weight || 1 } : f));
    setFairnessKeys(updated);
    resetSim(queue, updated);
  }

  // ── Simulation controls
  function resetSim(q = queue, fk = fairnessKeys) {
    setDispatchOrder([]);
    setStepIndex(0);
    setSimStarted(false);
  }

  function runSim() {
    if (!queue.length) return;
    const order = simulateDispatches(queue, fairnessKeys);
    setDispatchOrder(order);
    setStepIndex(0);
    setSimStarted(true);
  }

  function stepForward() {
    setStepIndex((i) => Math.min(i + 1, dispatchOrder.length));
  }

  function dispatchAll() {
    setStepIndex(dispatchOrder.length);
  }

  function restart() {
    setStepIndex(0);
  }

  // ── Chart
  useEffect(() => {
    if (!chartRef.current) return;
    const hasFairness = fairnessKeys.length > 0;
    if (!hasFairness || dispatched.length === 0) {
      if (chartRef.current._chart) {
        chartRef.current._chart.destroy();
        chartRef.current._chart = null;
      }
      return;
    }

    const totalWeight = fairnessKeys.reduce((s, f) => s + f.weight, 0);
    const labels = fairnessKeys.map((f) => f.key);
    const actualCounts = {};
    dispatched.forEach((t) => {
      if (t.fairnessKey) actualCounts[t.fairnessKey] = (actualCounts[t.fairnessKey] || 0) + 1;
    });

    const actualPct = labels.map((k) => (((actualCounts[k] || 0) / dispatched.length) * 100).toFixed(1));
    const expectedPct = labels.map((f) => {
      const fk = fairnessKeys.find((x) => x.key === f);
      return totalWeight > 0 ? ((fk.weight / totalWeight) * 100).toFixed(1) : 0;
    });

    const gridColor = isDark ? "#333" : "#e5e7eb";
    const labelColor = isDark ? "#d1d5db" : "#374151";

    if (chartRef.current._chart) {
      const chart = chartRef.current._chart;
      chart.data.labels = labels;
      chart.data.datasets[0].data = actualPct;
      chart.data.datasets[1].data = expectedPct;
      chart.options.scales.y.grid.color = gridColor;
      chart.options.scales.x.grid.color = gridColor;
      chart.options.scales.y.ticks.color = labelColor;
      chart.options.scales.x.ticks.color = labelColor;
      chart.options.plugins.legend.labels.color = labelColor;
      chart.update();
    } else {
      chartRef.current._chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Actual dispatch %",
              backgroundColor: "#3b82f6",
              borderRadius: 4,
              data: actualPct,
            },
            {
              label: "Target weight %",
              backgroundColor: isDark ? "#374151" : "#d1d5db",
              borderRadius: 4,
              data: expectedPct,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 250 },
          plugins: {
            legend: {
              position: "top",
              labels: { color: labelColor },
            },
          },
          scales: {
            y: {
              max: 100,
              title: { display: true, text: "% of dispatches", color: labelColor },
              grid: { color: gridColor },
              ticks: { color: labelColor },
            },
            x: {
              grid: { color: gridColor },
              ticks: { color: labelColor },
            },
          },
        },
      });
    }
  }, [dispatched, fairnessKeys, isDark]);

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current._chart) {
        chartRef.current._chart.destroy();
      }
    };
  }, []);

  const hasFairnessKeys = fairnessKeys.length > 0;
  const canStep = simStarted && stepIndex < dispatchOrder.length;
  const canDispatchAll = simStarted && stepIndex < dispatchOrder.length;
  const canRestart = simStarted && stepIndex > 0;
  const showChart = hasFairnessKeys && dispatched.length > 0;

  return (
    <div className={styles.root}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <select
            className={styles.select}
            defaultValue="0"
            onChange={(e) => loadPreset(e.target.value)}
          >
            {PRESETS.map((p, i) => (
              <option key={i} value={i}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.topBarRight}>
          {!simStarted ? (
            <button
              className={styles.btnPrimary}
              disabled={!queue.length}
              onClick={runSim}
            >
              Run Simulation
            </button>
          ) : (
            <>
              <button className={styles.btn} disabled={!canStep} onClick={stepForward}>
                Step
              </button>
              <button className={styles.btn} disabled={!canDispatchAll} onClick={dispatchAll}>
                Dispatch All
              </button>
              <button className={styles.btnOutline} disabled={!canRestart} onClick={restart}>
                Restart
              </button>
              <button className={styles.btnOutline} onClick={() => resetSim()}>
                Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className={styles.layout}>
        {/* ── Left: Config panel ── */}
        <div className={styles.configPanel}>
          {/* Fairness Keys */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h4 className={styles.cardTitle}>Fairness Keys</h4>
              {!hasFairnessKeys && (
                <span className={styles.modeTag}>Priority only</span>
              )}
              {hasFairnessKeys && (
                <span className={`${styles.modeTag} ${styles.modeTagFairness}`}>
                  Fairness active
                </span>
              )}
            </div>

            {!hasFairnessKeys && (
              <p className={styles.hint}>
                No fairness keys — tasks dispatch in strict priority order (FIFO within same
                priority).
              </p>
            )}

            {fairnessKeys.map((fk) => (
              <div key={fk.key} className={styles.fkRow}>
                <span
                  className={styles.fkDot}
                  style={{ background: fkColorMap[fk.key] }}
                />
                <span className={styles.fkName}>{fk.key}</span>
                <label className={styles.weightLabel}>weight</label>
                <input
                  type="number"
                  className={styles.weightInput}
                  value={fk.weight}
                  min={0.1}
                  step={0.5}
                  disabled={simStarted}
                  onChange={(e) => updateWeight(fk.key, e.target.value)}
                />
                <button
                  className={styles.removeBtn}
                  disabled={simStarted}
                  onClick={() => removeFairnessKey(fk.key)}
                >
                  ×
                </button>
              </div>
            ))}

            {!simStarted && (
              <div className={styles.addRow}>
                <input
                  className={styles.textInput}
                  placeholder="key name"
                  value={newFkName}
                  onChange={(e) => setNewFkName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFairnessKey()}
                />
                <input
                  className={styles.weightInput}
                  type="number"
                  placeholder="weight"
                  value={newFkWeight}
                  min={0.1}
                  step={0.5}
                  onChange={(e) => setNewFkWeight(e.target.value)}
                />
                <button className={styles.btnSmall} onClick={addFairnessKey}>
                  + Add
                </button>
              </div>
            )}
          </div>

          {/* Add Task */}
          {!simStarted && (
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Add Task</h4>
              <div className={styles.addTaskRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Priority key</label>
                  <select
                    className={styles.select}
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(+e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((p) => (
                      <option key={p} value={p}>
                        {p} – {PRIORITY_META[p].label}
                      </option>
                    ))}
                  </select>
                </div>
                {hasFairnessKeys && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Fairness key</label>
                    <select
                      className={styles.select}
                      value={newTaskFairnessKey}
                      onChange={(e) => setNewTaskFairnessKey(e.target.value)}
                    >
                      <option value="">— none —</option>
                      {fairnessKeys.map((fk) => (
                        <option key={fk.key} value={fk.key}>
                          {fk.key}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button className={styles.btnPrimary} onClick={addTask}>
                  + Task
                </button>
              </div>
            </div>
          )}

          {/* Priority legend */}
          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Priority Key Legend</h4>
            <div className={styles.legendGrid}>
              {[1, 2, 3, 4, 5].map((p) => (
                <div key={p} className={styles.legendRow}>
                  <span
                    className={styles.priorityChip}
                    style={{
                      background: PRIORITY_META[p].color,
                      color: PRIORITY_META[p].textColor,
                    }}
                  >
                    P{p}
                  </span>
                  <span className={styles.legendLabel}>{PRIORITY_META[p].label}</span>
                  {p === 3 && <span className={styles.defaultTag}>default</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Visualizer ── */}
        <div className={styles.vizPanel}>
          {/* Task Queue Backlog */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h4 className={styles.cardTitle}>Task Queue</h4>
              <div className={styles.queueStats}>
                <span className={styles.statBadge}>
                  {simStarted ? remainingIds.size : queue.length} waiting
                </span>
                {simStarted && (
                  <span className={`${styles.statBadge} ${styles.statBadgeDone}`}>
                    {dispatched.length} dispatched
                  </span>
                )}
              </div>
            </div>

            {queue.length === 0 ? (
              <p className={styles.hint}>
                Load a scenario from the dropdown above, or add tasks manually.
              </p>
            ) : (
              <div className={styles.queueGrid}>
                {queue.map((t) => {
                  const isDispatched = simStarted && !remainingIds.has(t.id);
                  return (
                    <div
                      key={t.id}
                      className={`${styles.taskChip} ${isDispatched ? styles.taskChipDone : ""}`}
                      style={
                        !isDispatched
                          ? { borderColor: PRIORITY_META[t.priorityKey].color }
                          : {}
                      }
                    >
                      <span
                        className={styles.priorityChip}
                        style={
                          !isDispatched
                            ? {
                                background: PRIORITY_META[t.priorityKey].color,
                                color: PRIORITY_META[t.priorityKey].textColor,
                              }
                            : {}
                        }
                      >
                        P{t.priorityKey}
                      </span>
                      {t.fairnessKey && (
                        <span
                          className={styles.fkChip}
                          style={
                            !isDispatched
                              ? { background: fkColorMap[t.fairnessKey] || "#888" }
                              : {}
                          }
                        >
                          {t.fairnessKey}
                        </span>
                      )}
                      {isDispatched && <span className={styles.doneCheck}>✓</span>}
                      {!simStarted && (
                        <button
                          className={styles.chipRemove}
                          onClick={() => removeTask(t.id)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dispatch Log */}
          {simStarted && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h4 className={styles.cardTitle}>Dispatch Order</h4>
                <span className={styles.progressText}>
                  {stepIndex} / {dispatchOrder.length}
                </span>
              </div>

              {dispatched.length === 0 ? (
                <p className={styles.hint}>
                  Click <strong>Step</strong> to dispatch one task at a time, or{" "}
                  <strong>Dispatch All</strong> to run the full simulation.
                </p>
              ) : (
                <div className={styles.logList}>
                  {dispatched.map((t, i) => (
                    <div
                      key={`log-${t.id}-${i}`}
                      className={`${styles.logRow} ${i === dispatched.length - 1 ? styles.logRowLatest : ""}`}
                    >
                      <span className={styles.logNum}>#{i + 1}</span>
                      <span
                        className={styles.priorityChip}
                        style={{
                          background: PRIORITY_META[t.priorityKey].color,
                          color: PRIORITY_META[t.priorityKey].textColor,
                        }}
                      >
                        P{t.priorityKey}
                      </span>
                      {t.fairnessKey ? (
                        <span
                          className={styles.fkChip}
                          style={{ background: fkColorMap[t.fairnessKey] || "#888" }}
                        >
                          {t.fairnessKey}
                        </span>
                      ) : (
                        <span className={styles.logLabel}>
                          {PRIORITY_META[t.priorityKey].label}
                        </span>
                      )}
                      <span className={styles.taskRef}>task #{t.id}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fairness Distribution Chart */}
          {showChart && (
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Fairness Distribution</h4>
              <p className={styles.chartCaption}>
                Actual dispatch percentage vs. target weight percentage per fairness key.
              </p>
              <canvas ref={chartRef} />
            </div>
          )}

          {/* Placeholder canvas (hidden) when chart not showing but ref needed */}
          {!showChart && <canvas ref={chartRef} style={{ display: "none" }} />}
        </div>
      </div>
    </div>
  );
}
