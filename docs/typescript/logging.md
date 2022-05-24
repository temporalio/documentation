---
id: logging
title: Logging and Sinks in TypeScript SDK
sidebar_label: Logging & Sinks
description: Workflow Sinks allow you to export information from the Workflow back to the Node.js environment, often used for logging, metrics, tracing.
---

:::note Sample available

A complete sample for setting up the instrumentation for the different components of the SDK is available on our [samples repo](https://github.com/temporalio/samples-typescript/tree/main/instrumentation).
:::

## Logging from Activities

Activities run in the standard Node.js environment and can use any Node.js logger.

<details>
<summary>
Inject Activity context via interceptor and log all Activity executions
</summary>

<!--SNIPSTART typescript-activity-logging-interceptor-->
<!--SNIPEND-->

</details>

<details>
<summary>
Use the injected logger from an Activity
</summary>

<!--SNIPSTART typescript-activity-use-injected-logger -->
<!--SNIPEND-->

</details>

## Logging from Workflows with Workflow Sinks

Logging from Workflows is tricky for two reasons:

1. Workflows run in a sandboxed environment and cannot do any I/O.
1. Workflow code might get replayed at any time, generating duplicate log messages.

To work around these limitations, we recommend using the Sinks feature in the TypeScript SDK.
Sinks enable one-way export of logs, metrics, and traces from the Workflow isolate to the Node.js environment.

<!--
Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking [determinism](/typescript/determinism), in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the outside world. -->

Sinks are written as objects with methods. Similar to Activities, they are declared in the Worker and then proxied in Workflow code, and it helps to share types between both.

<details>
  <summary>Comparing Sinks, Activities and Interceptors</summary>
  
Sinks are similar to Activities in that they are both registered on the Worker and proxied into the Workflow.
However, they differ from Activities in important ways:

- Sink functions don't return any value back to the Workflow and cannot not be awaited.
- Sink calls are not recorded in Workflow histories (no timeouts or retries).
- Sink functions are _always_ run on the same Worker that runs the Workflow they are called from.

</details>

### Declaring the Sink Interface

Explicitly declaring a Sink's interface is optional, but is useful for ensuring type safety in subsequent steps:

<!--SNIPSTART typescript-logger-sink-interface-->
<!--SNIPEND-->

### Implementing Sinks

Implementing Sinks is a two-step process.

#### Implement and inject the Sink function into a Worker

<!--SNIPSTART typescript-logger-sink-worker-->
<!--SNIPEND-->

- Sink function implementations are passed as an object into [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#sinks)
- You can specify whether you want the injected function to be called during Workflow replay by setting the `callDuringReplay` boolean option.

#### Proxy and call a Sink function from a Workflow

<!--SNIPSTART typescript-logger-sink-workflow-->
<!--SNIPEND-->

Some important features of the [InjectedSinkFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedSinkFunction) interface:

- **Injected WorkflowInfo argument**: The first argument of a Sink function implementation is a [`workflowInfo` object](https://typescript.temporal.io/api/interfaces/workflow.workflowinfo/) that contains useful metadata.
- **Limited arguments types**: The remaining Sink function arguments are copied between the sandbox and the Node.js environment using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
- **No return value**: To prevent breaking determinism, Sink functions cannot return values to the Workflow.

#### Advanced: Performance considerations and non-blocking Sinks

The injected sink function contributes to the overall Workflow Task processing duration.

- If you have a long-running sink function, such as one that tries to communicate with external services, you might start seeing Workflow Task timeouts.
- The effect is multiplied when using `callDuringReplay: true` and replaying long Workflow histories because the Workflow Task timer starts when the first history page is delivered to the Worker.

## Logging in Workers and Clients

The Worker comes with a default logger which defaults to log any messages with level `INFO` and higher to `STDERR` using `console.error`.
There are 5 levels in total: `TRACE`, `DEBUG`, `INFO`, `WARN`, and `ERROR`.

The reason we only offer a default logger is to minimize Worker dependencies and allow SDK users to bring their own logger.

### Customizing the default logger

Temporal ships a [`DefaultLogger`](https://typescript.temporal.io/api/classes/worker.defaultlogger/) that implements the basic interface:

#### Example: Set up the DefaultLogger to only log messages with level WARN and higher

```ts
import { Runtime, DefaultLogger } from '@temporalio/worker';

const logger = new DefaultLogger('WARN', ({ level, message }) => {
  console.log(`Custom logger: ${level} — ${message}`);
});
Runtime.install({ logger });
```

#### Example: Accumulate logs for testing/reporting

```ts
import { DefaultLogger, LogEntry } from '@temporalio/worker';

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
import { Runtime } from '@temporalio/worker';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new transports.File({ filename: '/path/to/worker.log' })],
});
Runtime.install({ logger });
```

## Metrics

For information about metrics, see the [Metrics section on the Deploy Checklist](/typescript/production-deploy#metrics) page.

## OpenTelemetry tracing

The [`interceptors-opentelemetry`](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry) sample shows how to use the SDK's built-in OpenTelemetry tracing to trace everything from starting a Workflow to Workflow Execution to running an Activity from that Workflow.

The built-in tracing uses protobuf message headers (like [this one](https://github.com/temporalio/api/blob/b2b8ae6592a8730dd5be6d90569d1aea84e1712f/temporal/api/workflowservice/v1/request_response.proto#L161) when starting a Workflow) to propagate the tracing information from the client to the Workflow and from the Workflow to its successors (when Continued As New), children, and Activities.
All of these executions are linked with a single trace identifier and have the proper parent->child span relation.

Tracing is compatible between different Temporal SDKs as long as compatible [context propagators](https://opentelemetry.lightstep.com/core-concepts/context-propagation/) are used.

### Context propagation

The TypeScript SDK uses the global OpenTelemetry propagator.

To extend the default ([Trace Context](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-core/README.md#w3ctracecontextpropagator-propagator) and [Baggage](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-core/README.md#baggage-propagator) propagators) to also include the [Jaeger propagator](https://www.npmjs.com/package/@opentelemetry/propagator-jaeger), follow these steps:

- `npm i @opentelemetry/propagator-jaeger`

- At the top level of your Workflow code, add the following lines:

  ```js
  import { propagation } from '@opentelemetry/api';
  import {
    CompositePropagator,
    W3CTraceContextPropagator,
    W3CBaggagePropagator,
  } from '@opentelemetry/core';
  import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';

  propagation.setGlobalPropagator(
    new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new JaegerPropagator(),
      ],
    })
  );
  ```

Similarly, you can customize the OpenTelemetry `NodeSDK` propagators by following the instructions in the [Initialize the SDK](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-node#initialize-the-sdk) section of the README.
