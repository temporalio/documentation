---
id: how-to-get-the-result-of-a-workflow-execution-in-java
title: How to get the result of a Workflow Execution in Java
sidebar_label: Get Workflow results
description: A synchronous Workflow Execution blocks your client thread until the Workflow Execution completes (or fails) and get the results (or error in case of failure). An asynchronous Workflow Execution immediately returns a value to the caller.
tags:
  - java
  - developer-guide
---

If the call to start a Workflow Execution is successful, you will gain access to the Workflow Execution's Run Id.

The Workflow Id, Run Id, and Namespace may be used to uniquely identify a Workflow Execution in the system and get its result.

It's possible to both block progress on the result (synchronous execution) or get the result at some other point in time (asynchronous execution).

In the Temporal Platform, it's also acceptable to use Queries as the preferred method for accessing the state and results of Workflow Executions.

A synchronous Workflow Execution blocks your client thread until the Workflow Execution completes (or fails) and get the results (or error in case of failure).

The following example is a type-safe approach for getting the results of a synchronous Workflow Execution.

```java
 FileProcessingWorkflow workflow = client.newWorkflowStub(
                FileProcessingWorkflow.class,
                WorkflowOptions.newBuilder()
                        .setWorkflowId(workflowId)
                        .setTaskQueue(taskQueue)
                        .build();

// start sync and wait for results (or failure)
String result = workflow.processfile(new Argument());
```

An asynchronous Workflow Execution immediately returns a value to the caller.

The following examples show how to get the results of a Workflow Execution through typed and untyped `WorkflowStub`.

- **Typed WorkflowStub Example**

  ```java
  // create typed Workflow stub
  FileProcessingWorkflow workflow = client.newWorkflowStub(FileProcessingWorkflow.class,
                WorkflowOptions.newBuilder()
                        .setTaskQueue(taskQueue)
                        .setWorkflowId(workflowId)
                        .build());
  // use WorkflowClient.execute (if your Workflow takes in arguments) or WorkflowClient.start (for zero arguments)
  WorkflowClient.start(workflow::greetCustomer);
  ```

- **Untyped WorkflowStub Example**

  ```java
  WorkflowStub untyped = client.newUntypedWorkflowStub("FileProcessingWorkflow",
                  WorkflowOptions.newBuilder()
                          .setWorkflowId(workflowId)
                          .setTaskQueue(taskQueue)
                          .build());

  // blocks until Workflow Execution has been started (not until it completes)
  untyped.start(argument);
  ```

If you need to wait for a Workflow Execution to complete after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again.

Note that if `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion.

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
String result = untyped.getResult(String.class);
```

**Get last (successful) completion result**

For a Temporal Cron Job, get the result of previous successful runs using `GetLastCompletionResult()`.
The method returns `null` if there is no previous completion.
The following example shows how to implement this in a Workflow.

```java
public String cronWorkflow() {
    String lastProcessedFileName = Workflow.getLastCompletionResult(String.class);

    // Process work starting from the lastProcessedFileName.
    // Business logic implementation goes here.
    // Updates lastProcessedFileName to the new value.

    return lastProcessedFileName;
}
```

Note that this works even if one of the Cron schedule runs failed.
The next schedule will still get the last successful result if it ever successfully completed at least once.
For example, for a daily cron Workflow, if the run succeeds on the first day and fails on the second day, then the third day run will get the result from first day's run using these APIs.
