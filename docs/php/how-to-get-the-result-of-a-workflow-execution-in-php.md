---
id: how-to-get-the-result-of-a-workflow-execution-in-php
title: How to get the result of an Workflow Execution in PHP
sidebar_label: Workflow Execution
---

If you need to wait for the completion of a Workflow after an asynchronous start, make a blocking call to
the `WorkflowRun`->`getResult` method.

```php
$run = $workflowClient->start($accountTransfer, 'fromID', 'toID', 'refID', 1000);

var_dump($run->getResult());
```
