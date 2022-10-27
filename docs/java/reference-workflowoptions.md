---
id: reference-workflowoptions
title: Java WorkflowOptions reference
sidebar_label: Workflow Options reference
description: Create a `newWorkflowStub` in the Temporal Client code, call the instance of the Workflow, and set the Workflow options with the `WorkflowOptions.Builder` class.

tags:
  - developer-guide
  - options
---

Create a [`newWorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) in the Temporal Client code, call the instance of the Workflow, and set the Workflow options with the [`WorkflowOptions.Builder`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html) class.

The following fields are available:

| Option                                                  | Required             | Type                                                                                                                 |
| ------------------------------------------------------- | -------------------- |----------------------------------------------------------------------------------------------------------------------|
| [`WorkflowId`](#id)                                     | No (but recommended) | String                                                                                                               |
| [`TaskQueue`](#taskqueue)                               | **Yes**              | String                                                                                                               |
| [`WorkflowExecutionTimeout`](#workflowexecutiontimeout) | No                   | `Duration`                                                                                                           |
| [`WorkflowRunTimeout`](#workflowruntimeout)             | No                   | `Duration`                                                                                                           |
| [`WorkflowTaskTimeout`](#workflowtasktimeout)           | No                   | `Duration`                                                                                                           |
| [`WorkflowIdReusePolicy`](#workflowidreusepolicy)       | No                   | `WorkflowIdReusePolicy`                                                                                              |
| [`RetryOptions`](#retryoptions)                         | No                   | [`RetryOptions`](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.17.0/io/temporal/common/RetryOptions.html) |
| [`CronSchedule`](#cronschedule)                         | No                   | String                                                                                                               |
| [`Memo`](#memo)                                         | No                   | string                                                                                                               |
| [`SearchAttributes`](#searchattributes)                 | No                   | Map<String, Object>                                                                                                  |

### `Id`

import WorkflowId from './how-to-set-a-workflow-id-in-java.md'

<WorkflowId/>

### `TaskQueue`

import TaskQueue from './how-to-set-a-workflow-task-queue-in-java.md'

<TaskQueue/>

### `WorkflowExecutionTimeout`

import WFETimeout from './how-to-set-a-workflow-execution-timeout-in-java.md'

<WFETimeout/>

### `WorkflowRunTimeout`

import WFRTimeout from './how-to-set-a-workflow-run-timeout-in-java.md'

<WFRTimeout/>

### `WorkflowTaskTimeout`

import WFTTimeout from './how-to-set-a-workflow-task-timeout-in-java.md'

<WFTTimeout/>

### `WorkflowIDReusePolicy`

- Type: `WorkflowIdReusePolicy`
- Default: `enums.AllowDuplicateFailedOnly` is the default value. It means that the Workflow can start a new run if the previous run failed, was canceled, or was terminated.
- Values: `AllowDuplicate` allows a new run independently of the previous run closure status.
  `RejectDuplicate` doesn't allow a new run independently of the previous run closure status.

````java
```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Id Reuse Policy
                .setWorkflowIdReusePolicy(
                        WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE)
                .build());
````

### `RetryOptions`

import RetryOptions from './how-to-set-workflow-retry-options-in-java.md'

<RetryOptions/>

### `CronSchedule`

import CronSchedule from './how-to-set-a-cron-schedule-in-java.md'

<CronSchedule/>

### `Memo`

- Type: `String`
- Default: None

```java
//create Workflow stub for GreetWorkflowInterface
GreetWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("GreetWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Memo. You can set additional non-indexed info via Memo
                        .setMemo(ImmutableMap.of(
                                "memoKey", "memoValue"
                        ))
                .build());
```

### `SearchAttributes`

Search Attributes are additional indexed information attributed to Workflow and used for search and visibility.
These can be used in a query of List/Scan/Count Workflow APIs.
The key and its value type must be registered on Temporal server side.

- Type: `Map<String, Object>`
- Default: None

```java
private static void parentWorkflow() {
        ChildWorkflowOptions childworkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        // Set Search Attributes
                        .setSearchAttributes(ImmutableMap.of("MySearchAttributeNAme", "value"))
                        .build();
```

The following Java types are supported:

- String
- Long, Integer, Short, Byte
- Boolean
- Double
- OffsetDateTime
- Collection of the types in this list.
