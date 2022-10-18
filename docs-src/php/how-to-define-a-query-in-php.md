---
id: how-to-define-a-query-in-php
title: How to define a Query in PHP
sidebar_label: Define a Query
---

Workflows can answer synchronous [Queries](/php/queries) and receive [Signals](/php/signals).

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

Note that name parameter of Workflow method annotations can be used to specify name of Workflow, Signal and Query types.
If name is not specified the short name of the Workflow interface is used.

In the above code the `#[WorkflowMethod(name)]` is not specified, thus the Workflow Type defaults to `"FileProcessingWorkflow"`.
