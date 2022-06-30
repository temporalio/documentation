---
id: how-to-define-workflow-return-values-in-php
title: Define Workflow return values in PHP
sidebar_label: Workflow return values
---

A Workflow method returns a Generator.
To properly typecast the Workflow's return value in the client code, use the `#[ReturnType()]` annotation.

```php
#[YourWorkflowInterface]
interface FileProcessingWorkflow {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function processFile(Argument $args);
}
```
