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
| ------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
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

#### WorkflowId

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

#### TaskQueue

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

#### WorkflowExecutionTimeout

Set the [Workflow Execution Timeout](/concepts/what-is-a-workflow-execution-timeout) with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowExecutionTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: Unlimited

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Execution Timeout duration
                .setWorkflowExecutionTimeout(Duration.ofSeconds(10))
                .build());
```

#### WorkflowRunTimeout

Set the Workflow Run Timeout with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowRunTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: Same as [WorkflowExecutionTimeout](#workflowexecutiontimeout).

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Run Timeout duration
                .setWorkflowRunTimeout(Duration.ofSeconds(10))
                .build());
```

#### WorkflowTaskTimeout

Set the Workflow Task Timeout with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setWorkflowTaskTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

- Type: `time.Duration`
- Default: 10 seconds.
- Values: Maximum accepted value is 60 seconds.

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    WorkerGreet.greetclient.newWorkflowStub(
        GreetWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(WorkerGreet.TASK_QUEUE)
                // Set Workflow Task Timeout duration
                .setWorkflowTaskTimeout(Duration.ofSeconds(10))
                .build());
```

#### WorkflowIDReusePolicy

- Type: `WorkflowIdReusePolicy`
- Default: `AllowDuplicate`
- Values:
  - `enums.AllowDuplicateFailedOnly`: The Workflow can start if the earlier Workflow Execution failed, Canceled, or Terminated.
  - `AllowDuplicate`: The Workflow can start regardless of the earlier Execution's closure status.
  - `RejectDuplicate`: The Workflow can not start if there is a earlier Run.

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
```

#### RetryOptions

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

#### CronSchedule

A [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job) is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

A Cron Schedule is provided as an option when the call to spawn a Workflow Execution is made.

Set the Cron Schedule with the [`WorkflowStub`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html) instance in the Client code using [`WorkflowOptions.Builder.setCronSchedule`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html).

Setting `setCronSchedule` changes the Workflow Execution into a Temporal Cron Job.
The default timezone for a Cron is UTC.

- Type: `String`
- Default: None

```java
//create Workflow stub for YourWorkflowInterface
YourWorkflowInterface workflow1 =
    YourWorker.yourclient.newWorkflowStub(
        YourWorkflowInterface.class,
        WorkflowOptions.newBuilder()
                .setWorkflowId("YourWF")
                .setTaskQueue(YourWorker.TASK_QUEUE)
                // Set Cron Schedule
                .setCronSchedule("* * * * *")
                .build());
```

For more details, see the [Cron Sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/hello/HelloCron.java)

#### Memo

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

#### SearchAttributes

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
