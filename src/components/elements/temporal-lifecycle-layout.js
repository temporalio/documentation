const ACCENT = "#444CE7";

export function getDiagramPalette(isDark) {
  if (isDark) {
    return {
      serverBg: "#242526",
      serverBlock: "#3538a0",
      serverBlockActive: ACCENT,
      serverBlockDim: "#2a2d5c",
      envBorder: "#3d9e5f",
      envBg: "#1b1b1d",
      envBlock: "#2f5e44",
      envBlockDim: "#1f3d2c",
      clientBlock: "#3538a0",
      clientBlockActive: ACCENT,
      taskQueue: "#3538a0",
      taskQueueActive: ACCENT,
      connector: "rgba(255,255,255,0.2)",
      connectorActive: ACCENT,
      connectorReturn: "#5bb98a",
      glow: "rgba(68, 76, 231, 0.5)",
      text: "#ffffff",
      textOnAccent: "#ffffff",
      textMuted: "rgba(255,255,255,0.65)",
    };
  }

  return {
    serverBg: "#f0f1fd",
    serverBlock: "#c8ccf9",
    serverBlockActive: ACCENT,
    serverBlockDim: "#e4e6fc",
    envBorder: "#3d9e5f",
    envBg: "#ffffff",
    envBlock: "#d9efe3",
    envBlockDim: "#eef7f1",
    clientBlock: "#c8ccf9",
    clientBlockActive: ACCENT,
    taskQueue: "#c8ccf9",
    taskQueueActive: ACCENT,
    connector: "rgba(20,20,20,0.15)",
    connectorActive: ACCENT,
    connectorReturn: "#2e9e6b",
    glow: "rgba(68, 76, 231, 0.35)",
    text: "#141414",
    textOnAccent: "#ffffff",
    textMuted: "rgba(20,20,20,0.65)",
  };
}

export const DIAGRAM_NODES = {
  Client: { cx: 21, cy: 25, w: 30, h: 9, label: "Client", kind: "client", fontSize: 3.2 },
  Worker: { cx: 21, cy: 51, w: 30, h: 10, label: "Worker", kind: "worker", fontSize: 3 },
  Frontend: { cx: 80, cy: 22, w: 66, h: 8, label: "Frontend", kind: "frontend", fontSize: 3.1 },
  History: { cx: 62, cy: 38, w: 16, h: 9, label: "History", kind: "service", fontSize: 3 },
  Matching: { cx: 80, cy: 38, w: 16, h: 9, label: "Matching", kind: "service", fontSize: 2.8 },
  WorkerService: { cx: 98, cy: 38, w: 16, h: 9, label: "Internal", kind: "internal", alwaysDim: true, fontSize: 2.6 },
  TaskQueue: { cx: 70, cy: 52, w: 44, h: 7, label: "Task Queue", kind: "queue", fontSize: 2.8 },
  Persistence: { cx: 62, cy: 66, w: 24, h: 8, label: "Database", kind: "service", fontSize: 2.7 },
};

export function getActiveNodes(step) {
  const active = new Set();
  if (step.local) {
    active.add(step.local);
    return active;
  }
  step.routes.forEach((route) => {
    active.add(route.from);
    active.add(route.to);
  });
  return active;
}

export function getNodeCenter(id) {
  const n = DIAGRAM_NODES[id];
  return { x: n.cx, y: n.cy };
}

export function routePath(from, to) {
  const start = getNodeCenter(from);
  const end = getNodeCenter(to);
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}
