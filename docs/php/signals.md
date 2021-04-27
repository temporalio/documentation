---
id: signals
title: Signals in PHP
---

**Signals** provide a mechanism to send data directly to a running Workflow. Previously, you had
two options for passing data to the Workflow implementation:

* Via start parameters
* As return values from Activities

With start parameters, we could only pass in values before Workflow execution began.

Return values from Activities allowed us to pass information to a running Workflow, but this
approach comes with its own complications. One major drawback is reliance on polling. This means
that the data needs to be stored in a third-party location until it's ready to be picked up by
the Activity. Further, the lifecycle of this Activity requires management, and the Activity
requires a manual restart if it fails before acquiring the data.

**Signals**, on the other hand, provide a fully asynchronous and durable mechanism for providing data to
a running Workflow. When a signal is received for a running Workflow, Temporal persists the event
and the payload in the Workflow history. The Workflow can then process the signal at any time
afterwards without the risk of losing the information.

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
