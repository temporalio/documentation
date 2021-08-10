There are two ways that you can turn any Temporal Workflow into a repeatedly executed Workflow.

1. Start a Workflow Execution using the Temporal CLI with an optional cron schedule using the `--cron` argument.
2. **Recommended**: Supply a cron schedule when starting the Workflow Execution using the CronSchedule.
   parameter of <a href={props.docUrl}>StartWorkflowOptions</a>.

<div>{props.children}</div>

Some details to note:

- **UTC Timezone**: CronSchedule is based on UTC time.
  For example, cron schedule "15 8 \* \* \*" will run daily at 8:15am UTC.
- **No Overlaps**: The Temporal Server only schedules the next Workflow Execution after the current execution has completed.
  If the next execution is due to occur while the Workflow is currently executing (including retries), then the next execution will be skipped.
- **Mind the Retry Policy**: If a Workflow Execution failed and a RetryPolicy is supplied to the `StartWorkflowOptions`, the Workflow Execution will be retried based on the RetryPolicy.
  While the Workflow Execution is retrying, the Server will not schedule the next Workflow Execution.
- **Cancellation applies to Cron**: Teminating or Canceling a Workflow Execution will also stop the cron scheduling.
  A Cron Workflow will not stop until it is terminated or cancelled (by returning temporal.CanceledError).

Temporal supports the standard cron spec:

```go
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
