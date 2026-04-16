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
      'The caller Workflow calls ExecuteNexusOperationAsync(). Temporal records a ScheduleNexusOperation command and suspends the Workflow execution.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'SCHEDULE', msg: 'ScheduleNexusOperation command recorded' },
  },
  {
    label: 'Request forwarded to Endpoint',
    detail:
      "Temporal's server dispatches an HTTP POST request to the Nexus Endpoint URL for the Echo Operation.",
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'DISPATCH', msg: 'Temporal routes start request to Nexus Endpoint' },
  },
  {
    label: 'Handler Worker receives Task',
    detail:
      'The handler Worker polls its Task Queue and picks up the Nexus Task. The handler Service is invoked.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'info', event: 'POLL', msg: 'Handler Worker dequeued Nexus Task' },
  },
  {
    label: 'Executes inline (< 10s)',
    detail:
      'The Echo handler runs directly in the Worker process and returns the result immediately. No Workflow is started.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'COMPLETE', msg: 'Sync handler returned in < 1ms' },
  },
  {
    label: 'Result delivered to caller',
    detail:
      'The result is routed back through the Nexus Endpoint and Temporal server. The caller Workflow resumes from where it left off.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'success', event: 'RESUME', msg: 'Caller Workflow resumed with result' },
  },
];

export const asyncSteps: FlowStep[] = [
  {
    label: 'Operation scheduled',
    detail:
      'The caller Workflow calls ExecuteNexusOperationAsync(). Temporal records a ScheduleNexusOperation command and suspends the Workflow.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'SCHEDULE', msg: 'ScheduleNexusOperation command recorded' },
  },
  {
    label: 'Request forwarded to Endpoint',
    detail:
      "Temporal's server dispatches an HTTP POST request to the Nexus Endpoint for the SayHello Operation.",
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'DISPATCH', msg: 'Temporal routes start request to Nexus Endpoint' },
  },
  {
    label: 'Handler starts a Workflow',
    detail:
      'The handler Worker starts HelloHandlerWorkflow and immediately returns an operation token. The caller Workflow stays suspended.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'info', event: 'START_WF', msg: 'HelloHandlerWorkflow started, token returned' },
  },
  {
    label: 'Workflow runs (seconds → days)',
    detail:
      'HelloHandlerWorkflow runs to completion. It could call external APIs, wait for Signals, or run child Workflows, for as long as needed.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'warn', event: 'RUNNING', msg: 'HelloHandlerWorkflow executing...' },
  },
  {
    label: 'Completion callback delivered',
    detail:
      'When the handler Workflow completes, a callback is delivered back to the caller Namespace via the Nexus Endpoint.',
    activeNode: 1,
    packetPct: 50,
    log: { level: 'success', event: 'CALLBACK', msg: 'Completion callback delivered to caller Namespace' },
  },
  {
    label: 'Caller Workflow resumes',
    detail:
      'The Future resolves with the operation result. The caller Workflow continues execution as if calling any other API.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'success', event: 'RESUME', msg: 'Caller resumed: "¡Hola! Temporal"' },
  },
];
