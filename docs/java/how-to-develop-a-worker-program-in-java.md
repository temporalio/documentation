---
id: how-to-develop-a-worker-program-in-java
title: How to develop a Worker Program in Java
description: Use the `newWorker` method on an instance of a `WorkerFactory` to create a new Worker in Java.
tags:
  - developer-guide
  - java
  - workers
---

Use the `newWorker` method on an instance of a [`WorkerFactory`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerFactory.html) to create a new Worker in Java.

Then register all Workflow Types and all Activity Types that the Worker can execute.
For Activities, since they are stateless and thread-safe, instances are used in the registration process instead of the Java Class.
A Worker can be registered with just Workflows, just Activities, or both.

#### Create Worker Entity

A single [Worker Entity](/concepts/what-is-a-worker-entity) can contain many Worker Objects.
Call the `start()` method on the instance of the `WorkerFactory` to start all the Workers created in this process.

```java
// ...
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class YourWorker {

  public static void main(String[] args) {

    WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker yourWorker = factory.newWorker("your_task_queue");

    // Register Workflow
    // and/or register Activities

    factory.start();
  }
}
```

#### Register Workflow Types

Workflow Types must be registered with a Worker. For `DynamicWorkflow`, only one Workflow implementation that extends `DynamicWorkflow` can be registered with a Worker.

The following example shows how to register a Workflow with the Worker created in the previous example.

```java
    Worker worker = workerFactory.newWorker("your_task_queue");
    ...
    // Register Workflow
    worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);
```

The following example shows how to register the Dynamic Workflow implementation with a Worker.

```java
  public static void main(String[] arg) {

    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker worker = factory.newWorker(TASK_QUEUE);

    /* Register the Dynamic Workflow implementation with the Worker. Workflow implementations
    ** must be known to the Worker at runtime to dispatch Workflow Tasks.
    */
    worker.registerWorkflowImplementationTypes(DynamicGreetingWorkflowImpl.class);

    // Start all the Workers that are in this process.
    factory.start();

    /* Create the Workflow stub. Note that the Workflow type is not explicitly registered with the Worker. */
    WorkflowOptions workflowOptions =
        WorkflowOptions.newBuilder().setTaskQueue(TASK_QUEUE).setWorkflowId(WORKFLOW_ID).build();
    WorkflowStub workflow = client.newUntypedWorkflowStub("DynamicWF", workflowOptions);

    /* Start Workflow Execution and immmediately send Signal. Pass in the Workflow args and Signal args. */
    workflow.signalWithStart("greetingSignal", new Object[] {"John"}, new Object[] {"Hello"});

    // Wait for the Workflow to finish getting the results.
    String result = workflow.getResult(String.class);

    System.out.println(result);

    System.exit(0);
  }
}
```

You can register multiple type-specific Workflow implementations alongside a single `DynamicWorkflow` implementation.

#### Register Activity Types

Like Workflows, Activities must be registered with a Worker.
When registering Activities, we register an instance of the Activity implementation, and can pass any
number of dependencies in its constructor, such as the database connections, services, etc.

The following example shows how to register Activities with a Worker.

```java
    Worker worker = factory.newWorker("your_task_queue");
   ...
    // Register Activity
   worker.registerActivitiesImplementations(new GreetingActivitiesImpl());
```

When you register a single instance of an Activity, you can have multiple instances of Workflow Executions calling the same Activity.
Activity code must be thread-safe because the same instance of the Activity code is run for every Workflow Execution that calls it.

**Operation guides:**

- [How to tune Workers](/operation/how-to-tune-workers)
