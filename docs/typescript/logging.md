---
id: logging
title: Logging, Metrics, and Tracing in TypeScript SDK
sidebar_label: Logging
description: Workflow Sinks allow you to export information from the Workflow back to the Node.js environment, often used for logging, metrics, tracing.
---

## Logging from Activities

Activities run in the standard Node.js environment and can use any Node.js logger.

## Logging from Workflows with Workflow Sinks

Logging from Workflows is tricky for 2 reasons:

1. Workflows run in an isolated JS environment and may not do any I/O
1. Workflow code might get replayed generating duplicate log messages
<!--
Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking [determinism](/docs/typescript/determinism), in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the outside world. -->

Sinks are objects that contain Sink Functions, which enable one-way export of data from the Workflow isolate to the Node.js environment.
They are necessary because the Workflow has no way to communicate with the outside World.

<!--SNIPSTART typescript-logger-sink-interface-->
<!--SNIPEND-->

- Sinks are typically used for exporting logs, metrics and traces out from the Workflow into the isolate.
- **Injected WorkflowInfo argument**: The first argument of a Sink Function implementation will be a [`workflowInfo` object](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) that containing useful metadata.
- **No return value**: Sink functions may not return values to the Workflow in order to prevent breaking determinism.

### Logger Sinks Example

Call a Sink function from a Workflow

<!--SNIPSTART typescript-logger-sink-workflow-->
<!--SNIPEND-->

Inject a function as a Workflow Sink

<!--SNIPSTART typescript-logger-sink-worker-->
<!--SNIPEND-->

### Sinks vs Activities

Sinks are similar to Activities in that they are both registered on the Worker and proxied into the Workflow.
However, they differ from Activities in important ways:

- Sinks Functions don't return promises
- Sinks calls are not recorded in Workflow histories (no timeouts or retries)
- Sink Functions are run on the same Worker that runs the Workflow they are called from.

### [InjectedSinkFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedSinkFunction)

Dependency function implementations are passed via [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#dependencies),
they accept [WorkflowInfo](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) as their first argument along with additional arguments passed in from the Workflow side.

- The arguments and return value are copied between the isolated vm and the Node.js environment. This limits the usage to primitive types such as `number`, `string`, `array` and `object`.
- You may specify whether or not you'd like the injected function to be called during Workflow replay with the `callDuringReplay` boolean.

### References

- [Proposal](https://github.com/temporalio/proposals/blob/master/node/logging-and-metrics-for-user-code.md)
- [Sinks PR](https://github.com/temporalio/sdk-typescript/pull/370/files)

## Logging in Workers and Clients

The Worker comes with a default logger which defaults to log any messages with level `INFO` and higher to `STDERR` using `console.error`.
There are 5 levels in total: `TRACE`, `DEBUG`, `INFO`, `WARN`, and `ERROR`.

The reason we only offer a default logger is to minimize Worker dependencies and allow SDK users to bring their own logger.

### Customizing the default logger

Temporal ships a [`DefaultLogger`](https://typescript.temporal.io/api/classes/worker.defaultlogger/) that implements the basic interface:

#### Example: Set up the DefaultLogger to only log messages with level WARN and higher

```ts
import { Core, DefaultLogger, LogEntry } from '@temporalio/worker';

const logger = new DefaultLogger('WARN', ({ level, message }) => {
  console.log(`Custom logger: ${level} — ${message}`);
});
await Core.install({ logger });
```

#### Example: Accumulate logs for testing/reporting

```ts
const logs: LogEntry[] = [];
const logger = new DefaultLogger('TRACE', (entry) => logs.push(entry));
log.debug('hey', { a: 1 });
log.info('ho');
log.warn('lets', { a: 1 });
log.error('go');
```

The log levels are [listed here](https://typescript.temporal.io/api/namespaces/worker#loglevel) in increasing order of severity.

### Using a custom logger

A common logging use case is logging to a file to be picked up by a collector like the [Datadog Agent](https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30).

```ts
import { Worker } from '@temporalio/worker';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new transports.File({ filename: '/path/to/worker.log' })],
});
await Core.create({ logger });
```

## OpenTelemetry Tracing

We are in the process of documenting our OTel support, but meanwhile you can [view our tests](https://github.com/temporalio/sdk-typescript/blob/4505eee94e7d8a10bc187612977fd72bc6d740a6/packages/test/src/test-otel.ts) and get in touch if you need this.
