---
id: how-to-set-a-workflow-task-timeout-in-php
title: How to set Workflow Task Timeout in PHP
sidebar_label: Workflow Task Timeout
description: Set Workflow Task Timeout with WorkflowOptions.
tags:
 - timeout
 - workflow
---

`WorkflowTaskTimeout` runs timeout limits duration of a single Workflow invocation.

```php
$workflow = $this->workflowClient->newWorkflowStub(
    CronWorkflowInterface::class,
    WorkflowOptions::new()
        ->withWorkflowId(CronWorkflowInterface::WORKFLOW_ID)
        ->withCronSchedule('* * * * *')
        ->withWorkflowExecutionTimeout(CarbonInterval::minutes(10))
        ->withWorkflowTaskTimeout(CarbonInterval::minute(1))
);
```
