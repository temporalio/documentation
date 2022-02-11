# Determinism in Workflows

Temporal Workflows are executed differently than conventional code as they can be restored at any point.
A Workflow can sleep for months, and even if your Worker crashes or Temporal Cluster is down, timers and timeouts are persisted and will fire as scheduled.
As soon as your Worker and Cluster are back up, your code will _appear_ to resume where it left off.
This also means that sleeping or retrying code does not tie up the process - you can run thousands of timers off a single Worker.

```js
import * as wf from '@temporalio/workflow';
const { myActivity } = wf.proxyActivities({
  startToCloseTimeout: '1 week', // persisted
  retry: {
    initialInterval: '1 day', // persisted
  },
});

export async function ExampleWorkflow() {
  let state = []; // mutable local state
  while (true) {
    await wf.sleep('30 days'); // persisted
    state.push(myActivity()); // activity results can be replayed
  }
}
```

For this to be possible, Workflow code must be completely deterministic, meaning it does the exact same thing every time it is rerun.
Determinism brings limitations: you can't just call an external service, get the current time, or generate a random number, as these are all dependant on the state of the world at the time they're called, and may produce different values.
The Temporal SDKs come with a set of tools that allow you to overcome these limitations.

### How a Workflow is executed

The Temporal TypeScript SDK runs each Workflow in a separate v8 isolate — a "sandbox" environment using Node's built in `vm` with its own global variables, just like in the browser.

- When we need to defer execution (such as for a timer or activity), we simply destroy the `vm` context.
- When we need to continue execution, Temporal Server sends over the Event History and we replay through the code from the start until the end to restore state.
  - The serialization takes time, which is why we recommend keeping Event History [under 10,000 events](/docs/server/production-deployment/#server-limits). ["Sticky" optimizations exist to make this faster for common situations](https://docs.temporal.io/docs/concepts/task-queues/#sticky-queues).
  - If the execution logic has changed enough to affect Event History, you need to [patch new code](/docs/typescript/patching).
- The Workflow runtime is completely deterministic: functions like `Math.random`, `Date`, and `setTimeout` are replaced by deterministic versions, and the only way for a Workflow to interact with the world is via Activities.
- When an Activity completes, its result is stored in the Workflow history to be replayed in case a Workflow is restored.

The SDK does not throw an exception to suspend execution (like React Suspense), nor does it use VM snapshotting (yet), nor does it do any AST magic.

### Imports in Workflow code

Workflow code is bundled on Worker creation using [Webpack](https://webpack.js.org), you may import any JS package, **as long as it doesn't reference Node or DOM APIs**.

### Sources of non-determinism

- `Math.random` - replaced by the runtime
- `uuid4` - provided by the runtime
- `Date` - replaced by the runtime
  - `new Date()` and `Date.now()` are both set on the first invocation of the Workflow Task
- `WeakRef | FinalizationRegistry` - cannot be used, as GC is non-deterministic and the Workflow code may observe its effect; deleted by the runtime
- Timers - `setTimeout` and `clearTimeout` are replaced by the runtime.
  - We recommend you use the `@temporal/workflow` package's exported `sleep` function because it plays well with [cancellation scopes](/docs/typescript/cancellation-scopes): `import { sleep } from '@temporalio/workflow'`
- Activities - use to run non-deterministic code; results are replayed from history
- Node built ins:
  - `process` global
  - `path` module, `fs` module

### Deterministic examples

How `Date` is deterministic:

```js
import { sleep } from '@temporalio/workflow';

// this prints the *exact* same timestamp repeatedly
for (let x = 0; x < 10; ++x) {
  console.log(Date.now());
}

// this prints timestamps increasing roughly 1s each iteration
for (let x = 0; x < 10; ++x) {
  await sleep('1 second');
  console.log(Date.now());
}
```
