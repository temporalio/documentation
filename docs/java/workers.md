---
id: workers
title: Workers in Java
sidebar_label: Workers
---

## What is a Worker?

A Worker is a service that executes [Workflows](/docs/java/workflows) and [Activities](/docs/java/activities).
Workers are defined and executed on user controlled hosts.
You can use the `WorkerFactory` class to create and run as many Workers as your use case demands, across any number of hosts.

Workers poll Task Queues for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.

As a developer, running Workers is a fairly simple procedure, 
because the Java SDK handles all the communication between the Worker and the Temporal Server behind the scenes.

## How to start a Worker

To start a Worker you need to: 

1. Create a WorkflowClient instance
2. Optionally create WorkerOptions (default WorkerOptions target local deployment of the Temporal Server and should not be used for production)
3. Create a WorkerFactory instance
4. Create a Worker and pass it in the Task Queue name it should listen to and WorkerOptions if you defined them
5. Register Workflows and Activities this Worker should execute


As a simple example, let's say we want our Worker to be able to execute the following Workflow implementation:

```java
public static class GreetingWorkflowImpl implements GreetingWorkflow {
    
    private final GreetingActivities activities =
        Workflow.newActivityStub(
            GreetingActivities.class,
            ActivityOptions.newBuilder().setStartToCloseTimeout(Duration.ofSeconds(2)).build());

    @Override
    public String getGreeting(String name) {
      return activities.composeGreeting("Hello", name);
    }
  }
```

Our Workflow invokes `GreetingActivities` Activities. We can register both our Workflow and Activities with our Worker:

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
WorkflowClient client = WorkflowClient.newInstance(service);
WorkerFactory factory = WorkerFactory.newInstance(client);

Worker worker = factory.newWorker(TASK_QUEUE_NAME);

worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);
worker.registerActivitiesImplementations(new GreetingActivitiesImpl());
```

Note that for Workflows we register the Workflow type. For Activities, since there are stateless and thread-safe, we need
to register an Activity instance.

The example above shows the registration of the Workflow and Activity on the same Worker. You can however 
register your Workflows and Activities on different Workers depending on your setup and performance requirements.


If the Worker polls a Task for a Workflow or Activity which was not registered, it will not be able to execute it and fail.
However, the failure of the Task will not cause the associated Workflow to fail.

:::

When you start a Workflow or when a Workflow needs to invoke an Activity, the Temporal Server adds
a new task to the Workflows / Activity Task Queue. Any Worker polling that Task Queue and has that Workflow / Activity 
registered can pick up the new task and execute it.