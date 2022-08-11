---
id: how-to-spawn-a-child-workflow-execution-in-php
title: How to spawn a Child Workflow Execution in PHP
sidebar_label: Child Workflow Execution
---

Besides Activities, a Workflow can also start other Workflows.

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
Once stub created you can invoke its Workflow method based on attribute `WorkflowMethod`.

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
