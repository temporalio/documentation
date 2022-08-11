---
id: how-to-set-a-cron-schedule-in-php
title: How to set a CRON schedule in PHP
sidebar_label: Activity Execution
---

Set your Cron Schedule with `CronSchedule('* * * * *')`.

The following example sets a Cron Schedule in PHP:

```php
  $workflow = $this->workflowClient->newWorkflowStub(
      CronWorkflowInterface::class,
      WorkflowOptions::new()
          ->withWorkflowId(CronWorkflowInterface::WORKFLOW_ID)
          ->withCronSchedule('* * * * *')
          // Execution timeout limits total time. Cron will stop executing after this timeout.
          ->withWorkflowExecutionTimeout(CarbonInterval::minutes(10))
          // Run timeout limits duration of a single workflow invocation.
          ->withWorkflowRunTimeout(CarbonInterval::minute(1))
  );

  $output->writeln("Starting <comment>CronWorkflow</comment>... ");

  try {
      $run = $this->workflowClient->start($workflow, 'Antony');
      // ...
  }
```

Setting `withCronSchedule` turns the Workflow Execution into a Temporal Cron Job.
For more information, see the [PHP samples](https://github.com/temporalio/samples-php/tree/master/app/src/Cron) for example code or the PHP SDK `WorkflowOptions` [source code](https://github.com/temporalio/sdk-php/blob/master/src/Client/WorkflowOptions.php).
