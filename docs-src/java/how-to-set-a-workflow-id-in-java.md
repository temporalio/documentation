---
id: how-to-set-a-workflow-id-in-java
title: How to set a custom Workflow Id in Java
sidebar_label: Workflow Id
description: Set the Workflow Id with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setWorkflowId​`.
tags:
  - Java
  - how-to
  - developer-guide
---

Set the Workflow Id with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowId​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `String`
- Default: none

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                // Set the Workflow Id
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                .build());
```
