In Temporal, a Task Queue is represented in code by its name as a `string`.

There are two main places where the name of the Task Queue is supplied by the developer.
When scheduling a Workflow, a `taskQueue` must be specified.

```typescript
import {WorkflowClient} from "@temporalio/client";
const client = new WorkflowClient();
const result = await client.execute(myWorkflow, {
  taskQueue: "testhttp", // required
  workflowId: "business-meaningful-id", // also required but not the point
});
```

When creating a Worker, you must pass the `taskQueue` option to the [`Worker.create()` function](https://typescript.temporal.io/api/classes/worker.worker#create).

```typescript
const worker = await Worker.create({
  activities, // imported elsewhere
  taskQueue: "my-task-queue",
});
```

Optionally, in a Workflow Function, when calling an Activity, you can specify the Task Queue by passing the `taskQueue` option to [`proxyActivities()`](https://typescript.temporal.io/api/namespaces/workflow/#proxyActivities) or [`startChild/executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild).
If you do not specify a `taskQueue`, then the Temporal TypeScript SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.
