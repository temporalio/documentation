---
id: testing
title: Testing TypeScript Workflows
sidebar_label: Testing
---

:::note Sample available
Our samples repo contains examples of [testing with Jest](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/workflows.test.ts) and [Mocha](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/mocha/workflows.test.ts)
:::

The TypeScript SDK comes with an optional test framework (npm `@temporalio/testing`).

Upon installation, it will automatically download a test server with time skipping support (more on that later).

The test framework provides utilities for testing both Activities and Workflows.

## Testing Activities

Activities can be tested with [`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment)

The constructor accepts an optional partial Activity [`Info`](https://typescript.temporal.io/api/classes/activity.Info) object in case any info fields are needed for the test.

### Running an activity in Context

[`MockActivityEnvironment.run()`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment#run) runs a function in an Activity [Context](https://typescript.temporal.io/api/classes/activity.Context).

```ts
import { Context } from '@temporalio/activity';
import { MockActivityEnvironment } from '@temporalio/testing';

const env = new MockActivityEnvironment({ attempt: 2 });
const result = await env.run(
  async (x) => x + Context.current().info.attempt,
  2,
);
assert.equal(result, 4);
```

### Heartbeats and cancellation

`MockActivityEnvironment` is an [`EventEmitter`](https://nodejs.org/api/events.html#class-eventemitter) that emits a `heartbeat` event which you can use to listen for heartbeats emitted by the Activity.

> NOTE: When run by a `Worker`, heartbeats are throttled to avoid overloading the server.
> `MockActivityEnvironment`, however, does not apply any throttling.

It also exposes a `cancel` method which cancels the Activity Context.

```ts
import { CancelledFailure, Context } from '@temporalio/activity';
import { MockActivityEnvironment } from '@temporalio/testing';

const env = new MockActivityEnvironment();

env.on('heartbeat', (d: unknown) => {
  if (d === 6) {
    env.cancel('test');
  }
});

await assert.rejects(
  () =>
    env.run(async () => {
      Context.current().heartbeat(6);
      await Context.current().sleep(100); // <- sleep is cancellation aware
    }),
  (err) => {
    assert.ok(err instanceof CancelledFailure);
  },
);
```

## Testing Workflows

Workflows can be tested with [`TestWorkflowEnvironment`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment).

A typical test suite would set up a single instance of the test environment to be reused in all tests (e.g. in a [Mocha](https://mochajs.org/) `before()` hook or a [Jest](https://jestjs.io/) `beforeAll` hook).

When creating an environment, [`TestWorkflowEnvironment.create`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#create) will automatically start a test server that you can access with [`client`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#client) and [`nativeConnection`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment#nativeconnection).

### Example setup

`beforeAll` and `afterAll` are injected by `jest`. To use mocha instead, change them to `before` and `after`, and import:

```ts
import { after, before } from 'mocha';
```

```ts
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { v4 as uuid4 } from 'uuid';
import type * as Activities from './activities'; // Uses types to ensure our mock signatures match
import { httpWorkflow } from './workflows';

let testEnv: TestWorkflowEnvironment;

beforeAll(async () => {
  testEnv = await TestWorkflowEnvironment.create();
});

afterAll(async () => {
  await testEnv?.teardown();
});
```

### Mocking Activities

Since the `TestWorkflowEnvironment` is meant for testing Workflows, you'd typically want to mock your Activities in tests to avoid generating side effects.

```ts
test('httpWorkflow with mock activity', async () => {
  const { client, nativeConnection } = testEnv;

  // Implement only the relevant activities for this workflow
  const mockActivities: Partial<typeof Activities> = {
    makeHTTPRequest: async () => '99',
  };
  const worker = await Worker.create({
    connection: nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('./workflows'),
    activities: mockActivities,
  });
  const result = await worker.runUntil(
    await client.workflow.execute(httpWorkflow, {
      workflowId: uuid4(),
      taskQueue: 'test',
    }),
  );
  assert.strictEqual(result, 'The answer is 99');
});
```

### Time skipping in Workflows

The built-in test server automatically "skips" (fast forwards) time when no Activities are executing.
The test server starts in "normal" time, using the `TestWorkflowEnvironment.client.workflow` `execute` or `result`
methods switch the test server to "skipped" time mode until the Workflow completes.
If a Workflow sleeps for days, running it in the test environment will cause it to complete almost immediately.

`workflows.ts`

```ts
import { sleep } from '@temporalio/workflow';

export async function sleeperWorkflow() {
  await sleep('1 day');
}
```

`test.ts`

```ts
test('sleep completes almost immediately', async () => {
  const worker = await Worker.create({
    connection: testEnv.nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('../workflows'),
  });
  // Does not wait an entire day
  await worker.runUntil(
    testEnv.client.workflow.execute(sleeperWorkflow, {
      workflowId: uuid(),
      taskQueue: 'test',
    }),
  );
});
```

### Time skipping in Tests

You can also call `testEnv.sleep()` from your test code to advance the test server's time.
This is useful for testing intermediate state, or for testing infinite Workflows.
However, to advance time using `testEnv.sleep()`, you need to start the Workflow using `start()`, not `execute()`.

`workflow.ts`

```ts
import { sleep } from '@temporalio/workflow';
import { defineQuery, setHandler } from '@temporalio/workflow';

export const daysQuery = defineQuery('days');

export async function sleeperWorkflow() {
  let numDays = 0;

  setHandler(daysQuery, () => numDays);

  for (let i = 0; i < 100; ++i) {
    await sleep('1 day');
    ++numDays;
  }
}
```

`test.ts`

```ts
test('advancing time using `testEnv.sleep()`', async () => {
  // Important: `start()` starts the test server in "normal" mode,
  // not skipped time mode. If you don't advance time using `testEnv.sleep()`,
  // then `sleeperWorkflow()` will run for days.
  handle = await testEnv.client.workflow.start(sleeperWorkflow, {
    taskQueue,
    workflowId: uuidv4(),
  });

  let numDays = await handle.query(daysQuery);
  assert.strictEqual(numDays, 0);

  // Advance the test server's time by 25 hours and assert that
  // `sleeperWorkflow()` correctly incremented `numDays`.
  await testEnv.sleep('25 hours');
  numDays = await handle.query(daysQuery);
  assert.strictEqual(numDays, 1);

  // Advance the test server's time by an additional 25 hours and
  // assert that `sleeperWorkflow()` incremented `numDays` a second time.
  await testEnv.sleep('25 hours');
  numDays = await handle.query(daysQuery);
  assert.strictEqual(numDays, 2);
});
```

### Time skipping in Activities

When an Activity is executing time switches back to "normal",
[`TestWorkflowEnvironment.sleep`](https://typescript.temporal.io/api/classes/testing.TestWorkflowEnvironment/#sleep)
can be used outside of Workflow code to skip time.

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
      // test server switches to "normal" time while an activity is executing.
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
    testEnv.client.workflow.execute(processOrderWorkflow, {
      workflowId: uuid(),
      taskQueue: 'test',
      args: [
        {
          orderProcessingMS: ms('3 days'),
          sendDelayedEmailTimeoutMS: ms('1 day'),
        },
      ],
    }),
  );
  assert.strictEqual(emailSent, true);
});
```

### Test arbitrary functions in Workflow context

In case you need to test a function in your Workflow code that's not exported in [`workflowsPath`](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions/#workflowspath), export it in a different path and register it with the Worker.

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
  workflowsPath: require.resolve(
    './workflows/file-with-workflow-function-to-test',
  ),
});

await worker.runUntil(
  testEnv.client.workflow.execute(functionToTest, workflowOptions),
);
```

### Asserting from Workflow code

In some cases it's useful to assert directly in Workflow context.

The Workflow context is injected with the Node.js [`assert`](https://nodejs.org/api/assert.html) module and can be imported with `import assert from 'assert'`.

By default, failed `assert` statements throw `AssertionError`s which cause Workflow Tasks to fail and be indefinitely retried.
To prevent this, use `workflowInterceptorModules` from `@temporalio/testing`. These interceptors catch `AssertionError`s and turn them into `ApplicationFailure`s that fail the entire Workflow Execution (not just the Workflow Task).

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
  workflowsPath: require.resolve(
    './workflows/file-with-workflow-function-to-test',
  ),
});

await worker.runUntil(
  testEnv.client.workflow.execute(functionToTest, workflowOptions), // Throws WorkflowFailedError
);
```

### Testing with Jest

There are a couple of caveats for testing with Jest:

1. The Temporal TypeScript SDK only supports Jest `>= 27.0.0`.
1. Make sure you run Jest with [`testEnvironment: 'node'`](https://jestjs.io/docs/configuration#testenvironment-string). `testEnvironment: 'jsdom'` is not supported.
