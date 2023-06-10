---
id: how-to-develop-a-worker-program-in-java
title: How to develop a Worker Program in Java
sidebar_label: Run a dev Worker
description: Use the `newWorker` method on an instance of a `WorkerFactory` to create a new Worker in Java.
tags:
  - developer-guide
  - java
  - workers
---

The [Worker Process](/concepts/what-is-a-worker-process) is where Workflow Functions and Activity Functions are executed.

- Each [Worker Entity](/concepts/what-is-a-worker-entity) in the Worker Process must register the exact Workflow Types and Activity Types it may execute.
- Each Worker Entity must also associate itself with exactly one [Task Queue](/concepts/what-is-a-task-queue).
- Each Worker Entity polling the same Task Queue must be registered with the same Workflow Types and Activity Types.

A [Worker Entity](/concepts/what-is-a-worker-entity) is the component within a Worker Process that listens to a specific Task Queue.

Although multiple Worker Entities can be in a single Worker Process, a single Worker Entity Worker Process may be perfectly sufficient.
For more information, see the [Worker tuning guide](/dev-guide/worker-performance).

A Worker Entity contains a Workflow Worker and/or an Activity Worker, which makes progress on Workflow Executions and Activity Executions, respectively.

Use the `newWorker` method on an instance of a [`WorkerFactory`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerFactory.html) to create a new Worker in Java.

A single Worker Entity can contain many Worker Objects.
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

After creating the Worker entity, register all Workflow Types and all Activity Types that the Worker can execute.
A Worker can be registered with just Workflows, just Activities, or both.

**Operation guides:**

- [How to tune Workers](/dev-guide/worker-performance)
