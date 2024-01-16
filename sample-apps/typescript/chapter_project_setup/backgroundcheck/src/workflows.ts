/* dacx */
/*
In the Temporal TypeScript SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.

Open the `src/workflows.ts` file in your editor. You'll place your Workflow Definition in this file.

To define a Workflow, import the Activity types and the `@temporalio/workflow` libraries:
*/

import * as workflow from '@temporalio/workflow';
import type * as activities from './activities';

/**
Define the Activity Execution options. `StartToCloseTimeout` or `ScheduleToCloseTimeout` must be set:
 */

const { ssnTrace } = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

/*
The `backgroundCheck` function that follows is an example of a basic Workflow Definition.
*/

export async function backgroundCheck(ssn: string): Promise<string> {
  return await ssnTrace(ssn);
}

/*
Temporal Workflows may have any number of custom parameters. However, we
strongly recommend that you use objects as parameters, so that the object's
individual fields may be altered without changing the signature of the
Workflow. All Workflow Definition parameters must be serializable.

Workflow return values must also be serializable. Returning results, returning
errors, or throwing exceptions is fairly idiomatic in each language that is
supported. However, Temporal APIs that must be used to get the result of a
Workflow Execution will only ever receive one of either the result or the
error.

To return a value of the Workflow function, use `Promise<something>`. The
Promise is used to make asynchronous calls and comes with guarantees.
*/

/* @dacx
id: backgroundcheck-boilerplate-backgroundcheck-workflow
title: Boilerplate Workflow code
label: Workflow code
description: In the Temporal TypeScript SDK programming model, an Activity Definition is an exportable function or an `object` method.
tags:
- typescript sdk
- developer guide
- workflow
- code sample
lines: 2-27
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-workflow-details
title: Boilerplate Workflow code
label: Workflow code
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- typescript sdk
- workflow
- developer guide
lines: 29-43
@dacx */
