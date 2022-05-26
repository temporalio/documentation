---
id: how-to-develop-a-worker-program-in-php
title: How to develop a Worker Program in PHP
description: Use the `newWorker()` method on an instance of a `WorkerFactory` to create a new Worker in PHP.
tags:
  - developer-guide
  - php
  - workers
---

The [RoadRunner application server](https://roadrunner.dev/) will launch multiple Temporal PHP Worker processes based on provided `.rr.yaml` configuration.

Each Worker might connect to one or multiple Task Queues.
Worker poll _Temporal service_ for tasks, performs those tasks, and communicates task execution results back to the _Temporal service_.

Worker code are developed, deployed, and operated by Temporal customers.
To create a worker use `Temporal\WorkerFactory`:

```php
<?php

declare(strict_types=1);

use Temporal\WorkerFactory;

ini_set('display_errors', 'stderr');
include "vendor/autoload.php";

// factory initiates and runs task queue specific activity and workflow workers
$factory = WorkerFactory::create();

// Worker that listens on a Task Queue and hosts both workflow and activity implementations.
$worker = $factory->newWorker();

// Workflows are stateful. So you need a type to create instances.
$worker->registerWorkflowTypes(App\DemoWorkflow::class);

// Activities are stateless and thread safe. So a shared instance is used.
$worker->registerActivity(App\DemoActivity::class);

// In case an activity class requires some external dependencies provide a callback - factory
// that creates or builds a new activity instance. The factory should be a callable which accepts
// an instance of ReflectionClass with an activity class which should be created.
$worker->registerActivity(App\DemoActivity::class, fn(ReflectionClass $class) => $container->create($class->getName()));

// start primary loop
$factory->run();
```

You can configure task queue name using first argument of `WorkerFactory`->`newWorker`:

```php
$worker = $factory->newWorker('my-task-queue');
```

As mentioned above you can create as many Task Queue connections inside a single Worker Process as you need.

To configure additional WorkerOptions use `Temporal\Worker\WorkerOptions`:

```php
use Temporal\Worker\WorkerOptions;

$worker = $factory->newWorker(
    'my-task-queue',
    WorkerOptions::new()
        ->withMaxConcurrentWorkflowTaskPollers(10)
);
```

Make sure to point the Worker file in application server configuration:

```yaml
rpc:
  listen: tcp://127.0.0.1:6001

server:
  command: "php worker.php"

temporal:
  address: "temporal:7233"
  activities:
    num_workers: 10
```

> You can serve HTTP endpoints using the same server setup.

**Operation guides:**

- [How to tune Workers](/operation/how-to-tune-workers)
