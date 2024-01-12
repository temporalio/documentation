---
id: why-temporal
title: What are the differences between Temporal and a traditional system?
description: This page compares a function execution in a traditional system and a Workflow Execution in Temporal.
tags:
  - explanation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

One of the aspects of the Temporal System is that it abstracts the complexity of a distributed system.
Distributed systems exist to scale computation across multiple machines as the potential load of a system changes.
In theory, a distributed system facilitates a reliable and highly performant application.

However, any failure that leaves the downstream part of the application waiting for a response can make things very complicated, especially at a large scale.

![Distributed application failures](/diagrams/basic-distributed-system.svg)

How will a downstream part of the application know if there was a failure before or a failure after changes to the state if there is no response?
How will the application track and reconcile an inconsistent state?

In traditional systems, a large investment is often made to maintain the health of each individual component, visualize the health of the overall system, define timeout constraints for computations, orchestrate retries for computations that fail, and maintain a consistent state.

These systems are often a mixture of stateless services, databases, cron jobs, and queues.
And as these systems scale, responding to multiple asynchronous events, communicating with unreliable external resources, or tracking the state of something very complex becomes more and more challenging.

Temporal restructures the use of services, databases, cron jobs, queues, host processes, and SDKs, into the Temporal Platform, and addresses failures head on.

In a traditional system, the service exists to spawn function executions.
The Temporal Platform exists to facilitate [Workflow Executions](/concepts/what-is-a-workflow-execution).

![Temporal vs Traditional system](/diagrams/temporal-vs-traditional.svg)

Although the two systems seem similar at first glance, they differ in several significant ways.

**Failure**

With a traditional system, a service function execution is both volatile and short-lived.

- If a function execution fails, it's not resumable because all execution state is lost. The longer a function execution awaits, the higher the chance of failure.
- A traditional function execution typically has a limited lifespan, often measured in minutes.

With Temporal, a Workflow Execution is resumable.

- A Workflow Execution is fully resumable after a failure.
- Temporal imposes no deadlines on Workflow Executions.

**State**

With a traditional system, stoppage or failure means that all execution state is lost.
Your application (or a supporting component) must monitor the service's response to initiate a retry of the service execution.
A retry starts from its _initial_ state.

With Temporal, computation resumes from its _latest_ state. All progress is retained.

**Communication**

With a traditional system, you can't communicate with a function execution.

With Temporal, [Signals](/concepts/what-is-a-signal) and [Queries](/concepts/what-is-a-query) enable data to be sent to or extracted from a Workflow Execution.

**Scope**

With a traditional system, a service function execution can at best represent a business process.
Typically, it represents only a part of a business process.

A Temporal Workflow Execution can represent a business process or an entire business object.

### Example subscription use case

Let's look at a subscription-based use case to compare the difference between a Temporal Application and other traditional approaches.

The basic business steps are as follows:

1. A customer signs up for a service that has a trial period.
2. After the trial period, if the customer has not canceled, they should be charged once a month.
3. The customer has to be notified via email about the charges and should be able to cancel the subscription at any time.

This business logic is not very complicated and can be expressed in a few dozen lines of code.
Any practical implementation also has to ensure that the business process is fault-tolerant and scalable.

**Database-centric design approach**

The first approach might be to center everything around a database where an application process would periodically scan the database tables for customers in specific states, execute necessary actions, and update the database to reflect changes.

However, there are various drawbacks.

- The most obvious one is that the application state machine of the customer's state quickly becomes extremely complicated.
  For example, if a credit card charge attempt fails or sending an email fails due to a downstream system's unavailability, the state is now in limbo.
- Failed calls likely need to be retried for a long time, and these calls need to be throttled to not overload external resources.
- There needs to be logic to handle corrupted customer records to avoid blocking the whole process.
- Additionally, databases have performance and scalability limitations (eventually requiring sharding) and are not efficient for scenarios that require constant polling.

**Queue system design approach**

The next commonly employed approach is to use a timer service and queues.
Updates are pushed to a queue while a service consumes them one at a time, updating a database, and possibly pushing more messages into other downstream queues.
A timer service can be used to schedule queue polling or database actions.

While this approach has shown to scale a bit better, the programming model can become very complex and error-prone, as there are usually no transactional updates between a queuing system, a timer service, and a database.

**Temporal design approach**

The Temporal Platform approach aims to encapsulate and implement the entire business logic in a simple function or object method.
Thanks to the Temporal Platform, the function/method is durably stateful, and the implementer doesn't need to employ any additional systems to ensure consistency and fault tolerance.

Here are example Workflow Definitions that implement the subscription management use case in Java, Go, Typescript and PHP:

<Tabs
defaultValue="java"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'Typescript', value: 'ts'},
{label: 'PHP', value: 'php'},
]
}>

<TabItem value="go">

<!--SNIPSTART subscription-go-workflow-definition-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

<!--SNIPSTART subscription-java-workflow-definition-implementation-->
<!--SNIPEND-->

</TabItem>
<TabItem value="ts">

<!--SNIPSTART subscription-ts-workflow-definition-->
<!--SNIPEND-->

</TabItem>
<TabItem value="php">

<!--SNIPSTART subscription-php-workflow-definition-implementation-->
<!--SNIPEND-->

</TabItem>
</Tabs>

Again, it is important to note that this is working application code that directly implements the business logic.
If any of the operations take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeCustomerForBillingPeriod` for a day or more if the downstream processing service is down or not responding.
In the same way, it is a completely normal operation to sleep for 30 days directly inside the Workflow code.
This is possible because infrastructure failures won't affect the Workflow state—including threads, blocking calls, and any variables.

The Temporal Platform has practically no scalability limits on the number of open Workflow Executions, so this code can be used over and over even if your application has hundreds of millions of customers.
