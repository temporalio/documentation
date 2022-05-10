---
id: how-to-set-child-workflow-options-in-java
title: How to set ChildWorkflowOptions in Java
sidebar_label: Child Workflow Options
description: Set Child Workflow specific options with the `ChildWorkflowOptions` class.
tags:
  - java
  - developer-guide
---

Set Child Workflow specific options with the `ChildWorkflowOptions.Builder` class and [methods](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.8.0/io/temporal/workflow/ChildWorkflowOptions.Builder.html).

| Option                                                  | Required | Type                         |
| ------------------------------------------------------- | -------- | ---------------------------- |
| [`Namespace`](#namespace)                               | No       | String                       |
| [`WorkflowId`](#workflowId)                             | No       | String                       |
| [`ParentClosePolicy`](#parentclosepolicy)               | No       | ChildWorkflowOptions.Builder |
| [`WorkflowIdReusePolicy`](#workflowidreusepolicy)       | No       | WorkflowIdReusePolicy        |
| [`WorkflowExecutionTimeout`](#workflowexecutiontimeout) | No       | Duration                     |
| [`WorkflowRunTimeout`](#workflowruntimeout)             | No       | Duration                     |
| [`WorkflowTaskTimeout`](#workflowtasktimeout)           | No       | Duration                     |
| [`RetryOptions`](#retryoptions)                         | No       | RetryOptions                 |
| [`CronSchedule`](#cronschedule)                         | No       | String                       |
| [`Memo`](#memo)                                         | No       | String                       |
| [`SearchAttributes`](#searchattributes)                 | No       | Map<String, Object>          |

### `Namespace`

- Type: `String`
- Default: Inherits the `namespace` value set from the parent Workflow.

```java
public void parentWorkflow() {
   ChildWorkflowOptions options = ChildWorkflowOptions.newBuilder()
        .setNamespace("childWorkflowNamespace")
        .build();
   GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class, options);
  }
```

See [What is a Namespace?](/concepts/what-is-a-namespace)

### `WorkflowId`

- Type: `String`
- Default: none

```java
 private void parentWorkflow() {
        ChildWorkflowOptions options =
                ChildWorkflowOptions.newBuilder()
                        .setWorkflowId("childWorkflow1")
                        .build();

        // Get the Child Workflow stub
        ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, childWorkflowOptions);
        // invoke Child Workflow and wait for it to complete
        child.executeChild();
    }
```

See [What is a WorkflowId?](/concepts/what-is-a-workflow-id)

### `ParentClosePolicy`

- Type: `ChildWorkflowOptions.Builder`
- Default: None.

```java
   public void parentWorkflow() {
       ChildWorkflowOptions options =
          ChildWorkflowOptions.newBuilder()
              .setParentClosePolicy(ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON)
              .build();
       MyChildWorkflow child = Workflow.newChildWorkflowStub(MyChildWorkflow.class, options);
       Async.procedure(child::<workflowMethod>, <args>...);
       Promise<WorkflowExecution> childExecution = Workflow.getWorkflowExecution(child);
       // Wait for child to start
       childExecution.get()
  }
```

In this example, we are:

1. Setting `ChildWorkflowOptions.ParentClosePolicy` to `ABANDON` when creating a Child Workflow stub.
2. Starting Child Workflow Execution asynchronously using `Async.function` or `Async.procedure`.
3. Calling `Workflow.getWorkflowExecution(…)` on the child stub.
4. Waiting for the `Promise` returned by `getWorkflowExecution` to complete.
   This indicates whether the Child Workflow started successfully (or failed).
5. Completing parent Workflow Execution asynchronously.

Steps 3 and 4 are needed to ensure that a Child Workflow Execution starts before the parent closes.
If the parent initiates a Child Workflow Execution and then completes immediately after, the Child Workflow will never execute.

See [What is a Parent Close Policy?](/concepts/what-is-a-parent-close-policy)

### `WorkflowIdReusePolicy`

- Type: `WorkflowIdReusePolicy`
- Default: `enums.AllowDuplicateFailedOnly` is the default value. It means that the Workflow can start a new run if the previous run failed, was canceled, or was terminated.
- Values: `AllowDuplicate` allows a new run independently of the previous run closure status.
  `RejectDuplicate` doesn't allow a new run independently of the previous run closure status.

```java
 private void parentWorkflow() {
        ChildWorkflowOptions options = ChildWorkflowOptions.newBuilder()
        .setWorkflowId("MyWorkflowId")
        .setWorkflowRunTimeout(Duration.ofSeconds(5))
        .setWorkflowIdReusePolicy(
                WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE
        )
        .build();
        // Get the Child Workflow stub
        ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, childWorkflowOptions);
        // invoke Child Workflow and wait for it to complete
        child.executeChild();
    }
```

See [What is a Workflow Id Reuse Policy?](/concepts/what-is-a-workflow-id-reuse-policy)

### `WorkflowExecutionTimeout`

- Type: `time.Duration`
- Default: Unlimited

```java
 private void parentWorkflow() {
        ChildWorkflowOptions childWorkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        .setWorkflowExecutionTimeout(Duration.ofSeconds(10))
                        .build();
        // Get the Child Workflow stub
        ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, childWorkflowOptions);
        // invoke Child Workflow and wait for it to complete
        child.executeChild();
    }
```

See [What is a Workflow Execution Timeout?](/concepts/what-is-a-workflow-execution-timeout)

### `WorkflowRunTimeout`

- Type: `time.Duration`
- Default: Same as [WorkflowExecutionTimeout](#WorkflowExecutionTimeout).

```java
private void parentWorkflow() {
        ChildWorkflowOptions childWorkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        .setWorkflowRunTimeout(Duration.ofSeconds(4))
                        .build();
        // Get the Child Workflow stub
        ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, childWorkflowOptions);
        // invoke Child Workflow and wait for it to complete
        child.executeChild();
    }
```

See [What is a Workflow Run Timeout?](/concepts/what-is-a-workflow-run-timeout)

### `WorkflowTaskTimeout`

- Type: `time.Duration`
- Default: 10 seconds.
- Values: Maximum accepted value is 60 seconds.

```java
 private void parentWorkflow() {
        ChildWorkflowOptions childWorkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        .setWorkflowTaskTimeout(Duration.ofSeconds(10))
                        .build();
        // Get the Child Workflow stub
        ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, childWorkflowOptions);
        // invoke Child Workflow and wait for it to complete
        child.executeChild();
    }
```

See [What is a Workflow Task Timeout?](/concepts/what-is-a-workflow-task-timeout)

### `RetryOptions`

- Type: `RetryOptions`
- Default: `Null` which means no retries will be attempted.

```java
private static void parentWorkflow() {
        ChildWorkflowOptions childworkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        .setWorkflowExecutionTimeout(Duration.ofSeconds(10)
                        .setRetryOptions(RetryOptions.newBuilder()
                                .build())
                        .build();
         ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, ChildworkflowOptions);
         child.executeChild();
```

See [What is a Retry Policy?](/concepts/what-is-a-retry-policy)

### `CronSchedule`

- Type: `String`
- Default: None

```java
private static void parentWorkflow() {
        ChildWorkflowOptions childworkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        .setCronSchedule("@every 10s")
                        .build();
         ChildWorkflow child = Workflow.newChildWorkflowStub(ChildWorkflow.class, ChildworkflowOptions);
         child.executeChild();
```

See [Cron Schedules](/concepts/what-is-a-temporal-cron-job#cron-schedules)

### `Memo`

- Type: `String`
- Default: None

```java
private static void parentWorkflow() {
        ChildWorkflowOptions childworkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        // You can set additional non-indexed info via Memo
                        .setMemo(ImmutableMap.of(
                                "memoKey", "memoValue"
                        ))
                        .build();
```

See [What is a Memo?](/concepts/what-is-a-memo)

### `SearchAttributes`

- Type: `Map<String, Object>`
- Default: None

```java
private static void parentWorkflow() {
        ChildWorkflowOptions childworkflowOptions =
                ChildWorkflowOptions.newBuilder()
                        // You can set search attributes just like in WorkflowOptions
                        // make sure that these search attributes were added before
                        .setSearchAttributes(ImmutableMap.of("MySearchAttributeNAme", "value"))
                        .build();
```

See [What is a Search Attribute?](/concepts/what-is-a-search-attribute)
