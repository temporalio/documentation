---
id: starting-workflow-executions
title: Starting workflow executions
---

In Java, Workflows can be started both synchronously and asynchronously in Java. To do either, you must initialize an instance of a `WorkflowClient`, create a client side Workflow stub, and then call a method that is annotated with `@WorkflowMethod`.

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller. This is the most common way to start Workflows in a live environment.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again. If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this process needs is a `WorkflowId`.

```java
WorkflowExecution we = new WorkflowExecution().setWorkflowId(workflowId);
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, we);
// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or was stops.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->
