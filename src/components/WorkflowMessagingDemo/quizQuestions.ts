export type QuizQuestion = {
  q: string;
  options: readonly string[];
  correct: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    q: 'You want to tell a running Workflow that an external payment succeeded. You do not need a response back. Which type do you use?',
    options: ['Query', 'Signal', 'Update', 'Start a new Workflow'],
    correct: 1,
    explanation:
      'Signals are the right choice when you just need to push an event in with no response. They are fire-and-forget with durable, buffered delivery.',
  },
  {
    q: 'You send a Query to a Workflow whose Worker is not currently running. What happens?',
    options: [
      'The query is buffered and delivered when the Worker restarts',
      'The query fails with an error',
      'Temporal returns the last known state from history',
      'The query waits indefinitely until a Worker comes back',
    ],
    correct: 1,
    explanation:
      'Queries are not buffered. They require a live Worker. If nothing is polling that task queue, the query fails right away. This is the key behavioral difference from Signals, which are persisted and delivered later.',
  },
  {
    q: `An Update handler's validator raises an exception. What happens?`,
    options: [
      'The Update handler still runs but the exception is logged',
      'The Update is rejected and Workflow state is unchanged',
      'The Workflow is cancelled',
      'The Update is queued and retried later',
    ],
    correct: 1,
    explanation:
      'The validator runs before any state changes happen. If it raises, the Update is rejected and returned as an error to the caller. The Workflow state is never touched.',
  },
  {
    q: 'Which message type returns a value to the caller AND can change Workflow state?',
    options: ['Signal', 'Query', 'Update', 'Both Signal and Query'],
    correct: 2,
    explanation:
      'Updates are the only type that does both. Queries are read-only. Signals have no return value. Updates can change state and give the caller a result back.',
  },
  {
    q: 'A @workflow.query handler is defined with "async def" instead of "def". What happens?',
    options: [
      'It works fine, async is optional for queries',
      'The Temporal SDK raises an error at registration time',
      'The query runs but result delivery is delayed',
      'The query mutates state as a side effect',
    ],
    correct: 1,
    explanation:
      'Query handlers must be plain synchronous functions. The SDK enforces this at registration time and raises an error if you use async def. Queries must complete without yielding to the event loop.',
  },
  {
    q: 'Your Workflow uses workflow.wait_condition(lambda: self._approved). What is the standard way to unblock it?',
    options: [
      'A Query that reads self._approved',
      'A Signal handler that sets self._approved = True',
      'An Update that returns self._approved',
      'Starting a Child Workflow',
    ],
    correct: 1,
    explanation:
      'Signals are the standard way to push state into a Workflow and wake a blocked condition. The signal handler sets the flag, wait_condition re-evaluates, and the Workflow continues.',
  },
];
