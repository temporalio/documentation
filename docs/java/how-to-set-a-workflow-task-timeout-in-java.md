---
id: how-to-set-a-workflow-task-timeout-in-java
title: How to set a Workflow Task Timeout in Java
sidebar_label: Workflow Task Timeout
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setWorkflowTaskTimeout​` to set the Workflow Task Timeout.
tags:
  - java
  - how-to
  - developer-guide
---

In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setWorkflowTaskTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Task Timeout.

- Type: `time.Duration`
- Default: 10 seconds.
- Values: Maximum accepted value is 60 seconds.

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Task Timeout duration
                .setWorkflowTaskTimeout(Duration.ofSeconds(10))
                .build());
```
