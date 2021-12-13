---
id: logging
title: Logging and Sinks in TypeScript SDK
sidebar_label: Logging and Sinks
description: Workflow Sinks allow you to export information from the Workflow back to the Node.js environment, often used for logging, metrics, tracing.
---

## Logging from Activities

Activities run in the standard Node.js environment and can use any Node.js logger.

## Logging from Workflows with Workflow Sinks

Logging from Workflows is tricky for 2 reasons:

1. Workflows run in a sandboxed environment and may not do any I/O
1. Workflow code might get replayed at any time, generating duplicate log messages

To solve these problems, we recommend using the Sinks feature in the TypeScript SDK.
Sinks enable one-way export of logs, metrics and traces out from the Workflow isolate to the Node.js environment.

<!--
Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking [determinism](/docs/typescript/determinism), in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the outside world. -->

Sinks are written as objects with methods. Similar to Activities, they are declared in the Worker and then proxied in Workflow code, and it helps to share types between both.

<details>
  <summary>Comparing Sinks vs Activities</summary>
  
Sinks are similar to Activities in that they are both registered on the Worker and proxied into the Workflow.
However, they differ from Activities in important ways:

- Sink functions don't return promises
- Sink calls are not recorded in Workflow histories (no timeouts or retries)
- Sink functions are run on the same Worker that runs the Workflow they are called from
  
</details>

### Declaring The Sink Interface

Explicitly declaring the interface is optional, but is useful for ensuring type safety in subsequent steps:

<!--SNIPSTART typescript-logger-sink-interface-->
<!--SNIPEND-->

Some important features of this interface:

- **Injected WorkflowInfo argument**: The first argument of a Sink function implementation will be a [`workflowInfo` object](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) that containing useful metadata.
- **No return value**: Sink functions may not return values to the Workflow in order to prevent breaking determinism.

### Implementing Sinks

Implementing Sinks is a two step process.

#### Implement and inject the Sink function into a Worker

<!--SNIPSTART typescript-logger-sink-worker-->
<!--SNIPEND-->

Note that you can control 

#### Proxy and call a Sink function from a Workflow

<!--SNIPSTART typescript-logger-sink-workflow-->
<!--SNIPEND-->

#### Advanced: Performance Considerations and Non-blocking Sinks

Be aware that Sinks will take up part of the workflow execution time.

- If you have a long running sink function, e.g. one tries to communicate with external services, you may start seeing workflow task timeouts.
- The effect of this is multiplied when replaying long workflow histories because the workflow task timer starts when the first history page is delivered to the worker and the sink function will run every time the workflow is "activated".

To work around blocking the workflow task you can send the errors asynchronously, e.g:

```ts
const sinks: InjectedSinks<LoggerSinks> = {
  reporter: {
    error: {
      fn(workflowInfo, err) {
        (async () => {
          try {
            await sendErrorToSentry(workflowInfo, err);
          } catch (sendError) {
            /* handle it yourself */
          }
        })();
      },
    },
  },
};
```

Note that if you are only logging Workflow failure errors, that can only happen once per workflow so you don't have to worry about the above.

### [InjectedSinkFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedSinkFunction) interface

Dependency function implementations are passed via [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#dependencies),
they accept [WorkflowInfo](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) as their first argument along with additional arguments passed in from the Workflow side.

- The arguments and return value are copied between the isolated vm and the Node.js environment. This limits the usage to primitive types such as `number`, `string`, `array` and `object`.
- You may specify whether or not you'd like the injected function to be called during Workflow replay with the `callDuringReplay` boolean option.

### Further References

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

## Monitoring SDK Metrics

We are in the process of building out our SDK metrics capabilities, for now please observe standard monitoring practices on your Workers in production.

## OpenTelemetry Tracing

We are in the process of documenting our OTel support, but meanwhile you can [view our tests](https://github.com/temporalio/sdk-typescript/blob/4505eee94e7d8a10bc187612977fd72bc6d740a6/packages/test/src/test-otel.ts) and get in touch if you need this.
