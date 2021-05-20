---
id: signals
title: Signals in Java
sidebar_label: Signals
---

Workflow signals provide an asynchronous and durable mechanism for providing data to running Workflows.

Signal methods can only be defined inside Workflows Interfaces and are methods annotated with the `@SignalMethod` annotation, for example:

```java
@WorkflowInterface
public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);
    
    @SignalMethod
    void updateGreeting(String greeting);

    @SignalMethod
    void exit();
}
```

A Workflow interface can define any number of signal methods.

Note that the `@SignalMethod` interface has a `name` parameter which can be used to set the signal type.
If not specified, the signal type defaults to the name of the method.

The following example shows how signals can be used to update the Workflow state.
You can use the `Workflow.await` to block the current Workflow execution until the provided unblock condition is evaluated
to `true`. In our case, the unblock condition is evaluated to `true` when we receive a signal which changes the Workflow
greeting to "Bye".

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
