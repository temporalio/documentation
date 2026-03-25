export type QuizQuestion = {
  q: string;
  options: readonly string[];
  correct: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    q: 'What problem does Temporal Nexus primarily solve?',
    options: [
      'Making workflows run faster',
      'Connecting workflows across team and namespace boundaries safely',
      'Replacing HTTP APIs entirely',
      'Scheduling recurring jobs',
    ],
    correct: 1,
    explanation:
      'Nexus is specifically designed to connect durable executions across team, namespace, region, and cloud boundaries, enabling modular architecture without tight coupling.',
  },
  {
    q: 'What is the maximum duration of an asynchronous Nexus Operation in Temporal Cloud?',
    options: ['10 seconds', '24 hours', '60 days', '1 year'],
    correct: 2,
    explanation:
      'Async Nexus Operations can run for up to 60 days in Temporal Cloud (Schedule-to-Close timeout). This is what makes Nexus suitable for long-running cross-team operations.',
  },
  {
    q: 'A synchronous Nexus Operation must complete within:',
    options: ['1 second', '10 seconds', '1 minute', '1 hour'],
    correct: 1,
    explanation:
      'Synchronous operations must complete within 10 seconds. For longer work, use asynchronous operations backed by a Workflow.',
  },
  {
    q: 'What is a Nexus Endpoint?',
    options: [
      'A general-purpose HTTP reverse proxy',
      'A named router that maps to a target namespace and task queue',
      'A workflow definition',
      'The Temporal Cloud UI',
    ],
    correct: 1,
    explanation:
      "A Nexus Endpoint is not a general HTTP proxy. It's a specifically-designed router with auth, retries, and observability, pointing to a handler namespace and task queue.",
  },
  {
    q: 'If a caller workflow is canceled, what happens to pending Nexus Operations?',
    options: [
      'They continue running independently',
      'They are terminated immediately',
      'Cancel is propagated to them',
      'Nothing, they timeout naturally',
    ],
    correct: 2,
    explanation:
      'Cancellation propagates automatically through Nexus. Canceling the caller workflow sends a cancel signal to all pending Nexus Operations, which then cancel their handler workflows.',
  },
  {
    q: "What does Team A need from Team B to call a Nexus Service?",
    options: [
      "Access to Team B's namespace and credentials",
      "A copy of Team B's workflow code",
      'Only the shared service contract definition',
      "Team B's database connection string",
    ],
    correct: 2,
    explanation:
      "Team A only needs the shared service contract. Team B's internal implementation (which workflows they use, how they work) is completely hidden.",
  },
];
