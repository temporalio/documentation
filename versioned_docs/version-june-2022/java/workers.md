---
id: workers
title: Workers in Java
sidebar_label: Workers
---

## What is a Worker?

A Worker is a service that executes [Workflows](/java/workflows) and [Activities](/java/activities).
Workers are defined and executed on user controlled hosts.
You can use the `WorkerFactory` class to create and run as many Workers as your use case demands, across any number of hosts.

Workers poll Task Queues for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.

As a developer, running Workers is a fairly simple procedure,
because the Java SDK handles all the communication between the Worker and the Temporal Server behind the scenes.

## How to start a Worker

To start a Worker you need to:

1. Create a WorkflowClient instance
2. Optionally create WorkerOptions
3. Create a WorkerFactory instance
4. Create a Worker using the created WorkerFactory's `newWorker` method
5. Register Workflows and Activities this Worker should execute

As a simple example, let's say we want our Worker to be able to execute the following Workflow implementation:

```java
public static class EmployeeWorkflowImpl implements EmployeeWorkflow {

    private final EmployeeActivities activities =
        Workflow.newActivityStub(
                EmployeeActivities.class,
            ActivityOptions.newBuilder().setStartToCloseTimeout(Duration.ofSeconds(2)).build());

    @Override
    public Employee getEmployee(String id) {
      return activities.getEmployeeById(id);
    }
  }
```

Our Workflow invokes `EmployeeActivities` Activities. We can register our Workflow with our Worker:

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
WorkflowClient client = WorkflowClient.newInstance(service);
WorkerFactory factory = WorkerFactory.newInstance(client);

Worker worker = factory.newWorker(TASK_QUEUE_NAME);

worker.registerWorkflowImplementationTypes(EmployeeWorkflowImpl.class);
```

Note that in order to execute our `EmployeeWorkflowImpl` Workflow implementation, there is no need to register any Activities.
Only if our created Worker is also used to host the Activity implementations we should register them as well by adding for example:

```java
String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=EmployeesDb;user=user;password=pass";
worker.registerActivitiesImplementations(new EmployeeActivitiesImpl(connectionUrl));
```

For Workflows we register the Workflow type.
For Activities, since they are stateless and thread-safe, we need
to register an Activity instance.

When you start a Workflow or when a Workflow needs to invoke an Activity, the Temporal Server adds
a new task to the Workflows / Activity Task Queue. Any Worker polling that Task Queue and has that Workflow / Activity
registered can pick up the new task and execute it.
