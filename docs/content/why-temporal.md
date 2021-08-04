---
id: why-temporal
title: Why Temporal?
description: Temporal exists to solve the practical problems with distributed systems.
tags:
  - explanation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CenteredImage from "../components/CenteredImage.js"

Temporal exists to solve the practical problems with distributed systems and applications.

**Modern problems**

<CenteredImage
imagePath="/diagrams/basic-distributed-system.svg"
imageSize="75"
title="Basic distributed system"
/>

Distributed systems exist to scale computation across multiple machines as the potential load of an application changes.
In theory a distributed system facilitates a reliable and highly performant application.

However anyone who has ever developed an application that needed to respond to multiple asynchronous events, communicate with unreliable external resources, or track the state of something very complex has encountered the practical challenges of working with a distributed system.  Therefore, you are also likely familiar with the mixture of stateless services, databases, cron jobs, and queuing systems that is the modern approach to building such applications.

However, these types of systems often come with a number of problems.
It can be quite difficult to maintain the health of each individual component.
Moreover, there is usually a large investment that has to be made in infrastructure to visualize the health of the overall system, define timeouts, and orchestrate retries.
Scaling and maintaining these systems is a challenging and costly effort.

**Modern solution**

The Temporal solution is a fault-oblivious stateful programming model that hides or abstracts most of the complexities mentioned above.

The Temporal solution consists of a programming framework (Temporal SDK) and a backend service (Temporal Server).

The [Temporal Server](/docs/server/introduction) provides a durable virtual memory that is not linked to any specific process.
It preserves the full application state (including function stacks with local variables) across all kinds of hosting and software related failures.

A [Temporal SDK](/application-development) then enables you to write your application code using the full power of the programming language, while the Temporal Server handles the durability, availability, and scalability of the application.

:::note Temporal as a Distributed System
In terms of CAP theorem, each Temporal cluster is eventually available and highly consistent.

- Because Temporal makes it easy to retry Activities and horizontally scale resources, availability loss doesn't result in a fault, but in increased latency.
- Network failures are prevented from reaching the application level.
  If persistence nodes are lost or unreachable, your Workflows will not progress, but the data will still be highly consistent.
- The optional [Multi-cluster Replication feature](/docs/server/multi-cluster) greatly increases system availability.

:::

## Example subscription use-case

Let's look at a subscription-based use-case to compare the difference between a Temporal application and other modern approaches.

The basic business steps are as follows:

1. A customer signs up for a service that has a trial period.
2. After the trial period, if the customer has not cancelled, they should be charged once a month, for up to X months.
3. The customer has to be notified via email about the charges and should be able to cancel the subscription at any time.

This business logic is not very complicated and can be expressed in a few dozen lines of code.
In addition to that, any practical implementation has to ensure that the business process is fault-tolerant and scalable.

### Database-centric design approach

The first approach might be to center everything around a database where an application process would periodically scan the database tables for customers in specific states, execute necessary actions, and update the state to reflect that.

However, there are various drawbacks.

1. The most obvious one is the application state machine of the customer's state quickly becomes extremely complicated.
   For example, if a credit card charge attempt fails or sending an email fails due to a downstream system's unavailability, the state is now in limbo.
2. Failed calls likely need to be retried for a long time, and these calls need to be throttled to not overload external resources.
3. There needs to be logic to handle corrupted customer records to avoid blocking the whole process.
4. Additionally, databases have performance and scalability limitations (eventually would require sharding) and are not efficient for scenarios that require constant polling.

### Queue system design approach

The next commonly employed approach is to use a timer service and queues.
Updates are pushed to a queue while a service consumes them one at a time, updating a database, and possibly pushing more messages into other downstream queues.
A timer service can be used to schedule queue polling or database actions.

While this approach has shown to scale a bit better, the programming model can become very complex and error-prone, as there are usually no transactional updates between a queuing system, a timer service, and a database.

### Temporal design approach

The Temporal programming model aims to encapsulate and implement the entire business logic in a simple function or object method.
Thanks to the Temporal Server, the function/method is stateful, and the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.

Here are example Workflow Definitions that implement the subscription management use case in Java, Go, and PHP:

<Tabs
defaultValue="java"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
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
<TabItem value="php">

<!--SNIPSTART subscription-php-workflow-definition-implementation-->
<!--SNIPEND-->

</TabItem>
</Tabs>

Again, it is important to note that this is working application code that directly implements the business logic.
If any of the invoked operations (aka [Activities](/docs/concepts/activities)) take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeCustomerForBillingPeriod` for a day or more if the downstream processing service is down or not responding.
In the same way, it is a completely normal operation to sleep for 30 days directly inside the Workflow code.
This is possible because infrastructure failures are not going to affect the Workflow state including threads, blocking calls, and any local or Workflow variables.

The Temporal Server has practically no scalability limits on the number of open Workflow instances, so this code can be used over and over even if your application has hundreds of millions of customers.
