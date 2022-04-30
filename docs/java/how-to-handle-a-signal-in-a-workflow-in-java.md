---
id: how-to-handle-a-signal-in-a-workflow-in-java
title: How to handle Signals in an Workflow in Java
sidebar_label: Handle Signals
description: Use the `@SignalMethod` annotation to handle [Signals](/docs/concepts/what-is-a-signal) within the Workflow interface.
tags:
  - java
  - developer-guide
---

Use the `@SignalMethod` annotation to handle [Signals](/docs/concepts/what-is-a-signal) within the Workflow interface.
The `@SignalMethod` indicates that the method is used to handle Signals from the Temporal Client or from other Workflows, and that it can react to the external Signal.

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

In the following example, we use a Signal method "updateGreeting" to update the greeting in the Workflow. We set a `Workflow.await` in the Workflow implementation to block the current Workflow Execution until the provided unblock condition is evaluated to `true`.
In this case, the unblocking condition is evaluated to `true` when the Signal to update the greeting is received.

```java
@WorkflowInterface
public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @SignalMethod
    void updateGreeting(String greeting);
}
```

```java
public class HelloWorldImpl implements HelloWorld {
    private final Logger workflowLogger = Workflow.getLogger(HelloWorldImpl.class);
    private String greeting;

    @Override
    public void sayHello(String name) {
        int count = 0;
        while (!"Bye".equals(greeting)) {
            String oldGreeting = greeting;
            Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
        }
        workflowLogger.info(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public void updateGreeting(String greeting) {
        this.greeting = greeting;
    }
}
```

This Workflow completes when the Signal updates the greeting to "Bye".
