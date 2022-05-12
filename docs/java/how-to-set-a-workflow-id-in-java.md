---
id: how-to-set-a-workflow-id-in-java
title: How to set a custom Workflow Id in Java
sidebar_label: Workflow Id
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setWorkflowId​` to set the Workflow Id.
tags:
  - Java
  - how-to
  - developer-guide
---
In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setWorkflowId​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Id.

- Type: `String`
- Default: none

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                // Set the Workflow Id
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                .build());
```
