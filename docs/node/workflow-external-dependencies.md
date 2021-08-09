# External Dependencies

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning title="Advanced feature" color="var(--ifm-color-info)">

This is an advanced feature and requires a good grasp of the basic SDK concepts

</CustomWarning>

Workflows in Temporal may be replayed from the beginning of their history when resumed.
In order for Temporal to recreate the exact state Workflow code was in, the code is required to be [fully deterministic](/docs/node/determinism).
To prevent breaking determinism, in the Node SDK, Workflow code runs in an isolated execution environment limited to functionality provided by the SDK.

External Dependencies is an isolation breaking mechanism that allows injecting replay-aware functions from the main Node.js environment into a Workflow isolate.
They are typically used in order to inject custom instrumentation (e.g. logger) functions into the isolate.

## [Injection configuration](https://nodejs.temporal.io/api/modules/worker#injecteddependencyfunction)

The following configuration options are for controlling how an injected function is executed.

### `callDuringReplay`

A boolean controling whether or not the injected function will be called during Workflow replay - defaults to `false`.

### ApplyMode

The different modes for an injected function to be applied to the isolate are documented in the [API reference](https://nodejs.temporal.io/api/enums/worker.applymode).

- `ASYNC`
- `ASYNC_IGNORED`
- `SYNC`
- `SYNC_IGNORED`
- `SYNC_PROMISE`

:::warning
Only `IGNORED` apply modes are safe to use since they cannot break determinism.<br/>
Use other modes only if you're certain you know what you're doing.
:::

### Function arguments and return value

Functions configured to use `ASYNC*` apply modes **always** copy their arguments and return value, which limits them to primitive types such as `number`, `string`, `array` and `object`.

Function configured to use `SYNC*` apply modes **always** copy their return value and can control whether to copy their arguments or pass them in using [isolated-vm References](https://github.com/laverdet/isolated-vm#transferoptions).

## Example

#### `src/interfaces/dependencies.ts`

Define the interface for your external dependencies

<!--SNIPSTART nodejs-external-dependencies-logger-interface {"enable_source_link": false}-->
<!--SNIPEND-->

#### `src/workflows/logger-example.ts`

Call an external dependency function from a Workflow

<!--SNIPSTART nodejs-external-dependencies-logger-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

#### `src/worker/index.ts`

Inject a function as a Workflow external dependency

<!--SNIPSTART nodejs-external-dependencies-logger-worker {"enable_source_link": false}-->
<!--SNIPEND-->

## References

- [Proposal](https://github.com/temporalio/proposals/blob/master/node/logging-and-metrics-for-user-code.md)
