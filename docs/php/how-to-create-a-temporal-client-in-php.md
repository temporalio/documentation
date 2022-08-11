---
id: how-to-create-a-temporal-client-in-php
title: How to create a Temporal Client in PHP
sidebar_label: Temporal Client
---

The following example represents a console command that starts a Workflow, prints its IDs, and then waits for its result:

<!--SNIPSTART php-hello-client {"enable_source_link": true}-->
[app/src/SimpleActivity/ExecuteCommand.php](https://github.com/temporalio/samples-php/blob/master/app/src/SimpleActivity/ExecuteCommand.php)
```php
class ExecuteCommand extends Command
{
    protected const NAME = 'simple-activity';
    protected const DESCRIPTION = 'Execute SimpleActivity\GreetingWorkflow';

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $workflow = $this->workflowClient->newWorkflowStub(
            GreetingWorkflowInterface::class,
            WorkflowOptions::new()->withWorkflowExecutionTimeout(CarbonInterval::minute())
        );

        $output->writeln("Starting <comment>GreetingWorkflow</comment>... ");

        // Start a workflow execution. Usually this is done from another program.
        // Uses task queue from the GreetingWorkflow @WorkflowMethod annotation.
        $run = $this->workflowClient->start($workflow, 'Antony');

        $output->writeln(
            sprintf(
                'Started: WorkflowID=<fg=magenta>%s</fg=magenta>',
                $run->getExecution()->getID(),
            )
        );

        // getResult waits for workflow to complete
        $output->writeln(sprintf("Result:\n<info>%s</info>", $run->getResult()));

        return self::SUCCESS;
    }
}
```
<!--SNIPEND-->

The `WorkflowClientInterface` in the snippet is an entry point to get access to Workflow.
Use an instance of `WorkflowClientInterface` to create, retrieve, or start a Workflow.
Here we create an instance of `GreetingWorkflowInterface` with a Workflow Execution Timeout of one minute.

Then we print some information and start the Workflow.
