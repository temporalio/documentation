export type FlowMode = 'replication' | 'failover';
export type LogLevel = 'info' | 'success' | 'warn';

export type FlowStep = {
  label: string;
  detail: string;
  /** 0 = left node, 1 = middle node, 2 = right node */
  activeNode: 0 | 1 | 2;
  /** Progress along the tracks: 0–100 */
  packetPct: number;
  log: { level: LogLevel; event: string; msg: string };
};

export type NodeDef = { title: string; sub: string };

export const replicationNodes: NodeDef[] = [
  { title: 'Primary Namespace', sub: 'Active · writes accepted' },
  { title: 'Replication Layer', sub: 'Async · background' },
  { title: 'Replica Namespace', sub: 'Standby · read-only' },
];

export const failoverNodes: NodeDef[] = [
  { title: 'Primary Namespace', sub: 'Failing · degraded' },
  { title: 'HA Engine', sub: 'Detection · coordination' },
  { title: 'Replica Namespace', sub: 'Promoting → Active' },
];

export const replicationSteps: FlowStep[] = [
  {
    label: 'Workflow event written to Primary',
    detail:
      'A Workflow Execution event (e.g. WorkflowExecutionStarted) is durably recorded in the Primary Namespace and acknowledged to the client. Replication happens independently in the background.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'WRITE', msg: 'Event persisted in Primary: WorkflowExecutionStarted' },
  },
  {
    label: 'Replication task queued',
    detail:
      'The replication engine queues an asynchronous task to copy the new History Event to the Replica. Client latency is unaffected — the client already received its acknowledgment.',
    activeNode: 0,
    packetPct: 20,
    log: { level: 'info', event: 'QUEUE', msg: 'Replication task enqueued for Replica Namespace' },
  },
  {
    label: 'Event transmitted to Replica',
    detail:
      'The Replication Layer transmits the History Event and its version stamp to the Replica Namespace. Temporal Cloud targets a P95 replication lag of under 1 minute.',
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'TRANSMIT', msg: 'Replication in-flight → Replica (p95 < 1 min lag)' },
  },
  {
    label: 'Replica persists the event',
    detail:
      'The Replica Namespace persists the replicated event across its own availability zones and stores the version history entry used for conflict resolution during failover.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'PERSIST', msg: 'Replica wrote event with version stamp' },
  },
  {
    label: 'Replica ready for failover',
    detail:
      'The Replica is synchronized and healthy. All Visibility APIs remain queryable against both Primary and Replica. The system is ready to fail over with sub-1-minute data loss if needed.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'READY', msg: 'Replica health OK — RPO target achievable' },
  },
];

export const failoverSteps: FlowStep[] = [
  {
    label: 'Health check detects degradation',
    detail:
      'Temporal Cloud monitors the Primary Namespace continuously. When error rates, latencies, or infrastructure checks exceed failure thresholds, the HA Engine triggers a failover.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'warn', event: 'HEALTH', msg: 'Primary health check failed — thresholds exceeded' },
  },
  {
    label: 'Hybrid failover initiated (10 s window)',
    detail:
      'The default Hybrid mode first attempts a graceful handover: the Primary stops accepting new writes and waits up to 10 seconds for in-flight replication tasks to drain to the Replica.',
    activeNode: 1,
    packetPct: 50,
    log: { level: 'warn', event: 'FAILOVER', msg: 'Hybrid: graceful handover attempted (10 s timeout)' },
  },
  {
    label: 'Replica promoted to active',
    detail:
      'After the graceful window (or immediately in forced mode), the Replica Namespace is promoted to active. It begins accepting Workflow traffic. The old Primary enters standby mode.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'PROMOTE', msg: 'Replica promoted — now accepting writes' },
  },
  {
    label: 'DNS CNAME updated',
    detail:
      'The Namespace CNAME record is updated to point to the new active region (15 s TTL). Clients and Workers begin resolving to the new active endpoint within approximately 30 seconds.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'info', event: 'DNS', msg: 'CNAME updated → new region (15 s TTL, ~30 s convergence)' },
  },
  {
    label: 'Conflict resolution applied',
    detail:
      'Any events that were in-flight and not yet replicated undergo conflict resolution. The history branch with the highest Namespace version is authoritative. Signals are re-injected; some Activity progress may roll back.',
    activeNode: 1,
    packetPct: 50,
    log: { level: 'info', event: 'RESOLVE', msg: 'Conflict resolution: highest-version branch wins' },
  },
  {
    label: 'Old Primary demoted to Replica',
    detail:
      'The original Primary becomes the new standby Replica. Outstanding Activities will time out and be retried on the new active Namespace — handle these like any Worker restart.',
    activeNode: 0,
    packetPct: 0,
    log: { level: 'info', event: 'DEMOTE', msg: 'Original Primary is now Replica (standby)' },
  },
  {
    label: 'Failover complete',
    detail:
      'Traffic is fully shifted. Workflow Executions continue from their last replicated state. Your Namespace endpoint URL and credentials are unchanged — no client updates required.',
    activeNode: 2,
    packetPct: 100,
    log: { level: 'success', event: 'COMPLETE', msg: 'Failover complete — RTO target: 20 min' },
  },
];
