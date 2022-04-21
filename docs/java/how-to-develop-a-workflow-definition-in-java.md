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

#### Workflow interface

The Workflow interface is a Java interface and is annotated with `@WorkflowInterface`.
Each Workflow interface method must have one [`@WorkflowMethod`](#workflowmethod).

Use `@SignalMethod` for Signals, and `@QueryMethod` for Queries in the Workflow.
See [Signals](/docs/java/signals) and [Queries](/docs/java/queries) for details.

Use `ExternalWorkflowStub` to start other Workflow Executions, or send Signals to other running Workflows.
See [Workflow Execution](/docs/java/how-to-spawn-a-workflow-execution-in-java/#Using`ExternalWorkflowStub`) for details.

To call Activities in your Workflow, see [Activity Definition](/docs/java/how-to-develop-an-activity-definition-in-java) and [Activity Execution](/docs/java/how-to-spawn-an-activity-execution-in-java).

You can also invoke other Workflows as Child Workflows with `Workflow.newChildWorkflowStub()` or `Workflow.newUntypedChildWorkflowStub()` within a Workflow Definition.
See [Child Workflow Execution](/docs/java/how-to-spawn-a-child-workflow-execution-in-java) for details.

The following example shows how to use the annotations in a Workflow interface:

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

#### `@WorkflowMethod`

The `@WorkflowMethod` identifies the method that is the starting point of the Workflow Execution. The [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) completes when this method completes.

A Workflow Definition interface in Java can have only one method annotated with `@WorkflowMethod`. It can be used to denote the [Workflow Type](/docs/concepts/what-is-a-workflow-type).

The Workflow Type defaults to the short name of the Workflow interface. In the following example, the Workflow Type defaults to "NotifyUserAccounts".

```java
  @WorkflowInterface

  public interface NotifyUserAccounts {
    @WorkflowMethod
    void notify(String[] accountIds);
}
```

To overwrite this default naming and assign a custom Workflow Type, use the `@WorkflowMethod` annotation with the `name` parameter.
In the following example, the Workflow Type is set to "Abc".

```java
@WorkflowInterface

  public interface NotifyUserAccounts {
  @WorkflowMethod(name = "Abc")
  void notify(String[] accountIds);
  }
```

When you set the Workflow Type this way, the value of the `name` parameter does not have to start with an uppercase letter.

A method annotated with `@WorkflowMethod` can have any number of parameters. We recommend passing a single parameter that contains all the input fields. This allows adding fields in a backward-compatible manner.
Note that all inputs should be serializable by the default Jackson JSON Payload Converter.

A Workflow Type can be registered only once per Worker entity.
If you define multiple Workflow implementations of the same type, you get an exception at the time of registration.

#### Workflow interface inheritance

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

#### Workflow implementation

A Workflow implementation implements a Workflow interface.
Each time a new Workflow Execution is started, an instance of the Workflow implementation object is created.
Then, one of the methods (depending on the Workflow Type of the instance) annotated with `@WorkflowMethod` can be invoked.
As soon as this method returns, the Workflow Execution is considered to be complete.

Workflow methods annotated with `@QueryMethod` and `@SignalMethod` can be invoked during a Workflow Execution.
Note that methods annotated with `@QueryMethod` can be invoked even when a Workflow is in the `Completed` state.

#### Typed and Untyped `WorkflowStubs`

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

Typed `WorkflowStub` are useful because they are type safe. You can invoke your Workflow methods such as [`@WorkflowMethod`](#`@WorkflowMethod`), [`@QueryMethod`](#`@QueryMethod`), and [`@SignalMethod`](#@SignalMethod`) directly.

**Untyped `WorkflowStub`**

An untyped `WorkflowStub` does not use the Workflow interface, and is not type safe. It is more flexible because it has methods from the `WorkflowStub` interface, such as `start`, `signalWithStart`, `getResults` (sync and async), `query`, `signal`, `cancel` and `terminate`.
Note that the Temporal Java SDK also provides typed `WorkflowStub` versions for these methods.

When using untyped `WorkflowStubs`, we rely on the Workflow Type, Activity Type, Child Workflow Type, as well as Query and Signal names.

Related references:

- [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java).
- `WorkflowStub.java` reference: <https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/client/WorkflowStub.java>

#### Calling other Workflows

To interact with other running Workflow Executions from within the Workflow, use `ExternalWorkflowStub`.
To interact with Child Workflows, use `ChildWorkflowStub`.

See [Workflow Execution](/docs/java/how-to-spawn-a-workflow-execution-in-java) and [Child Workflow Execution](/docs/java/how-to-spawn-a-child-workflow-execution-in-java) for details.

#### Dynamic Workflows

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

The `DynamicWorkflow` must be registered with a Worker.
The following rules apply when registering a Dynamic Workflow with a Worker:

- Only one Workflow implementation that extends `DynamicWorkflow` can be registered with a Worker.
- You can register multiple type-specific Workflow implementations alongside a single `DynamicWorkflow` implementation.
- Implement the `execute` method for Dynamic Workflow implementations. Do not specify a `@WorkflowMethod` when using Dynamic Workflows.
- Implement Signals and Queries dynamically.

  Example for implementing Signal handler dynamically:

  ```java
        Workflow.registerListener(
          (DynamicSignalHandler)
              (signalName, encodedArgs) -> name = encodedArgs.get(0, String.class));
  ```

  Example for implementing Query handler dynamically:

  ```java
        Workflow.registerListener(
          (DynamicQueryHandler)
              (queryType, encodedArgs) -> {
              return name;
      });
  ```

  Note that `DynamicSignalHandler` and `DynamicQueryHandler` can also be implemented in regular Workflow implementations.

- Because `DynamicWorkflow` can be invoked for different Workflow Types, to check what type is running when your Dynamic Workflow `execute` method runs, use:

  ```java
  String type = Workflow.getInfo().getWorkflowType();
  ```

- All standard `WorkflowOptions` apply to Dynamic Workflows.
- All the determinism rules apply to Workflows that implement this interface.

The following example shows a Dynamic Workflow Implementation.

```java
// Dynamic Workflow Implementation
public static class DynamicGreetingWorkflowImpl implements DynamicWorkflow {
  private String name;

  @Override
  public Object execute(EncodedValues args) {
    String greeting = args.get(0, String.class);
    String type = Workflow.getInfo().getWorkflowType();

    // Register dynamic Signal handler
    Workflow.registerListener(
        (DynamicSignalHandler)
            (signalName, encodedArgs) -> name = encodedArgs.get(0, String.class));

    // Register dynamic Query handler
    Workflow.registerListener(
    (DynamicQueryHandler)
        (queryType, encodedArgs) -> {
        return name;
        });
  }
```

The following example shows how to register the Dynamic Workflow implementation with a Worker and the Client code for how to start a Workflow Eecution.

```java
  public static void main(String[] arg) {

    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker worker = factory.newWorker(TASK_QUEUE);

    /* Register the Dynamic Workflow implementation with the Worker. Workflow implementations
    ** must be known to the Worker at runtime in order to dispatch Workflow Tasks.
    */
    worker.registerWorkflowImplementationTypes(DynamicGreetingWorkflowImpl.class);

    // Start all the Workers that are in this process.
    factory.start();

    /* Create the Workflow stub. Note that the Workflow type is not explicitly registered with the Worker */
    WorkflowOptions workflowOptions =
        WorkflowOptions.newBuilder().setTaskQueue(TASK_QUEUE).setWorkflowId(WORKFLOW_ID).build();
    WorkflowStub workflow = client.newUntypedWorkflowStub("DynamicWF", workflowOptions);

    /* Start Workflow Execution and Signal right after. Pass in the Workflow args and Signal args */
    workflow.signalWithStart("greetingSignal", new Object[] {"John"}, new Object[] {"Hello"});

    // Wait for the Workflow to finish getting the results
    String result = workflow.getResult(String.class);

    System.out.println(result);

    System.exit(0);
  }
}
```

#### Workflow implementation constraints

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

#### Workflow Method Arguments

- [What is a Data Converter?](/docs/concepts/what-is-a-data-converter)
- Java DataConverter reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html>
