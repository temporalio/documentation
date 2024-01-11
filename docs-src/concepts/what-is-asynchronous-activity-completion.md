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
The Temporal Client can then be used from anywhere to both Heartbeat Activity Execution progress and eventually provide complete the Activity Execution and provide a result.

How to complete an Activity Asynchronously in:

- [Go](/dev-guide/go/features#asynchronous-activity-completion)
- [Java](/dev-guide/java/features#asynchronous-activity-completion)
- [PHP](/dev-guide/php/features#asynchronous-activity-completion)
- [Python](/dev-guide/python/features#asynchronous-activity-completion)
- [TypeScript](/dev-guide/typescript/features#asynchronous-activity-completion)

#### When to use Async Completion

When an external system has the final result of a computation that is started by an Activity, there are three main ways of getting the result to the Workflow:

1. The external system uses Async Completion to complete the Activity with the result.
2. The Activity completes normally, without the result. Later, the external system sends a Signal to the Workflow with the result.
3. A subsequent Activity [polls the external system](https://community.temporal.io/t/what-is-the-best-practice-for-a-polling-activity/328/2) for the result.

If you don't have control over the external system—that is, you can't add Async Completion or a Signal to its code—then

- you can poll (#3), or
- if the external system can reliably call a webhook (and retry calling in the case of failure), you can write a webhook handler that sends a Signal to the Workflow (#2).

The decision between using #1 vs #2 involves a few factors.
Use Async Completion if

- the external system is unreliable and might fail to Signal, or
- you want the external process to Heartbeat or receive Cancellation.

Otherwise, if the external system can reliably be trusted to do the task and Signal back with the result, and it doesn't need to Heartbeat or receive Cancellation, then you may want to use Signals.

The benefit to using Signals has to do with the timing of failure retries.
For example, consider an external process that is waiting for a human to review something and respond, and they could take up to a week to do so.
If you use Async Completion (#1), you would

- set a [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of one week on the Activity,
- in the Activity, notify the external process you need the human review, and
- have the external process Asynchronously Complete the Activity when the human responds.

If the Activity fails on the second step to notify the external system and doesn't throw an error (for example, if the Worker dies), then the Activity won't be retried for a week, when the Start-To-Close Timeout is hit.

If you use Signals, you would:

- set a [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of one minute on the Activity,
- in the Activity, notify the external process you need the human review,
- complete the Activity without the result, and
- have the external process Signal the Workflow when the human responds.

If the Activity fails on the second step to notify the external system and doesn't throw an error, then the Activity will be retried in a minute.

In the second scenario, the failure is retried sooner. This is particularly helpful in scenarios like this in which the external process might take a long time.
