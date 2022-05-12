---
id: how-to-set-a-workflow-task-queue-in-java
title: How to set the Task Queue for Workflow Execution in Java
sidebar_label: Task Queue
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setTaskQueue​` to set the Workflow Task Queue.
tags:
  - java
  - how-to
  - developer-guide
---

In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setTaskQueue`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Task Queue.

- Type: `String`
- Default: none

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                // Set the Task Queue
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                .build());
```
