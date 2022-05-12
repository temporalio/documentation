---
id: how-to-set-a-workflow-run-timeout-in-java
title: How to set a Workflow Run Timeout in Java
sidebar_label: Workflow Run Timeout
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setWorkflowRunTimeout​` to set the Workflow Run Timeout.
tags:
  - java
  - how-to
  - developer-guide
---

In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setWorkflowRunTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Run Timeout.

- Type: `time.Duration`
- Default: Same as [WorkflowExecutionTimeout](/docs/java/how-to-set-a-workflow-execution-timeout-in-java).

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Run Timeout duration
                .setWorkflowRunTimeout(Duration.ofSeconds(10))
                .build());
```
