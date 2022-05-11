---
id: how-to-handle-a-signal-in-a-workflow-in-java
title: How to handle Signals in an Workflow in Java
sidebar_label: Handle Signals
description: Use the `@SignalMethod` annotation to handle Signals within the Workflow interface.
tags:
  - java
  - developer-guide
---

Use the `@SignalMethod` annotation to handle Signals in the Workflow interface.

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

In the following example, we define a Signal method "updateGreeting" to update the greeting in the Workflow.
We set a `Workflow.await` in the Workflow implementation to block the current Workflow Execution until the provided unblock condition is evaluated to `true`.
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

**Dynamic Signal Handler**
You can also implement Signal handlers dynamically. This is useful for library-level code and implementation of DSLs.

Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicSignalListener` in the Workflow implementation code.

```java
      Workflow.registerListener(
        (DynamicSignalHandler)
            (signalName, encodedArgs) -> name = encodedArgs.get(0, String.class));
```

When registered, any Signals sent to the Workflow without a defined handler will be delivered to the `DynamicSignalHandler`.
Note that you can only register one `Workflow.registerListener(Object)` per Workflow Execution.
`DynamicSignalHandler` can be implemented in both regular and dynamic Workflow implementations.
