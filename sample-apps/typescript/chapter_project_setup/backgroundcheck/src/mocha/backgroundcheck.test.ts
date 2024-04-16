/* dacx */
/*
**How to add a Testing Framework and Tests for the Workflow and Activity.**

Each Temporal SDK has a testing suite that can be used in conjunction with a typical language specific testing framework.
In the TypeScript SDK, you'll use the [Mocha](https://mochajs.org/) library to write your tests, and the `@temporalio/testing` package to access
helpers to test Workflows and Activities.
*/
/*
You can test Workflow code for the following conditions:

- Workflow status. For example, did the Workflow reach a completed status?
- Error when checking for a result of a Workflow. Is there an error in getting the result returned by the Workflow?
- Workflow return value. If the Workflow did return something other than an error, is it what you expected it to be?


Add the following code to `src/mocha/backgroundcheck.test.ts` to test that the Workflow executes successfully.
*/
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { before, describe, it } from 'mocha';
import { Worker } from '@temporalio/worker';
import { backgroundCheck } from '../workflows';
import assert from 'assert';

describe('Background check workflow', () => {
  let testEnv: TestWorkflowEnvironment;

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it('successfully completes the Workflow', async () => {
    const ssn = '111-22-3333';
    const { client, nativeConnection } = testEnv;
    const taskQueue = 'testing';

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve('../workflows'),
      activities: {
        ssnTrace: async () => 'pass',
      },
    });

    const result = await worker.runUntil(
      client.workflow.execute(backgroundCheck, {
        args: [ssn],
        workflowId: 'background-check-test',
        taskQueue,
      }),
    );
    assert.equal(result, 'pass');
  });
});

/*
This test uses a local testing server that ships with the Temporal TypeScript SDK.
This server becomes the environment that runs the Worker. This example uses the `before` and `after` hooks
to set up and tear down the test environment.

In the body of the test case, you create an instance of a Worker and register the Workflow and Activities.
In this example, the Activity is mocked out and replaced with a function that returns a specific result..
This ensures that the Workflow test doesn't invoke the actual Activity.

Calling `client.workflow.execute(...)` executes the Workflow logic and any invoked Activities inside the test process.
The first parameter of `env.ExecuteWorkflow(...)` contains a reference to the
Workflow function. The second parameter contains an object that specifices the arguments for the Workflow, the Workflow ID,
and a Task Queue name.
*/

/* @dacx
id: backgroundcheck-boilerplate-add-test-framework
title: Add a testing framework
description: How to add a testing framework to your Temporal Application.
label: Test framework
tags:
- testing
- developer guide
- typescript sdk
lines: 2-8
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-tests
title: Add Workflow function tests
description: How to test Workflow code
label: Test Workflow code
tags:
- testing
- developer guide
- typescript sdk
lines: 9-60
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-test-details
title: Add Workflow function test details
description: Details about how to test Workflow code
label: Test Workflow code details
tags:
- testing
- developer guide
- typescript sdk
lines: 61-74
@dacx */
