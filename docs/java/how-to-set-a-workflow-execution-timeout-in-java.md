---
id: how-to-set-a-workflow-execution-timeout-in-java
title: How to set a Workflow Execution Timeout in Java
sidebar_label: Workflow Execution Timeout
description: Set the Workflow Execution Timeout with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setWorkflowExecutionTimeout`.
tags:
  - java
  - how-to
  - developer-guide
---

Set the [Workflow Execution Timeout](/concepts/what-is-a-workflow-execution-timeout) with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowExecutionTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: Unlimited

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Execution Timeout duration
                .setWorkflowExecutionTimeout(Duration.ofSeconds(10))
                .build());
```
