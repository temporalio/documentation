---
id: queries
title: Queries in PHP
sidebar_label: Queries
tags:
  - php
---

:::info Try the Developer's guide

The majority of this information has moved into the [Developer's guide](/application-development/?lang=php).

However, if you can't find what you are looking for there, we recommend checking this doc set as well.

:::

If a Workflow execution has been stuck at a state for longer than an expected period of time, you
might want to query the current call stack. You can use the Temporal CLI to perform this query. For
example:

`tctl --namespace samples-namespace workflow query -w your_workflow_id -r your_run_id -qt __stack_trace`

> You can also access the stack trace from Temporal Web UI.

This command uses `__stack_trace`, which is a built-in query type supported by the Temporal client
library. You can add custom query types to handle queries such as querying the current state of a
Workflow, or querying how many Activities the Workflow has completed. To do this, you need to set
up a query handler using method attribute `QueryMethod` or `Workflow::registerQueryHandler`.

```php
#[Workflow\WorkflowInterface]
class YourWorkflow
{
    #[Workflow\QueryMethod]
    public function getValue()
    {
        return 42;
    }

    #[Workflow\WorkflowMethod]
    public function run()
    {
        // workflow code
    }

}
```

The handler function can receive any number of input parameters, but all input parameters must be
serializable. The following sample code sets up a query handler that handles the query type of
`currentState`:

```php
#[Workflow\WorkflowInterface]
class YourWorkflow
{
    private string $currentState;

    #[Workflow\QueryMethod('current_state')]
    public function getCurrentState(): string
    {
        return $this->currentState;
    }

    #[Workflow\WorkflowMethod]
    public function run()
    {
        // Your normal Workflow code begins here, and you update the currentState
        // as the code makes progress.
        $this->currentState = 'waiting timer';
        try{
            yield Workflow::timer(DateInterval::createFromDateString('1 hour'));
        } catch (\Throwable $e) {
            $this->currentState = 'timer failed';
            throw $e;
        }

        $yourActivity = Workflow::newActivityStub(
            YourActivityInterface::class,
            ActivityOptions::new()->withScheduleToStartTimeout(60)
        );

        $this->currentState = 'waiting activity';
        try{
            yield $YourActivity->doSomething('some input');
        } catch (\Throwable $e) {
            $this->currentState = 'activity failed';
            throw $e;
        }

        $this->currentState = 'done';

        return null;
    }
}
```

You can now query `current_state` by using the CLI:

`tctl --namespace samples-namespace workflow query -w your_workflow_id -r your_run_id -qt current_state`

You can also issue a query from code using the `QueryWorkflow()` API on a Temporal client object.

Use WorkflowStub to query workflow instances from your client code (can be applied to running workflows as well):

```php
$workflow = $workflowClient->newWorkflowStub(
    YourWorkflow::class,
    WorkflowOptions::new()
);

$workflowClient->start($workflow);

var_dump($workflow->getCurrentState());
sleep(60);
var_dump($workflow->getCurrentState());
```
