---
id: php-queries
title: Queries
---

## Synchronous Query

Workflow code is stateful with the Temporal framework preserving it over various software and hardware failures. The state is constantly mutated during Workflow execution. To expose this internal state to the external world Temporal provides a synchronous query feature. From the Workflow implementer point of view the query is exposed as a synchronous callback that is invoked by external entities. Multiple such callbacks can be provided per Workflow type exposing different information to different external systems.

To execute a query an external client calls a synchronous Temporal API providing _namespace, workflowId, query name_ and optional _query arguments_.

Query callbacks must be read-only not mutating the Workflow state in any way. The other limitation is that the query callback cannot contain any blocking code. Both above limitations rule out ability to invoke Activities from the query handlers.

Temporal team is currently working on implementing _update_ feature that would be similar to query in the way it is invoked, but would support Workflow state mutation and local Activity invocations.

## Stack Trace Query

The Temporal client libraries expose some predefined queries out of the box. Currently the only supported built-in query is _stack_trace_. This query returns stacks of all Workflow owned threads. This is a great way to troubleshoot any Workflow in production.


If a Workflow execution has been stuck at a state for longer than an expected period of time, you
might want to query the current call stack. You can use the Temporal CLI to perform this query. For
example:

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt __stack_trace`

> You can also access the stack trace from Temporal Web UI.

This command uses `__stack_trace`, which is a built-in query type supported by the Temporal client
library. You can add custom query types to handle queries such as querying the current state of a
Workflow, or querying how many Activities the Workflow has completed. To do this, you need to set
up a query handler using method attribute `QueryMethod` or `Workflow::registerQueryHandler`.

```php
#[Workflow\WorkflowInterface]
class MyWorkflow
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
class MyWorkflow
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

        $myActivity = Workflow::newActivityStub(
            MyActivityInterface::class,
            ActivityOptions::new()->withScheduleToStartTimeout(60)
        );

        $this->currentState = 'waiting activity';
        try{
            yield $myActivity->doSomething('some input');
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

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt current_state`

You can also issue a query from code using the `QueryWorkflow()` API on a Temporal client object.

Use WorkflowStub to query workflow instances from your client code (can be applied to running workflows as well):

```php
$workflow = $workflowClient->newWorkflowStub(
    MyWorkflow::class,
    WorkflowOptions::new()
);

$workflowClient->start($workflow);

var_dump($workflow->getCurrentState());
sleep(60);
var_dump($workflow->getCurrentState());
```
