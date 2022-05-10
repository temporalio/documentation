---
id: how-to-define-workflow-parameters-in-java
title: How to define Workflow Parameters in Java
sidebar_label: Workflow parameters
description: A Java-based Workflow definition comprises a Workflow interface annotated with `@WorkflowInterface` and a Workflow implementation that implements the Workflow interface.
tags:
  - developer-guide
  - java
---

A Java-based Workflow definition comprises a Workflow interface annotated with `@WorkflowInterface` and a Workflow implementation that implements the Workflow interface.

#### Workflow interface parameters

The Workflow interface is a Java interface and is annotated with `@WorkflowInterface`.
Each Workflow interface method must have one `@WorkflowMethod` annotated.

However, when using Dynamic Workflows, do not specify a `@WorkflowMethod`, and implement the `DynamicWorkflow` directly in the Workflow implementation code.

The following example shows how to use the annotations in a Workflow interface:

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @WorkflowMethod
    String processFile(Arguments args);
}
```

The `@WorkflowMethod` identifies the method that is the starting point of the Workflow Execution.
The [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) completes when this method completes.

A Workflow Definition interface in Java can have only one method annotated with `@WorkflowMethod`.
It can be used to denote the [Workflow Type](/docs/concepts/what-is-a-workflow-type).

A method annotated with `@WorkflowMethod` can have any number of parameters.
We recommend passing a single parameter that contains all the input fields to allow for adding fields in a backward-compatible manner.
Note that all inputs should be serializable by the default Jackson JSON Payload Converter.

A Workflow Type can be registered only once per Worker entity.
If you define multiple Workflow implementations of the same type, you get an exception at the time of registration.

Workflow interfaces can form inheritance hierarchies, which can be useful for creating components that can be reused across multiple Workflow interfaces.
For example, to implement a UI or CLI button that sends a `retryNow` Signal to any Workflow, define the method as follows:

```java
public interface Retryable {
    @SignalMethod
    void retryNow();
}

@WorkflowInterface
public interface FileProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processFile(Arguments args);

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod
    String getStatus();

    @SignalMethod
    void abandon();
}
```

By using this approach, another Workflow interface can extend just `Retryable`:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Note that this approach does not apply to `@WorkflowMethod` annotations. This means that, when using a base interface, it should not include any `@WorkflowMethod` methods.
To illustrate this, let's say that we define the following _invalid_ code:

```java
// INVALID CODE!
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

Attempting to register implementations of _Workflow1_ and _Workflow2_ with a Worker will fail.
For example, if we tried to register the _Workflow1_ and _Workflow2_ as shown:

```java
worker.registerWorkflowImplementationTypes(
        Workflow1Impl.class, Workflow2Impl.class);
```

This registration fails with the following message:

```text
java.lang.IllegalStateException: BaseWorkflow workflow type is already registered with the worker
```

Related references:
Use `@SignalMethod` to handle Signals, and `@QueryMethod` to handle Queries in the Workflow.
See [Signals](/docs/java/how-to-use-signals-in-java) and [Queries](/docs/java/how-to-use-queries-in-java) for details.

#### Workflow implementation parameters

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

#### Dynamic Workflow implemnentation parameters

Use `DynamicWorkflow` to implement Workflow Types dynamically. When you register a Workflow implementation type that extends `DynamicWorkflow`, it can be used to implement any Workflow Type that is not explicitly registered with the Worker.

The main use case for `DynamicWorkflow` is an implementation of custom Domain Specific Languages (DSLs). A single implementation can implement a Workflow Type which by definition is dynamically loaded from some external source.
You can also use `DynamicWorkflow` when you need a default Workflow that can handle all Workflow Types that are not registered with a Worker.

The Dynamic Workflow interface is implemented with the `execute` method. This method takes in `EncodedValues` that are inputs to the Workflow Execution. These inputs can be specified by the Client when invoking the Workflow Execution.

```java
public class MyDynamicWorkflow implements DynamicWorkflow {
   @Override
    public Object execute(EncodedValues args) {
    }
}
```

`DynamicWorkflow` can be used to invoke different Workflow Types.
To check what type is running when your Dynamic Workflow `execute` method runs, use `getWorkflowType()` in the implementation code.

```java
String type = Workflow.getInfo().getWorkflowType();
```

The `DynamicWorkflow` implementation must be registered with a Worker.

The following example shows a Dynamic Workflow Implementation.

```java
// Dynamic Workflow Implementation
public static class DynamicGreetingWorkflowImpl implements DynamicWorkflow {
  private String name;

  @Override
  public Object execute(EncodedValues args) {
    String greeting = args.get(0, String.class);
    String type = Workflow.getInfo().getWorkflowType();
  }
```

Related references:

- [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java)
- `WorkflowStub.java` reference: <https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/client/WorkflowStub.java>
- [Dynamic Workflow Reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/DynamicWorkflow.html).
