export type QuizQuestion = {
  q: string;
  options: readonly string[];
  correct: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    q: 'What does RPO (Recovery Point Objective) measure?',
    options: [
      'How fast a system recovers after an outage',
      'The maximum acceptable amount of data loss measured in time',
      'The number of replicas required for HA',
      'The replication throughput in events per second',
    ],
    correct: 1,
    explanation:
      'RPO measures how much data could be lost — "how far back in time could we roll back?" Temporal Cloud HA targets a sub-1-minute RPO, meaning at most ~1 minute of Workflow history could be lost during a regional failover.',
  },
  {
    q: "What contractual SLA does Temporal Cloud's High Availability tier provide?",
    options: ['99.9%', '99.95%', '99.99%', '100%'],
    correct: 2,
    explanation:
      'HA Namespaces carry a 99.99% uptime SLA. Standard Namespaces receive 99.9%. The extra nine is achieved through a synchronized replica that can take over within the RTO window.',
  },
  {
    q: 'What is the RTO (Recovery Time Objective) for a High Availability Namespace?',
    options: ['Instant (zero)', 'Under 1 minute', '20 minutes', '1 hour'],
    correct: 2,
    explanation:
      'Temporal Cloud HA targets a 20-minute RTO — the maximum time to restore service after a cell or regional failure. The RPO is sub-1-minute (data loss), while RTO covers the recovery duration.',
  },
  {
    q: 'Which failover mode does Temporal Cloud use by default?',
    options: [
      'Graceful (always waits for replication to drain)',
      'Forced (immediately promotes replica)',
      'Hybrid (tries graceful for 10 s, then forces)',
      'Manual only (no automatic failover)',
    ],
    correct: 2,
    explanation:
      'Hybrid is the default. It first attempts a graceful handover (up to 10 seconds) to drain in-flight replication tasks, then automatically switches to a forced failover if the graceful window expires — balancing consistency and availability.',
  },
  {
    q: 'What outage type does same-region replication protect against, but standard 3-zone replication does NOT?',
    options: [
      'Individual availability zone failures',
      'Cell or sub-component failures within a region',
      'Complete AWS or GCP cloud-provider outages',
      'Network packet loss between workers',
    ],
    correct: 1,
    explanation:
      'Standard Namespaces replicate across three availability zones and handle AZ failures. Same-region HA adds a second isolation domain (cell), protecting against cell-level software bugs or database failures that survive across all three zones.',
  },
  {
    q: 'After removing a replica from a High Availability Namespace, how long must you wait before re-enabling HA in the same region?',
    options: ['1 hour', '24 hours', '3 days', '7 days'],
    correct: 3,
    explanation:
      'Temporal enforces a 7-day cooldown before you can re-enable replication in the same location after removing it. This prevents rapid cycling that could create inconsistent state during the replica rebuild period.',
  },
];
