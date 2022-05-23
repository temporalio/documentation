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

- [How to tune Workers](/operation/how-to-tune-workers)
