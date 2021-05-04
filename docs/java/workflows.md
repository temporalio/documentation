---
id: workflows
title: Workflows in Java
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

## Implementing Workflows

A Workflow implementation implements a Workflow interface. Each time a new Workflow execution is started,
a new instance of the Workflow implementation object is created. Then, one of the methods
(depending on which Workflow type has been started) annotated with `@WorkflowMethod` is invoked. As soon as this method
returns, the Workflow execution is closed. While Workflow execution is open, it can receive calls to signal and query methods.
No additional calls to Workflow methods are allowed. The Workflow object is stateful, so query and signal methods
can communicate with the other parts of the Workflow through Workflow object fields.

### Workflow Implementation Constraints

Temporal uses the [Microsoft Azure Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover
the state of a Workflow object including its threads and local variable values.
In essence, every time a Workflow state has to be restored, its code is re-executed from the beginning. When replaying, side
effects (such as Activity invocations) are ignored because they are already recorded in the Workflow event history.
When writing Workflow logic, the replay is not visible, so the code should be written since it executes only once.
This design puts the following constraints on the Workflow implementation:

- Do not use any mutable global variables because multiple instances of Workflows are executed in parallel.
- Do not call any non-deterministic functions like non seeded random or UUID.randomUUID() directly from the Workflow code.

Always do the following in the Workflow implementation code:

- Don’t perform any IO or service calls as they are not usually deterministic. Use Activities for this.
- Only use `Workflow.currentTimeMillis()` to get the current time inside a Workflow.
- Do not use native Java `Thread` or any other multi-threaded classes like `ThreadPoolExecutor`. Use `Async.function` or `Async.procedure`
  to execute code asynchronously.
- Don't use any synchronization, locks, and other standard Java blocking concurrency-related classes besides those provided
  by the Workflow class. There is no need in explicit synchronization because multi-threaded code inside a Workflow is
  executed one thread at a time and under a global lock.
  - Call `WorkflowThread.sleep` instead of `Thread.sleep`.
  - Use `Promise` and `CompletablePromise` instead of `Future` and `CompletableFuture`.
  - Use `WorkflowQueue` instead of `BlockingQueue`.
- Use `Workflow.getVersion` when making any changes to the Workflow code. Without this, any deployment of updated Workflow code
  might break already open Workflows.
- Don’t access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

Workflow method arguments and return values are serializable to a byte array using the provided
[DataConverter](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html)
interface. The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers with every event that the Workflow logic needs to process.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.

### Calling Activities

`Workflow.newActivityStub` returns a client-side stub that implements an Activity interface.
It takes Activity type and Activity options as arguments. Activity options are needed only if some of the required
timeouts are not specified through the `@ActivityMethod` annotation.

Calling a method on this interface invokes an Activity that implements this method.
An Activity invocation synchronously blocks until the Activity completes, fails, or times out. Even if Activity
execution takes a few months, the Workflow code still sees it as a single synchronous invocation.
It doesn't matter what happens to the processes that host the Workflow. The business logic code
just sees a single method call.

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {

    private final FileProcessingActivities activities;

    public FileProcessingWorkflowImpl() {
        this.activities = Workflow.newActivityStub(
                FileProcessingActivities.class,
                ActivityOptions.newBuilder()
                        .setStartToCloseTimeout(Duration.ofHours(1))
                        .build());
    }

    @Override
    public void processFile(Arguments args) {
        String localName = null;
        String processedName = null;
        try {
            localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());
            processedName = activities.processFile(localName);
            activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);
        } finally {
            if (localName != null) { // File was downloaded.
                activities.deleteLocalFile(localName);
            }
            if (processedName != null) { // File was processed.
                activities.deleteLocalFile(processedName);
            }
        }
    }
    ...
}
```

If different Activities need different options, like timeouts or a task queue, multiple client-side stubs can be created
with different options.

```java
public FileProcessingWorkflowImpl() {
    ActivityOptions options1 = ActivityOptions.newBuilder()
             .setTaskQueue("taskQueue1")
             .setStartToCloseTimeout(Duration.ofMinutes(10))
             .build();
    this.store1 = Workflow.newActivityStub(FileProcessingActivities.class, options1);

    ActivityOptions options2 = ActivityOptions.newBuilder()
             .setTaskQueue("taskQueue2")
             .setStartToCloseTimeout(Duration.ofMinutes(5))
             .build();
    this.store2 = Workflow.newActivityStub(FileProcessingActivities.class, options2);
}
```

### Calling Activities Asynchronously

Sometimes Workflows need to perform certain operations in parallel.
The `Async` class static methods allow you to invoke any Activity asynchronously. The calls return a `Promise` result immediately.
`Promise` is similar to both Java `Future` and `CompletionStage`. The `Promise` `get` blocks until a result is available.
It also exposes the `thenApply` and `handle` methods. See the `Promise` JavaDoc for technical details about differences with `Future`.

To convert a synchronous call:

```java
String localName = activities.download(sourceBucket, sourceFile);
```

To asynchronous style, the method reference is passed to `Async.function` or `Async.procedure`
followed by Activity arguments:

```java
Promise<String> localNamePromise = Async.function(activities::download, sourceBucket, sourceFile);
```

Then to wait synchronously for the result:

```java
String localName = localNamePromise.get();
```

Here is the above example rewritten to call download and upload in parallel on multiple files:

```java
  public void processFile(Arguments args) {
    List<Promise<String>> localNamePromises = new ArrayList<>();
    List<String> processedNames = null;
    try {
      // Download all files in parallel.
      for (String sourceFilename : args.getSourceFilenames()) {
        Promise<String> localName =
            Async.function(activities::download, args.getSourceBucketName(), sourceFilename);
        localNamePromises.add(localName);
      }
      List<String> localNames = new ArrayList<>();
      for (Promise<String> localName : localNamePromises) {
        localNames.add(localName.get());
      }
      processedNames = activities.processFiles(localNames);

      // Upload all results in parallel.
      List<Promise<Void>> uploadedList = new ArrayList<>();
      for (String processedName : processedNames) {
        Promise<Void> uploaded =
            Async.procedure(
                activities::upload,
                args.getTargetBucketName(),
                args.getTargetFilename(),
                processedName);
        uploadedList.add(uploaded);
      }
      // Wait for all uploads to complete.
      Promise.allOf(uploadedList).get();
    } finally {
      for (Promise<String> localNamePromise : localNamePromises) {
        // Skip files that haven't completed downloading.
        if (localNamePromise.isCompleted()) {
          activities.deleteLocalFile(localNamePromise.get());
        }
      }
      if (processedNames != null) {
        for (String processedName : processedNames) {
          activities.deleteLocalFile(processedName);
        }
      }
    }
  }
```

### Child Workflows

Besides Activities, a Workflow can also orchestrate other Workflows.

`Workflow.newChildWorkflowStub` returns a client-side stub that implements a child Workflow interface.
It takes a child Workflow type and optional child Workflow options as arguments. Workflow options may be needed to override
the timeouts and task queue if they differ from the ones defined in the `@WorkflowMethod` annotation or parent Workflow.

The first call to the child Workflow stub must always be to a method annotated with `@WorkflowMethod`. Similar to Activities, a call
can be made synchronous or asynchronous by using `Async#function` or `Async#procedure`. The synchronous call blocks until a child Workflow completes. The asynchronous call
returns a `Promise` that can be used to wait for the completion. After an async call returns the stub, it can be used to send signals to the child
by calling methods annotated with `@SignalMethod`. Querying a child Workflow by calling methods annotated with `@QueryMethod`
from within Workflow code is not supported. However, queries can be done from Activities
using the provided `WorkflowClient` stub.

```java
@WorkflowInterface
public interface GreetingChild {
   @WorkflowMethod
   String composeGreeting(String greeting, String name);
}

public static class GreetingWorkflowImpl implements GreetingWorkflow {

   @Override
   public String getGreeting(String name) {
       GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);

       // This is a blocking call that returns only after child has completed.
       return child.composeGreeting("Hello", name );
   }
}
```

Running two children in parallel:

```java
public static class GreetingWorkflowImpl implements GreetingWorkflow {

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

To send a signal to a child, call a method annotated with `@SignalMethod`:

```java
@WorkflowInterface
public interface GreetingChild {
    @WorkflowMethod
    String composeGreeting(String greeting, String name);

    @SignalMethod
    void updateName(String name);
}

public static class GreetingWorkflowImpl implements GreetingWorkflow {

    @Override
    public String getGreeting(String name) {
        GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);
        Promise<String> greeting = Async.function(child::composeGreeting, "Hello", name);
        child.updateName("Temporal");
        return greeting.get();
    }
}
```

Calling methods annotated with `@QueryMethod` is not allowed from within Workflow code. Use an Activity to call them.

## Starting Workflow Executions

In Java, Workflows can be started both synchronously and asynchronously in Java. To do either, you must initialize an instance of a `WorkflowClient`, create a client side Workflow stub, and then call a method that is annotated with `@WorkflowMethod`.

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller. This is the most common way to start Workflows in a live environment.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again. If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this process needs is a `WorkflowId`.

```java
WorkflowExecution we = new WorkflowExecution().setWorkflowId(workflowId);
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, we);
// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or was stops.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

## Workflow Interface

Workflow encapsulates the orchestration of Activities and child Workflows.
It can also answer synchronous queries and receive external events (also known as signals).

A Workflow must define an interface class. A Workflow interface class must be annotated with `@WorkflowInterface`.
All of its methods must have one of the following annotations:

- **@WorkflowMethod** indicates an entry point to a Workflow. It contains parameters such as timeouts and a task queue.
  Required parameters (such as `executionStartToCloseTimeoutSeconds`) that are not specified through the annotation must be provided at runtime.
- **@SignalMethod** indicates a method that reacts to external signals. It must have a `void` return type.
- **@QueryMethod** indicates a method that reacts to synchronous query requests. It must have a non `void` return type.

You can have more than one method with the same annotation (except @WorkflowMethod). For example:

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @WorkflowMethod
    String processFile(Arguments args);

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod(name="status")
    String getStatus();

    @SignalMethod
    void retryNow();

    @SignalMethod
    void abandon();
}
```

Note that name parameter of Workflow method annotations can be used to specify name of Workflow, signal and query types.
If name is not specified the short name of the Workflow interface separated by underscore with the method name is used.
In the above code the @WorkflowMethod.name is not specified, thus the Workflow type defaults to `"FileProcessingWorkflow_processFile"`.

We recommended that you use a single value type argument for all types of Workflow methods.
This way, adding new arguments as fields to the value type is a backwards-compatible change.

### Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies. It may be useful for creating components reusable across multiple
Workflow types. For example imaging a UI or CLI button that allows to call `retryNow` signal on any Workflow. To implement
this feature you can redesign the above interface to:

```java
@WorkflowInterface
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

    @QueryMethod(name="status")
    String getStatus();

    @SignalMethod
    void abandon();
}
```

Then some other Workflow can implement it as well:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {
    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Then it would be possible to send signal to both of them using the Retryable interface only:

```java
Retryable r = client.newWorkflowStub(Retryable.class, workflowId);
r.retryNow();
```

The same technique can be used to query Workflows through a base interface.

Note that an attempt to start Workflow through a base interface annotated with `@WorkflowInterface` is not going to work.
Let's look at the following **invalid** example:

```java
// INVALID CODE!
@WorkflowInterface
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

An attempt to register implementations of Workflow1 and Workflow2 are going to fail as they are going to use the same
Workflow type. The type is defined by the type of the class which is annotated with @WorkflowInterface. In this case `BaseWorkflow`.
The solution is to remove @WorkflowInterface annotation from BaseWorkflow. The following is valid code:

```java
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

Implementations of Workflow1 and Workflow2 can registered with the same worker as they will have types defined by their interfaces.

## Long Event Histories (ContinueAsNew)

import SharedDoc from '../shared/continue-as-new.md'

<SharedDoc />

Temporal SDK allows you to manually use "Continue-as-new" in a number of ways:

If you are continuing execution of the same workflow that is currently running you can do:

```java
Workflow.continueAsNew(input1, ...);
```

It is also possible to continue execution as a completely differnt Workflow type.
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
apply the "Continue-as-new" feature if needed.
