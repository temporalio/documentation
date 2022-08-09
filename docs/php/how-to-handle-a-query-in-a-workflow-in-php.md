---
id: how-to-handle-a-query-in-a-workflow-in-php
title: How to handle a Query in PHP
sidebar_label: Handle a Query
---

You can add custom Query types to handle Queries such as Querying the current state of a
Workflow, or Querying how many Activities the Workflow has completed. To do this, you need to set
up a Query handler using method attribute `QueryMethod` or `Workflow::registerQueryHandler`.

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
serializable. The following sample code sets up a Query handler that handles the Query type of
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
            yield $yourActivity->doSomething('some input');
        } catch (\Throwable $e) {
            $this->currentState = 'activity failed';
            throw $e;
        }

        $this->currentState = 'done';

        return null;
    }
}
```

You can also issue a Query from code using the `QueryWorkflow()` API on a Temporal Client object.

Use `WorkflowStub` to Query Workflow instances from your Client code (can be applied to both running and closed Workflows):

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
