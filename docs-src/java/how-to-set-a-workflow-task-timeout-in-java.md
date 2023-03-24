---
id: how-to-set-a-workflow-task-timeout-in-java
title: How to set a Workflow Task Timeout in Java
sidebar_label: Workflow Task Timeout
description: Set the Workflow Task Timeout with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setWorkflowTaskTimeout`.
tags:
  - java
  - how-to
  - developer-guide
---

Set the Workflow Task Timeout with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowTaskTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: 10 seconds.
- Values: Maximum accepted value is 60 seconds.

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Task Timeout duration
                .setWorkflowTaskTimeout(Duration.ofSeconds(10))
                .build());
```
