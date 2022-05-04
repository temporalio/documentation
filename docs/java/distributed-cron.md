---
id: distributed-cron
title: Distributed CRON
---

<!-- prettier-ignore -->
import * as WhatIsATemporalCronJob from '../concepts/what-is-a-temporal-cron-job.md'

This is how you set a cron schedule in Java:

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

Setting `setCronSchedule` turns the Workflow Execution into a <preview page={WhatIsATemporalCronJob}>Temporal Cron Job</preview>

You can check our [Java samples](https://github.com/temporalio/samples-java/blob/master/src/main/java/io/temporal/samples/hello/HelloCron.java) for example code.

Java SDK `workflowOptions` source code: https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.html

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
