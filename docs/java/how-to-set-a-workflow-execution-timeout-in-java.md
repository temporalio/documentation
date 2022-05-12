---
id: how-to-set-a-workflow-execution-timeout-in-java
title: How to set a Workflow Execution Timeout in Java
sidebar_label: Workflow Execution Timeout
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setWorkflowExecutionTimeout​` to set the Workflow Execution Timeout.
tags:
  - java
  - how-to
  - developer-guide
---

In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setWorkflowExecutionTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Execution Timeout.

- Type: `time.Duration`
- Default: Unlimited

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Execution Timeout duration
                .setWorkflowExecutionTimeout(Duration.ofSeconds(10))
                .build());
```
