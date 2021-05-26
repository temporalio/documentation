---
id: distributed-cron
title: Distributed CRON
---

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://github.com/temporalio/sdk-php/blob/master/src/Client/WorkflowOptions.php">

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

You can [check our PHP Samples](https://github.com/temporalio/samples-php/tree/master/app/src/Cron) for example code.

</DistributedCron>

## Retrieve last successful result

Sometimes it is useful to obtain the progress of previous successful runs.
This is supported by two APIs in the PHP SDK:
`Workflow::hasLastCompletionResult` and `Workflow::getLastCompletionResult`. Below is an example of how
to use this in PHP:

```php
public function cronWorkflow() {
    $lastProcessedFileName = Workflow::getLastCompletionResult(Type::TYPE_STRING);

    // Process work starting from the lastProcessedFileName.
    // Business logic implementation goes here.
    // Updates lastProcessedFileName to the new value.

    return $lastProcessedFileName;
}
```

Note that this works even if one of the cron schedule runs failed. The
next schedule will still get the last successful result if it ever successfully
completed at least once. For example, for a daily cron Workflow, if the first day
run succeeds and the second day fails, then the third day run will still get
the result from first day's run using these APIs.
