---
id: how-to-send-a-signal-to-a-workflow-execution-in-java
title: How to send Signals in Java
sidebar_label: Send Signals
description: To send Signals to running Workflow Executions, call the `@SignalMethod` method in the Workflow interface from the Client code or through `ExternalWorkflowStub` from within another Workflow implementation.
tags:
  - java
  - developer-guide
---

To send Signals to running Workflow Executions from a Client, define the Signal method with `@SignalMethod` annotation in the Workflow interface, and call it in the Client code.
To send Signals from within a Workflow to other running Workflow Executions, use `ExternalWorkflowStub` in Workflow implementation.
Note that you can only send a Signal to running Workflow Executions.

You can use Signals to update the state of a running Workflow Execution.

#### Sending Signals from a Client

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

See [Handle Signals](/docs/java/how-to-handle-a-signal-in-a-workflow-in-java) for details on how to handle Signals in a Workflow.

#### Using `SignalwithStart` from a Temporal Client

To send Signals to a Workflow Execution whose status is unknown, use `SignalWithStart` with a `WorkflowStub` in the Client code.
This method ensures that if the Workflow Execution is in a closed state, a new Workflow Execution is spawned and the Signal is delivered to the running Workflow Execution.
Note that when the `SignalwithStart` spawns a new Workflow Execution, the Signal is delivered before the call to your `@WorkflowMethod`. This means that in your Signal handler in your Workflow interface code will execute before the `@WorkfowMethod`. You must ensure that your code logic can deal with this.

The following example shows the Client code with `SignalwithStart` of type "setCustomer", to Signal an `UntypedWorkflowStub` "GreetingWorkflow".

```java
...
public static void signalWithStart() {
        // WorkflowStub is a client-side stub to a single workflow instance
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

The following sample shows the Workflow interface for the "GreetingWorkflow" called in the previous example.

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

Note that the Signal handler "setCustomer" will be executed before the `@WorkflowMethod` "greet" is called.

#### Sending Signals from a Workflow to another Workflow Execution

Initiate a new `ExternalWorkflowStub` in the Workflow, and call the Signal method from another Workflow to send a Signal to it.

The following example shows how to use an untyped `ExternalWorkflowStub` in the Workflow implementation to send a Signal to another Workflow.

```java
    public String sendGreeting(String name) {

        // initiate ExternalWorkflowStub to call another Workflow by its Id "ReplyWF"
        ExternalWorkflowStub callRespondWorkflow = Workflow.newUntypedExternalWorkflowStub("ReplyWF");

        String responseTrigger = activity.greeting("Hello", name);

        // send a Signal from this sendGreeting Workflow to the other Workflow
        // by calling the Signal method name "getGreetCall" defined in that Workflow.
        callRespondWorkflow.signal("getGreetCall", responseTrigger);

        return responseTrigger;
```
