---
id: task-queues
title: Task Queues in PHP
sidebar_label: Task Queues
---

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/php/workflows"
workerLink="/docs/php/workers"
/>

## How to use Task Queues

In PHP, a Task Queue is represented in code by name, as a `string`.
There are four places where the name of the Task Queue is supplied by the developer.

1. When starting a Workflow, a Task Queue name must be provided in the `StartWorkflowOptions`.

```php
// Create new Workflow Options and set the Task Queue
$workflowOptions = WorkflowOptions::new()
  ->withTaskQueue("Workflow-Task-Queue-1")
  // ...

$yourWorkflow = $workflowClient->newWorkflowStub(
  YourWorkflowInterface::class,
  $workflowOptions
);

$result = $yourWorkflow->workflowMethod();

```

2. A Task Queue name must be provided as a parameter when creating a Worker.

```php
use Temporal\WorkerFactory;

// Create a Worker Factory
$factory = WorkerFactory::create();

// Set the Task Queue when creating the Worker
$worker = $factory->newWorker("Workflow-Task-Queue-1");

// Workflows are stateful. So you need a type to create instances.
$worker->registerWorkflowTypes(YourWorkflow::class);

// start primary loop
$factory->run();
```

A single Worker can listen to only one Task Queue.
And, it is important to remember that the name of the Task Queue the Worker is listening to must match the name of the Task Queue provided in the options to any given Workflow or Activity.

import SharedWorkersTaskQueueRegistrationNote from '../reminders/note-workers-task-queue-registration-match.md'

<SharedWorkersTaskQueueRegistrationNote />

3. Optionally, the name of a Task Queue can be provided in the `ActivityOptions` when calling an Activity from a Workflow.

```php
class YourWorkflow implements YourWorkflowInterface
{
  private $yourActivity;

  public function __construct()
  {
    // Create Activity options and set the Task Queue
    $activityOptions = ActivityOptions::new()
      ->withTaskQueue("Activity-Task-Queue-1")
      // ...

    // Create a new Activity Stub and pass the options
    $this->yourActivity = Workflow::newActivityStub(
      YourActivityInterface::class,
      $activityOptions
    );
  }

  public function workflowMethod(): \Generator
  {
    // Call the Activity
    return yield $this->yourActivity->activityMethod();
  }
}
```

If a Task Queue name is not provided in the `ActivityOptions`, then the Activity Tasks are placed in the same Task Queue as the Workflow Task Queue.

4. Optionally, the name of a Task Queue can be provided in the `ChildWorkflowOptions` when calling a Child Workflow.

```php
//Create new Child Workflow Options and set the Task Queue
$childWorkflowOptions = ChildWorkflowOptions::new()
    ->withTaskQueue("Child-Workflow-Task-Queue-1")
    // ...

// Create a new Child Workflow Stub and set the Task Queue
$childWorkflow = Workflow::newChildWorkflowStub(
    ChildWorkflowInterface::class,
    $childWorkflowOptions
);

// Call the Child Workflow method
$promise = $childWorkflow->workflowMethod();
```

If a Task Queue name is not provided in the `ChildWorkflowOptions`, then the Child Workflow Tasks are placed in the same Task Queue as the Parent Workflow Task Queue.
