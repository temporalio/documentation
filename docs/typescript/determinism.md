# Determinism in Workflows

Temporal Workflows are executed differently than conventional code as they can be restored at any point.
A Workflow can sleep for months, and even if your server crashes, your timer will eventually resolve, and your code will continue right where it left off.

For this to be possible, Workflow code must be completely deterministic, meaning it does the exact same thing every time it is rerun.
Determinism brings limitations: you can't just call an external service, get the current time, or generate a random number, as these are all dependant on the state of the world at the time they're called, and may produce different values.
The Temporal SDKs come with a set of tools that allow you to overcome these limitations.

### How a Workflow is executed

The Temporal TypeScript SDK runs each Workflow in a separate v8 isolate—a "sandbox" environment with its own global variables, just like in the browser.
The Workflow runtime is completely deterministic: functions like `Math.random`, `Date`, and `setTimeout` are replaced by deterministic versions, and the only way for a Workflow to interact with the world is via Activities.
When an Activity completes, its result is stored in the Workflow history to be replayed in case a Workflow is restored.

### Imports in Workflow code

Workflow code is bundled on Worker creation using [Webpack](https://webpack.js.org), you may import any JS package, as long as it doesn't reference Node or DOM APIs.

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

### Examples

```js
import { sleep } from '@temporalio/workflow';

// this prints the *exact* same timestamp repeatedly
for (let x = 0; x < 10; ++i) {
  console.log(Date.now());
}

// this prints timestamps increasing roughly 1s each iteration
for (let x = 0; x < 10; ++i) {
  await sleep('1 second');
  console.log(Date.now());
}
```
