---
id: how-to-send-a-signal-with-start-in-php
title: How to send Signal-With-Start in PHP
sidebar_label: Signal-With-Start
---

You may not know if a Workflow is running and can accept a signal. The `WorkflowClient`->`startWithSignal` API allows you to send a Signal to the current Workflow instance if one exists or to create a new run and then send the Signal.

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->startWithSignal(
    $workflow,
    'setValue',
    [true], // signal arguments
    [] // start arguments
);
```
