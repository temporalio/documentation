---
id: interceptors
title: Interceptors in TypeScript SDK
sidebar_label: Interceptors
description: Interceptors are a mechanism for users to modify inbound and outbound SDK calls. Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities. You can compare these to "middleware" in other frameworks.
---

Interceptors are a mechanism for users to modify inbound and outbound SDK calls.
Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities.
You can compare these to "middleware" in other frameworks.

The TypeScript SDK comes with an optional interceptor package that adds tracing with [opentelemetry](https://www.npmjs.com/package/@temporalio/interceptors-opentelemetry). See how to use it in this [sample](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry).

## Interceptor types

- [WorkflowInboundCallsInterceptor](https://typescript.temporal.io/api/interfaces/workflow.workflowinboundcallsinterceptor/) - Intercept Workflow inbound calls like execution, signals, and queries.
- [WorkflowOutboundCallsInterceptor](https://typescript.temporal.io/api/interfaces/workflow.workflowoutboundcallsinterceptor/) - Intercept Workflow outbound calls to Temporal APIs like scheduling Activities and starting Timers.
- [ActivityInboundCallsInterceptor](https://typescript.temporal.io/api/interfaces/worker.activityinboundcallsinterceptor) - Intercept inbound calls to an activity (e.g. execute).
- [WorkflowClientCallsInterceptor](https://typescript.temporal.io/api/interfaces/client.workflowclientcallsinterceptor/) - Intercept methods of [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient/) and [`WorkflowHandle`](https://typescript.temporal.io/api/interfaces/client.workflowhandle) like starting or signaling a Workflow.

## How interceptors work

Interceptors are run in a chain, all the interceptors work similarly, they accept 2 arguments: `input` and `next` where `next` calls the next interceptor in the chain.
All interceptor methods are optional—it's up to the implementor to choose which methods to intercept.

## Interceptor examples

<!--TODO use snipsync-->

### Log start and completion of Activities

```ts
import {
  ActivityInput,
  Next,
  WorkflowOutboundCallsInterceptor,
} from '@temporalio/workflow';

export class ActivityLogInterceptor
  implements WorkflowOutboundCallsInterceptor
{
  constructor(public readonly workflowType: string) {}

  async scheduleActivity(
    input: ActivityInput,
    next: Next<WorkflowOutboundCallsInterceptor, 'scheduleActivity'>
  ): Promise<unknown> {
    console.log('Starting activity', { activityType: input.activityType });
    try {
      return await next(input);
    } finally {
      console.log('Completed activity', {
        workflow: this.workflowType,
        activityType: input.activityType,
      });
    }
  }
}
```

### Authorization

```ts
import {
  defaultDataConverter,
  Next,
  WorkflowInboundCallsInterceptor,
  WorkflowInput,
} from '@temporalio/workflow';

/**
 * WARNING: This demo is meant as a simple auth example.
 * Do not use this for actual authorization logic.
 * Auth headers should be encrypted and credentials
 * stored outside of the codebase
 */
export class DumbWorkflowAuthInterceptor
  implements WorkflowInboundCallsInterceptor
{
  public async execute(
    input: WorkflowInput,
    next: Next<WorkflowInboundCallsInterceptor, 'execute'>
  ): Promise<unknown> {
    const authHeader = input.headers.auth;
    const { user, password } = authHeader
      ? await defaultDataConverter.fromPayload(authHeader)
      : undefined;

    if (!(user === 'admin' && password === 'admin')) {
      throw new Error('Unauthorized');
    }
    return await next(input);
  }
}
```

To properly do authorization from Workflow code, the Workflow would need to access encryption keys and possibly authenticate against an external user database, which requires the Workflow to break isolation.
Please contact us if you need to discuss this further.

## Interceptor registration

### Activity and client interceptors registration

- Activity interceptors are registered on Worker creation by passing an array of [`ActivityInboundCallsInterceptor` factory functions](https://typescript.temporal.io/api/interfaces/worker.activityinboundcallsinterceptorfactory) through [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions#interceptors).

- Client interceptors are registered on `WorkflowClient` construction by passing an array of [`WorkflowClientCallsInterceptor` factory functions](https://typescript.temporal.io/api/interfaces/client.workflowclientcallsinterceptorfactory) via [WorkflowClientOptions](https://typescript.temporal.io/api/interfaces/client.workflowclientoptions#interceptors).

### Workflow interceptors registration

Workflow interceptor registration is different from the other interceptors because they run in the Workflow isolate. To register Workflow interceptors, export an `interceptors` function from a file located in the `workflows` directory and provide the name of that file to the Worker on creation via [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions#interceptors).

At the time of construction, the Workflow Context is already initialized for the current Workflow.
Use [`workflowInfo`](https://typescript.temporal.io/api/namespaces/workflow#workflowinfo) to add Workflow specific information in the interceptor.

`src/workflows/my-interceptors.ts`

```ts
import { workflowInfo } from '@temporalio/workflow';

export const interceptors = () => ({
  outbound: [new ActivityLogInterceptor(workflowInfo().workflowType)],
  inbound: [],
});
```

`src/worker/index.ts`

```ts
const worker = await Worker.create({
  workflowsPath: require.resolve('./workflows'),
  interceptors: {
    workflowModules: [require.resolve('./workflows/my-interceptors')],
  },
});
```
