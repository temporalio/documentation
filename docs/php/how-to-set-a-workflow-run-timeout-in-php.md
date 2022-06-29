---
id: how-to-set-a-workflow-run-timeout-in-php
title: How to set Workflow Run Timeout in PHP
sidebar_label: Workflow Run Timeout
---

`WorkflowRunTimeout` runs timeout limits duration of a single Workflow invocation.

```php
$workflow = $this->workflowClient->newWorkflowStub(
    CronWorkflowInterface::class,
    WorkflowOptions::new()
        ->withWorkflowId(CronWorkflowInterface::WORKFLOW_ID)
        ->withCronSchedule('* * * * *')
        ->withWorkflowExecutionTimeout(CarbonInterval::minutes(10))
        ->withWorkflowRunTimeout(CarbonInterval::minute(1))
);
```
