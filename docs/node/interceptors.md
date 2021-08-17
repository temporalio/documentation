---
id: interceptors
title: Interceptors in Node
sidebar_label: Interceptors
---

Interceptors are a mechanism for users to modify inbound and outbound SDK calls.
Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities.
You can compare these to "middleware" in other frameworks.

The Node.js SDK comes with an optional interceptor package that adds tracing with [opentelemtry](https://www.npmjs.com/package/@temporalio/interceptors-opentelemetry). See how to use it in this [sample](https://github.com/temporalio/sdk-node/tree/main/samples/interceptors-opentelemetry).

## Interceptor types

- [WorkflowInboundCallsInterceptor](https://nodejs.temporal.io/api/interfaces/workflow.workflowinboundcallsinterceptor/) - Intercept Workflow inbound calls like execution, and signal and query handling.
- [WorkflowOutboundCallsInterceptor](https://nodejs.temporal.io/api/interfaces/workflow.workflowoutboundcallsinterceptor/) - Intercept Workflow outbound calls to Temporal APIs like scheduling Activities and starting Timers
- [ActivityInboundCallsInterceptor](https://nodejs.temporal.io/api/interfaces/worker.activityinboundcallsinterceptor) - Intercept inbound calls to an activity (e.g. execute).
- [WorkflowClientCallsInterceptor](https://nodejs.temporal.io/api/interfaces/client.workflowclientcallsinterceptor/) - Intercept methods of [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient/) and [`WorkflowStub`](https://nodejs.temporal.io/api/interfaces/client.workflowstub) like starting an signaling a Workflow

## How interceptors work

Interceptors are run in a chain, all of the interceptors work in a similar manner, they accept 2 arguments: `input` and `next` where `next` calls the next interceptor in the chain.
All interceptor methods are optional, it's up to the implementor to choose which methods to intercept.

## Interceptor examples

<!--TODO use snipsync-->

### Log start and completion of Activities

```ts
import {
  ActivityInput,
  Next,
  WorkflowOutboundCallsInterceptor,
} from "@temporalio/workflows";

export class ActivityLogInterceptor
  implements WorkflowOutboundCallsInterceptor
{
  constructor(public readonly filename: string) {}

  async scheduleActivity(
    input: ActivityInput,
    next: Next<WorkflowOutboundCallsInterceptor, "scheduleActivity">
  ): Promise<unknown> {
    console.log("Starting activity", {activityType: input.activityType});
    try {
      return await next(input);
    } finally {
      console.log("Completed activity", {
        workflow: this.filename,
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
} from "@temporalio/workflows";

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
    next: Next<WorkflowInboundCallsInterceptor, "execute">
  ): Promise<unknown> {
    const authHeader = input.headers.get("auth");
    const {user, password} = authHeader
      ? await defaultDataConverter.fromPayload(authHeader)
      : undefined;

    if (!(user === "admin" && password === "admin")) {
      throw new Error("Unauthorized");
    }
    return await next(input);
  }
}
```

To properly do authorization from Workflow code, the Workflow would need to access encryption keys and possibly authenticate against an external user database, that requires the Workflow to break isolation using [external dependencies](/docs/node/external-dependencies).

## Interceptor registration

### Activity and client interceptors registration

- Activity interceptors are registered on Worker creation by passing an array of [`ActivityInboundCallsInterceptor` factory functions](https://nodejs.temporal.io/api/interfaces/worker.activityinboundcallsinterceptorfactory) via [WorkerOptions](https://nodejs.temporal.io/api/interfaces/worker.workeroptions#interceptors).

- Client interceptors are registered on `WorkflowClient` construction by passing an array of [`WorkflowClientCallsInterceptor` factory functions](https://nodejs.temporal.io/api/interfaces/client.workflowclientcallsinterceptorfactory) via [WorkflowClientOptions](https://nodejs.temporal.io/api/interfaces/client.workflowclientoptions#interceptors).

### Workflow interceptors registration

Workflow interceptor registration is different than the other interceptors because they run in the Workflow isolate, to register workflow interceptors, export an `interceptors` variable from a file located in the `workflows` directory and provide the name of that file to the Worker on creation via [WorkerOptions](https://nodejs.temporal.io/api/interfaces/worker.workeroptions#interceptors).

At the time of construction, the Workflow Context is already initialized for the current Workflow.
Use [`Context.info`](https://nodejs.temporal.io/api/interfaces/workflow.workflowinfo) to add Workflow specific information in the interceptor.

`src/workflows/my-interceptors.ts`

```ts
import {Context} from "@temporalio/workflow";

export const interceptors = {
  outbound: [new ActivityLogInterceptor(Context.info.filename)],
  inbound: [],
};
```

`src/worker/index.ts`

```ts
const worker = await Worker.create({
  workDir: __dirname,
  interceptors: {workflowModules: ["my-interceptors"]},
});
```
