# External Dependencies

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning title="Experimental API" color="var(--ifm-color-warning)">

This is an experimental API which is likely to change without prior notice.

</CustomWarning>

Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking [determinism](/docs/typescript/determinism), in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the World.

External Dependencies is a mechanism to work around this limitation that allows exporting information from the Workflow to the Node.js environment.
It is typically used in order to inject custom instrumentation (e.g. logger / metrics / tracing) functions into the isolate.

## [InjectedDependencyFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedDependencyFunction)

Dependency function implementations are passed via [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#dependencies),
they accept [WorkflowInfo](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) as their first argument along with additional arguments passed in from the Workflow side.

- The arguments and return value are copied between the isolated vm and the Node.js environment. This limits the usage to primitive types such as `number`, `string`, `array` and `object`.
- You may specify whether or not you'd like the injected function to be called during Workflow replay with the `callDuringReplay` boolean.

## Example

#### `src/workflows/definitions.ts`

Define the interface for your external dependencies

<!--SNIPSTART typescript-external-dependencies-logger-interface {"enable_source_link": false}-->
<!--SNIPEND-->

#### `src/workflows/logger-example.ts`

Call an external dependency function from a Workflow

<!--SNIPSTART typescript-external-dependencies-logger-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

#### `src/worker/index.ts`

Inject a function as a Workflow external dependency

<!--SNIPSTART typescript-external-dependencies-logger-worker {"enable_source_link": false}-->
<!--SNIPEND-->

## References

- [Proposal](https://github.com/temporalio/proposals/blob/master/node/logging-and-metrics-for-user-code.md)
