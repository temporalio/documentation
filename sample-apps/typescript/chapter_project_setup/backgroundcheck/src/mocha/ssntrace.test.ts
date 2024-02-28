/* dacx */
/*
You can test Activity code for the following conditions:

- Error when invoking the Activity Execution.
- Error when checking for the result of the Activity Execution.
- Activity return values. Check to ensure the return value is expected.

Add the following code to `src/mocha/ssntrace.test.ts` to test the `ssnTrace`
Activity and ensure it returns the expected value:

*/
import { MockActivityEnvironment } from '@temporalio/testing';
import { describe, it } from 'mocha';
import * as activities from '../activities';
import assert from 'assert';

describe('ssnTrace activity', async () => {
  it('successfully passes the ssn trace', async () => {
    const env = new MockActivityEnvironment();
    const ssn = '111-22-3333';
    const result = await env.run(activities.ssnTrace, ssn);
    assert.equal(result, 'pass');
  });
});

/* @dacx
id: backgroundcheck-boilerplate-add-activity-tests
title: Add Activity function tests
description: How to test Activity code
label: Test Activity code
lines: 1-25
tags:
- testing
- developer guide
- typescript sdk
@dacx */
