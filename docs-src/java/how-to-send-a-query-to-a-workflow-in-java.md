---
id: how-to-send-a-query-to-a-workflow-in-java
title: How to send a Query in Java
sidebar_label: Send Query
description: To send a Query to a Workflow Execution from an external process, call the Query method (defined in the Workflow) from a `WorkflowStub` within the Client code.
tags:
  - java
  - developer-guide
---

To send a Query to a Workflow Execution from an external process, call the Query method (defined in the Workflow) from a `WorkflowStub` within the Client code.

For example, the following Client code calls a Query method `queryGreeting()` defined in the `GreetingWorkflow` Workflow interface.

```java
 // Create our workflow options
    WorkflowOptions workflowOptions =
        WorkflowOptions.newBuilder()
        .setWorkflowId(WORKFLOW_ID)
        .setTaskQueue(TASK_QUEUE).build();

    // Create the Temporal client stub. It is used to start our workflow execution.
    GreetingWorkflow workflow = client.newWorkflowStub(GreetingWorkflow.class, workflowOptions);

    // Start our workflow asynchronously to not use another thread to query.
    WorkflowClient.start(workflow::createGreeting, "World");

    // Query the Workflow to get the current value of greeting and print it.
    System.out.println(workflow.queryGreeting());
```
