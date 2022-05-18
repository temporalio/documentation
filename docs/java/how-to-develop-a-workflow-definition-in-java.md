---
id: how-to-develop-a-workflow-definition-in-java
title: How to develop a Workflow Definition in Java
sidebar_label: Workflow Definition
description: In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
tags:
  - java
  - developer-guide
---

In the Temporal Java SDK programming model, a Workflow definition comprises a Workflow interface annotated with `@WorkflowInterface` and a Workflow implementation that implements the Workflow interface.

The Workflow interface is a Java interface and is annotated with `@WorkflowInterface`.
Each Workflow interface must have only one method annotated with `@WorkflowMethod`.
The method name can be used to denote the [Workflow Type](/docs/concepts/what-is-a-workflow-type).

```java
// Workflow interface
@WorkflowInterface
public interface YourWorkflow {

    @WorkflowMethod
    String yourWFMethod(Arguments args);
}
```

However, when using Dynamic Workflows, do not specify a `@WorkflowMethod`, and implement the `DynamicWorkflow` directly in the Workflow implementation code.

The `@WorkflowMethod` identifies the method that is the starting point of the Workflow Execution.
The [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) completes when this method completes.

You can create interface inheritance hierarchies to reuse components across other Workflow interfaces. For details, see [Workflow interface inheritance](docs/java/how-to-create-workflow-interface-inheritance-in-java).

A Workflow implementation implements a Workflow interface.

```java
// Define the Workflow implementation which implements our getGreeting Workflow method.
  public static class GreetingWorkflowImpl implements GreetingWorkflow {
      ...
    }
  }
```

To call Activities in your Workflow, see [Activity Definition](/docs/java/how-to-develop-an-activity-definition-in-java) and [Activity Execution](/docs/java/how-to-spawn-an-activity-execution-in-java).

Use `ExternalWorkflowStub` to start or send Signals from within a Workflow to other running Workflow Executions.
See [Using `ExternalWorkflowStub`](/docs/java/how-to-spawn-a-workflow-execution-in-java#using-externalworkflowstub) for details.

You can also invoke other Workflows as Child Workflows with `Workflow.newChildWorkflowStub()` or `Workflow.newUntypedChildWorkflowStub()` within a Workflow Definition.
See [Child Workflow Execution](/docs/java/how-to-spawn-a-child-workflow-execution-in-java) for details.

Use [`DynamicWorkflow`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/DynamicWorkflow.html) to implement Workflow Types dynamically.
When you register a Workflow implementation type that extends `DynamicWorkflow`, it can be used to implement any Workflow Type that is not explicitly registered with the Worker.

The Dynamic Workflow interface is implemented with the `execute` method. This method takes in `EncodedValues` that are inputs to the Workflow Execution.
These inputs can be specified by the Client when invoking the Workflow Execution.

```java
public class MyDynamicWorkflow implements DynamicWorkflow {
   @Override
    public Object execute(EncodedValues args) {
    }
}
```
