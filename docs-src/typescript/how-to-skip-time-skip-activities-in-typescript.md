---
id: how-to-skip-time-skip-activities-in-typescript
title: How to skip time in Activities in TypeScript
sidebar_label: Skip time in Activities
description: To skip time in an Activity, call `TestWorkflowEnvironment.sleep` from the mock Activity.
tags:
  - developer-guide
  - sdk
  - typescript
---

Call [`TestWorkflowEnvironment.sleep`](https://typescript.temporal.io/api/classes/testing.testworkflowenvironment/#sleep) from the mock Activity.

In the following test, `processOrderWorkflow` sends a notification to the user after one day.
The `processOrder` mocked Activity calls `testEnv.sleep(‘2 days’)`, during which the Workflow sends email (by calling the `sendNotificationEmail` Activity).

Then, after the Workflow completes, we assert that `sendNotificationEmail` was called.

<details>
<summary>
Workflow implementation
</summary>

<!--SNIPSTART typescript-timer-reminder-workflow-->
[timer-examples/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/timer-examples/src/workflows.ts)
```ts
export async function processOrderWorkflow({
  orderProcessingMS,
  sendDelayedEmailTimeoutMS,
}: ProcessOrderOptions): Promise<string> {
  let processing = true;
  // Dynamically define the timeout based on given input
  const { processOrder } = proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: orderProcessingMS,
  });

  const processOrderPromise = processOrder().then(() => {
    processing = false;
  });

  await Promise.race([processOrderPromise, sleep(sendDelayedEmailTimeoutMS)]);

  if (processing) {
    await sendNotificationEmail();

    await processOrderPromise;
  }

  return 'Order completed!';
}
```
<!--SNIPEND-->

</details>

<!--SNIPSTART typescript-timer-reminder-test-->
[timer-examples/src/test/workflows.test.ts](https://github.com/temporalio/samples-typescript/blob/master/timer-examples/src/test/workflows.test.ts)
```ts
  it('sends reminder email if processOrder does not complete in time', async () => {
    // This test doesn't actually take days to complete: the TestWorkflowEnvironment starts the
    // Test Server, which automatically skips time when there are no running Activities.
    let emailSent = false;
    const mockActivities: ReturnType<typeof createActivities> = {
      async processOrder() {
        // Test server switches to "normal" time while an Activity is executing.
        // Call `env.sleep` to skip ahead 2 days, by which time sendNotificationEmail
        // should have been called.
        await env.sleep('2 days');
      },
      async sendNotificationEmail() {
        emailSent = true;
      },
    };
    const worker = await Worker.create({
      connection: env.nativeConnection,
      taskQueue: 'test',
      workflowsPath: require.resolve('../workflows'),
      activities: mockActivities,
    });
    await worker.runUntil(
      env.client.workflow.execute(processOrderWorkflow, {
        workflowId: uuid(),
        taskQueue: 'test',
        args: [{ orderProcessingMS: ms('3 days'), sendDelayedEmailTimeoutMS: ms('1 day') }],
      })
    );
    assert.ok(emailSent);
  });
```
<!--SNIPEND-->
