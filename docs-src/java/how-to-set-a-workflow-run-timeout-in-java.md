---
id: how-to-set-a-workflow-run-timeout-in-java
title: How to set a Workflow Run Timeout in Java
sidebar_label: Workflow Run Timeout
description: Set the Workflow Run Timeout with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setWorkflowRunTimeout`.
tags:
  - java
  - how-to
  - developer-guide
---

Set the Workflow Run Timeout with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowRunTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: Same as [WorkflowExecutionTimeout](/java/how-to-set-a-workflow-execution-timeout-in-java).

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Run Timeout duration
                .setWorkflowRunTimeout(Duration.ofSeconds(10))
                .build());
```
