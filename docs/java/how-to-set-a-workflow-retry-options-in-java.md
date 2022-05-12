---
id: how-to-set-a-workflow-retry-options-in-java
title: How to set a Workflow Retry Options in Java
sidebar_label: Workflow Retry Options
description: In the `WorkflowStub` instance for the Workflow in the Client code, use `WorkflowOptions.Builder.setWorkflowRetryOptions​` to set the Workflow Retry Options.
tags:
  - java
  - how-to
  - developer-guide
---

In the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance for the Workflow in the Client code, use [`WorkflowOptions.Builder.setWorkflowRetryOptions`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) to set the Workflow Retry Options.

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
