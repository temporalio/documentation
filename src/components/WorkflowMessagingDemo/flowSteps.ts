export type FlowMode = 'signal' | 'query' | 'update';

export type FlowStep = {
  label: string;
  detail: string;
  activeNode: 0 | 1 | 2;
  packetPct: number;
  log: {
    level: 'info' | 'success' | 'warn';
    event: string;
    msg: string;
  };
};

export const signalSteps: FlowStep[] = [
  {
    label: 'Client sends Signal',
    detail:
      `Your code calls handle.signal(approve). The SDK serializes it and sends it off. No response is awaited. Signals are always fire-and-forget.`,
    activeNode: 0,
    packetPct: 10,
    log: { level: 'info', event: 'SIGNAL_SENT', msg: 'handle.signal(approve) dispatched' },
  },
  {
    label: 'Server persists Signal',
    detail:
      `The Temporal Server writes the signal into the Workflow's event history. It will survive crashes and be delivered reliably, even if the Worker is currently offline.`,
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'SIGNAL_QUEUED', msg: 'signal persisted to event history' },
  },
  {
    label: 'Signal delivered to Worker',
    detail:
      `The Worker's polling loop picks up the event and routes it to the correct Workflow execution running on that Worker.`,
    activeNode: 1,
    packetPct: 75,
    log: { level: 'info', event: 'SIGNAL_DELIVERED', msg: 'routing to workflow execution' },
  },
  {
    label: 'Signal handler executes',
    detail:
      `The @workflow.signal handler runs. It can update internal state, wake a blocked condition, or kick off further actions inside the Workflow.`,
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'SIGNAL_HANDLED', msg: 'approve() completed, _approved = True' },
  },
];

export const querySteps: FlowStep[] = [
  {
    label: 'Client sends Query',
    detail:
      `handle.query(get_status) is called. Unlike signals, the SDK waits synchronously for a response. Queries never change Workflow state.`,
    activeNode: 0,
    packetPct: 10,
    log: { level: 'info', event: 'QUERY_SENT', msg: 'handle.query(get_status) dispatched' },
  },
  {
    label: 'Server routes synchronously',
    detail:
      `The Server routes the query to an available Worker running this Workflow. Queries are not buffered. If no Worker is running, the query fails immediately.`,
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'QUERY_ROUTING', msg: 'routing to available worker' },
  },
  {
    label: 'Query handler reads state',
    detail:
      `The @workflow.query handler runs synchronously. It reads Workflow state and returns a value. It must not change anything or use async operations.`,
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'QUERY_HANDLED', msg: 'get_status() \u2192 "approved"' },
  },
  {
    label: 'Result returned to client',
    detail:
      `The result comes back to the waiting caller. The Workflow keeps running, completely unaffected by the query.`,
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'QUERY_RESULT', msg: 'result received: "approved"' },
  },
];

export const updateSteps: FlowStep[] = [
  {
    label: 'Client sends Update request',
    detail:
      `handle.execute_update(set_priority, 3) is called. The client waits for a validated response. If the input is rejected, the caller gets a clean error and the Workflow is untouched.`,
    activeNode: 0,
    packetPct: 10,
    log: { level: 'info', event: 'UPDATE_SENT', msg: 'execute_update(set_priority, 3) dispatched' },
  },
  {
    label: 'Server routes to Worker',
    detail:
      `The Temporal Server routes the Update to an available Worker handling this Workflow execution.`,
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'UPDATE_ROUTING', msg: 'routing to workflow worker' },
  },
  {
    label: 'Validator runs first',
    detail:
      `The @update.validator runs before any state changes. If it raises an exception, the Update is rejected right here and the Workflow state stays intact.`,
    activeNode: 2,
    packetPct: 75,
    log: { level: 'info', event: 'UPDATE_VALIDATING', msg: 'validate_priority(3) \u2192 valid' },
  },
  {
    label: 'Update handler executes',
    detail:
      `Validation passed. The @workflow.update handler runs, changes state, and returns a result to the waiting caller.`,
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'UPDATE_HANDLED', msg: 'set_priority(3) \u2192 "Priority set to 3"' },
  },
  {
    label: 'Result returned to client',
    detail:
      `The caller gets the return value from the update handler. The Workflow keeps running with the updated state.`,
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'UPDATE_COMPLETE', msg: 'result received: "Priority set to 3"' },
  },
];
