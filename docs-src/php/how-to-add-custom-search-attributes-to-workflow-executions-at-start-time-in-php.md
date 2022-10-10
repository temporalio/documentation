---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-php
title: How to set Custom Search Attributes to a Workflow Execution in PHP
sidebar_label: Custom Search Attributes
---

Use the `WorkflowOptions::withSearchAttributes()` method to provide Search Attributes when you start a Workflow.

```php
$workflow = $this->workflowClient->newWorkflowStub(
    GreetingWorkflowInterface::class,
    WorkflowOptions::new()
        ->withWorkflowExecutionTimeout(CarbonInterval::minute())
        ->withSearchAttributes(
            [
                'CustomKeywordField' => 'value',
                'CustomIntField' => 123,
            ]
        )
);
```
