---
id: signals
title: Signals in PHP
sidebar_label: Signals
---

**Signals** provide a mechanism to send data directly into a running Workflow.

## When to Use Signals

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

## How to use Signals

```php
use Temporal\Workflow;

#[Workflow\WorkflowInterface]
class MyWorkflow
{
    private bool $value;

    #[Workflow\WorkflowMethod]
    public function run()
    {
        yield Workflow::await(fn()=> $this->value);
        return 'OK';
    }

    #[Workflow\SignalMethod]
    public function setValue(bool $value)
    {
        $this->value = $value;
    }
}
```

In the example above the workflow updates the protected value. Main workflow coroutine waits for such value to change using
`Workflow::await` function.

To send signal to workflow use `WorkflowClient`->`newWorkflowStub` or `WorkflowClient`->`newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient`->`newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with workflow id to send
signals to already running workflows.

```php
$workflow = $workflowClient->newRunningWorkflowStub(MyWorkflow::class, 'workflowID');
$workflow->setValue(true);
```

## SignalWithStart

You may not know if a Workflow is running and can accept a signal. The
`WorkflowClient`->`startWithSignal` API
allows you to send a signal to the current Workflow instance if one exists or to create a new
run and then send the signal.

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->startWithSignal(
    $workflow,
    'setValue',
    [true], // signal arguments
    [] // start arguments
);
```
