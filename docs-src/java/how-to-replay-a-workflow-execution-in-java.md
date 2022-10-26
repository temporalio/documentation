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

Use the [WorkflowReplayer](https://www.javadoc.io/doc/io.temporal/temporal-testing/latest/io/temporal/testing/WorkflowReplayer.html)
class in the `temporal-testing` package to replay Workflow Histories.

In the following example, histories are downloaded from the server, and then replayed:

```java
# TODO: Use list workflows API once it's ready
WorkflowReplayer.replayWorkflowExecutions(
    histories, true, WorkflowA.class, WorkflowB.class, WorkflowC.class);
```

In the next example, a single history is loaded from a JSON file on disk:

```java
File file = new File("my_history.json");
WorkflowReplayer.replayWorkflowExecution(file, MyWorkflow.class);
```

In both examples if Workflow History is non-deterministic, an error will be thrown. You can choose
to wait until all histories have been replayed with `replayWorkflowExecutions` by setting the `failFast`
argument to `false`.
