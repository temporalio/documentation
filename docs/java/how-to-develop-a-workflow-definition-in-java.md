---
id: how-to-develop-a-workflow-definition-in-java
title: How to develop a Workflow Definition in Java
sidebar_label: Workflow Definition
description: In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
tags:
  - java
  - developer-guide
---

In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface:

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {
  // ...
}
```

## Workflow interface

The Workflow interface is a Java interface and is annotated with `@WorkflowInterface`.
Workflow interface methods must have one [`@WorkflowMethod`](# `@WorkflowMethod`).
Use `@SignalMethod`, `@QueryMethod` for Signals, and Queries in the Workflow.
To call Activities in your Workflow, see [Activities](/docs/java/activities).
You can also invoke other Workflows as Child Workflows with `Workflow.newChildWorkflowStub()` within a Workflow Definition. See [Child Workflow Execution](/docs/java/how-to-spawn-a-child-workflow-execution-in-java) for more information.

The following example shows how the annotations can be used in a Workflow interface:

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @WorkflowMethod
    String processFile(Arguments args);

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod
    String getStatus();

    @SignalMethod
    void retryNow();

    @SignalMethod
    void abandon();
}
```

### `@WorkflowMethod`

**@WorkflowMethod** denotes the starting point of [Workflow Execution](/docs/concepts/what-is-a-workflow-execution). Workflow Execution completes when this method completes.
A Workflow interface can define only a single method annotated with `@WorkflowMethod`.
The `@WorkflowMethod` annotation has a `name` parameter, such as `@WorkflowMethod(name = "MyWorkflowType")`.
It can be used to denote the [Workflow Type](/docs/concepts/what-is-a-workflow-type). If not set, the Workflow Type defaults to the short name of the Workflow interface. In the previous example, the Workflow Type defaults to `FileProcessingWorkflow`.
A method annotated with `@WorkflowMethod` can have any number of parameters. We recommend passing a single parameter that contains all the input fields. This allows adding fields in a backward compatible manner.
In the following Workflow interface example, the Workflow Type is "NotifyUserAccounts".

```java
  @WorkflowInterface

  public interface NotifyUserAccounts {
    @WorkflowMethod
    void notify(String[] accountIds);

    @QueryMethod
    int getCount();
}

```

To overwrite this default naming and assign a custom Workflow Type, use the `@WorkflowMethod` annotation with the `name` parameter, as shown in the following example:

```java
  @WorkflowMethod(name = "Abc")
  void notify(String[] accountIds)

```

In this case the Workflow Type will be “Abc”. When you set a Workflow Type in this way, it does not have to start with an upper case letter.
You can only register a single, unique Workflow Type with a Worker.
If you try to register multiple Workflow implementations of the same type, you will get an exception.

### `@QueryMethod`

`@QueryMethod` indicates that this method can be used to send a [Query](/docs/concepts/what-is-a-query) to the Workflow's state at any time during its execution.
It can have parameters that can be used to filter a subset of the Workflow's state that it returns.
Because it returns a value, it must have a return type that is not `void`.
A Workflow interface can define any number of methods annotated with `@QueryMethod`, but the method names or the `name` parameters for each must be unique.

The `@QueryMethod` annotation also has a `name` parameter, such as `@QueryMethod(name = "history")`.
It can be used to denote the Query name.
If not set, the Query name defaults to the name of the method.
In the following example, the Query name defaults to `getStatus`.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod
    String getStatus();
}
```

See [Queries](/docs/java/queries) for more information.

### `@SignalMethod`

`@SignalMethod` indicates that this method is a [Signal](/docs/concepts/what-is-a-signal) handler method and that it can react to external Signals.
It can have parameters which can contain the Signal payload.
It does not return a value, so it must have a `void` return type.
A Workflow interface can define any number of methods annotated with `@SignalMethod`, but the method names or the `name` parameters for each must be unique.
The `@SignalMethod` also has a `name` parameter, such as `@SignalMethod(name = "mysignal")`.
It can be used to denote the Signal type.
If not set, the Signal type defaults to the name of the method.
In the following example, the Signal type defaults to `retryNow` and `abandon`.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @WorkflowMethod
    String processFile(Arguments args);

    @SignalMethod
    void retryNow();

    @SignalMethod
    void abandon();
}
```

See [Signals](/docs/java/signals) for more information.

### Workflow interface inheritance

Workflow interfaces can form inheritance hierarchies, which can be useful for creating components that can be reused across multiple Workflow interfaces.
For example, to implement a UI or CLI button that sends a `retryNow` Signal to any Workflow, redesign the preceding interface example as follows:

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

Note that this approach does not apply to `@WorkflowMethod` annotations. This means that, when using a base interface, it should
not include any `@WorkflowMethod` methods.
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

Attempting to register implementations of Workflow1 and Workflow2 with a Worker will fail.
Let's say that we have:

```java
worker.registerWorkflowImplementationTypes(
        Workflow1Impl.class, Workflow2Impl.class);
```

This registration fails with the following message:

```text
java.lang.IllegalStateException: BaseWorkflow workflow type is already registered with the worker
```

### Dynamic Workflow interface

Use `DynamicWorkflow` to implement any number of Workflow Types dynamically. When you register a Workflow implementation type that extends `DynamicWorkflow`, it can be used to implement any Workflow type that is not implicitly registered with the Worker. Only one Workflow type that implements `DynamicWorkflow` per Worker is allowed.

The main use case for `DynamicWorkflow` is an implementation of custom Domain Specific Languages (DSLs). A single implementation can implement a Workflow Type which by definition is dynamically loaded from some external source.

All the determinism rules still apply to Workflows that implement this interface.

## Workflow implementation

A Workflow implementation implements a Workflow interface.
Each time a new Workflow Execution is started, an instance of the Workflow implementation object is created.
Then, one of the methods (depending on the Workflow Type of the instance) annotated with `@WorkflowMethod` can be invoked.
As soon as this method returns, the Workflow Execution is considered to be complete.

Workflow methods annotated with `@QueryMethod` and `@SignalMethod` can be invoked during a Workflow Execution.

Note that methods annotated with `@QueryMethod` can be invoked even when a Workflow is in the `Completed` state.

### Typed and Untyped `WorkflowStubs`

A `WorkflowStub` is a proxy of your Workflow implementation. To start a Workflow Execution, we need to create a `WorkflowStub`.
There are two types of `WorkflowStubs`: Typed and Untyped.

**Typed `WorkflowStubs`**

A typed `WorkflowStub` returns an implementation of your Workflow interface. For example consider the following Workflow interface:

```java
@WorkflowInterface
public interface NotifyUserAccounts {
    @WorkflowMethod
    void notifyAccount(String[] accountIds);

    @QueryMethod
    int getCount();
}
```

The Workflow implementation for the preceding Workflow interface using typed `WorkflowStub` will be as follows:

```java
Public static void main(String[] args){
NotifyUserAccounts workflow = client.newWorkflowStub(
      NotifyUserAccounts.class,
      WorkflowOptions.newBuilder()
            .setWorkflowId("notifyAccounts")
            .setTaskQueue(taskQueue)
            .build()
        );
}
```

Typed `WorkflowStub` are useful because they are type safe. You can invoke your Workflow methods such as [`@WorkflowMethod`](# `@WorkflowMethod`), [`QueryMethod`](# `QueryMethod` ), and [`@SignalMethod`](# `QueryMethod`) directly.

**Untyped `WorkflowStub`**

An untyped `WorkflowStub` does not use the Workflow interface, and is not typesafe. It is more flexible because it has methods from the `WorkflowStub` interface, such as `start`, `signalWithStart`, `getResults` (sync and async), `query`, `signal`, `cancel` and `terminate`.
Note that the Temporal Java SDK also provides typed `WorkflowStub` versions for these methods.

See the `WorkflowStub.java` reference: <https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/client/WorkflowStub.java>

When using untyped `WorkflowStubs`, we rely on the Workflow Type, Activity Type, Child Workflow Type, as well as Query and Signal names.

See [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java).

### Calling other Workflows

Workflows can invoke, and send Signals to, other Workflows purely by name. This helps particularly for executing Workflows written in other language SDKs.

See the [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more information.

### Workflow implementation constraints

Temporal uses the [Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover the state of a Workflow object including its threads and local variable values.
In essence, every time a Workflow state is restored, its code is re-executed from the beginning.
Note that, during replay, successfully executed Activities are not re-executed because their results are already recorded
in the Event History of the Workflow Execution.

The following constraints apply when writing Workflow Definitions:

- Do not use mutable global variables in your Workflow implementations.
  This will assure that multiple Workflow instances are fully isolated.
- Do not call non-deterministic functions (such as non-seeded random or `UUID.randomUUID()`) directly from the Workflow code.
  The Temporal SDK provides specific API for calling non-deterministic code in your Workflows.
- Do not use programming language constructs that rely on system time.
  For example, only use `Workflow.currentTimeMillis()` to get the current time inside a Workflow.
- Do not use native Java `Thread` or any other multi-threaded classes like `ThreadPoolExecutor`.
  Use `Async.function` or `Async.procedure`, provided by the Temporal SDK, to execute code asynchronously.
- Do not use synchronization, locks, or other standard Java blocking concurrency-related classes besides those provided by the Workflow class.
  There is no need for explicit synchronization because multi-threaded code inside a Workflow is executed one thread at a time and under a global lock.
  - Call `Workflow.sleep` instead of `Thread.sleep`.
  - Use `Promise` and `CompletablePromise` instead of `Future` and `CompletableFuture`.
  - Use `WorkflowQueue` instead of `BlockingQueue`.
- Use `Workflow.getVersion` when making any changes to the Workflow code.
  Without this, any deployment of updated Workflow code might break already running Workflows.
- Do not access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow Execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

Java Workflow reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/package-summary.html>

### Workflow Method Arguments

- [What is a Data Converter?](/docs/concepts/what-is-a-data-converter)

Java DataConverter reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html>
