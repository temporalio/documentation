---
id: task-queues
title: Task Queues in Java
sidebar_label: Task Queues
---

In Java, a Task Queue is represented in code by its name as a `string`.
There are four places where the name of the Task Queue is supplied by the developer.

1. When starting a Workflow, a Task Queue name must be provided in the `StartWorkflowOptions`.

```java
public class InitiateWorkflow {

  public static void main(String[] args) throws Exception {
    // Create the WorkflowClient
    // ...
    WorkflowOptions options = WorkflowOptions.newBuilder()
      .setTaskQueue("Workflow-Task-Queue-1")
      .build();
    // pass the options to the Workflow stub
    HelloWorldWorkflow workflow = client.newWorkflowStub(
      WorkflowImplementation.class,
      options
    );
    // Call the Workflow method on the implementation
    // ...
  }
}
```

2. A Task Queue name must be provided as a parameter when creating a Worker.

```java
public class YourWorker {

  public static void main(String[] args) {
    // Create the WorkflowClient
    // ...
    // Create a Worker factory that can be used to create Workers that poll specific Task Queues.
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker worker = factory.newWorker("Workflow-Task-Queue-1");
    // Register Workflow implementation classes
    worker.registerWorkflowImplementationTypes(YourdWorkflowImpl.class);
    // Start polling the Task Queue.
    factory.start();
  }
}
```

A single Worker can listen to only one Task Queue.
And, it is important to remember that the name of the Task Queue the Worker is listening to must match the name of the Task Queue provided in the options to any given Workflow or Activity.

All Workers listening to the same Task Queue name must be registered to handle the exact same Workflows Types and Activity Types.

If a Worker polls a Task for a Workflow Type or Activity Type it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow Execution to fail.

3. Optionally, the name of a Task Queue can be provided in the `ActivityOptions` when calling an Activity from a Workflow.

```java
public class YourWorkflowImpl implements YourWorkflow {

  ActivityOptions activityOptions = ActivityOptions.newBuilder()
    .setTaskQueue("Activity-Task-Queue-1")
    // ...
    .build();
  // Pass the options to the new ActivityStub
  private final YourActivity yourActivity = Workflow.newActivityStub(
    YourActivity.class,
    activityOptions
  );
  // Call the Activity from within the Workflow method
  @Override
  public String workflowMethod() {
    return yourActivity.somemethod();
  }
}
```

If a Task Queue name is not provided in the `ActivityOptions`, then the Activity Tasks are placed in the same Task Queue as the Workflow Task Queue.

4. Optionally, the name of a Task Queue can be provided in the `ChildWorkflowOptions` when calling a Child Workflow.

```java
public static class YourWorkflowImpl implements YourWorkflow {

  @Override
  public String workflowMethod() {

    // Set the Task Queue in the Child Workflow options
    ChildWorkflowOptions childWorkflowOptions =
      ChildWorkflowOptions.newBuilder()
        .setTaskQueue("Child-Workflow-Task-Queue-1")
        // ...
        .build();
    // Pass the options to the new Child Workflow Stub
    ChildWorkflow childWorkflow = Workflow.newChildWorkflowStub(
      ChildWorkflow.class,
      childWorkflowOptions
    );
    // Call the Child Workflow method
    String result = childWorkflow.workflowMethod(...);
    return result;
  }
}
```

If a Task Queue name is not provided in the `ChildWorkflowOptions`, then the Child Workflow Tasks are placed in the same Task Queue as the Parent Workflow Task Queue.
