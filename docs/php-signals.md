---
id: php-signals
title: Signals
---

## Event Handling

Fault-oblivious stateful Workflows can be _signalled_ about an external event. A signal is always point to point destined to a specific Workflow instance. Signals are always processed in the order in which they are received.

There are multiple scenarios for which signals are useful.

## Event Aggregation and Correlation

Temporal is not a replacement for generic stream processing engines like Apache Flink or Apache Spark. But in certain scenarios it is a better fit. For example, when all events that should be aggregated and correlated are always applied to to some business entity with a clear Id. And then when a certain condition is met, actions should be executed.

The main limitation is that a single Temporal Workflow has a pretty limited throughput, while the number of Workflows is practically unlimited. So if you need to aggregate events per customer, and your application has 100 million customers and each customer doesn't generate more than 20 events per second, then Temporal would work fine. But if you want to aggregate all events for US customers then the rate of these events would be beyond the single Workflow capacity.

For example, an IoT device generates events and a certain sequence of events indicates that the device should be reprovisioned. A Workflow instance per device would be created and each instance would manage the state machine of the device and execute reprovision Activity when necessary.

Another use case is a customer loyalty program. Every time a customer makes a purchase, an event is generated into Apache Kafka for downstream systems to process. A loyalty service Kafka consumer receives the event and signals a customer Workflow about the purchase using the Temporal `signalWorkflowExecution` API. The Workflow accumulates the count of the purchases. If a specified threshold is achieved, the Workflow executes an Activity that notifies some external service that the customer has reached the next level of loyalty program. The Workflow also executes Activities to periodically message the customer about their current status.

## Human Tasks

A lot of business processes involve human participants. The standard Temporal pattern for implementing an external interaction is to execute an Activity that creates a human task in an external system. It can be an email with a form, or a record in some external database, or a mobile app notification. When a user changes the status of the task, a signal is sent to the corresponding Workflow. For example, when the form is submitted, or a mobile app notification is acknowledged. Some tasks have multiple possible actions like claim, return, complete, reject. So multiple signals can be sent in relation to it.

## Process Execution Alteration

Some business processes should change their behavior if some external event has happened. For example, while executing an order shipment Workflow, any change in item quantity could be delivered in a form of a signal.

Another example is a service deployment Workflow. While rolling out new software version to a Kubernetes cluster some problem was identified. A signal can be used to ask the Workflow to pause while the problem is investigated. Then either a continue or a rollback signal can be used to execute the appropriate action.

## Synchronization

Temporal Workflows are strongly consistent so they can be used as a synchronization point for executing actions. For example, there is a requirement that all messages for a single user are processed sequentially but the underlying messaging infrastructure can deliver them in parallel. The Temporal solution would be to have a Workflow per user and signal it when an event is received. Then the Workflow would buffer all signals in an internal data structure and then call an Activity for every signal received. See the following [Stack Overflow answer](https://stackoverflow.com/a/56615120/1664318) for an example.


**Signals** provide a mechanism to send data directly to a running Workflow. Previously, you had
two options for passing data to the Workflow implementation:

* Via start parameters
* As return values from Activities

With start parameters, we could only pass in values before Workflow execution began.

Return values from Activities allowed us to pass information to a running Workflow, but this
approach comes with its own complications. One major drawback is reliance on polling. This means
that the data needs to be stored in a third-party location until it's ready to be picked up by
the Activity. Further, the lifecycle of this Activity requires management, and the Activity
requires a manual restart if it fails before acquiring the data.

**Signals**, on the other hand, provide a fully asynchronous and durable mechanism for providing data to
a running Workflow. When a signal is received for a running Workflow, Temporal persists the event
and the payload in the Workflow history. The Workflow can then process the signal at any time
afterwards without the risk of losing the information.

```php
use Temporal\Workflow;

#[Workflow\WorkflowInterface]
class MyWorkflow
{
    private bool $value;

    #[Workflow\WorkflowMethod]
    public function run()
    {
        yield Workflow::await(fn()=> $this->value);
        return 'OK';
    }    

    #[Workflow\SignalMethod]
    public function setValue(bool $value)
    {
        $this->value = $value;
    }
}
```

In the example above the workflow updates the protected value. Main workflow coroutine waits for such value to change using
`Workflow::await` function.

To send signal to workflow use `WorkflowClient`->`newWorkflowStub` or `WorkflowClient`->`newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient`->`newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with workflow id to send
signals to already running workflows.

```php
$workflow = $workflowClient->newRunningWorkflowStub(MyWorkflow::class, 'workflowID');
$workflow->setValue(true);
```

## SignalWithStart

You may not know if a Workflow is running and can accept a signal. The
`WorkflowClient`->`startWithSignal` API
allows you to send a signal to the current Workflow instance if one exists or to create a new
run and then send the signal.

```php
$workflow = $workflowClient->newWorkflowStub(MyWorkflow::class);

$run = $workflowClient->startWithSignal(
    $workflow,
    'setValue',
    [true], // signal arguments
    [] // start arguments
);
```
