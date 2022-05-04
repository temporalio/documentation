---
id: how-to-handle-a-signal-in-a-workflow-in-java
title: How to handle Signals in an Workflow in Java
sidebar_label: Handle Signals
description: Use the `@SignalMethod` annotation to handle Signals within the Workflow interface.
tags:
  - java
  - developer-guide
---

Use the `@SignalMethod` annotation to handle [Signals](/docs/concepts/what-is-a-signal) within the Workflow interface.

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
