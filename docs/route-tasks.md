---
id: route-tasks
title: How to route Tasks
sidebar_label: Route Tasks
---

## Overview

This guide covers the recommended techniques to ensure that a Workflow and/or Activity will be executed by an appropriate Worker. In this guide we will look at two examples:

1. A basic example that illustrates the fundamentals of routing a Task to a Worker.
2. A more complex example involving Activities with host-specific file dependencies.

Consider the specifications of a Worker:
- A Worker only handles [Activity](activities) and [Workflow](workflows) Tasks that it is registered to handle. This means that a Task must be paired with a Worker that is registered to handle that Task.
- A Worker runs on a specific host. This means that Activity Tasks that depend on host-specific resources, such as a local file, must be executed by a Worker on that host.

The question is how can we ensure a specific Worker will execute a given Task? We do this through "Task routing".

## Task routing with Task Queues

Task routing is the development technique that pairs Tasks with Workers using Task Queues. At the basic level it consists of 3 steps:

1. Subscribe a Worker to a Task Queue.
2. Register Workflow and/or Activity Tasks with the Worker.
3. Configure Workflows and Activities to send Tasks to the Task Queue.

Let's look at a simple "Hello World" sample to see how this is done. In the following code snippet we create a new Worker, subscribe it to the "hello-world" Task Queue, and register it to handle "Hello World" Workflow and "Hello World" Activity implementations:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="java"
    values={[
        { label: 'Java', value: 'java', },
        { label: 'Go', value: 'go', },
    ]
}>

<TabItem value="java">

[Sample source reference](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/hello/HelloActivity.java#L91-L99)
```java
// Worker is created and subscribed to the "hello-world" Task Queue 
Worker worker = factory.newWorker("hello-world");
// Worker is registered to handle helloworld Workflow
worker.registerWorkflowImplementationTypes(HelloWorldWorkflowImpl.class)
// Worker is registered to handle helloworld Activity
worker.registerActivityImplementationTypes(HelloWorldActivityImpl)
```

</TabItem>
<TabItem value="go">

[Sample source reference](https://github.com/temporalio/go-samples/blob/master/helloworld/worker/main.go#L20-L23)
```go
// Worker is created and subscribed to the "hello-world" Task Queue
w := worker.New(c, "hello-world", worker.Options{})
defer w.Stop()
// Worker is registered to handle the helloworld Workflow
w.RegisterWorkflow(helloworld.Workflow)
// Worker is registered to handle the helloworld Activity
w.RegisterActivity(helloworld.Activity)
```

</TabItem>
</Tabs>

In the next code snippet, we configure the "Hello World" Workflow to send its Tasks to the "hello-world" Task Queue and then start its execution:

<Tabs
    defaultValue="go"
    values={[
        { label: 'Java', value: 'java'},
        { label: 'Go', value: 'go' },
    ]           
}>

<TabItem value="java">

[Sample source reference](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/hello/HelloActivity.java#L91-L99)
```java
HelloWorldWorkflow workflow =
    client.newWorkflowStub(
        HelloWorldWorkflow.class,
        // Workflow Options specify the "hello-world"" Task Queue
        // Which is the Task Queue that the Workflow will send its Tasks to
        WorkflowOptions.newBuilder().setTaskQueue("hello_world").build());
// Workflow is executed
WorkflowExecution workflowExecution =
    WorkflowClient.start(workflow::helloWorld);
```

</TabItem>
<TabItem value="go">

[Sample source reference](https://github.com/temporalio/go-samples/blob/master/helloworld/starter/main.go#L20-L25)
```go
// Workflow Options specify the "hello-world" Task Queue
// Which is the Task Queue that the Workflow will send its Tasks to
workflowOptions := client.StartWorkflowOptions{
  ID:        "hello_world_workflowID",
  TaskQueue: "hello-world",
}
// Workflow Options are passed to the execution of the Workflow
we, err := c.ExecuteWorkflow(
  context.Background(), 
  workflowOptions, 
  helloworld.Workflow, 
  "Temporal",
)
```

</TabItem>
</Tabs>

:::caution

If a Worker pulls a Task that it has not been registered to execute, an "unknown workflow type" error will occur.

:::

The above examples illustrate the fundamental approach to pairing Tasks with Workers. In the next section we look at a more complex scenario involving Activities with host-specific file dependencies.

## Task routing for Activity dependencies

The Temporal service will persist Activity results as long as the results are less than 2MB in size and can be serialized for storage (which happens to be true for most Activity results). However, there are some scenarios where an Activity execution will do something that results in files being stored directly on the host where the Worker is running. It is also possible that the next Activity in the Workflow has a dependency on those files and needs to run on the same host.

Let's look at a file processing Workflow example where files are downloaded, transcoded in some way, and then uploaded to some other location. If a large video file is being transcoded Temporal can only persist the name of the file. The file itself must persist locally on the Worker host as it is too big for Temporal to store. This means that any future Activities that act on the video file must also take place on the host where the Worker downloaded it.

So, how do we ensure that a Worker on the correct host will execute the next Activity that depends on the video file? This is accomplished in different ways depending on the SDK.

### Java

Consider the [file processing sample in Java](https://github.com/temporalio/java-samples/tree/master/src/main/java/io/temporal/samples/fileprocessing). The paradigm is to create two Workers. Each will run on the same host and thus have access to the same file system, but one will listen to a global (shared) Task Queue, which it will use to start the Workflow, and the other will listen to its own host-specific (private) Task Queue. A practical approach to naming host-specific (private) Task Queues is to use the MAC address or other unique identifier of the host. 

The following code snippet is stripped down from the [FileProcessingWorker.java sample](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/fileprocessing/FileProcessingWorker.java) and highlights the creation of two workers for this purpose:

```java
// Initialize a WorkerFactory
WorkerFactory factory = WorkerFactory.newInstance(client);
// Create a Worker that is subscribed to a shared Task Queue
final Worker workerForCommonTaskList = factory.newWorker(globalTaskQueue);
// Register Workflow and Activities
// Create a Worker that is subscribed to a private TaskQueue
final Worker workerForHostSpecificTaskList = factory.newWorker(hostSpecifiTaskQueue);
// Register activities
```

Within the [Workflow code](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/fileprocessing/FileProcessingWorkflowImpl.java#L42), the first Activity Task is sent to the global Task Queue and is executed by the Worker listening to the same global Task Queue.

```java
public FileProcessingWorkflowImpl() {
    // Create activity clients.
    ActivityOptions ao =
        ActivityOptions.newBuilder()
        // Send the Activity to the shared Task Queue
        .setTaskQueue(globalTaskQueue)
        .build();
    this.defaultTaskQueueStore = Workflow.newActivityStub(StoreActivities.class, ao);
}
```

The Activities should be designed to [return an object](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/fileprocessing/StoreActivities.java) that includes both the Activity result and the name of the host-specific Task Queue to which the next Activity Task should be sent.

```java
public interface StoreActivities {

  final class ResultAndTaskQueuePair {
    // Name of the host-specific  Task Queue
    private final String hostspecificTaskQueue;
    // This is the Activity result (e.g. the name or location of the file)
    private final String activityResult;

    // Get and set methods ...
  }

  // Interface methods ....
}
```

The host-specific Task Queue is then configured for [subsequent Activity executions](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/fileprocessing/FileProcessingWorkflowImpl.java#L63):

```java
private void processFileImpl(URL source, URL destination) {
    // Initialize stubs that are specific to the returned task queue.
    ActivityOptions hostActivityOptions =
        ActivityOptions.newBuilder()
        // Set the host-specific Task Queue
        .setTaskQueue(hostSpecificTaskQueue)
        .build();

    // Call the Activity to process the file using worker-specific task queue.
}
```

### Go

In Go, you have two options.

**Option 1**: Implement the same design as you would in Java, which is to create two Workers (one listens to the shared Task Qeue and the other listens to the private Task Queue) and return the name of the private Task Queue back to the Workflow as an Activity result.

**Option 2**: Create a Workflow Session which automatically ties Activity executions to the Worker that started the Workflow. The [FileProcessing sample in Go](https://github.com/temporalio/temporal-go-samples/tree/master/fileprocessing) is a good example of sessions being used for this purpose. The Worker must be [configured to support sessions](https://github.com/temporalio/go-samples/blob/master/fileprocessing/worker/main.go#L27).

```go
workerOptions := worker.Options{
  // Sessions are enabled in the WorkerOptions
  EnableSessionWorker: true,
}
// The Worker is subscribed to a Task Queue
w := worker.New(c, "task_queue_name", workerOptions)
defer w.Stop()
```

Within the [Workflow invocation code](https://github.com/temporalio/go-samples/blob/master/fileprocessing/workflow.go#L48), set the `SessionOptions` and create the Session.

```go
// The Workflow SessionOptions are configured
so := &workflow.SessionOptions{
  CreationTimeout:  time.Minute,
  ExecutionTimeout: time.Minute,
}
// The Workflow Session is created
sessionCtx, err := workflow.CreateSession(ctx, so)
if err != nil {
  return err
}
defer workflow.CompleteSession(sessionCtx)
// Execute activities...
```

The session will ensure that all Activities are executed on the same host.

## Summary

It is up to the developer to pair a given Task (Workflow and/or Activity) with an appropriate Worker. Task Queues make that possible with a great degree of flexibility. Read the [Task Queues concept page](task-queues) to learn more about Task Queues and why they exist in comparison to directly calling upon a Worker for execution.

