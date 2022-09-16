---
id: how-to-set-workflow-retry-options-in-php
title: How to set Workflow Retry Options in PHP
sidebar_label: Workflow Retry Options
description: A Retry Policy can be configured with an instance of the `RetryOptions` object.
tags:
  - php
  - how-to
  - developer-guide
---

A Retry Policy can be configured with an instance of the `RetryOptions` object.
To enable retries for a Workflow, you need to provide a Retry Policy object via `ChildWorkflowOptions`
for child Workflows or via `WorkflowOptions` for top-level Workflows.

```php
$workflow = $this->workflowClient->newWorkflowStub(
      CronWorkflowInterface::class,
      WorkflowOptions::new()->withRetryOptions(
        RetryOptions::new()->withInitialInterval(120)
      )
);
```

For more detailed information about `RetryOptions` object see [retries](/php/retries) for more details.
