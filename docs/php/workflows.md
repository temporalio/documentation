---
id: workflows
title: Workflows in PHP
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

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

Workflows encapsulate the orchestration of Activities and other child Workflows.

Workflows can also answer synchronous [Queries](/docs/php/queries) and receive [Signals](/docs/php/signals).

A Workflow could be defined via interface class.
A Workflow interface class must be annotated with `#[WorkflowInterface]`.
All of its methods must have one of the following annotations:

- **#[WorkflowMethod]** indicates an entry point to a Workflow. It contains parameters such as timeouts and a task queue.
  Required parameters (such as `executionStartToCloseTimeoutSeconds`) that are not specified through the annotation must be provided at runtime.
- **#[SignalMethod]** indicates a method that reacts to external signals. It must have a `void` return type.
- **#[QueryMethod]** indicates a method that reacts to synchronous query requests. It must have a non `void` return type.

> It is possible (though not recommended for usability reasons) to annotate concrete class implementation.  

You can have more than one method with the same annotation (except #[WorkflowMethod]). For example:

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

## Return type declaration
All of the workflow methods return `Generator`, in order to properly typecast it's values in client code use special annotation `#[ReturnType()]`.

```php
#[WorkflowInterface]
interface FileProcessingWorkflow {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function processFile(Argument $args);
}
```

# Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies. It may be useful for creating components reusable across multiple
Workflow types. For example imaging a UI or CLI button that allows to call `retryNow` signal on any Workflow. To implement
this feature you can redesign the above interface to:

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

An attempt to register implementations of Workflow1 and Workflow2 are going to fail as they are going to use the same
Workflow type. The type is defined by the type of the class which is annotated with `#[WorkflowInterface]`. In this case `BaseWorkflow`.
The solution is to remove `#[WorkflowInterface]` annotation from BaseWorkflow. The following is valid code:

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


A Workflow implementation implements a Workflow interface. Each time a new Workflow execution is started,
a new instance of the Workflow implementation object is created. Then, one of the methods
(depending on which Workflow type has been started) annotated with `#[WorkflowMethod]` is invoked. As soon as this method
returns, the Workflow execution is closed. While Workflow execution is open, it can receive calls to signal and query methods.
No additional calls to Workflow methods are allowed. The Workflow object is stateful, so query and signal methods
can communicate with the other parts of the Workflow through Workflow object fields.

## Workflow Implementation Constraints

Temporal uses the [Microsoft Azure Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover
the state of a Workflow object including its local variable values.

In essence, every time a Workflow state has to be restored, its code is re-executed from the beginning. When replaying, side
effects (such as Activity invocations) are ignored because they are already recorded in the Workflow event history.
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

Workflow method arguments and return values are serializable to a byte array using the provided
[DataConverter](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html)
interface. The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

Make sure to annoate your `WorkflowMethod` using `ReturnType` to specify concrete return type.

> You can not use the default return type declaration as Workflow methods are generators.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers with every event that the Workflow logic needs to process.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.

## Calling Activities

`Workflow::newActivityStub` returns a client-side stub that implements an Activity interface.
It takes Activity type and Activity options as arguments. Activity options are needed only if some of the required
timeouts are not specified through the `#[ActivityMethod]` annotation.

Calling (via `yield`) a method on this interface invokes an Activity that implements this method.
An Activity invocation synchronously blocks until the Activity completes, fails, or times out. Even if Activity
execution takes a few months, the Workflow code still sees it as a single synchronous invocation.
It doesn't matter what happens to the processes that host the Workflow. The business logic code
just sees a single method call.

```php
class GreetingWorkflow implements GreetingWorkflowInterface
{
    private $greetingActivity;

    public function __construct()
    {
        $this->greetingActivity = Workflow::newActivityStub(
            GreetingActivityInterface::class,
            ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 seconds'))
        );
    }

    public function greet(string $name): \Generator
    {
        // This is a blocking call that returns only after the activity has completed.
        return yield $this->greetingActivity->composeGreeting('Hello', $name);
    }
}
```

If different Activities need different options, like timeouts or a task queue, multiple client-side stubs can be created
with different options.

```php
$greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 seconds'))
);

$greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 minutes'))
);
```

## Calling Activities Asynchronously

Sometimes Workflows need to perform certain operations in parallel.

Invoking activity stub without the use of `yield` will return the activity result promise which can be resolved at later
moment. Calling `yield` on promise blocks until a result is available.

> Activity promise also exposes `then` method to construct promise chains. Read more about Promises [here](https://github.com/reactphp/promise).

Alternatively you can explicitly wrap your code (including `yield` constucts) using `Workflow::async` which will
execute nested code in parallel with main workflow code. Call `yeild` on Promise returned by `Workflow::async` to merge
execution result back to primary workflow method.

```php
public function greet(string $name): \Generator
{
    // Workflow::async runs it's activities and child workflows in a separate coroutine. Use keyword yield to merge
    // it back to parent process.

    $first = Workflow::async(
        function () use ($name) {
            $hello = yield $this->greetingActivity->composeGreeting('Hello', $name);
            $bye = yield $this->greetingActivity->composeGreeting('Bye', $name);

            return $hello . '; ' . $bye;
        }
    );

    $second = Workflow::async(
        function () use ($name) {
            $hello = yield $this->greetingActivity->composeGreeting('Hola', $name);
            $bye = yield $this->greetingActivity->composeGreeting('Chao', $name);

            return $hello . '; ' . $bye;
        }
    );

    // blocks until $first and $second complete
    return (yield $first) . "\n" . (yield $second);
}
```

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

You can not use any activity, timer or child workflow invocation inside `await` or `awaitWithTimeout` method. However,
you can use variables referenced by other coroutines.

## Timers
Use `Workflow::timer()` to yield long sleeps:

```php
yield Workflow::timer(300); // sleep for 5 minutes
```
