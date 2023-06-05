---
id: what-is-asynchronous-activity-completion
title: What is Asynchronous Activity Completion?
sidebar_label: Asynchronous Activity Completion
description: Asynchronous Activity Completion occurs when an external system provides the final result of a computation, started by an Activity, to the Temporal System.
tags:
  - term
  - explanation
---

Asynchronous Activity Completion is a feature that enables an Activity Function to return without causing the Activity Execution to complete.
The Temporal Client can then be used to both Heartbeat Activity Execution progress and eventually provide a result.

- [How to complete an Activity Asynchronously in Go](/go/async-activity-completion)
- [How to complete an Activity Asynchronously in Java](/java/async-activity-completion)
- [How to complete an Activity Asynchronously in PHP](/php/async-activity-completion)
- [How to complete an Activity Asynchronously in Python](/python/async-activity-completion)
- [How to complete an Activity Asynchronously in TypeScript](/typescript/async-activity-completion)

#### When to use Async Completion

The intended use case for this feature is when an external system has the final result of a computation, started by an Activity.
However, often it works better for the Activity to notify the external system, complete normally, and then wait in the Workflow for a [Signal](/concepts/what-is-a-signal) from the external system.

Consider using Async Completion when

- the external process is unreliable and might fail to send critical status updates through a Signal
- you want the external process to Heartbeat or receive Cancellation

Consider using Signals when you want to immediately retry a failure to notify the external system.

Immediate retries are helpful when the external process might take long time.
For example, if the external process is waiting for a human to review something and respond, and may take days, then if you set a [Start-To-Close Timeout](/activities#start-to-close-timeout) of one week on an Activity with Async Completion, it's possible that the Activity fails to notify the external system and doesn't throw an error (for example, if the Worker dies).
In this case, the Activity will be retried in a week.
It would be better to be able to retry the Activity immediately.
If the Activity completes normally after notifying the external system, it can have a short Start-To-Close Timeout of 10 seconds (for example, if the external system is notified by an API call that should never take more than 10 seconds).
In this case, if the notification fails, it will be retried after 10 seconds.
