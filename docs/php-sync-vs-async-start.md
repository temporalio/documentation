---
id: php-sync-vs-async-start
title: Sync vs async Workflow start
sidebar_label: Sync vs async Workflow start
---

Workflows can be started both synchronously and asynchronously. You can use typed or untyped workflows stubs available
via `Temporal\Client\WorkflowClient`. To create workflow client:

```php
use Temporal\Client\GRPC\ServiceClient;
use Temporal\Client\WorkflowClient;

$workflowClient = WorkflowClient::create(ServiceClient::create('localhost:7233'));
```

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the
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

## Asynchronous start

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

Once started you can receive workflow ID and run ID via `WorkflowRun` object returned by start method:

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getExecution()->getID());
```

## Connect to Running Workflows

If you need to wait for the completion of a Workflow after an asynchronous start, make a blocking call to 
the `WorkflowRun`->`getResult` method. 

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getResult());
```

You can always connect to existing workflow and wait for its completion from another process using workflow id. Use
`WorkflowClient`->`newUntypedRunningWorkflowStub` for such purposes. 

```php
$workflow = $workflowClient->newUntypedRunningWorkflowStub('workflowID');

var_dump($workflow->getResult());
```
