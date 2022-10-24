---
id: how-to-customize-workflow-type-in-php
title: How to customize Workflow types in PHP
sidebar_label: Customize Workflow types
description: Customize Workflow types.
tags:
  - developer-guide
  - sdk
  - php
---

To customize a Workflow type, use the Workflow method annotations to specify the name of Workflow.

```php
#[WorkflowMethod(name)]
```

If a Workflow type is not specified, then Workflow type defaults to the interface name, `FileProcessingWorkflow`.

```php
#[WorkflowInterface]
interface FileProcessingWorkflow
{
    #[WorkflowMethod]
    public function processFile(Argument $args);
}
```
