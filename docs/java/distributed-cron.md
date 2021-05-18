---
id: distributed-cron
title: Distributed CRON
---

You can turn any Temporal Workflow into a Cron Workflow. Two choices:

- start a Workflow using the Temporal CLI with an optional cron schedule using the `--cron` argument
- (recommended) Supply a cron schedule when starting the Workflow using the CronSchedule
parameter of
[StartWorkflowOptions](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.html).

```java
    WorkflowOptions workflowOptions =
        WorkflowOptions.newBuilder()
            .setWorkflowId(WORKFLOW_ID)
            .setTaskQueue(TASK_QUEUE)
            .setCronSchedule("* * * * *")
            .setWorkflowExecutionTimeout(Duration.ofMinutes(3))
            .setWorkflowRunTimeout(Duration.ofMinutes(1))
            .build();

    // Create the workflow client stub. It is used to start our workflow execution.
    GreetingWorkflow workflow = client.newWorkflowStub(GreetingWorkflow.class, workflowOptions);
```

You can [check our Java Samples](https://github.com/temporalio/samples-java/blob/master/src/main/java/io/temporal/samples/hello/HelloCron.java) for example code.

For Workflows with CronSchedule:

* CronSchedule is based on UTC time. For example cron schedule "15 8 \* \* \*"
  will run daily at 8:15am UTC.
* If a Workflow failed and a RetryPolicy is supplied to the StartWorkflowOptions
  as well, the Workflow will retry based on the RetryPolicy. While the Workflow is
  retrying, the server will not schedule the next cron run.
* Temporal server only schedules the next cron run after the current run is
  completed. If the next schedule is due while a Workflow is running (or retrying),
  then it will skip that schedule.
* Cron Workflows will not stop until they are terminated or cancelled.

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

## Convert an existing cron Workflow

Before CronSchedule was available, the previous approach to implementing cron
Workflows was to use a delay timer as the last step and then return
`ContinueAsNew`. One problem with that implementation is that if the Workflow
fails or times out, the cron would stop.

To convert those Workflows to make use of Temporal CronSchedule, all you need is to remove the delay timer and return without using
`ContinueAsNew`. Then start the Workflow with the desired CronSchedule.


## Retrieve last successful result

Sometimes it is useful to obtain the progress of previous successful runs.
This is supported by one new APIs in the Java SDK:
`GetLastCompletionResult`. The method returns null if there is no previous completion. Below is an example of how
to use this in Java:

```java
public String cronWorkflow() {
    String lastProcessedFileName = Workflow.getLastCompletionResult(String.class);

    // Process work starting from the lastProcessedFileName.
    // Business logic implementation goes here.
    // Updates lastProcessedFileName to the new value.

    return lastProcessedFileName;
}
```

Note that this works even if one of the cron schedule runs failed. The
next schedule will still get the last successful result if it ever successfully
completed at least once. For example, for a daily cron Workflow, if the first day
run succeeds and the second day fails, then the third day run will still get
the result from first day's run using these APIs.
