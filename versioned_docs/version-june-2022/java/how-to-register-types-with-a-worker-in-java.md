---
id: how-to-register-types-with-a-worker-in-Java
title: How to register types with a Worker in Java
sidebar_label: Register Types
description: Use `worker.registerWorkflowImplementationTypes` to register Workflow type and `worker.registerActivitiesImplementations` to register Activity implementation with Workers.
tags:
  - developer-guide
  - java
  - workers
---

Use `worker.registerWorkflowImplementationTypes` to register Workflow type and `worker.registerActivitiesImplementations` to register Activity implementation with Workers.

For Workflows, the Workflow Type is registered with a Worker.
A Workflow Type can be registered only once per Worker entity.
If you define multiple Workflow implementations of the same type, you get an exception at the time of registration.

For Activities, Activity implementation instances are registered with a Worker because they are stateless and thread-safe.
You can pass any number of dependencies in the Activity implementation constructor, such as the database connections, services, etc.

The following example shows how to register a Workflow and an Activity with a Worker.

```java
    Worker worker = workerFactory.newWorker("your_task_queue");
    ...
    // Register Workflow
    worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);
    // Register Activity
    worker.registerActivitiesImplementations(new GreetingActivitiesImpl());
```

When you register a single instance of an Activity, you can have multiple instances of Workflow Executions calling the same Activity.
Activity code must be thread-safe because the same instance of the Activity code is run for every Workflow Execution that calls it.

For `DynamicWorkflow`, only one Workflow implementation that extends `DynamicWorkflow` can be registered with a Worker.
The following example shows how to register the `DynamicWorkflow` and `DynamicActivity` implementation with a Worker.

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
    /**
     * Register Dynamic Activity implementation with the Worker. Since Activities are stateless
     * and thread-safe, we need to register a shared instance.
    */
    worker.registerActivitiesImplementations(new DynamicGreetingActivityImpl());

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
You can register only one Activity instance that implements `DynamicActivity` with a Worker.
