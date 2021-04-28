---
id: workers
title: Workers
sidebar_label: Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Worker is a service that:

- hosts (registers) [Workflows](/docs/concepts/workflows) and [Activities](/docs/concepts/activities)
- listens to [Activity Task Queues](/docs/concepts/task-queues) by long polling

Workers should have access to the resources needed to perform the activities they implement, for example:

- network access for external API calls
- credentials for infrastructure provisioning
- specialized GPUs for machine learning tasks

Since workers are subscribed to task queues they can implement, it is straightforward to do [Activity Task Routing](/docs/concepts/activities/#activity-task-routing-through-task-queues). 

> Note: if you need to process stateful work sequentially on the same machine, the Go SDK also offers a [Sessions API](https://docs.temporal.io/docs/go/sessions/).

## Example Worker Code

Just for illustration purposes:


<Tabs
  defaultValue="go"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
    { label: 'PHP', value: 'php', },
    { label: 'Node', value: 'node', },
  ]
}>
<TabItem value="go">

```go
package main

import (
    "log"

    "go.temporal.io/sdk/client"
    "go.temporal.io/sdk/worker"

    "hello-world-project-template-go/app"
)

func main() {
    // Create the client object just once per process
    c, err := client.NewClient(client.Options{})
    if err != nil {
        log.Fatalln("unable to create Temporal client", err)
    }
    defer c.Close()
    // This worker hosts both Worker and Activity functions
    w := worker.New(c, app.GreetingTaskQueue, worker.Options{})
    w.RegisterWorkflow(app.GreetingWorkflow)
    w.RegisterActivity(app.ComposeGreeting)
    // Start listening to the Task Queue
    err = w.Run(worker.InterruptCh())
    if err != nil {
        log.Fatalln("unable to start Worker", err)
    }
}
```

</TabItem>
<TabItem value="java">

```java
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class HelloWorker {
    public static void main(String[] args) {
        // gRPC stubs wrapper that talks to the local docker instance of temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        // client that can be used to start and signal Workflows
        WorkflowClient client = WorkflowClient.newInstance(service);
        // worker factory that can be used to create workers for specific task queues
        WorkerFactory factory = WorkerFactory.newInstance(client);
        Worker worker = factory.newWorker("HelloWorldTaskQueue");
        worker.registerWorkflowImplementationTypes(GettingStarted.HelloWorldImpl.class);
        factory.start();
    }
}
```

</TabItem>
<TabItem value="php">

```php
<?php

declare(strict_types=1);

use Temporal\WorkerFactory;

ini_set('display_errors', 'stderr');
include "vendor/autoload.php";

// factory initiates and runs task queue specific activity and workflow workers
$factory = WorkerFactory::create();

// Worker that listens on a task queue and hosts both workflow and activity implementations.
$worker = $factory->newWorker();

// Workflows are stateful. So you need a type to create instances.
$worker->registerWorkflowTypes(App\DemoWorkflow::class);

// Activities are stateless and thread safe. So a shared instance is used.
$worker->registerActivityImplementations(new App\DemoActivity());
// To register multiple Activities with the Worker, each Activity implementation name must be unique.
// And you must provide all Activity function names in the registration call like so:
// $worker->registerActivityImplementations(new App/ActivityA(), new App/ActivityB(), new App/ActivityC());

// start primary loop
$factory->run();
```

</TabItem>
<TabItem value="node">

```ts
import { Worker } from '@temporalio/worker';

async function run() {
  // Automatically locate and register Activities and Workflows relative to __dirname
  // (assuming package was bootstrapped with `npm init @temporalio`).
  // Worker connects to localhost by default and uses console error for logging.
  // Customize the Worker by passing more options to create().
  // create() tries to connect to the server and will throw if a connection could not be established.
  const worker = await Worker.create({ workDir: __dirname, taskQueue: 'tutorial' });
  // Start accepting tasks on the `tutorial` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

</TabItem>
</Tabs>

## Workers are external to Temporal Server

In our tutorials, we show you how to run both the Temporal Server and one Worker on the same machine for local development.

However, a typical production Temporal deployment will have a **fleet** of Workers external to the main Temporal Server cluster. These can be independently managed by different developer teams, each registering their own sets of workflows and activities.

[![https://user-images.githubusercontent.com/6764957/113587567-8c9c9c00-9661-11eb-8614-576a68caa8f1.png](https://user-images.githubusercontent.com/6764957/113587567-8c9c9c00-9661-11eb-8614-576a68caa8f1.png)](https://docs.temporal.io/blog/workflow-engine-principles)

> Note: Temporal Server itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system workflows. But this is not visible to the developer.

## Workers can be encrypted in transit and at rest

The external nature of workers works very well for data privacy concerns, because Temporal Server (including our managed Temporal Cloud version) doesn't run any Workflow or Activity code on its machines - it is solely responsible for orchestrating state transitions and dispatching messages to the next available Worker. 

While data transferred in the event histories is [secured by mTLS](https://docs.temporal.io/docs/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in Temporal Server. Temporal offers a [Data Converter API](https://docs.temporal.io/docs/java/activities/#activity-interface) to solve this - you can customize the serialization of data going out of and coming back in to a Worker, with the net effect of guaranteeing that Temporal Server cannot read sensitive business data.
