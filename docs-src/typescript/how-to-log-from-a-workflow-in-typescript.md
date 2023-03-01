---
id: how-to-log-from-a-workflow-in-typescript
title: How to log from a Workflow in TypeScript
sidebar_label: Log from a Workflow
description: Log from a Workflow
tags:
  - developer-guide
  - sdk
  - typescript
  - log
---

Logging from Workflows is tricky for two reasons:

1. Workflows run in a sandboxed environment and cannot do any I/O.
1. Workflow code might get replayed at any time, generating duplicate log messages.

To work around these limitations, we recommend using the Sinks feature in the TypeScript SDK.
Sinks enable one-way export of logs, metrics, and traces from the Workflow isolate to the Node.js environment.

<!--
Workflows in Temporal may be replayed from the beginning of their history when resumed. In order for Temporal to recreate the exact state Workflow code was in, the code is required to be fully deterministic. To prevent breaking [determinism](https://legacy-documentation-sdks.temporal.io/typescript/determinism), in the TypeScript SDK, Workflow code runs in an isolated execution environment and may not use any of the Node.js APIs or communicate directly with the outside world. -->

Sinks are written as objects with methods. Similar to Activities, they are declared in the Worker and then proxied in Workflow code, and it helps to share types between both.

<details>
  <summary>Comparing Sinks, Activities and Interceptors</summary>

Sinks are similar to Activities in that they are both registered on the Worker and proxied into the Workflow.
However, they differ from Activities in important ways:

- Sink functions don't return any value back to the Workflow and cannot not be awaited.
- Sink calls are not recorded in Workflow histories (no timeouts or retries).
- Sink functions are _always_ run on the same Worker that runs the Workflow they are called from.

</details>

**Declaring the Sink Interface**

Explicitly declaring a Sink's interface is optional, but is useful for ensuring type safety in subsequent steps:

<!--SNIPSTART typescript-logger-sink-interface-->
[sinks/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/workflows.ts)
```ts
import { proxySinks, LoggerSinks, Sinks } from '@temporalio/workflow';

export interface AlertSinks extends Sinks {
  alerter: {
    alert(message: string): void;
  };
}

export type MySinks = AlertSinks & LoggerSinks;
```
<!--SNIPEND-->

**Implementing Sinks**

Implementing Sinks is a two-step process.

Implement and inject the Sink function into a Worker

<!--SNIPSTART typescript-logger-sink-worker-->
[sinks/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/worker.ts)
```ts
import { defaultSinks, InjectedSinks, Worker } from '@temporalio/worker';
import { MySinks } from './workflows';

async function main() {
  const sinks: InjectedSinks<MySinks> = {
    ...defaultSinks(),
    alerter: {
      alert: {
        fn(workflowInfo, message) {
          console.log(`sending SMS alert!
workflow: ${workflowInfo.runId}
message: ${message}`);
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

- Sink function implementations are passed as an object into [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions/#sinks)
- You can specify whether you want the injected function to be called during Workflow replay by setting the `callDuringReplay` boolean option.

**Proxy and call a Sink function from a Workflow**

<!--SNIPSTART typescript-logger-sink-workflow-->
[sinks/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/sinks/src/workflows.ts)
```ts
const { alerter, defaultWorkerLogger } = proxySinks<MySinks>();

export async function sinkWorkflow(): Promise<string> {
  defaultWorkerLogger.info('default logger: Workflow Execution started', {});
  alerter.alert('alerter: Workflow Execution started');
  return 'Hello, Temporal!';
}
```
<!--SNIPEND-->

Some important features of the [InjectedSinkFunction](https://typescript.temporal.io/api/interfaces/worker.InjectedSinkFunction) interface:

- **Injected WorkflowInfo argument**: The first argument of a Sink function implementation is a [`workflowInfo` object](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInfo/) that contains useful metadata.
- **Limited arguments types**: The remaining Sink function arguments are copied between the sandbox and the Node.js environment using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
- **No return value**: To prevent breaking determinism, Sink functions cannot return values to the Workflow.

**Advanced: Performance considerations and non-blocking Sinks**

The injected sink function contributes to the overall Workflow Task processing duration.

- If you have a long-running sink function, such as one that tries to communicate with external services, you might start seeing Workflow Task timeouts.
- The effect is multiplied when using `callDuringReplay: true` and replaying long Workflow histories because the Workflow Task timer starts when the first history page is delivered to the Worker.
