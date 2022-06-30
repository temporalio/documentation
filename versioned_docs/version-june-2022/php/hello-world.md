---
id: hello-world
title: Hello World Walkthrough in PHP
sidebar_label: PHP
description: In this tutorial, we'll go over the different components that make up the Temporal Hello World code sample.
---

In this tutorial, we'll go over the different components that make up a Temporal project:

- Temporal Client
- Workflow and Activity Code
- Temporal Worker (running with [RoadRunner](https://roadrunner.dev))

All the code on this page is included in our [SimpleActivity](https://github.com/temporalio/samples-php/tree/master/app/src/SimpleActivity) sample,
from our [Samples repository](https://github.com/temporalio/samples-php).

First we'll get you running code, and then we'll explain the code.

## Running this sample (using Docker)

**1. Download the repository.**

```bash
$ git clone git@github.com:temporalio/samples-php.git
$ cd samples-php
```

**2. Start Temporal Server and application containers.**

```bash
$ docker-compose up
```

This starts Temporal Server with the [docker-compose.yml](https://github.com/temporalio/samples-php/blob/master/docker-compose.yml) that ships with the `samples-php` repo.
When it's live, you can access [Temporal Web](/web-ui) at http://localhost:8080 although you won't see any Workflows run yet.

**3. Run a sample**

To run a sample in docker use:

```bash
$ docker-compose exec app php app.php simple-activity
```

This should log the Workflow ID (and corresponding Run ID) that is started, and you should see it reflected in Temporal Web UI.
At the end it will log the result:

```bash
Starting GreetingWorkflow...
Started: WorkflowID=3520711c-7c8b-4d36-bd18-68328e60447b
Result:
Hello Antony
```

## Example structure

### Temporal Client

The example above represents a console command that starts a workflow, prints its IDs, and then waits for its result:

<!--SNIPSTART php-hello-client {"enable_source_link": true}-->
<!--SNIPEND-->

In the snippet above we use `WorkflowClientInterface` - an entry point to get access to workflows.
Once you need to create, retrieve, or start a workflow you should use an instance of `WorkflowClientInterface`.
Here we create an instance of `GreetingWorkflowInterface` with execution timeout of 1 minute.

Then we print some information and start the workflow.

### Workflow interface and implementation

First, let's take a look at the workflow interface:

<!--SNIPSTART php-hello-workflow-interface {"enable_source_link": true}-->
<!--SNIPEND-->

The important thing here - is attributes: `#[WorkflowInterface]` and `#[WorkflowMethod]`.
Both of them define the "workflow".
The first one marks the class/interface, the second one marks the method in the class/interface.
In our case the workflow is the method that accepts string `$name`.
To see what it actually does we can continue to the implementation - class `GreetingWorkflow`:

<!--SNIPSTART php-hello-workflow {"enable_source_link": true}-->
<!--SNIPEND-->

This is the implementation of our workflow.
It communicates with one activity and delegates all the work to it.
In the constructor we create an instance of the `GreetingActivityInterface` with maximum execution time of 2 seconds.
In method `greet()` we call our activity.
Here the workflow pauses and waits until the activity is done and only then returns the result.
It is achieved with `yield` call.
To instantiate an instance of the activity we use a static helper `Workflow::newActivityStub()`.

### Activity interface and implementation

And at last we arrive at the activity code. Consider it as a particular task in the business logic. As you have noticed we again use an interface to instantiate an object:

<!--SNIPSTART php-hello-activity-interface {"enable_source_link": true}-->
<!--SNIPEND-->

Activities and workflow classes in PHP are marked with special attributes.
For activity, we use `#[ActivityInterface]` and `#[ActivityMethod]`.
The first on marks this class/interface as an activity, the second one marks the activity method.
Our activity consists of one method, which accepts two string arguments.
The implementation of this interface is a very straight forward - just compose a new string of provided arguments:

<!--SNIPSTART php-hello-activity {"enable_source_link": true}-->
<!--SNIPEND-->

Both workflow and activity code in our example have both interface and implementation.
But we could skip interfaces and just mark classes with corresponding attributes and everything will continue working.
But how does the workflow client know about interface implementations?
How does Temporal know what PHP class should be executed?

### Roadrunner and Temporal Worker

To answer this question we need to take a look at how an instance of `WorkflowClientInterface` is created.
This is the part where [RoadRunner](https://roadrunner.dev) comes into a play.

In our example under the hood RoadRunner executes `worker.php` script:

```php
declare(strict_types=1);

use Temporal\SampleUtils\DeclarationLocator;
use Temporal\WorkerFactory;

ini_set('display_errors', 'stderr');
include "vendor/autoload.php";

// finds all available workflows, activity types and commands in a given directory
$declarations = DeclarationLocator::create(__DIR__ . '/src/');

// factory initiates and runs task queue specific activity and workflow workers
$factory = WorkerFactory::create();

// Worker that listens on a task queue and hosts both workflow and activity implementations.
$worker = $factory->newWorker();

foreach ($declarations->getWorkflowTypes() as $workflowType) {
    // Workflows are stateful. So you need a type to create instances.
    $worker->registerWorkflowTypes($workflowType);
}

foreach ($declarations->getActivityTypes() as $activityType) {
    // Activities are stateless and thread safe. So a shared instance is used.
    $worker->registerActivity($activityType);
}

// start primary loop
$factory->run();
```

You may consider this script as a bridge between your PHP application and Temporal.
Temporal needs to know about our activity and workflow implementations.
Thus, they need to be registered within the worker with `registerWorkflowTypes()` and `registerActivity()`.
The first one registers workflows and accepts a list of classes:

```php
$worker->registerWorkflowTypes(HelloWorldWorkflow::class);
```

The second one registers activities and accepts a list of activity classes, e.g.:

```php
$worker->registerActivity(MyActivity::class);
```

On the last line of the _worker script_ we start the worker.
From now, it starts communication with Temporal: receiving and sending data.

## Conclusion and Next Steps

Let's recap what was done in this "Hello world" example:

1. The main script, that instantiates an instance of `WorkflowClientInterface`, creates a workflow and starts it.
2. Workflow code.
3. Activity code.
4. Worker code with [RoadRunner](https://roadrunner.dev), that instantiates the worker, registers workflow types and activity implementations.

These reflect the 4 main APIs of Temporal's PHP SDK.

As for next steps, you can proceed to [read the Workflows docs](/php/workflows) or [watch our longform workshops](/php/introduction#resources).
