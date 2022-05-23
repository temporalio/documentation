---
id: how-to-set-a-parent-close-policy-in-java
title: How to set Parent Close Policy in Java
sidebar_label: Parent Close Policy
description: Set `Parent Close Policy` on an instance of `ChildWorkflowOptions` using `ChildWorkflowOptions.newBuilder().setParentClosePolicy`.
tags:
  - java
  - developer-guide
  - how-to
---

Set [Parent Close Policy](/concepts/what-is-a-parent-close-policy) on an instance of `ChildWorkflowOptions` using [`ChildWorkflowOptions.newBuilder().setParentClosePolicy`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/ChildWorkflowOptions.Builder.html).

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
