---
id: how-to-customize-workflow-type-in-php
title: How to customize a Workflow Type in PHP
sidebar_label: Custom Workflow Type
description: How to customize a Workflow Type in PHP
tags:
  - developer-guide
  - sdk
  - php
---

To customize a Workflow Type, use the `WorkflowMethod` annotation to specify the name of Workflow.

```php
#[WorkflowMethod(name)]
```

If a Workflow Type is not specified, then Workflow Type defaults to the interface name, which is `YourWorkflowDefinitionInterface` in this case.

```php
#[WorkflowInterface]
interface YourWorkflowDefinitionInterface
{
    #[WorkflowMethod]
    public function processFile(Argument $args);
}
```
