---
id: route-tasks
title: Route Tasks 
---

Consider the specifications of a Worker:
- A Worker is meant to handle only the Tasks that it is registered to handle. This means that Workers registered to handle Tasks for Workflow A are not capable of handling Tasks for Workflow B, and vice versa. 
- A Worker runs on a speicific host. This means that Activity Tasks that depend on resources specific to a particular host must be executed by a Worker on that host.

So, for any given Temporal Workflow, how do we make sure a specific Worker is executing a specific Task? 

## Use Task Queues

"Task Routing" is the development technique that makes use of Task Queues to orchestrate the execution of Tasks by specific Workers.

Let's look at the ["Hello World" sample in Go](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld) to see how this is done.

Here, we are creating a new Worker that is subscribed to the "hello-world" Task Queue, and is registered to handle the `helloworld.Workflow` and `helloworld.Activity`:

```go
// The Worker is created and subscribed to the "hello-world" Task Queue
w := worker.New(c, "hello-world", worker.Options{})
defer w.Stop()
// The Worker is registered to handle the helloworld Workflow
w.RegisterWorkflow(helloworld.Workflow)
// The Worker is registered to handle the helloworld Activity
w.RegisterActivity(helloworld.Activity)
```

And here, we are starting the `helloworld.Workflow`:

```go
// The Workflow Options specify the "hello-world" Task Queue
// This is the Task Queue that the Workflow will add its Tasks to
workflowOptions := client.StartWorkflowOptions{
  ID:        "hello_world_workflowID",
  TaskQueue: "hello-world",
}
// The Workflow Options are passed to the execution of the Workflow
we, err := c.ExecuteWorkflow(
  context.Background(), 
  workflowOptions, 
  helloworld.Workflow, 
  "Temporal",
)
```

Task routing can be as simple as making sure a Worker is subscribed to a Task Queue and Tasks are being added to it.

:::caution

If a Worker pulls a Task that it has not been registered to run, an "unknown workflow type" error will occur.

:::

## Task routing for Activity dependencies

The Temporal service will persist Activity results as long as the results can be serialized and stored in a Cassandra or MySQL database (which happens to be true for most Activity results). However, there are some scenarios where an Activity execution will do something that results in data being stored on the host where the Worker is running. It is also possible that the next Activity in the Workflow has a dependency on that data.

Let's look at a file processing Workflow, as an example,  where files are downloaded, processed in some way, and then uploaded to some other location. If a large video file is being processed only the name of the file can persist normally. The file itself must persist locally on the Worker host. This means that any future Activities that act on the video file must also take place on the host where the Worker downloaded it.

So, how do we ensure that a Worker on the correct host will execute the next set of Activities that depends on the video file?

Each SDK offers a slightly different way to handle this.

### Java

In Java the paradigm is to create two Workers. Each will exist on the same host and thus have access to the same file system, but one will listen to a shared Task Queue, which it will poll to start the Workflow, and the other will listen to its own private Task Queue.

```java
// Initialize a WorkerFactory
WorkerFactory factory = WorkerFactory.newInstance(client);
// Create a Worker that is subscribed to a shared TaskQueue
final Worker workerForCommonTaskList = factory.newWorker(globalTaskQueue);
// Register Workflow and Activities
// Create a Worker that is subscribed to a private TaskQueue
final Worker workerForHostSpecificTaskList = factory.newWorker(hostSpecifiTaskQueue);
// Register activities
```

Then, design your Workflow Activities to return an object that includes both the Activity result and the name of the private Task Queue to which the next Activity Task will be added.

```java
public interface StoreActivities {

  final class ResultAndTaskQueuePair {
    // This is the name of the private Task Qeueu
    private final String hostspecificTaskQueue;
    // This is the Activity result (e.g. the name or location of the file)
    private final String activityResult;

    // Get and set methods ...
  }

  // Interface methods ....
}
```

The [FileProcessing sample in Java](https://github.com/temporalio/temporal-java-samples/tree/143902cba3e14aa11f3b90784baf53406c329fd2/src/main/java/io/temporal/samples/fileprocessing) shows an example of this design.

### Go

In Go, you actually have two options.

The first option is to do the same thing as you would do in Java, which is to create two Workers (one listens to the shared Task Qeue and the other listens to the private Task Queue) and return the name of the private Task Queue back to the Workflow as an Activity result.

The second option is to create a Workflow Session which automatically ties any remaining Workflow Activity executions to the Worker that started the Workflow.

```go
workerOptions := worker.Options{
  // Sessions are enabled in the WorkerOptions
  EnableSessionWorker: true,
}
// The Worker is subscribed to a Task Queue
w := worker.New(c, "task_queue_name", workerOptions)
defer w.Stop()
```

Then within the Workflow invocation code, set the `SessionOptions` and create the Session.

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

The [FileProcessing sample in Go](https://github.com/temporalio/temporal-go-samples/tree/master/fileprocessing) is a good example of Workflow Sessions in Go.

