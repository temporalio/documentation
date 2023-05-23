---
id: how-to-send-a-signal-with-start-in-java
title: How to send a Signal-with-Start in Java
sidebar_label: Signal-With-Start
description: To send Signals to a Workflow Execution whose status is unknown, use `SignalWithStart` with a `WorkflowStub` in the Client code.
tags:
  - java
  - developer-guide
---

Signal-With-Start is used from the Client.
It takes a Workflow Id, Workflow arguments, a Signal name, and Signal arguments.

If there's a Workflow running with the given Workflow Id, it will be signaled. If there isn't, a new Workflow will be started and immediately signaled.

To send Signals to a Workflow Execution whose status is unknown, use `SignalWithStart` with a `WorkflowStub` in the Client code.
This method ensures that if the Workflow Execution is in a closed state, a new Workflow Execution is spawned and the Signal is delivered to the running Workflow Execution.

Note that when the `SignalwithStart` spawns a new Workflow Execution, the Signal is delivered before the call to your `@WorkflowMethod`.
This means that the Signal handler in your Workflow interface code will execute before the `@WorkfowMethod`.
You must ensure that your code logic can deal with this.

In the following example, the Client code uses `SignalwithStart` to send the Signal `setCustomer` to the `UntypedWorkflowStub` named `GreetingWorkflow`.
If the `GreetingWorkflow` Workflow Execution is not running, the `SignalwithStart` starts the Workflow Execution.

```java
...
public static void signalWithStart() {
        // WorkflowStub is a client-side stub to a single Workflow instance
        WorkflowStub untypedWorkflowStub = client.newUntypedWorkflowStub("GreetingWorkflow",
        WorkflowOptions.newBuilder()
                .setWorkflowId(workflowId)
                .setTaskQueue(taskQueue)
                .build());

        untypedWorkflowStub.signalWithStart("setCustomer", new Object[] {customer2}, new Object[] {customer1});

        printWorkflowStatus();

        try {
            String greeting = untypedWorkflowStub.getResult(String.class);
            printWorkflowStatus();
            System.out.println("Greeting: " + greeting);
        } catch(WorkflowFailedException e) {
            System.out.println("Workflow failed: " + e.getCause().getMessage());
            printWorkflowStatus();
        }
    }
...
```

The following example shows the Workflow interface for the `GreetingWorkflow` called in the previous example.

```java
...
@WorkflowInterface
public interface GreetingWorkflow {
    @WorkflowMethod
    String greet(Customer customer);

    @SignalMethod
    void setCustomer(Customer customer);

    @QueryMethod
    Customer getCustomer();
...
}
```

Note that the Signal handler `setCustomer` is executed before the `@WorkflowMethod` `greet` is called.
