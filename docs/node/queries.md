---
id: queries
title: Queries in Node
sidebar_label: Queries
---

## What is a Query?

**Queries** provide a mechanism to retrieve data OUT from a running Workflow.

## How to use Queries

### How to define a Query

To add query handlers to a workflow, add a `queries` property to the exported workflow object:

```ts
// interface
import {Workflow} from "@temporalio/workflow";

export interface SimpleQuery extends Workflow {
  main(): void;
  queries: {
    isBlocked(): boolean;
  };
}
```

### How to handle a Query

Query handlers can return any value.

```ts
// implementation
import {Trigger} from "@temporalio/workflow";
import {SimpleQuery} from "../interfaces";

let blocked = true;
const unblocked = new Trigger<void>();

const queries = {
  isBlocked(): boolean {
    return blocked;
  },
};

const signals = {
  unblock(): void {
    unblocked.resolve();
  },
};

async function main(): Promise<void> {
  await unblocked;
  blocked = false;
}

export const workflow: SimpleQuery = {main, queries, signals};
```

### How to poll a Query

Use the name you defined:

```ts
const client = new WorkflowClient();
const workflow = client.stub<SimpleQuery>("simple-query", {taskQueue: "test"});
await workflow.start();
await workflow.query.isBlocked(); // this gets data out
```
