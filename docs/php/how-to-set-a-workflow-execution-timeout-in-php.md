---
id: how-to-set-a-workflow-execution-timeout-in-php
title: How to set Workflow Execution Timeout in PHP
sidebar_label: Workflow Execution Timeout
---

The following code example creates a new Workflow and sets the Workflow ID. Then it sets the Workflow ID resuse policy and the Workflow Execution Timeout to 2 minutes.

```php
$workflow = $this->workflowClient->newWorkflowStub(
    DynamicSleepWorkflowInterface::class,
    WorkflowOptions::new()
        ->withWorkflowId(DynamicSleepWorkflow::WORKFLOW_ID)
        ->withWorkflowIdReusePolicy(WorkflowIdReusePolicy::WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE)
        ->withWorkflowExecutionTimeout(CarbonInterval::minutes(2))
);
```
