---
id: how-to-log-from-a-workflow-in-typescript
title: How to log from a Workflow in TypeScript
sidebar_label: Logging
description: Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
tags:
  - guide-context
---

### Logging from Activities

Activities run in the standard Node.js environment and may therefore use any Node.js logger directly.

The Temporal SDK however provides a convenient Activity Context logger, which funels log messages to the [Runtime's logger](/dev-guide/typescript/observability#customizing-the-default-logger). Attributes from the current Activity context are automatically included as metadata on every log entries emited using the Activity context logger, and some key events of the Activity's lifecycle are automatically logged (at DEBUG level for most messages; WARN for failures).

<details>
<summary>
Using the Activity Context logger
</summary>

```ts
import { log } from '@temporalio/activity';

export async function greet(name: string): Promise<string> {
  log.info('Log from activity', { name });
  return `Hello, ${name}!`;
}
```

</details>

<!--
#### Customizing Activity logging with `ActivityOutboundCallsInterceptor`
FIXME(JWH): Quick introduction to `ActivityOutboundCallsInterceptor.getLogAttributes()`.
-->

### Logging from Workflows

Workflows may not use regular Node.js loggers because:

1. Workflows run in a sandboxed environment and cannot do any I/O.
1. Workflow code might get replayed at any time, which would result in duplicated log messages.

The Temporal SDK however provides a Workflow Context logger, which funnels log messages to the [Runtime's logger](/dev-guide/typescript/observability#customizing-the-default-logger). Attributes from the current Workflow context are automatically included as metadata on every log entries emited using the Workflow context logger, and some key events of the Workflow's lifecycle are automatically logged (at DEBUG level for most messages; WARN for failures).

<details>
<summary>
Using the Workflow Context logger
</summary>

```ts
import { log } from '@temporalio/workflow';

export async function myWorkflow(name: string): Promise<string> {
  log.info('Log from workflow', { name });
  return `Hello, ${name}!`;
}
```

</details>

The Workflow Context Logger tries to avoid reemitting log messages on Workflow Replays.

<!--
#### Customizing Workflow logging using `WorkflowOutboundCallsInterceptor`
FIXME(JWH): Quick introduction to `WorkflowOutboundCallsInterceptor.getLogAttributes()`.
-->

#### Limitations of Workflow logs

Internally, Workflow logging uses Sinks, and is consequently subject to the same limitations as Sinks.
Notably, logged objects must be serializable using the V8 serialization.

<!-- FIXME(JWH): Add more details and link to actual Sinks documentation -->

### What is the Runtime's Logger

A Temporal Worker may emit logs in various ways, including:

- Messages emitted using the [Workflow Context Logger](#logging-from-workflows);
- Messages emitted using the [Activity Context Logger](#logging-from-activities);
- Messages emitted by the TypeScript SDK Worker itself;
- Messages emitted by the underlying Temporal Core SDK (native code).

All of these messages are internally routed to a single logger object, called the Runtime's Logger.
By default, the Runtime's Logger simply write messages to the console (i.e. the process's `STDOUT`).

#### How to customize the Runtime's Logger

A custom Runtime Logger may be registered when the SDK `Runtime` is instanciated. This is done only once per process.

To register a custom Runtime Logger, you must explicitely instanciate the Runtime, using the [`Runtime.install()`](https://typescript.temporal.io/api/classes/worker.Runtime/#install) function.
For example:

```typescript
import {
  DefaultLogger,
  makeTelemetryFilterString,
  Runtime,
} from '@temporalio/worker';

// This is your custom Logger.
const logger = new DefaultLogger('WARN', ({ level, message }) => {
  console.log(`Custom logger: ${level} — ${message}`);
});

Runtime.install({
  logger,
  // The following block is optional, but generally desired.
  // It allows capturing log messages emited by the underlying Temporal Core SDK (native code).
  // The Telemetry Filter String determine the desired verboseness of messages emited by the
  // Temporal Core SDK itself ("core"), and by other native libraries ("other").
  telemetryOptions: {
    logging: {
      filter: makeTelemetryFilterString({ core: 'INFO', other: 'INFO' }),
      forward: {},
    },
  },
});
```

A common use case for this is to write log mesages to a file to be picked up by a collector service, such as the [Datadog Agent](https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30).
For example:

```typescript
import {
  DefaultLogger,
  makeTelemetryFilterString,
  Runtime,
} from '@temporalio/worker';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new transports.File({ filename: '/path/to/worker.log' })],
});

Runtime.install({
  logger,
  // The following block is optional, but generally desired.
  // It allows capturing log messages emited by the underlying Temporal Core SDK (native code).
  // The Telemetry Filter String determine the desired verboseness of messages emited by the
  // Temporal Core SDK itself ("core"), and by other native libraries ("other").
  telemetryOptions: {
    logging: {
      filter: makeTelemetryFilterString({ core: 'INFO', other: 'INFO' }),
      forward: {},
    },
  },
});
```

<!-- FIXME(JWH): Everything below this point must be revisited and moved to a distinct section (Sinks). -->

### Implementing custom Logging-like features based on Workflow Sinks

Sinks enable one-way export of logs, metrics, and traces from the Workflow isolate to the Node.js environment.

<!--
Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking determinism, in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the outside world. -->

Sinks are written as objects with methods.
Similar to Activities, they are declared in the Worker and then proxied in Workflow code, and it helps to share types between both.

#### Comparing Sinks and Activities

Sinks are similar to Activities in that they are both registered on the Worker and proxied into the Workflow.
However, they differ from Activities in important ways:

- A sink function doesn't return any value back to the Workflow and cannot be awaited.
- A sink call isn't recorded in the Event History of a Workflow Execution (no timeouts or retries).
- A sink function _always_ runs on the same Worker that runs the Workflow Execution it's called from.

#### Declare the sink interface

Explicitly declaring a sink's interface is optional but is useful for ensuring type safety in subsequent steps:

<!--SNIPSTART typescript-logger-sink-interface-->

[sinks/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/workflows.ts)

```ts
import { log, proxySinks, Sinks } from '@temporalio/workflow';

export interface AlertSinks extends Sinks {
  alerter: {
    alert(message: string): void;
  };
}

export type MySinks = AlertSinks;
```

<!--SNIPEND-->

#### Implement sinks

Implementing sinks is a two-step process.

Implement and inject the Sink function into a Worker

<!--SNIPSTART typescript-logger-sink-worker-->

[sinks/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/worker.ts)

```ts
import { InjectedSinks, Worker } from '@temporalio/worker';
import { MySinks } from './workflows';

async function main() {
  const sinks: InjectedSinks<MySinks> = {
    alerter: {
      alert: {
        fn(workflowInfo, message) {
          console.log('sending SMS alert!', {
            workflowId: workflowInfo.workflowId,
            workflowRunId: workflowInfo.runId,
            message,
          });
        },
        callDuringReplay: false, // The default
      },
    },
  };
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'sinks',
    sinks,
  });
  await worker.run();
  console.log('Worker gracefully shutdown');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

<!--SNIPEND-->

- Sink function implementations are passed as an object into [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions/#sinks).
- You can specify whether you want the injected function to be called during Workflow replay by setting the `callDuringReplay` option.

#### Proxy and call a sink function from a Workflow

<!--SNIPSTART typescript-logger-sink-workflow-->

[sinks/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/workflows.ts)

```ts
const { alerter } = proxySinks<MySinks>();

export async function sinkWorkflow(): Promise<string> {
  log.info('Workflow Execution started');
  alerter.alert('alerter: Workflow Execution started');
  return 'Hello, Temporal!';
}
```

<!--SNIPEND-->

Some important features of the [InjectedSinkFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedSinkFunction) interface:

- **Injected WorkflowInfo argument:** The first argument of a Sink function implementation is a [`workflowInfo` object](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInfo/) that contains useful metadata.
- **Limited arguments types:** The remaining Sink function arguments are copied between the sandbox and the Node.js environment using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
- **No return value:** To prevent breaking determinism, Sink functions cannot return values to the Workflow.

**Advanced: Performance considerations and non-blocking Sinks**

The injected sink function contributes to the overall Workflow Task processing duration.

- If you have a long-running sink function, such as one that tries to communicate with external services, you might start seeing Workflow Task timeouts.
- The effect is multiplied when using `callDuringReplay: true` and replaying long Workflow histories because the Workflow Task timer starts when the first history page is delivered to the Worker.
