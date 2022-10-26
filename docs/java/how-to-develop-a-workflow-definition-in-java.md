---
id: how-to-develop-a-workflow-definition-in-java
title: How to develop a Workflow Definition in Java
sidebar_label: Workflow Definition
description: In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
tags:
  - java
  - developer-guide
---

In the Temporal Java SDK programming model, a Workflow Definition comprises a Workflow interface annotated with `@WorkflowInterface` and a Workflow implementation that implements the Workflow interface.

The Workflow interface is a Java interface and is annotated with `@WorkflowInterface`.
Each Workflow interface must have only one method annotated with `@WorkflowMethod`.

```java
// Workflow interface
@WorkflowInterface
public interface YourWorkflow {

    @WorkflowMethod
    String yourWFMethod(Arguments args);
}
```

However, when using dynamic Workflows, do not specify a `@WorkflowMethod`, and implement the `DynamicWorkflow` directly in the Workflow implementation code.

The `@WorkflowMethod` identifies the method that is the starting point of the Workflow Execution.
The Workflow Execution completes when this method completes.

You can create interface inheritance hierarchies to reuse components across other Workflow interfaces.
The interface inheritance approach does not apply to `@WorkflowMethod` annotations.

A Workflow implementation implements a Workflow interface.

```java
// Define the Workflow implementation which implements our getGreeting Workflow method.
  public static class GreetingWorkflowImpl implements GreetingWorkflow {
      ...
    }
  }
```
