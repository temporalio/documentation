---
id: workflows
title: Workflows in Java
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

import RelatedReadList from '../components/RelatedReadList.js'

## What is a Workflow?

Workflows are resilient programs, meaning that they will continue execution even in the presence of
different failure conditions.

Workflows encapsulate execution/orchestration of Tasks which include Activities and child Workflows.
They also need to react to external events, respond to query requests, and deal with Timeouts.

In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow Interface:

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {
  // ...
}
```

The Workflow Interface is a Java interface which is annotated with the `@WorkflowInterface` annotation.

## Workflow Interface

Workflow interface methods must have one of the following annotations:

- **@WorkflowMethod** denotes the starting point of Workflow execution. Workflow execution completes when this methods returns.
- **@SignalMethod** indicates that this method is a signal handler method and that it can react to external signals. It can have parameters which can contain the signal payload. It does not return a value, so it must have a `void` return type.
- **@QueryMethod** indicates that this method can be used to query the Workflow's state at any time during its execution.
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
It can be used to denote the Workflow type. If not set, the Workflow type defaults to the short name of the Workflow interface,
in the example above being `FileProcessingWorkflow`.
Methods annotated with `@WorkflowMethod` can have any number of parameters.
We recommend passing a single parameter that contains all the input fields.
This allows adding fields in a backward compatible manner.

The `@QueryMethod` annotation also has a `name` parameter, for example: `@QueryMethod(name = "history")`. It can be
used to denote the query name. If not set, the query name defaults to the name of the method, in the example above
being `getStatus`.

The `@SignalMethod` too has a `name` parameter, for example: `@SignalMethod(name = "mysignal")`. It can be used to denote the
signal type. If not set, the signal type defaults to the name of the method, in the example above being `retryNow` and `abandon`.

### Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies. It may be useful for creating components reusable across multiple
Workflow interfaces. For example imaging a UI or CLI button that allows to call `retryNow` signal on any Workflow. To implement
this feature you can redesign the above interface to:

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

Then some other Workflow interface can extend just `Retryable`, for example:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Now if we have two running Workflows, one that implements the `FileProcessingWorkflow` interface and another that implements the
`MediaProcessingWorkflow` interface, we can signal to both using their common interface and knowing their workflowIds, for example:

```java
Retryable r1 = client.newWorkflowStub(Retryable.class, firstWorkflowId);
Retryable r2 = client.newWorkflowStub(Retryable.class, secondWorkflowId);
r1.retryNow();
r2.retryNow();
```

The same technique can be used to query Workflows using a base Workflow interface.

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

If we attempt to register implementations of Workflow1 and Workflow2 with a Worker will fail. Let's say that we have:

```java
worker.registerWorkflowImplementationTypes(
        Workflow1Impl.class, Workflow2Impl.class);
```

This registration will fail with:

```text
java.lang.IllegalStateException: BaseWorkflow workflow type is already registered with the worker
```

## Implementing Workflows

A Workflow implementation implements a Workflow interface. Each time a new Workflow execution is started,
a new instance of the Workflow implementation object is created.
Then, one of the methods
(depending on which Workflow type has been started) annotated with `@WorkflowMethod` can be invoked.
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

Even though Temporal has the replay capability, which brings resilience to your Workflows, you should never think about
this capability when writing your Workflows.
Instead, you should focus on implementing your business logic/requirements and write your Workflows
as they would execute only once.

There are some things however to think about when writing your Workflows, namely determinism and isolation.
We summarize these constraints here:

They shouldn't use any constructs that rely on system time.

- Do not use any mutable global variables in your Workflow implementations. This will assure that multiple Workflow instances are fully isolated.
- Do not call any non-deterministic functions like non seeded random or UUID.randomUUID() directly from the Workflow code. The Temporal SDK provides specific API for calling non-deterministic code in your Workflows, which we will show later on in this document.
- Perform all IO operations and calls to third-party services on Activities and not Workflows, as they are usually non-deterministic in nature.
- Do not use any programming language constructs that rely on system time. For example, only use `Workflow.currentTimeMillis()` to get the current time inside a Workflow.
- Do not use native Java `Thread` or any other multi-threaded classes like `ThreadPoolExecutor`. Use `Async.function` or `Async.procedure`,
  provided by the Temporal SDK, to execute code asynchronously.
- Don't use any synchronization, locks, and other standard Java blocking concurrency-related classes besides those provided
  by the Workflow class. There is no need in explicit synchronization because multi-threaded code inside a Workflow is
  executed one thread at a time and under a global lock.
  - Call `Workflow.sleep` instead of `Thread.sleep`.
  - Use `Promise` and `CompletablePromise` instead of `Future` and `CompletableFuture`.
  - Use `WorkflowQueue` instead of `BlockingQueue`.
- Use `Workflow.getVersion` when making any changes to the Workflow code. Without this, any deployment of updated Workflow code
  might break already running Workflows.
- Don’t access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

### Workflow Method Arguments

- [What is a Data Converter?](/concepts/what-is-a-data-converter)

Java DataConverter reference: https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html

## Workflow Activities

To learn about Workflow Activities visit [this page](/java/activities).

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/concepts/what-is-a-child-workflow-execution","explanation"],  
]}
/>

### Java Child Workflow API

`Workflow.newChildWorkflowStub` returns a client-side stub that implements a child Workflow interface.
It takes a child Workflow type and optional child Workflow options as arguments. Workflow options can be used
to set timeout, retry options, and task queue settings for example.
Note that by default a child Workflow inherits the Workflow options of its parent. You can however overwrite these
by passing in custom Workflow options when creating the child Workflow stub.

The first call to the child Workflow stub must always be its Workflow method (method annotated with `@WorkflowMethod`).

Similar to Activities, invoking child Workflow methods can be made synchronous or asynchronous by using `Async#function` or `Async#procedure`.
The synchronous call blocks until a child Workflow method completes. The asynchronous call
returns a `Promise` that can be used to wait for the completion of the child Workflow method, for example:

```java
GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);
Promise<String> greeting = Async.function(child::composeGreeting, "Hello", name);
// ...
greeting.get()
```

Note that querying child Workflows from within the parent Workflow code is not supported. You can however
query child Workflows from Activities using `WorkflowClient`.

Following are examples of using a child Workflow inside a Workflow:

```java
// Child Workflow interface
@WorkflowInterface
public interface GreetingChild {
   @WorkflowMethod
   String composeGreeting(String greeting, String name);
}
// Child Workflow implementation not shown

// Parent Workflow implementation
public class GreetingWorkflowImpl implements GreetingWorkflow {

   @Override
   public String getGreeting(String name) {
       GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);

       // This is a blocking call that returns only after child has completed.
       return child.composeGreeting("Hello", name );
   }
}
```

Running two children (with the same type) in parallel:

```java
// Parent Workflow implementation
public class GreetingWorkflowImpl implements GreetingWorkflow {

    @Override
    public String getGreeting(String name) {

        // Workflows are stateful, so a new stub must be created for each new child.
        GreetingChild child1 = Workflow.newChildWorkflowStub(GreetingChild.class);
        Promise<String> greeting1 = Async.function(child1::composeGreeting, "Hello", name);

        // Both children will run concurrently.
        GreetingChild child2 = Workflow.newChildWorkflowStub(GreetingChild.class);
        Promise<String> greeting2 = Async.function(child2::composeGreeting, "Bye", name);

        // Do something else here.
        ...
        return "First: " + greeting1.get() + ", second: " + greeting2.get();
    }
}
```

Sending a signal to a child Workflow from the parent:

```java
// Child Workflow interface
@WorkflowInterface
public interface GreetingChild {
    @WorkflowMethod
    String composeGreeting(String greeting, String name);

    @SignalMethod
    void updateName(String name);
}

// Parent Workflow implementation
public class GreetingWorkflowImpl implements GreetingWorkflow {

    @Override
    public String getGreeting(String name) {
        GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);
        Promise<String> greeting = Async.function(child::composeGreeting, "Hello", name);
        child.updateName("Temporal");
        return greeting.get();
    }
}
```

### ParentClosePolicy

When creating a Child Workflow, you can define a `ParentClosePolicy` that terminates, cancels, or abandons the Workflow Execution if the child's parent stops execution.

- `ABANDON`: When the parent stops, don't do anything with the Child Workflow.
- `TERMINATE`: When the parent stops, terminate the Child Workflow
- `REQUEST_CANCEL`: When the parent stops, terminate the Child Workflow

You can set policies per child, which means you can opt out of propagating terminates / cancels on a per-child basis.
This is useful for starting Child Workflows asynchronously:

```java
   public void parentWorkflow() {
       ChildWorkflowOptions options =
          ChildWorkflowOptions.newBuilder()
              .setParentClosePolicy(ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON)
              .build();
       MyChildWorkflow child = Workflow.newChildWorkflowStub(MyChildWorkflow.class, options);
       Async.procedure(child::<workflowMethod>, <args>...);
       Promise<WorkflowExecution> childExecution = Workflow.getWorkflowExecution(child);
       // Wait for child to start
       childExecution.get()
  }
```

1. Set `ChildWorkflowOptions.ParentClosePolicy` to `ABANDON` when creating a Child Workflow stub.
2. Start Child Workflow Execution asynchronously using `Async.function` or `Async.procedure`.
3. Call `Workflow.getWorkflowExecution(…)` on the child stub
4. Wait for the Promise returned by `getWorkflowExecution` to complete.
   This indicates that the child successfully started (or start failed).
5. Complete Parent Workflow Execution asynchronously

Steps 3 and 4 are needed to ensure that a Child Workflow Execution starts before the parent closes.
If the parent initiates a Child Workflow Execution and then immediately completes, the child would never execute.

## Starting Workflow Executions

In the Temporal Java SDK, Workflows can be started both synchronously and asynchronously.
To do either, you must initialize an instance of a `WorkflowClient`, create a client side Workflow stub,
and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).

### Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller.
This is the most common way to start Workflows in a live environment.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again.

If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`,
it reconnects to an existing Workflow and waits for its completion.

The following example shows how to do this from a different process than the one that started the Workflow Execution.

```java
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, workflowId);

// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

Another way to connect to an existing workflow and wait for its completion from another process is to use
`UntypedWorkflowStub`, for example:

```java
WorkflowStub workflowStub = client.newUntypedWorkflowStub(workflowType, workflowOptions);

// Returns the result after waiting for the Workflow to complete.
String result = workflowStub.getResult(String.class);
```

### Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or was stopped.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

### Recurring start

You can start a Workflow Execution on a regular schedule with [the CronSchedule option](distributed-cron).

### External Workflows

Workflows can execute (and signal to) other workflows purely by name.
This helps particularly for executing workflows from other language SDKs.
See our [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.

## Large Event Histories

Temporal SDK allows you to manually use [Continue-As-New](/concepts/what-is-continue-as-new) in a number of ways:

If you are continuing execution of the same workflow that is currently running you can do:

```java
Workflow.continueAsNew(input1, ...);
```

It is also possible to continue execution as a completely different Workflow type.
In a Workflow class called `MyWorkflow` for example, we can create a Workflow Stub with a different type and
call its Workflow method to continue execution as that type:

```java
MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class);
continueAsNew.greet(input);
```

`Workflow.newContinueAsNewStub` also allows to provide `ContinueAsNewOptions` options, for example:

```java
ContinueAsNewOptions options = ContinueAsNewOptions.newBuilder()
        .setTaskQueue("newTaskQueueName")
        .build();

MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class, options);
// ...
continueAsNew.greet(input);
```

This allows you to continue workflow execution as a new Workflow run with a different Workflow type,
and on a different Task Queue.

Another way to deal with the execution history size limits is to use Child Workflows, however
they themselves could eventually, if long running, experience the same issue in which case you can again
apply the "ContinueAsNew" feature if needed.

"ContinueAsNew" can also be used in [child Workflows](#child-workflows). Note that in this case the parent Workflow
is not aware if its child Workflows called "ContinueAsNew". This way a child Workflow can call "ContinueAsNew" as many times
as it needs, and the parent Workflow will get notified when the last run of the child Workflow completes or fails.

If you need to know whether a Workflow was started via `continueAsNew`, you can check `Workflow.getInfo().getContinuedExecutionRunId().isPresent()`.
