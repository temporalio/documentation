The tool below helps visualize total Activity Execution times through experimenting with different Activity timeouts and Retry Policies.

The simulator is based on a common Activity use-case, which is to call a third party HTTP API and return the results.
See the example code snippets below.

Use the Activity Retries settings to configure how long the API request takes to succeed or fail.
There is an option to generate scenarios.
The "Task Time in Queue" simulates the time the Activity Task might be waiting in the Task Queue.

Use the Activity Timeouts and Retry Policy settings to see how they impact whether the Activity succeeds or fails.

import RetrySimulator from '/docs/components/RetrySimulator/RetrySimulator';

<RetrySimulator />
