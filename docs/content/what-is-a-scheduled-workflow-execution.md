---
id: what-is-a-scheduled-workflow-execution
title: What is a Scheduled Workflow Execution?
description: A Scheduled Workflow Execution spawns at a specified date.
tags:
  - explanation
---

A Scheduled Workflow Execution is a Workflow Execution that spawns at a specified date and time.

The sch
Schedules are based on UTC time.



When you specify a cron schedule while starting the Workflow, the Temporal Server will treat the Workflow as a cron job.
It is that simple to ensure your Workflow runs on a specific schedule.

The Server only schedules the next run after the current run has completed, failed, or timed out.
If a Retry Policy is supplied, and the Workflow fails or timed out, the Workflow will be retried based on the Retry Policy. While the Workflow is retrying, the Server will not schedule the next run.
If the next scheduled run is due to occur while the Workflow is still running (or retrying), then the Server will skip that scheduled run.
A cron Workflow will not stop until it is terminated or cancelled.

:::note



:::

There are two ways that you can turn any Temporal Workflow into a repeatedly executed Workflow.

1. Start a Workflow Execution using the Temporal CLI with an optional cron schedule using the `--cron` argument.
2. **Recommended**: Supply a cron schedule when starting the Workflow Execution using the CronSchedule.
   parameter of <a href={props.docUrl}>StartWorkflowOptions</a>.

<div>{props.children}</div>

For Workflows with CronSchedule:

- CronSchedule is based on UTC time.
  For example, cron schedule "15 8 \* \* \*" will run daily at 8:15am UTC.
- If a Workflow Execution failed and a RetryPolicy is supplied to the `StartWorkflowOptions`, the Workflow Execution will be retried based on the RetryPolicy.
  While the Workflow Execution is retrying, the Server will not schedule the next Workflow Execution.
- The Temporal Server only schedules the next Workflow Execution after the current execution has completed.
  If the next execution is due to occur while the Workflow is currently executing (including retries), then the next execution will be skipped.
- Cron initiated Workflow Executions will not stop until they are terminated or cancelled.

Temporal supports the standard cron spec:

```go
// CronSchedule - Optional cron schedule for Workflow. If a cron schedule is specified, the Workflow will run
// as a cron based on the schedule. The scheduling will be based on UTC time. The schedule for the next run only happens
// after the current run is completed/failed/timeout. If a RetryPolicy is also supplied, and the Workflow failed
// or timed out, the Workflow will be retried based on the retry policy. While the Workflow is retrying, it won't
// schedule its next run. If the next schedule is due while the Workflow is running (or retrying), then it will skip that
// schedule. Cron Workflow will not stop until it is terminated or cancelled (by returning temporal.CanceledError).
// The cron spec is as follows:
// ┌───────────── minute (0 - 59)
// │ ┌───────────── hour (0 - 23)
// │ │ ┌───────────── day of the month (1 - 31)
// │ │ │ ┌───────────── month (1 - 12)
// │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
// │ │ │ │ │
// │ │ │ │ │
// * * * * *
CronSchedule string
```

The [crontab guru site](https://crontab.guru/) is useful for testing your cron expressions.
