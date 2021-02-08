---
id: php-workers
title: Workers
---
 
The RoadRunner application server will launch multiple Temporal PHP worker processes based on provided `.rr.yaml` configuration.

Each worker might connect to one or multiple task queues. Worker poll _Temporal service_ for tasks, performs those tasks, 
and communicates task execution results back to the _Temporal service_. 

Worker code are developed, deployed, and operated by Temporal customers. To create a worker use `Temporal\WorkerFactory`:

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

// start primary loop
$factory->run();
```

You can configure task queue name using first argument of `WorkerFactory`->`newWorker`:

```php
$worker = $factory->newWorker('my-task-queue');
```

As mentioned above you can create as many task queue connections inside a single worker as you need.

To configure additional worker options use `Temporal\Worker\WorkerOptions`:

```php
use Temporal\Worker\WorkerOptions;

$worker = $factory->newWorker(
    'my-task-queue',
    WorkerOptions::new()
        ->withMaxConcurrentWorkflowTaskPollers(10)
);
```

Make sure to point the worker file in application server configuration:

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