---
id: go-distributed-cron
title: Distributed CRON
---

It is relatively straightforward to turn any Temporal workflow into a Cron workflow. All you need
is to supply a cron schedule when starting the workflow using the CronSchedule
parameter of
[StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).

You can also start a workflow using the Temporal CLI with an optional cron schedule using the `--cron` argument.

For workflows with CronSchedule:

* Cron schedule is based on UTC time. For example cron schedule "15 8 \* \* \*"
  will run daily at 8:15am UTC.
* If a workflow failed and a RetryPolicy is supplied to the StartWorkflowOptions
  as well, the workflow will retry based on the RetryPolicy. While the workflow is
  retrying, the server will not schedule the next cron run.
* Temporal server only schedules the next cron run after the current run is
  completed. If the next schedule is due while a workflow is running (or retrying),
  then it will skip that schedule.
* Cron workflows will not stop until they are terminated or cancelled.

Temporal supports the standard cron spec:

```go
// CronSchedule - Optional cron schedule for workflow. If a cron schedule is specified, the workflow will run
// as a cron based on the schedule. The scheduling will be based on UTC time. The schedule for next run only happen
// after the current run is completed/failed/timeout. If a RetryPolicy is also supplied, and the workflow failed
// or timed out, the workflow will be retried based on the retry policy. While the workflow is retrying, it won't
// schedule its next run. If next schedule is due while the workflow is running (or retrying), then it will skip that
// schedule. Cron workflow will not stop until it is terminated or cancelled (by returning temporal.CanceledError).
// The cron spec is as following:
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

## Convert existing cron workflow

Before CronSchedule was available, the previous approach to implementing cron
workflows was to use a delay timer as the last step and then return
`ContinueAsNew`. One problem with that implementation is that if the workflow
fails or times out, the cron would stop.

To convert those workflows to make use of Temporal CronSchedule, all you need is to
remove the delay timer and return without using
`ContinueAsNew`. Then start the workflow with the desired CronSchedule.


## Retrieve last successful result

Sometimes it is useful to obtain the progress of previous successful runs.
This is supported by two new APIs in the client library:
`HasLastCompletionResult` and `GetLastCompletionResult`. Below is an example of how
to use this in Go:

```go
func CronWorkflow(ctx workflow.Context) (CronResult, error) {
    startTimestamp := time.Time{} // By default start from 0 time.
    if workflow.HasLastCompletionResult(ctx) {
        var progress CronResult
        if err := workflow.GetLastCompletionResult(ctx, &progress); err == nil {
            startTimestamp = progress.LastSyncTimestamp
        }
    }
    endTimestamp := workflow.Now(ctx)

    // Process work between startTimestamp (exclusive), endTimestamp (inclusive).
    // Business logic implementation goes here.

    result := CronResult{LastSyncTimestamp: endTimestamp}
    return result, nil
}
```

Note that this works even if one of the cron schedule runs failed. The
next schedule will still get the last successful result if it ever successfully
completed at least once. For example, for a daily cron workflow, if the first day
run succeeds and the second day fails, then the third day run will still get
the result from first day's run using these APIs.
