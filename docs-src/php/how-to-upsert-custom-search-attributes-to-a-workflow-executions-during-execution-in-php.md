---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-php
title: How to upsert Search Attributes in PHP
sidebar_label: Upsert Search Attributes
description: To upsert Search Attributes within a Workflow, use Workflow::upsertSearchAttributes().
tags:
    - php
    - search attributes
    - upsert search attributes
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
