---
id: how-to-set-workflow-timeouts-in-java
title: How to set Workflow Timeouts in Java
sidebar_label: Workflow Timeouts
description: Set the Workflow Execution Timeout with the `WorkflowStub` instance in the Client code using `WorkflowOptions.Builder.setWorkflowExecutionTimeout`.
tags:
  - java
  - how-to
  - developer-guide
---

Create an instance of [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) in the Client code and set your timeout.

Available timeouts are:

- [setWorkflowExecutionTimeout()](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html#setWorkflowExecutionTimeout(java.time.Duration)>)
- [setWorkflowRunTimeout()](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html#setWorkflowRunTimeout(java.time.Duration)>)
- [setWorkflowTaskTimeout()](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html#setWorkflowTaskTimeout(java.time.Duration)>)

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWorkflow")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Timeout duration
                .setWorkflowExecutionTimeout(Duration.ofSeconds(10))
                // .setWorkflowRunTimeout(Duration.ofSeconds(10))
                // .setWorkflowTaskTimeout(Duration.ofSeconds(10))
                .build());
```
