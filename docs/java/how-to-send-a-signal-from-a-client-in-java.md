---
id: how-to-send-a-signal-from-a-client-in-java
title: How to send a Signal from a Client in Java
sidebar_label: Send Signal from Client
description: To send a Signal to a Workflow Execution from a Client, call the Signal method, annotated with `@SignalMethod` in the Workflow interface, from the Client code.
tags:
  - java
  - developer-guide
---

To send a Signal to a Workflow Execution from a Client, call the Signal method, annotated with `@SignalMethod` in the Workflow interface, from the Client code.

In the following Client code example, we start the Workflow "greetCustomer" and call the Signal method "addCustomer" that is handled in the Workflow.

```java
// create a typed Workflow stub for GreetingsWorkflow
GreetingsWorkflow workflow = client.newWorkflowStub(GreetingsWorkflow.class,
        WorkflowOptions.newBuilder()
                // set the Task Queue
                .setTaskQueue(taskQueue)
                // Workflow Id is recommended but not required
                .setWorkflowId(workflowId)
                .build());

// start the Workflow
WorkflowClient.start(workflow::greetCustomer);
// send a Signal to the Workflow
Customer customer = new Customer("John", "Spanish", "john@john.com");
workflow.addCustomer(customer); //addCustomer is the Signal method defined in the greetCustomer Workflow.
```

See [Handle Signals](/java/how-to-handle-a-signal-in-a-workflow-in-java) for details on how to handle Signals in a Workflow.
