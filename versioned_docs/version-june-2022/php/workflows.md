---
id: workflows
title: Workflows in PHP
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

import RelatedReadList from '../components/RelatedReadList.js'

## What is a Workflow?

In PHP, a Workflow is a class method.
Classes must implement interfaces that are annotated with `#[WorkflowInterface]`.
The method that is the Workflow must be annotated with `#[WorkflowMethod]`.

```php
use Temporal\Workflow\WorkflowInterface;
use Temporal\Workflow\WorkflowMethod;

#[WorkflowInterface]
interface FileProcessingWorkflow
{
    #[WorkflowMethod]
    public function processFile(Argument $args);

}
```

Workflow methods return a `Generator`.
To properly typecast the Workflow's return value in the client code use the `#[ReturnType()]` annotation.

```php
#[WorkflowInterface]
interface FileProcessingWorkflow {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function processFile(Argument $args);
}
```

Workflows can also answer synchronous [Queries](/php/queries) and receive [Signals](/php/signals).

All interface methods must have one of the following annotations:

- **#[WorkflowMethod]** indicates an entry point to a Workflow.
  It contains parameters that specify timeouts and a Task Queue name.
  Required parameters (such as `executionStartToCloseTimeoutSeconds`) that are not specified through the annotation must be provided at runtime.
- **#[SignalMethod]** indicates a method that reacts to external signals. It must have a `void` return type.
- **#[QueryMethod]** indicates a method that reacts to synchronous query requests. It must have a non `void` return type.

> It is possible (though not recommended for usability reasons) to annotate concrete class implementation.

You can have more than one method with the same annotation (except #[WorkflowMethod]).

For example:

```php
use Temporal\Workflow\WorkflowInterface;
use Temporal\Workflow\WorkflowMethod;
use Temporal\Workflow\SignalMethod;
use Temporal\Workflow\QueryMethod;

#[WorkflowInterface]
interface FileProcessingWorkflow
{
    #[WorkflowMethod]
    public function processFile(Argument $args);

    #[QueryMethod("history")]
    public function getHistory(): array;

    #[QueryMethod("status")]
    public function getStatus(): string;

    #[SignalMethod]
    public function retryNow(): void;

    #[SignalMethod]
    public function abandon(): void;
}
```

Note that name parameter of Workflow method annotations can be used to specify name of Workflow, signal and query types.
If name is not specified the short name of the Workflow interface is used.

In the above code the `#[WorkflowMethod(name)]` is not specified, thus the Workflow type defaults to `"FileProcessingWorkflow"`.

## Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies.
It may be useful for creating components reusable across multiple Workflow types.
For example imaging a UI or CLI button that allows to call `retryNow` signal on any Workflow.
To implement this feature you can redesign the above interface to:

```php
#[WorkflowInterface
interface Retryable {
    #[SignalMethod]
    public function retryNow(): void;
}

#[WorkflowInterface]
interface FileProcessingWorkflow extends Retryable {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function processFile(Argument $args);

    #[QueryMethod("history")]
    public function getHistory(): array;

    #[QueryMethod("status")]
    public function getStatus(): string;

    #[SignalMethod]
    public function abandon(): void;
}
```

Then some other Workflow can implement it as well:

```php
#[WorkflowInterface]
interface MediaProcessingWorkflow extends Retryable {
    #[WorkflowMethod]
    public function processBlob(Argument $args);
}
```

Then it would be possible to send signal to both of them using the Retryable interface only:

```php
$r = $workflowClient->newRunningWorkflowStub(Retryable::class, $workflowId);
$r->retryNow();
```

The same technique can be used to query Workflows through a base interface.

Note that an attempt to start Workflow through a base interface annotated with `#[WorkflowInterface]` is not going to work.
Let's look at the following **invalid** example:

```php

// INVALID CODE!

#[WorkflowInterface]
interface BaseWorkflow {
    #[WorkflowMethod]
    public function start();
}

#[WorkflowInterface]
interface Workflow1 extends BaseWorkflow {}

#[WorkflowInterface]
interface Workflow2 extends BaseWorkflow {}
```

An attempt to register implementations of Workflow1 and Workflow2 are going to fail as they are going to use the same Workflow type.
The type is defined by the type of the class which is annotated with `#[WorkflowInterface]`.
In this case `BaseWorkflow`.
The solution is to remove `#[WorkflowInterface]` annotation from BaseWorkflow.
The following is valid code:

```php
interface BaseWorkflow {
    #[WorkflowMethod]
    public function start();
}

#[WorkflowInterface]
interface Workflow1 extends BaseWorkflow {}

#[WorkflowInterface]
interface Workflow2 extends BaseWorkflow {}
```

Implementations of Workflow1 and Workflow2 can registered with the same worker as they will have types defined by their interfaces.

## Implementing Workflows

A Workflow implementation implements a Workflow interface.
Each time a new Workflow execution is started, a new instance of the Workflow implementation object is created.
Then, one of the methods (depending on which Workflow type has been started) annotated with `#[WorkflowMethod]` is invoked.
As soon as this method returns, the Workflow execution is closed.
While Workflow execution is open, it can receive calls to signal and query methods.
No additional calls to Workflow methods are allowed.
The Workflow object is stateful, so query and signal methods can communicate with the other parts of the Workflow through Workflow object fields.

### Constraints

Temporal uses the [Microsoft Azure Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover the state of a Workflow object including its local variable values.

In essence, every time a Workflow state has to be restored, its code is re-executed from the beginning.
When replaying, side effects (such as Activity invocations) are ignored because they are already recorded in the Workflow event history.
When writing Workflow logic, the replay is not visible, so the code should be written since it executes only once.
This design puts the following constraints on the Workflow implementation:

- Do not use any mutable global variables because multiple instances of Workflows are executed in parallel.
- Do not call any non-deterministic functions like non seeded random or `UUID` directly from the Workflow code.

Always do the following in the Workflow implementation code:

- Don’t perform any IO or service calls as they are not usually deterministic. Use Activities for this.
- Only use `Workflow::now()` to get the current time inside a Workflow.
- Call `yield Workflow::timer()` instead of `sleep()`.
- Do not use any blocking SPL provided by PHP (i.e. `fopen`, `PDO`, etc) in **Workflow code**.
- Use `yield Workflow::getVersion()` when making any changes to the Workflow code. Without this, any deployment of updated Workflow code
  might break already open Workflows.
- Don’t access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

Workflow method arguments and return values are serializable to a byte array using the provided [DataConverter](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html) interface.
The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

Make sure to annoate your `WorkflowMethod` using `ReturnType` to specify concrete return type.

> You can not use the default return type declaration as Workflow methods are generators.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers with every event that the Workflow logic needs to process.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.

## Awaits

Use specialized construct `Workflow::await` and `Workflow::awaitWithTimeout` to wait for Closure function become positive.

```php
$done = false;
Workflow::async(
    function () use (&$done) {
        $hello = yield $this->greetingActivity->composeGreeting('Hello', $name);

        $done = true;
    }
);

// wait for $done to become true
yield Workflow::await(fn() => $done);
```

You can not use any activity, timer or child workflow invocation inside `await` or `awaitWithTimeout` method.
However, you can use variables referenced by other coroutines.

## Timers

Use `Workflow::timer()` to yield long sleeps:

```php
yield Workflow::timer(300); // sleep for 5 minutes
```

## Starting Workflows

Workflows can be started both synchronously and asynchronously. You can use typed or untyped workflows stubs available
via `Temporal\Client\WorkflowClient`. To create workflow client:

```php
use Temporal\Client\GRPC\ServiceClient;
use Temporal\Client\WorkflowClient;

$workflowClient = WorkflowClient::create(ServiceClient::create('localhost:7233'));
```

### Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the
invocation process and will continue executing even if the waiting process crashes or stops.

Make sure to acquire workflow interface or class name you want to start. For example:

```php
#[WorkflowInterface]
interface AccountTransferWorkflowInterface
{
    #[WorkflowMethod(name: "MoneyTransfer")]
    #[ReturnType('int')]
    public function transfer(
        string $fromAccountId,
        string $toAccountId,
        string $referenceId,
        int $amountCents
    );
}
```

To start such workflow in sync mode:

```php
$accountTransfer = $workflowClient->newWorkflowStub(
    AccountTransferWorkflowInterface::class
);

$result = $accountTransfer->transfer(
    'fromID',
    'toID',
    'refID',
    1000
);
```

### Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller without waiting for a result.
This is the most common way to start Workflows in a live environment.

To start a Workflow asynchronously pass workflow stub instance and start parameters into `WorkflowClient`->`start`
method.

```php
$accountTransfer = $workflowClient->newWorkflowStub(
    AccountTransferWorkflowInterface::class
);

$run = $this->workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);
```

Once started you can receive workflow ID and run ID via `WorkflowRun` object returned by start method:

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getExecution()->getID());
```

### Recurring start

You can start a Workflow Execution on a regular schedule with [the CronSchedule option](distributed-cron).

## Connect to Running Workflows

If you need to wait for the completion of a Workflow after an asynchronous start, make a blocking call to
the `WorkflowRun`->`getResult` method.

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getResult());
```

You can always connect to existing workflow and wait for its completion from another process using workflow id. Use
`WorkflowClient`->`newUntypedRunningWorkflowStub` for such purposes.

```php
$workflow = $workflowClient->newUntypedRunningWorkflowStub('workflowID');

var_dump($workflow->getResult());
```

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/concepts/what-is-a-child-workflow-execution","explanation"],  
]}
/>

## PHP Child Workflow API

`Workflow::executeChildWorkflow` and `Workflow::newChildWorkflowStub` enables the scheduling of other Workflows from within a Workflow's implementation.
The parent Workflow has the ability to monitor and impact the lifecycle of the child Workflow, similar to the way it does for an Activity that it invoked.

```php
// Use one stub per child workflow run
$child = Workflow::newChildWorkflowStub(
    ChildWorkflowInterface::class,
    ChildWorkflowOptions::new()
        // Do not specify WorkflowId if you want Temporal to generate a unique Id
        // for the child execution.
        ->withWorkflowId('BID-SIMPLE-CHILD-WORKFLOW')
        ->withExecutionStartToCloseTimeout(DateInterval::createFromDateString('30 minutes'))
);

// This is a non blocking call that returns immediately.
// Use yield $child->workflowMethod(name) to call synchronously.
$promise = $child->workflowMethod('value');

// Do something else here.
try{
    $value = yield $promise;
} catch(TemporalException $e) {
    $logger->error('child workflow failed');
    throw $e;
}
```

Let's take a look at each component of this call.

Before calling `$child->workflowMethod()`, you must configure `ChildWorkflowOptions` for the invocation.
These options customize various execution timeouts, and are passed into the workflow stub defined by the `Workflow::newChildWorkflowStub`.
Once stub created you can invoke it's workflow method based on attribute `WorkflowMethod`.

The method call returns immediately and returns a `Promise`.
This allows you to execute more code without having to wait for the scheduled Workflow to complete.

When you are ready to process the results of the Workflow, call the `yield $promise` method on the returned promise object.

When a parent Workflow is cancelled by the user, the child Workflow can be cancelled or abandoned based on a configurable child policy.

You can also skip the stub part of child workflow initiation and use `Workflow::executeChildWorkflow` directly:

```php
// Use one stub per child workflow run
$childResult = yield Workflow::executeChildWorkflow(
    'ChildWorkflowName',
    ['args'],
    ChildWorkflowOptions::new()->withWorkflowId('BID-SIMPLE-CHILD-WORKFLOW'),
    Type::TYPE_STRING // optional: defines the return type
);
```

## Large event histories

Workflows that need to rerun periodically could naively be implemented as a big **while** loop with a sleep where the entire logic of the Workflow is inside the body of the **while** loop.
The problem with this approach is that the history for that Workflow will keep growing to a point where it reaches the maximum size enforced by the service.

**ContinueAsNew** is the low level construct that enables implementing such Workflows without the risk of failures down the road.
The operation atomically completes the current execution and starts a new execution of the Workflow with the same **Workflow Id**.
The new execution will not carry over any history from the old execution.

To trigger this behavior, use `Workflow::continueAsNew` or `Workflow::newContinueAsNewStub` method:

```php
#[Workflow\WorkflowMethod]
public function periodic(string $name, int $value = 0)
{
    for ($i = 0; $i < 100; $i++) {
        // do something
        $value++;
    }

    // maintain $value counter between runs
    return Workflow::newContinueAsNewStub(self::class)->periodic($name, $value);
}
```
