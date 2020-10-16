---
id: java-implementing-workflows
title: Implementing Workflows
---

A Workflow implementation implements a Workflow interface. Each time a new Workflow execution is started,
a new instance of the Workflow implementation object is created. Then, one of the methods
(depending on which Workflow type has been started) annotated with `@WorkflowMethod` is invoked. As soon as this method
returns, the Workflow execution is closed. While Workflow execution is open, it can receive calls to signal and query methods.
No additional calls to Workflow methods are allowed. The Workflow object is stateful, so query and signal methods
can communicate with the other parts of the Workflow through Workflow object fields.

## Workflow Implementation Constraints

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

## Calling Activities

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

## Calling Activities Asynchronously

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
            Promise<String> localName = Async.function(activities::download,
                args.getSourceBucketName(), sourceFilename);
            localNamePromises.add(localName);
        }
        // allOf converts a list of promises to a single promise that contains a list
        // of each promise value.
        Promise<List<String>> localNamesPromise = Promise.allOf(localNamePromises);

        // All code until the next line wasn't blocking.
        // The promise get is a blocking call.
        List<String> localNames = localNamesPromise.get();
        processedNames = activities.processFiles(localNames);

        // Upload all results in parallel.
        List<Promise<Void>> uploadedList = new ArrayList<>();
        for (String processedName : processedNames) {
            Promise<Void> uploaded = Async.procedure(activities::upload,
                args.getTargetBucketName(), args.getTargetFilename(), processedName);
            uploadedList.add(uploaded);
        }
        // Wait for all uploads to complete.
        Promise<?> allUploaded = Promise.allOf(uploadedList);
        allUploaded.get(); // blocks until all promises are ready.
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

## Child Workflows

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
