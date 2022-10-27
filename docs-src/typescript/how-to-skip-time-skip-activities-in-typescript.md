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
<!--SNIPEND-->

</details>

<!--SNIPSTART typescript-timer-reminder-test-->
<!--SNIPEND-->
