---
id: how-to-set-a-workflow-task-queue-in-java
title: How to set the Task Queue for Workflow Execution in Java
sidebar_label: Task Queue
description: Set the Workflow Task Queue with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setTaskQueue`.
tags:
  - java
  - how-to
  - developer-guide
---

Set the Workflow Task Queue with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setTaskQueue`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `String`
- Default: none

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                // Set the Task Queue
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                .build());
```
