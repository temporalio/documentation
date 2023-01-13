---
id: how-to-set-a-cron-schedule-in-java
title: How to set a Cron Schedule in Java
sidebar_label: Cron Schedule
description: Set the Cron Schedule with the `WorkflowStub` instance in the Client code using [`WorkflowOptions.Builder.setCronSchedule`
tags:
  - java
  - how-to
  - developer-guide
---

Set the Cron Schedule with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setCronSchedule`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

Setting `setCronSchedule` changes the Workflow Execution into a Temporal Cron Job.
The default timezone for a Cron is UTC.

- Type: `String`
- Default: None

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    YourWorker.yourclient.newWorkflowStub(
        YourWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(YourWorker.TASK_QUEUE)
                // Set Cron Schedule
                .setCronSchedule("* * * * *")
                .build());
```

For more details, see the [Cron Sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/hello/HelloCron.java)
