---
id: how-to-develop-a-workflow-definition-in-java
title: How to develop a Workflow Definition in Java
sidebar_label: Workflow Definition
description: In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow Interface.
---

import RelatedReadList from '../components/RelatedReadList.js'

In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow Interface:

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {
  // ...
}
```

## Workflow Interface

The Workflow Interface is a Java interface and is annotated with `@WorkflowInterface`. Workflow interface methods must have one of the following annotations:

- **@WorkflowMethod** denotes the starting point of Workflow Execution. Workflow Execution completes when this methods returns.
- **@SignalMethod** indicates that this method is a Signal handler method and that it can react to external Signals. It can have parameters which can contain the Signal payload. It does not return a value, so it must have a `void` return type.
- **@QueryMethod** indicates that this method can be used to Query the Workflow's state at any time during its execution.
  It can have parameters which can be used to filter a subset of the Workflow's state that it returns. Since it does return a value it must have a non `void` return type.

Workflow interfaces can define only a single method annotated with `@WorkflowMethod`. They can define
any number of methods annotated with `@SignalMethod` and `@QueryMethod`, for example:

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

The `@WorkflowMethod` annotation has a `name` parameter, for example: `@WorkflowMethod(name = "MyWorkflowType")`.
It can be used to denote the Workflow type. If not set, the Workflow type defaults to the short name of the Workflow interface. In the example above, the Workflow type defaults to `FileProcessingWorkflow`.
Methods annotated with `@WorkflowMethod` can have any number of parameters. We recommend passing a single parameter that contains all the input fields. This allows adding fields in a backward compatible manner.

The `@QueryMethod` annotation also has a `name` parameter, for example: `@QueryMethod(name = "history")`. It can be
used to denote the Query name. If not set, the Query name defaults to the name of the method. In the example above, the Query name defaults to `getStatus`.

The `@SignalMethod` too has a `name` parameter, for example: `@SignalMethod(name = "mysignal")`. It can be used to denote the
Signal type. If not set, the Signal type defaults to the name of the method. In the example above, the Signal type defaults to `retryNow` and `abandon`.

### Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies. It may be useful for creating components reusable across multiple
Workflow interfaces. For example, to implement a UI or CLI button that allows you to call `retryNow` Signal on any Workflow, redesign the above interface example to:

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

With this, another Workflow interface can extend just `Retryable`, for example:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Now if we have two running Workflows, one that implements the `FileProcessingWorkflow` interface and another that implements the
`MediaProcessingWorkflow` interface, we can send a Signal to both using their common interface and their respective workflowIds, for example:

```java
Retryable r1 = client.newWorkflowStub(Retryable.class, firstWorkflowId);
Retryable r2 = client.newWorkflowStub(Retryable.class, secondWorkflowId);
r1.retryNow();
r2.retryNow();
```

The same technique can be used to send a Query to the Workflows using a base Workflow interface.

Note that this approach does not apply to `@WorkflowMethod` annotations, meaning that when using a base interface, it should
not include any `@WorkflowMethod` methods.
To illustrate this, lets' say that we define the following **invalid** code:

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

If we attempt to register implementations of Workflow1 and Workflow2 with a Worker, it will fail. Let's say that we have:

```java
worker.registerWorkflowImplementationTypes(
        Workflow1Impl.class, Workflow2Impl.class);
```

This registration will fail with:

```text
java.lang.IllegalStateException: BaseWorkflow workflow type is already registered with the worker
```

## Implementing Workflows

A Workflow implementation implements a Workflow interface. Each time a new Workflow Execution is started,
a new instance of the Workflow implementation object is created.
Then, one of the methods (depending on which Workflow type has been started) annotated with `@WorkflowMethod` can be invoked.
As soon as this method returns, the Workflow execution is considered as completed.

Workflow methods annotated with `@QueryMethod` and `@SignalMethod` can be invoked during a Workflow's execution.

Note that methods annotated with `@QueryMethod` can be invoked even when a Workflow is in the `Completed`
state.

### Workflow Implementation Constraints

Temporal uses the [Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover
the state of a Workflow object including its threads and local variable values.
In essence, every time a Workflow state has to be restored, its code is re-executed from the beginning.
Note that during replay, successfully executed Activities are not re-executed as their results are already recorded
in the Workflow event history.

The following constraints apply when writing Workflows:

- Do not use constructs that rely on system time.
- Do not use any mutable global variables in your Workflow implementations. This will assure that multiple Workflow instances are fully isolated.
- Do not call any non-deterministic functions like non-seeded random or `UUID.randomUUID()` directly from the Workflow code. The Temporal SDK provides specific API for calling non-deterministic code in your Workflows.
- Do not use any programming language constructs that rely on system time. For example, only use `Workflow.currentTimeMillis()` to get the current time inside a Workflow.
- Do not use native Java `Thread` or any other multi-threaded classes like `ThreadPoolExecutor`. Use `Async.function` or `Async.procedure`,
  provided by the Temporal SDK, to execute code asynchronously.
- Do not use any synchronization, locks, and other standard Java blocking concurrency-related classes besides those provided
  by the Workflow class. There is no need for explicit synchronization because multi-threaded code inside a Workflow is
  executed one thread at a time and under a global lock.
  - Call `Workflow.sleep` instead of `Thread.sleep`.
  - Use `Promise` and `CompletablePromise` instead of `Future` and `CompletableFuture`.
  - Use `WorkflowQueue` instead of `BlockingQueue`.
- Use `Workflow.getVersion` when making any changes to the Workflow code. Without this, any deployment of updated Workflow code
  might break already running Workflows.
- Don’t access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

### Workflow Method Arguments

- [What is a Data Converter?](/docs/concepts/what-is-a-data-converter)

Java DataConverter reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html>
