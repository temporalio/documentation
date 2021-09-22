---
id: queries
title: Queries in Node
sidebar_label: Queries
---

## What is a Query?

[**Queries**](/docs/concepts/queries) provide a mechanism to retrieve data OUT from a running Workflow.

## How to use Queries

### How to define a Query

To add Query handlers to a Workflow, add a `queries` property to the exported Workflow object:

<!--SNIPSTART nodejs-blocked-interface-->
<!--SNIPEND-->

### How to handle a Query

Query handlers can return any value.

> 🚨 WARNING: NEVER mutate Workflow state inside a query! This would be a source of non-determinism.

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->

#### How NOT to write a Query

This mutates Workflow state - do not do this:

```ts
export const unblockOrCancel: Blocked = () => {
  let blocked = true;
  let someState = 123;

  return {
    queries: {
      isBlocked(): boolean {
        someState++; // bad! don't do this!
        return blocked;
      },
    },
    // ...
  };
};
```

### How to make a Query

> NOTE: You may query both running and completed Workflows.

Use the name of the function you defined:

```ts
const client = new WorkflowClient();
const workflow = client.createWorkflowHandle(unblockOrCancel, {
  taskQueue: 'test',
});
await workflow.start();
await workflow.query.isBlocked(); // this gets data out of the Workflow
```
