---
id: how-to-replay-a-workflow-execution-in-java
title: How to replay a Workflow Execution in Java
sidebar_label: Replay a Workflow Execution
description: Replay a Workflow Execution
tags:
  - developer-guide
  - sdk
  - java
---

To replay Workflow Executions, use the [WorkflowReplayer](https://www.javadoc.io/doc/io.temporal/temporal-testing/latest/io/temporal/testing/WorkflowReplayer.html) class in the `temporal-testing` package.

In the following example, Event Histories are downloaded from the server, and then replayed.
Note that this requires Advanced Visibility to be enabled.

```java
// Note we assume you already have a WorkflowServiceStubs (`service`) and WorkflowClient (`client`)
// in scope.
ListWorkflowExecutionsRequest listWorkflowExecutionRequest =
    ListWorkflowExecutionsRequest.newBuilder()
        .setNamespace(client.getOptions().getNamespace())
        .setQuery("TaskQueue = 'mytaskqueue'")
        .build();
ListWorkflowExecutionsResponse listWorkflowExecutionsResponse =
    service.blockingStub().listWorkflowExecutions(listWorkflowExecutionRequest);
List<WorkflowExecutionHistory> histories =
    listWorkflowExecutionsResponse.getExecutionsList().stream()
        .map(
            (info) -> {
              GetWorkflowExecutionHistoryResponse weh =
                  service.blockingStub().getWorkflowExecutionHistory(
                      GetWorkflowExecutionHistoryRequest.newBuilder()
                          .setNamespace(testEnvironment.getNamespace())
                          .setExecution(info.getExecution())
                          .build());
              return new WorkflowExecutionHistory(
                  weh.getHistory(), info.getExecution().getWorkflowId());
            })
        .collect(Collectors.toList());


WorkflowReplayer.replayWorkflowExecutions(
    histories, true, WorkflowA.class, WorkflowB.class, WorkflowC.class);
```

In the next example, a single history is loaded from a JSON file on disk:

```java
File file = new File("my_history.json");
WorkflowReplayer.replayWorkflowExecution(file, MyWorkflow.class);
```

In both examples, if Event History is non-deterministic, an error is thrown.
You can choose to wait until all histories have been replayed with `replayWorkflowExecutions` by setting the `failFast` argument to `false`.
