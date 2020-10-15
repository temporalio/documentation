---
id: java-starting-workflow-executions
title: Starting workflow executions
---

A Workflow interface that executes a Workflow requires initializing a `WorkflowClient` instance, creating
a client side stub to the Workflow, and then calling a method annotated with @WorkflowMethod.

```java
    // service and client are heavyweight objects that should be created once per process lifetime.
    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    // Create a new Workflow stub per each Workflow start
    FileProcessingWorkflow workflow = workflowClient.newWorkflowStub(FileProcessingWorkflow.class);
```

There are two ways to start Workflow execution: asynchronously and synchronously.

Asynchronous start initiates a Workflow execution and immediately returns to the caller. This is the most common way to start Workflows in production.

Synchronous invocation starts a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the process crashed or was stopped.

Asynchronous start:
```java
// Returns as soon as the Workflow starts.
WorkflowExecution workflowExecution = WorkflowClient.start(workflow::processFile, workflowArgs);

System.out.println("Started process file workflow with workflowId=\"" + workflowExecution.getWorkflowId()
                    + "\" and runId=\"" + workflowExecution.getRunId() + "\"");
```

Synchronous start:
```java
// Start a Workflow and then wait for a result.
// Note that if the waiting process is killed, the Workflow will continue execution.
String result = workflow.processFile(workflowArgs);
```

If you need to wait for a Workflow completion after an asynchronous start, the most straightforward way
is to call the blocking version again. If `WorkflowOptions.WorkflowIdReusePolicy` is not `AllowDuplicate`, then instead
of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion.
The following example shows how to do this from a different process than the one that started the Workflow. All this process
needs is a `WorkflowId`.

```java
WorkflowExecution execution = new WorkflowExecution().setWorkflowId(workflowId);
FileProcessingWorkflow workflow = workflowClient.newWorkflowStub(execution);
// Returns result potentially waiting for Workflow to complete.
String result = workflow.processFile(workflowArgs);
```
