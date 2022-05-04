---
id: how-to-define-a-signal-to-a-workflow-execution-in-java
title: How to define Signals in Java
sidebar_label: Define Signal
description: Define a Signal method with `@SignalMethod` annotation in the Workflow interface and implement it in the Workflow implementation.
tags:
  - java
  - developer-guide
---

To define a Signal, initiate the Signal method with `@SignalMethod` annotation in the Workflow interface and implement it in the Workflow implementation.

```java
@WorkflowInterface
public interface RespondWorkflowInterface {
    @WorkflowMethod
    String replyGreeting(String reply);

    // define Signal method "getGreetCall" in the Workflow interface.
    @SignalMethod
    void getGreetCall(String answer);
}
```

The `@SignalMethod` annotation indicates that the method is used to handle [Signals](/docs/concepts/what-is-a-signal) and that it can react to external Signals.
The method can have parameters that contain the Signal payload.
This method does not return a value and must have a `void` return type.

The Signal type defaults to the name of the method. In the following example, the Signal type defaults to `retryNow`.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

   @WorkflowMethod
   String processFile(Arguments args);

   @SignalMethod
   void retryNow();
}
```

To overwrite this default naming and assign a custom Signal type, use the `@SignalMethod` annotation with the `name` parameter.
In the following example, the Signal type is set to "retrysignal".

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

   @WorkflowMethod
   String processFile(Arguments args);

   @SignalMethod(name = "retrysignal")
   void retryNow();
}
```

A Workflow interface can define any number of methods annotated with `@SignalMethod`, but the method names or the `name` parameters for each must be unique.

A Signal can be called from either a Client or another Workflow to send Signals to this Workflow.

Note that you can send a Signal only to running Workflow Executions.
You can use Signals to update the state of a running Workflow Execution.
