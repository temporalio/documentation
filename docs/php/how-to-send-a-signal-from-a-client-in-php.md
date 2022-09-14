---
id: how-to-send-a-signal-from-a-client-in-php
title: How to send a Signal from a Client in PHP
sidebar_label: Send Signal from Client
description: To send a Signal to a Workflow Execution from a Client, call the Signal method, annotated with `#[SignalMethod]` in the Workflow interface, from the Client code.
tags:
  - php
  - developer-guide
---

To send a Signal to a Workflow Execution from a Client, call the Signal method, annotated with `#[SignalMethod]` in the Workflow interface, from the Client code.

To send signal to workflow use `WorkflowClient`->`newWorkflowStub` or `WorkflowClient`->`newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(YourWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient`->`newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with workflow id to send
signals to already running workflows.

```php
$workflow = $workflowClient->newRunningWorkflowStub(YourWorkflow::class, 'workflowID');
$workflow->setValue(true);
```

See [Handle Signals](/php/how-to-handle-a-signal-in-a-workflow-in-php) for details on how to handle Signals in a Workflow.
