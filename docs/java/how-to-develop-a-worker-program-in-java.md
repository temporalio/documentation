---
id: how-to-develop-a-worker-program-in-java
title: How to develop a Worker Program in Java
description: Use the `newWorker` method on an instance of a `WorkerFactory` to create a new Worker in Java.
tags:
  - developer-guide
  - java
  - workers
---

<!--TODO
import RelatedReadList from '../components/RelatedReadList.js'
-->

Use the `newWorker` method on an instance of a [`WorkerFactory`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerFactory.html) to create a new Worker in Java.

Then register all Workflow Types and all Activity Types that the Worker can execute.
For Activities, since they are stateless and thread-safe, instances are used in the registration process instead of the Java Class.
A Worker can be registered with just Workflows, just Activities, or both.

This single Worker Process can contain many Workers Objects.
Call the `start()` method on the instance of the `WorkerFactory` to start all the Workers created in this process.

```java
// ...
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class YourWorker {

  public static void main(String[] args) {

    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker yourWorker = factory.newWorker("your_task_queue");

    yourWorker.registerWorkflowImplementationTypes(YourWorkflowDefinitionImpl.class);
    yourWorker.registerActivityImplementationTypes(new YourActivityDefinitionImpl());

    factory.start();
  }
}

public static class YourWorkflowDefinitionImpl implements YourWorkflowDefinition {
    // ...
    public YourWorkflowResult yourWorkflowMethod(YourWorkflowParam param) {
      // ...
    }
}

public static class YourActivityDefintionImpl implements YourActivityDefinition {
  // ...
  public YourActivityResult yourActivityMethod(YourActivityParam param) {
    // ...
  }
}
```

**Operation guides:**

- [How to tune Workers](/docs/application-development-guide/#worker-entity-optimization)
