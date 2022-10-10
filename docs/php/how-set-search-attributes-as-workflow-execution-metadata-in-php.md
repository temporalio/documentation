---
id: how-set-search-attributes-as-workflow-execution-metadata-in-php
title: How to set Search Attributes as Workflow Execution metadata in PHP
sidebar_label: Search Attributes
---

Use `WorkflowOptions::withSearchAttributes()` method to provide search attributes when your start a workflow:

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

You can also upsert search attributes within a workflow with `Workflow::upsertSearchAttributes()`:

```php
class GreetingWorkflow implements GreetingWorkflowInterface
{
    public function getGreeting(string $name)
    {
        Workflow::upsertSearchAttributes(
            [
                'CustomKeywordField' => 'attr1-value',
                'CustomIntField' => 123,
            ]
        );

        // ...
    }
}
```


