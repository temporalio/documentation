---
id: events
title: Events
---

## Event Handling

Fault-oblivious stateful workflows can be _signalled_ about an external event. A signal is always point to point destined to a specific workflow instance. Signals are always processed in the order in which they are received.

There are multiple scenarios for which signals are useful.

## Event Aggregation and Correlation

Temporal is not a replacement for generic stream processing engines like Apache Flink or Apache Spark. But in certain scenarios it is a better fit. For example, when all events that should be aggregated and correlated are always applied to to some business entity with a clear Id. And then when a certain condition is met, actions should be executed.

The main limitation is that a single Temporal workflow has a pretty limited throughput, while the number of workflows is practically unlimited. So if you need to aggregate events per customer, and your application has 100 million customers and each customer doesn't generate more than 20 events per second, then Temporal would work fine. But if you want to aggregate all events for US customers then the rate of these events would be beyond the single workflow capacity.

For example, an IoT device generates events and a certain sequence of events indicates that the device should be reprovisioned. A workflow instance per device would be created and each instance would manage the state machine of the device and execute reprovision activity when necessary.

Another use case is a customer loyalty program. Every time a customer makes a purchase, an event is generated into Apache Kafka for downstream systems to process. A loyalty service Kafka consumer receives the event and signals a customer workflow about the purchase using the Temporal `signalWorkflowExecution` API. The workflow accumulates the count of the purchases. If a specified threshold is achieved, the workflow executes an activity that notifies some external service that the customer has reached the next level of loyalty program. The workflow also executes activities to periodically message the customer about their current status.

## Human Tasks

A lot of business processes involve human participants. The standard Temporal pattern for implementing an external interaction is to execute an activity that creates a human task in an external system. It can be an email with a form, or a record in some external database, or a mobile app notification. When a user changes the status of the task, a signal is sent to the corresponding workflow. For example, when the form is submitted, or a mobile app notification is acknowledged. Some tasks have multiple possible actions like claim, return, complete, reject. So multiple signals can be sent in relation to it.

## Process Execution Alteration

Some business processes should change their behavior if some external event has happened. For example, while executing an order shipment workflow, any change in item quantity could be delivered in a form of a signal.

Another example is a service deployment workflow. While rolling out new software version to a Kubernetes cluster some problem was identified. A signal can be used to ask the workflow to pause while the problem is investigated. Then either a continue or a rollback signal can be used to execute the appropriate action.

## Synchronization

Temporal workflows are strongly consistent so they can be used as a synchronization point for executing actions. For example, there is a requirement that all messages for a single user are processed sequentially but the underlying messaging infrastructure can deliver them in parallel. The Temporal solution would be to have a workflow per user and signal it when an event is received. Then the workflow would buffer all signals in an internal data structure and then call an activity for every signal received. See the following [Stack Overflow answer](https://stackoverflow.com/a/56615120/1664318) for an example.
