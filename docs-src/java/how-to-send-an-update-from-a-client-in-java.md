---
id: how-to-send-an-update-from-a-client-in-java
title: How to send an Update from a Client
sidebar_label: Send Update from Client
description: To send an Update to a Workflow Execution from a Client, call the Update method, annotated with `@UpdateMethod` in the Workflow interface, from the Client code.
tags:
  - java
  - developer-guide
---

To send an Update to a Workflow Execution from a Client, call the Update method, annotated with `@UpdateMethod` in the Workflow interface, from the Client code.

In the following Client code example, start the Workflow `getGreetings` and call the Update method `addGreeting` that is handled in the Workflow.

```java
WorkflowOptions workflowOptions =
    WorkflowOptions.newBuilder().setTaskQueue(TASK_QUEUE).setWorkflowId(WORKFLOW_ID).build();

// Create a typed Workflow stub for GreetingsWorkflow
GreetingWorkflow workflow = client.newWorkflowStub(GreetingWorkflow.class, workflowOptions);

// Start the Workflow
WorkflowClient.start(workflow::getGreetings);

// Send an update to the Workflow. addGreeting returns
// the number of greetings our workflow has received.
int count = workflow.addGreeting("World");
```
