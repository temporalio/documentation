---
id: how-to-define-workflow-return-values-in-php
title: Define Workflow return values in PHP
sidebar_label: Workflow return values
description: Define Workflow return values
tags:
 - workflow
---

A Workflow method returns a Generator.
To properly typecast the Workflow's return value in the client code, use the `#[ReturnType()]` attribute.

```php
#[WorkflowInterface]
interface FileProcessingWorkflow {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function processFile(Argument $args);
}
```
