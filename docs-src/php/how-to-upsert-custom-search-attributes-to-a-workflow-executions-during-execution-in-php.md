---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-php
title: How to upsert Search Attributes in PHP
sidebar_label: Upsert Search Attributes
---

To upsert Search Attributes within a Workflow, use `Workflow::upsertSearchAttributes()`.

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
