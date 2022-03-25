---
id: how-to-spawn-a-workflow-execution-in-java
title: How to spawn a Workflow Execution in Java
sidebar_label: Workflow Execution
description: Initialize an instance of a `WorkflowClient`, create a client side Workflow stub, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).
tags:
  - java
  - developer-guide
---

In the Temporal Java SDK, Workflows can be started both synchronously and asynchronously.
To do either, you must initialize an instance of a `WorkflowClient`, create a client side Workflow stub, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).

### Asynchronous start

An asynchronous start initiates a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) and immediately returns a value to the caller.
This is the most common way to start Workflows in a live environment.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

If you need to wait for a Workflow Execution to complete after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again.

If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion.

The following example shows how to do this from a different process than the one that started the Workflow Execution.

```java
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, workflowId);

// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

Another way to connect to an existing Workflow and wait for its completion from another process, is to use `UntypedWorkflowStub`. For example:

```java
WorkflowStub workflowStub = client.newUntypedWorkflowStub(workflowType, workflowOptions);

// Returns the result after waiting for the Workflow to complete.
String result = workflowStub.getResult(String.class);
```

### Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or was stopped.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

### Recurring start

You can start a Workflow Execution on a regular schedule with [the CronSchedule option](#distributed-cron).

### External Workflows

Workflows can execute (and send Signals to) other Workflows purely by name.
This helps particularly for executing Workflows from other language SDKs.
See our [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more information.
