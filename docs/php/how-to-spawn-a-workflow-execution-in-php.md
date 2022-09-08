---
id: how-to-spawn-a-workflow-execution-in-php
title: How to spawn a Workflow Execution in PHP
sidebar_label: Workflow Execution
description: Use the `Temporal\Client\WorkflowClient` to start a workflow both synchronously and asynchronously.
tags:
  - developer-guide
  - php
---

Workflows can be started both synchronously and asynchronously. You can use typed or untyped workflows stubs available
via `Temporal\Client\WorkflowClient`. To create workflow client:

```php
use Temporal\Client\GRPC\ServiceClient;
use Temporal\Client\WorkflowClient;

$workflowClient = WorkflowClient::create(ServiceClient::create('localhost:7233'));
```

**Synchronous start**

A synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the
invocation process and will continue executing even if the waiting process crashes or stops.

Make sure to acquire workflow interface or class name you want to start. For example:

```php
#[WorkflowInterface]
interface AccountTransferWorkflowInterface
{
    #[WorkflowMethod(name: "MoneyTransfer")]
    #[ReturnType('int')]
    public function transfer(
        string $fromAccountId,
        string $toAccountId,
        string $referenceId,
        int $amountCents
    );
}
```

To start such workflow in sync mode:

```php
$accountTransfer = $workflowClient->newWorkflowStub(
    AccountTransferWorkflowInterface::class
);

$result = $accountTransfer->transfer(
    'fromID',
    'toID',
    'refID',
    1000
);
```

**Asynchronous start**

An asynchronous start initiates a Workflow execution and immediately returns to the caller without waiting for a result.
This is the most common way to start Workflows in a live environment.

To start a Workflow asynchronously pass workflow stub instance and start parameters into `WorkflowClient`->`start`
method.

```php
$accountTransfer = $workflowClient->newWorkflowStub(
    AccountTransferWorkflowInterface::class
);

$run = $this->workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);
```

Once started you can receive workflow ID via `WorkflowRun` object returned by start method:

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getExecution()->getID());
```

**Recurring start**

You can start a Workflow Execution on a regular schedule with [the CronSchedule option](/php/distributed-cron).
