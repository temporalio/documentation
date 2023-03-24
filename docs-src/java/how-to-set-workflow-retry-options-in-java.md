---
id: how-to-set-workflow-retry-options-in-java
title: How to set Workflow Retry Options in Java
sidebar_label: Workflow Retry Options
description: Set Workflow Retry Options in the `WorkflowStub` instance using `WorkflowOptions.Builder.setWorkflowRetryOptions`.
tags:
  - java
  - how-to
  - developer-guide
---

To set a Workflow Retry Options in the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance use [`WorkflowOptions.Builder.setWorkflowRetryOptions`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `RetryOptions`
- Default: `Null` which means no retries will be attempted.

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Retry Options
                .setRetryOptions(RetryOptions.newBuilder()
                .build());
```
