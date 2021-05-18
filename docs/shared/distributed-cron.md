You can turn any Temporal Workflow into a repeatedly initiated Workflow. Two choices:

- start a Workflow using the Temporal CLI with an optional cron schedule using the `--cron` argument
- (recommended) Supply a cron schedule when starting the Workflow using the CronSchedule
  parameter of <a href={props.docUrl}>StartWorkflowOptions</a>.

<div>{props.children}</div>

For Workflows with CronSchedule:

- CronSchedule is based on UTC time. For example cron schedule "15 8 \* \* \*"
  will run daily at 8:15am UTC.
- If a Workflow failed and a RetryPolicy is supplied to the StartWorkflowOptions
  as well, the Workflow will retry based on the RetryPolicy. While the Workflow is
  retrying, the server will not schedule the next cron run.
- Temporal server only schedules the next cron run after the current run is
  completed. If the next schedule is due while a Workflow is running (or retrying),
  then it will skip that schedule.
- Cron Workflows will not stop until they are terminated or cancelled.

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
