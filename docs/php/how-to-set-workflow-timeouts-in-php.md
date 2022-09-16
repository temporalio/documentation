---
id: how-to-set-workflow-timeouts-in-php
title: How to set Workflow Timeouts in PHP
sidebar_label: Workflow Timeouts
description: Create an instance of WorkflowOptions.
tags:
  - php
  - how-to
---

Create an instance of `WorkflowOptions` in the Client code and set your timeout.

Available timeouts are:

- `withWorkflowExecutionTimeout()`
- `withWorkflowRunTimeout()`
- `withWorkflowTaskTimeout()`

```php
$workflow = $this->workflowClient->newWorkflowStub(
    DynamicSleepWorkflowInterface::class,
    WorkflowOptions::new()
        ->withWorkflowId(DynamicSleepWorkflow::WORKFLOW_ID)
        ->withWorkflowIdReusePolicy(WorkflowIdReusePolicy::WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE)
        // Set Workflow Timeout duration
        ->withWorkflowExecutionTimeout(CarbonInterval::minutes(2))
        // ->withWorkflowRunTimeout(CarbonInterval::minute(2))
        // ->withWorkflowTaskTimeout(CarbonInterval::minute(2))
);
```
