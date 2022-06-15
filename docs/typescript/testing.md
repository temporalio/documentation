---
id: testing
title: Testing TypeScript Workflows
sidebar_label: Testing
---

The TypeScript SDK comes with an optional test framework (npm [`@temporalio/testing`](https://www.npmjs.com/package/@temporalio/testing)).

Upon installation, it will automatically download a test server with time skipping support (more on that later).

The test framework provides utilities for testing both Activities and Workflows.

## Testing Activities

Activities can be tested with [`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment)

The constructor accepts an optional partial activity [`Info`](https://typescript.temporal.io/api/classes/activity.Info) object in case any info fields are needed for the test.

### Running an activity in Context

[`MockActivityEnvironment.run()`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment#run) runs a function in an activity [Context](https://typescript.temporal.io/api/classes/activity.context).

```ts
import { MockActivityEnvironment } from '@temporalio/testing';
import { Context } from '@temporalio/activity';

const env = new MockActivityEnvironment({ attempt: 2 });
const result = await env.run(
  async (x) => x + Context.current().info.attempt,
  2
);
assert.equal(result, 4);
```

### Heartbeats and cancellation

`MockActivityEnvironment` is an [`EventEmitter`](https://nodejs.org/api/events.html#class-eventemitter) which emits a `heartbeat` event which you can use to listen on heartbeats emitted by the Activity.

It also exposes a `cancel` method which cancels the Activity Context.

```ts
import { MockActivityEnvironment } from '@temporalio/testing';
import { CancelledFailure, Context } from '@temporalio/activity';

const env = new MockActivityEnvironment();

env.on('heartbeat', (d: unknown) => {
  if (d === 6) {
    env.cancel('test');
  }
});

await assert.rejects(
  () =>
    env.run(async (x) => {
      Context.current().heartbeat(6);
      await Context.current().sleep(100); // <- sleep is cancellation aware
    }, 3),
  (err) => {
    assert.ok(err instanceof CancelledFailure);
  }
);
```

## Testing Workflows

Workflows can be tested with [`TestWorkflowEnvironment`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment).

A typical test suite would set up a single instance of the test environment to be reused in all tests (e.g. in a [jest](https://jestjs.io/) `beforeAll` hook).

When creating an environment [`TestWorkflowEnvironment.create`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#create) it will automatically start a test server which you can access with [`workflowClient`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#workflowclient) and [`nativeConnection`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#nativeconnection).

### Example setup

> NOTE: `beforeAll` and `afterAll` are injected by `jest`.

```ts
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { v4 as uuid4 } from 'uuid';
import { httpWorkflow } from './workflows';
import type * as Activities from './activities'; // Uses types to ensure our mock signatures match

let testEnv: TestWorkflowEnvironment;

beforeAll(async () => {
  testEnv = await TestWorkflowEnvironment.create();
});

afterAll(async () => {
  await testEnv?.teardown();
});
```

### Mocking Activities

Since the `TestWorkflowEnvironment` is meant for testing Workflows, you'd typically want to mock your activities in tests to avoid generating side-effects.

```ts
test('httpWorkflow with mock activity', async () => {
  const { workflowClient, nativeConnection } = testEnv;

  // Implement only the relevant activities for this workflow
  const activities: Partial<typeof Activities> = {
    makeHTTPRequest: async () => '99',
  };
  const worker = await Worker.create({
    connection: nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('./workflows'),
    activities,
  });
  const result = await worker.runUntil(
    await workflowClient.execute(httpWorkflow, {
      workflowId: uuid4(),
      taskQueue: 'test',
    })
  );
  expect(result).toEqual('The answer is 99');
});
```

### Time skipping

The built-in test server automatically "skips" (fast forwards) time when no activities are executing.
If a Workflow sleeps for days, running it in the test environment will cause it to complete almost immediately.

<details>
<summary>
Workflow implementation
</summary>

<!--SNIPSTART typescript-timer-reminder-workflow-->
<!--SNIPEND-->

</details>

```ts
test('countdownWorkflow sends reminder email if processing does not complete in time', async () => {
  // NOTE: this tests doesn't actually take days to complete, the test environment starts a test
  // server that automatically skips time when there are no running activities.
  let emailSent = false;
  // createActivities defintion omitted for brevity
  const activities: ReturnType<typeof createActivities> = {
    async processOrder() {
      // Test server switches to "normal" time while an activity is executing.
      // Call `sleep` to skip time by "2 days".
      await testEnv.sleep('2 days');
    },
    async sendNotificationEmail() {
      emailSent = true;
    },
  };
  const worker = await Worker.create({
    connection: testEnv.nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('../workflows'),
    activities,
  });
  await worker.runUntil(
    testEnv.workflowClient.execute(processOrderWorkflow, {
      workflowId: uuid(),
      taskQueue: 'test',
      args: [
        {
          orderProcessingMS: ms('3 days'),
          sendDelayedEmailTimeoutMS: ms('1 day'),
        },
      ],
    })
  );
  expect(emailSent).toBe(true);
});
```

### Test arbitrary functions in Workflow context

In case you need to test a function in your Workflow code that's not exported in [`workflowsPath`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#workflowspath), export it in a different path and register it with the Worker.

`workflows/file-with-workflow-function-to-test.ts`

```ts
import * as wf from '@temporalio/workflow';
import { someWorkflowToRunAsChild } from './some-workflow';

export { someWorkflowToRunAsChild }; // Must be re-exported here for Worker registration

export async function functionToTest() {
  await wf.executeChild(someWorkflowToRunAsChild);
  // Other test code
}
```

`test.ts`

```ts
const worker = await Worker.create({
  ...someOtherOptions,
  connection: testEnv.nativeConnection,
  workflowPath: require.resolve('./workflows/file-workflow-function-to-test'),
});

await worker.runUntil(
  testEnv.workflowClient.execute(functionToTest, workflowOptions)
);
```

### Asserting from Workflow code

In some cases it's useful to assert directly in Workflow context.

The Workflow context is injected with the Node.js [`assert`](https://nodejs.org/api/assert.html) module and can be imported as any other module.

By default, failed `assert` statement throw `AssertionError`s which cause Workflow Tasks to fail and be indefinitely retried.
To prevent this, make sure to use `workflowInterceptorModules` from `@temporalio/testing`, these interceptors will catch `AssertionError`s and turn them into `ApplicationFailure`s which fail the entire Workflow Execution.

`workflows/file-with-workflow-function-to-test.ts`

```ts
import assert from 'assert';

export async function functionToTest() {
  assert.ok(false);
}
```

`test.ts`

```ts
import {
  TestWorkflowEnvironment,
  workflowInterceptorModules,
} from '@temporalio/testing';

const worker = await Worker.create({
  ...someOtherOptions,
  connection: testEnv.nativeConnection,
  interceptors: {
    workflowModules: workflowInterceptorModules,
  },
  workflowPath: require.resolve('./workflows/file-workflow-function-to-test'),
});

await worker.runUntil(
  testEnv.workflowClient.execute(functionToTest, workflowOptions) // Throws WorkflowFailedError
);
```
