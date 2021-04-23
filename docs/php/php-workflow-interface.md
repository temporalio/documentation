---
id: workflow-interface
title: Workflow Interface
---

Workflow encapsulates the orchestration of Activities and child Workflows.
It can also answer synchronous queries and receive external events (also known as signals).

A Workflow could be defined via interface class. A Workflow interface class must be annotated with `#[WorkflowInterface]`.
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
All of the workflow methods return `Generator`, in order to properly typecast it's values in client code use
special annotation `#[ReturnType()]`.

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
