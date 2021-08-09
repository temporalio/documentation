# Determinism in Workflows

Temporal Workflows are executed differently than conventional code as they can be restored at any point.
A Workflow can sleep for months and even if your server crashes your timer will eventually resolve and your code will continue right where it left off.

For this to be possible Workflow code must be completely deterministic, meaning it does the exact same thing every time it is rerun.
Determinism brings limitations, you can't just call an external service, get the current time, or generate a random number as these are all dependant on the state of the world at the time they're called.
The Temporal SDKs come with a set of tools which allow you to overcome these limitations.

### How a Workflow is executed

The Temporal Node.js SDK runs each Workflow in a separate v8 isolate - a "sandbox" environment with its own global variables just like in the browser.
The Workflow runtime is completely deterministic, functions like `Math.random`, `Date`, and `setTimeout` are replaced by deterministic versions and the only way for a Workflow to interact with the world is via Activities.
When an Activity completes its result is stored in the Workflow history to be replayed in case a Workflow is restored.

### Imports in Workflow code

Workflow code is bundled on Worker creation using [Webpack](https://webpack.js.org), you may import any JS package as long as it doesn't reference Node or DOM APIs.
`@activities` prefixed imports are replaced by Webpack with stubs that schedule activities in the system.

### Sources of non-determinism

- `Math.random` - replaced by the runtime
- `uuid4` - provided by the runtime
- `Date` - replaced by the runtime
- `WeakRef | WeakMap | WeakSet` - can not be used as GC is non-deterministic, deleted by the runtime
- Timers - `setTimeout` and `clearTimeout` are replaced by the runtime. We recommend you use the `@temporal/workflow` package's exported `sleep` function because it plays well with [cancellation](/docs/node/workflow-scopes-and-cancellation): `import { sleep } from '@temporalio/workflow'`
- Activities - use to run non-deterministic code, results are replayed from history
