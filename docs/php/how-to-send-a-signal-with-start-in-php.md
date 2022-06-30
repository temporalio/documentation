---
id: how-to-send-a-signal-with-start-in-php
title: How to send Signal-With-Start in PHP
sidebar_label: Signal-With-Start
---

In cases where you may not know if a Workflow is running, and want to send a Signal to it, use `startwithSignal`.
If a running Workflow exists, the `startwithSignal` API sends the Signal.
If there is no running Workflow, the API starts a new Workflow Run and delivers the Signal to it.

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->startWithSignal(
    $workflow,
    'setValue',
    [true], // signal arguments
    [] // start arguments
);
```
