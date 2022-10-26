---
id: how-to-skip-time-set-up-in-typescript
title: How to set up time skipping in TypeScript
sidebar_label: Set up time skipping
description: To set up time skipping, use `TestWorkflowEnvironment.createTimeSkipping`.
tags:
  - developer-guide
  - sdk
  - typescript
---

```bash
npm install @temporalio/testing
```

The `@temporalio/testing` package downloads the test server and exports [`TestWorkflowEnvironment`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment), which you use to connect the Client and Worker to the test server and interact with the test server.

[`TestWorkflowEnvironment.createTimeSkipping`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#createtimeskipping) starts the test server.
A typical test suite should set up a single instance of the test environment to be reused in all tests (for example, in a [Jest](https://jestjs.io/) `beforeAll` hook or a [Mocha](https://mochajs.org/) `before()` hook).

```typescript
import { TestWorkflowEnvironment } from '@temporalio/testing';

let testEnv: TestWorkflowEnvironment;

// beforeAll and afterAll are injected by Jest
beforeAll(async () => {
  testEnv = await TestWorkflowEnvironment.createTimeSkipping();
});

afterAll(async () => {
  await testEnv?.teardown();
});
```

`TestWorkflowEnvironment` has a [`client.workflow`](https://typescript.temporal.io/api/classes/testing.testworkflowenvironment/#workflowclient) and [`nativeConnection`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#nativeconnection) for creating Workers:

```typescript
import { Worker } from '@temporalio/worker';
import { v4 as uuid4 } from 'uuid';
import { workflowFoo } from './workflows';

test('workflowFoo', async () => {
  const worker = await Worker.create({
    connection: testEnv.nativeConnection,
    taskQueue: 'test',
    ...
  });
  const result = await worker.runUntil(
    testEnv.client.workflow.execute(workflowFoo, {
      workflowId: uuid4(),
      taskQueue: 'test',
    })
  );
  expect(result).toEqual('foo');
});
```

This test uses the test connection to create a Worker, runs the Worker until the Workflow is complete, and then makes an assertion about the Workflow’s result.
The Workflow is executed using `testEnv.workflowClient`, which is connected to the test server.
