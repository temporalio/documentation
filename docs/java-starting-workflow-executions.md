---
id: java-starting-workflow-executions
title: Starting workflow executions
---

A workflow interface that executes a workflow requires initializing a `WorkflowClient` instance, creating
a client side stub to the workflow, and then calling a method annotated with @WorkflowMethod.

```java
    // service and client are heavyweight objects that should be created once per process lifetime.
    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    // Create a new workflow stub per each workflow start
    FileProcessingWorkflow workflow = workflowClient.newWorkflowStub(FileProcessingWorkflow.class);
```

There are two ways to start workflow execution: asynchronously and synchronously.

Asynchronous start initiates a workflow execution and immediately returns to the caller. This is the most common way to start workflows in production.

Synchronous invocation starts a workflow and then waits for its completion. If the process (synchronous invocation) that started the workflow crashes or stops waiting, the workflow will continue execution. This is not very commonly found in production use.

Asynchronous start:
```java
// Returns as soon as the workflow starts.
WorkflowExecution workflowExecution = WorkflowClient.start(workflow::processFile, workflowArgs);

System.out.println("Started process file workflow with workflowId=\"" + workflowExecution.getWorkflowId()
                    + "\" and runId=\"" + workflowExecution.getRunId() + "\"");
```

Synchronous start:
```java
// Start a workflow and then wait for a result.
// Note that if the waiting process is killed, the workflow will continue execution.
String result = workflow.processFile(workflowArgs);
```

If you need to wait for a workflow completion after an asynchronous start, the most straightforward way
is to call the blocking version again. If `WorkflowOptions.WorkflowIdReusePolicy` is not `AllowDuplicate`, then instead
of throwing `DuplicateWorkflowException`, it reconnects to an existing workflow and waits for its completion.
The following example shows how to do this from a different process than the one that started the workflow. All this process
needs is a `WorkflowId`.

```java
WorkflowExecution execution = new WorkflowExecution().setWorkflowId(workflowId);
FileProcessingWorkflow workflow = workflowClient.newWorkflowStub(execution);
// Returns result potentially waiting for workflow to complete.
String result = workflow.processFile(workflowArgs);
```
