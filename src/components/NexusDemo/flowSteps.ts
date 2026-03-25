export type FlowMode = 'sync' | 'async';
export type LogLevel = 'info' | 'success' | 'warn';

export type FlowStep = {
  label: string;
  detail: string;
  /** 0 = caller, 1 = endpoint, 2 = handler */
  activeNode: 0 | 1 | 2;
  /** Progress along the track: 0–100 */
  packetPct: number;
  log: { level: LogLevel; event: string; msg: string };
};

export const syncSteps: FlowStep[] = [
  {
    label: 'Operation scheduled',
    detail:
      'The caller workflow calls ExecuteNexusOperationAsync(). Temporal records a ScheduleNexusOperation command and suspends the workflow execution.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'SCHEDULE', msg: 'ScheduleNexusOperation command recorded' },
  },
  {
    label: 'Request forwarded to endpoint',
    detail:
      "Temporal's server dispatches an HTTP POST request to the Nexus Endpoint URL for the Echo operation.",
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'DISPATCH', msg: 'POST /operations/Echo → nexus-simple-endpoint' },
  },
  {
    label: 'Handler worker receives task',
    detail:
      'The handler worker polls its task queue and picks up the Nexus Task. The handler service is invoked.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'info', event: 'POLL', msg: 'Handler worker dequeued Nexus Task' },
  },
  {
    label: 'Executes inline (< 10s)',
    detail:
      'The Echo handler runs directly in the worker process and returns the result immediately. No workflow is started.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'COMPLETE', msg: 'Sync handler returned in < 1ms' },
  },
  {
    label: 'Result delivered to caller',
    detail:
      'The result is routed back through the Nexus Endpoint and Temporal server. The caller workflow resumes from where it left off.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'success', event: 'RESUME', msg: 'Caller workflow resumed with result' },
  },
];

export const asyncSteps: FlowStep[] = [
  {
    label: 'Operation scheduled',
    detail:
      'The caller workflow calls ExecuteNexusOperationAsync(). Temporal records a ScheduleNexusOperation command and suspends the workflow.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'SCHEDULE', msg: 'ScheduleNexusOperation command recorded' },
  },
  {
    label: 'Request forwarded to endpoint',
    detail:
      "Temporal's server dispatches an HTTP POST request to the Nexus Endpoint for the SayHello operation.",
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'DISPATCH', msg: 'POST /operations/SayHello → nexus-simple-endpoint' },
  },
  {
    label: 'Handler starts a workflow',
    detail:
      'The handler worker starts HelloHandlerWorkflow and immediately returns an operation token. The caller workflow stays suspended.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'info', event: 'START_WF', msg: 'HelloHandlerWorkflow started, token returned' },
  },
  {
    label: 'Workflow runs (seconds → days)',
    detail:
      'HelloHandlerWorkflow runs to completion. It could call external APIs, wait for signals, or run sub-workflows — for as long as needed.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'warn', event: 'RUNNING', msg: 'HelloHandlerWorkflow executing...' },
  },
  {
    label: 'Completion callback delivered',
    detail:
      'When the handler workflow completes, a callback is delivered back to the caller namespace via the Nexus Endpoint.',
    activeNode: 1,
    packetPct: 50,
    log: { level: 'success', event: 'CALLBACK', msg: 'Completion callback delivered to caller namespace' },
  },
  {
    label: 'Caller workflow resumes',
    detail:
      'The Future resolves with the operation result. The caller workflow continues execution as if calling any other API.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'success', event: 'RESUME', msg: 'Caller resumed: "¡Hola! Temporal 👋"' },
  },
];
