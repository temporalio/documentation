---
id: distributed-cron
title: Distributed CRON
---

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.html">

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

</DistributedCron>

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
