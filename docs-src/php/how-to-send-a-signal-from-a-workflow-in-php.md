---
id: how-to-send-a-signal-from-a-workflow-in-php
title: How to send Signal a Workflow in PHP
sidebar_label: Signal a Workflow
description: To send a Siganl to a Workflow, use WorkflowClient->newWorkflowStub or WorkflowClient->newUntypedWorkflowStub.
tags:
    - signal
    - workflow
---

To send Signal to a Workflow use `WorkflowClient`->`newWorkflowStub` or `WorkflowClient`->`newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(YourWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient`->`newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with Workflow Id to send
Signals to a running Workflow.

```php
$workflow = $workflowClient->newRunningWorkflowStub(YourWorkflow::class, 'workflowID');
$workflow->setValue(true);
```
