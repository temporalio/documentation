---
id: testing
title: Testing TypeScript Workflows
sidebar_label: Testing
description: The TypeScript SDK does not yet have a test suite that allows time skipping.
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

Full Testing support is still not available in the TypeScript SDK Beta and will be released before full launch.

</CustomWarning>

The TypeScript SDK does not yet have a test suite that allows time skipping, however, you might be able to get very far without it:

- Since Activities are async functions, they should be testable as long as you avoid using [Context](https://typescript.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://typescript.temporal.io/api/classes/client.workflowclient).
- Check [the SDK's own tests](https://github.com/temporalio/sdk-typescript/tree/52f67499860526cd180912797dc3e6d7fa4fc78f/packages/test/src) for more examples.
- For time skipping, you can implement a multiplier, for example a constant that is `1` in local dev or production, but `0.000001` when testing. Note that `process.env` is unavailable from Worklows so it should be passed in as an argument for the time being.

You can follow this format for writing basic unit tests can still be written (see [samples](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/workflows.test.ts)):

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { Worker, DefaultLogger } from '@temporalio/worker';
import { describe, before, after, afterEach, it } from 'mocha';
import { example } from '../lib/workflows';
import assert from 'assert';
import axios from 'axios';
import sinon from 'sinon';

describe('example workflow', function () {
  let runPromise = null;
  let worker = null;
  let client = null;

  before(async function () {
    this.timeout(10000);
    worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      taskQueue: 'testhttp',
      logger: new DefaultLogger('ERROR'),
    });

    runPromise = worker.run();
    const connection = new Connection();
    client = new WorkflowClient(connection.service);
  });

  after(async function () {
    worker.shutdown();
    await runPromise;
  });

  afterEach(() => {
    axios.get.restore && axios.get.restore();
  });

  it('returns correct result', async function () {
    const result = await client.execute(example, { taskQueue: 'testhttp' });
    assert.equal(result, 'The answer is 42');
  });

  it('retries one failure', async function () {
    // Make the first request fail, but subsequent requests succeed
    let numCalls = 0;
    sinon.stub(axios, 'get').callsFake(() => {
      if (numCalls++ === 0) {
        return Promise.reject(new Error('first error'));
      }
      return Promise.resolve({ data: { args: { answer: '88' } } });
    });

    const result = await client.execute(example);
    assert.equal(result, 'The answer is 88');
  });

  it('bubbles up activity errors', async function () {
    sinon
      .stub(axios, 'get')
      .callsFake(() => Promise.reject(new Error('example error')));

    const err = await client.execute(example, { taskQueue: 'testhttp' }).then(
      () => null,
      (err) => err
    );
    assert.equal(err.name, 'WorkflowFailedError');
    assert.equal(err.cause.cause.message, 'example error');
  });
});
```
