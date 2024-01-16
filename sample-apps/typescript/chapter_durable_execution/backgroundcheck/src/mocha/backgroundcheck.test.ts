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
      })
    );
    assert.equal(result, 'pass');
  });
});

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
