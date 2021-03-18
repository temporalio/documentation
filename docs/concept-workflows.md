---
id: concept-workflows
title: The concept of Workflows
sidebar_label: Workflows
description: Temporal core abstraction is a fault-oblivious stateful Workflow. The state of the Workflow code, including local variables and threads it creates, is immune to process and Temporal service failures.
---

import { ResponsivePlayer } from '../src/components'

## Focus on business logic

Depending on the language, a Workflow is really just a single function or object method that orchestrates a series of actions.
The idea is that Workflow code should be able to focus on "business logic".
When we talk about "business logic", we are talking about the literal steps an application is taking to meet the goals of a business.

```
Workflow {
  ChargeCustomer()
  SendInvoice()
  NotifyShipping()
  UpdateInventory()
  ...
}
```

This is in contrast to the logic that is often needed to handle any timeouts, errors, edge cases, or infrastructure failures that might occur while executing the business logic.

Because the Temporal Server does not know what language an application is written in, the term "Workflow" is used as the label for any chunk of code whose execution state can be tracked by the Server.

## It's all about state

The Temporal Server uses "event sourcing" techniques to track the state of a Workflow's execution.

:::note

The [Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) article published in Microsoft's Azure documentation provides a general explanation of what that technique looks like.

:::

As a result, a Workflow must use certain Temporal SDK APIs to manage time related operations or create new threads.
And it also means that any "non-deterministic" behavior, such as calls to external APIs, or random number generators, must not exist directly inside the Workflow.
The elegant solution to this is to have any code that handles this potentially unexpected behavior reside in [Activities](/docs/concept-activities).

But, by using event sourcing a Workflow becomes quite durable and in essence "fault-tolerant".
For example, if a host fails in the middle of a Workflow execution, not only can another host resume the Workflow, but it can resume at the exact line of code where it stopped executing without having to re-execute the code up until that point.
The Workflow execution state is even preserved through crashes of the Temporal Server itself.

## Freedom to relocate

While there are a few specific use-cases that may require a Workflow to start and finish on the same host, Workflow code is completely independent from the location in which it is executed

Instead of deploying executable code to a host directly, Temporal applications use special [Worker](/docs/concept-workers) processes whose sole job is to host and execute Workflow and Activity code.
The Worker communicates with the Temporal Server in order to know which line of code to execute through [Tasks](/docs/concept-task-queues) it picks up.

Because a Workflow is executed piece by piece, and because the Server tracks the state of that execution, there can be multiple Worker processes in multiple locations capable of executing any one of those pieces.

Essentially load balancing and processing failover are "out-of-the-box" features of Temporal Workflows.

## Workflows have options

When you start a Workflow, you can pass along parameters that tell the Temporal Server how to handle the Workflow.
This includes the ability to set timeouts for Workflow execution, a retry policy, the Task Queue name, a data converter, and child Workflow options.

### Timeout settings

It's often necessary to limit the amount of time a specific Workflow can be running.

To support this, the following three parameters can be provided to Workflow options:

#### Execution timeout

- **Description**: maximum time a Workflow should be allowed to run including retries and continue as new.
Different from Run timeout which is a single run.
- **Use-case**:

#### Run timeout

- **Description**: maximum time a single Workflow run should be allowed.
- **Use-case**:

#### Task timeout

- **Description**: timeout for processing a Workflow task starting from the point when a worker pulled the task.
If a Command task is lost, it is retried after this timeout.
- **Use-case**:

### Retry policy

There may be scenarios where you need to retry a Workflow's execution from the very beginning.
In this case, you can use supply a retry policy when you start the Workflow.

#### Initial interval

- **Description**: This is the amount of time that must elapse before the first retry occurs.
- **Use-case**:

#### Backoff coefficient

- **Description**: Retries occur exponentially.
The coefficient specifies how fast the retry interval is growing. The coefficient of 1 means that the retry interval is always equal to the `InitialInterval`.
- **Use-case**:

#### Maximum interval

- **Description**: specifies the maximum interval between retries. Useful for coefficients of more than 1.
- **Use-case**:

#### Maximum attempts

- **Description**: specifies how many times to attempt to execute a Workflow in the presence of failures. If this limit is exceeded, the Workflow fails without retry.
- **Use-case**:

#### Non-retryable error reasons

- **Description**: allows to specify errors that shouldn't be retried. For example, retrying invalid arguments error doesn't make sense in some scenarios.
- **Use-case**:

### The Task Queue

The only required Workflow options parameter is the name of a [Task Queue](/docs/concept-task-queues).
Read the [Task Queues concept page](/docs/concept-task-queues) for a better overview.
But essentially a Task Queue is the mechanism by which any given Worker knows which piece of code to execute next.
A Workflow can only use one Task Queue, and the from a developer's perspective it is named and managed as a simple string value.

### Custom Id

You may assign a custom Id to a Workflow.
This Id is meant for business level identification such as a customer Id or an order Id.
The Temporal Server enforces the uniqueness of the Id, within a [Namespace](/docs/server-namespaces) based on the Workflow Id reuse policy.
Any attempt to start a Workflow that has the same Id of a Workflow with a reuse policy that does not allow it, is going to fail with a "Workflow execution already started" error.

:::note

A Workflow is uniquely identified by its Namespace, Workflow Id, and Run Id.

:::

#### Allow duplicate failed only policy

- **Description**: Specifying this means that the Workflow is allowed to start only if a previously executed Workflow with the same Id has failed.
- **Use case**:

#### Allow duplicate policy

- **Description**: Specifying this means that the Workflow is allowed to start independently of a previous Workflow with the same Id regardless of the its completion status.
This is the default policy, if one is not specified.
- **Use case**:

#### Reject duplicate policy

- **Description**: Specifying this means that no other Workflow is allowed to start using the same Workflow Id at all.
- **Use case**:

## Child Workflows

If a Workflow is started by another Workflow, then it is considered a Child Workflow.
The completion, or failure, of a Child Workflow is reported to the Workflow that started it (the Parent Workflow).

The following is a list of some of the more common reasons why you might want to break up code execution into Child Workflows:

- Execute code using a different set of Workers.
- Enable invocation from multiple other Workflow.
- Workaround event history size limits.
- Create one-to-one mappings between a Workflow Id and some other resource.
- Execute some periodic logic.

One of the main reasons you would not want to use a Child Workflow is the lack of a shared state with the Parent Workflow.
A Parent and Child Workflow can communicate only through asynchronous signals.
If the executing logic has tight coupling between Workflows, it may simply be easier to use a single Workflow that can rely on a shared object's state.

## Example subscription Workflow use-case

Let's look at a subscription based use-case to compare the difference between a Temporal application and other modern approaches.

The basic business steps are as follows:

1. A customer signs up for a service that has a trial period.
2. After the trial period, if the customer has not cancelled, they should be charged once per month for up to x months.
3. The customer has to be notified via email about the charges and should be able to cancel the subscription at any time.

This business logic is not very complicated and can be expressed in a few dozen lines of code.
But any practical implementation has to ensure that the business process is fault tolerant and scalable.

### Design approach 1

The first approach might be to center everything around a database where an application process would periodically scan the database tables for customers in specific states, execute necessary actions, and update the state to reflect that.

But there are various drawbacks.

1. The most obvious is that the application state machine of the customer's state quickly becomes extremely complicated.
For example, if a credit card charge attempt fails or sending an email fails due to some a downstream system unavailability, the state is in a sort of limbo.
2. Failed calls likely need to be retried for a long time, and these calls need to be throttled to not overload external resources.
3. There needs to be logic to handle corrupted customer records to avoid blocking the whole process.
4. Additionally databases have performance limitations and are not efficient for scenarios that require constant polling.

### Design approach 2

The next commonly employed approach is to use a timer service and queues.
Updates are pushed to a queue and then some other service consumes then one at a time, updating a database, and possibly pushing more messages into other downstream queues.
A timer service can be used to schedule queue polling or database actions.

While this approach has shown to scale a bit better, the programming model can become very complex very quickly and is very prone to errors, as there are usually no transactional updates between a queuing system and a database.

### Temporal design approach

The Temporal programming model aims to encapsulate and implement the entire business logic in a simple function.
Thanks to the Temporal Server, the function is stateful, and the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.

Here is an example Workflow that implements the subscription management use case in Java ([Check out all our available language SDKs](/docs/sdks-introduction)).

```java
public interface SubscriptionWorkflow {
    @WorkflowMethod
    void execute(String customerId);
}

public class SubscriptionWorkflowImpl implements SubscriptionWorkflow {

  private final SubscriptionActivities activities =
      Workflow.newActivityStub(SubscriptionActivities.class);

  @Override
  public void execute(String customerId) {
    activities.sendWelcomeEmail(customerId);
    try {
      boolean trialPeriod = true;
      while (true) {
        Workflow.sleep(Duration.ofDays(30));
        activities.chargeMonthlyFee(customerId);
        if (trialPeriod) {
          activities.sendEndOfTrialEmail(customerId);
          trialPeriod = false;
        } else {
          activities.sendMonthlyChargeEmail(customerId);
        }
      }
    } catch (CancellationException e) {
      activities.processSubscriptionCancellation(customerId);
      activities.sendSorryToSeeYouGoEmail(customerId);
    }
  }
}
```

Again, it is important to note that this code directly implements the business logic, and if any of the invoked operations (aka [Activities](/docs/concept-activities)) take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeMonthlyFee` for a day or more if the downstream processing service is down or not responding.
In the same way it is a completely normal operation to sleep for 30 days directly inside the Workflow code.

The Temporal Server has practically no scalability limits on the number of open Workflow instances, so this code can be used over and over even if your application has hundreds of millions of customers.

## FAQ

**Is there a limit to length of time a Workflows can run?**

Workflows intended to run indefinitely should be written with some care.
Temporal stores the complete event history for the entire life of a Workflow Execution.
There is a maximum limit of 50,000 events that is enforced by the Server, and you should try to avoid getting close to this limit; The Temporal Server puts out a warning at every 10,000 events.

The idiomatic way to handle indefinitely running Workflows is to use the "Continue-as-new" feature, which is available in all SDKs.
For example a reasonable cutoff point might be once a day for high volume Workflows.

The "Continue-as-new" feature completes the current Workflow execution and start a new execution with the same Workflow Id, passing it the appropriate parameters for it to continue.
This keeps the event history within limits, but continues the logic execution.

:::note

If you are using [Signals](https://docs.temporal.io/docs/concept-signals/), you should make sure to do an asynchronous drain on the Signal channel or the Signals will be lost.

:::

**How do I handle a Worker process failure/restart in my Workflow?**

You do not. The Workflow code is completely oblivious to any Worker failures or downtime.
It is even oblivious to the Temporal Server itself.
As soon as the Worker or Temporal Server has recovered the current state of the Workflow is fully restored and the execution is continued.
The only reason a Workflow might fail is due to the Workflow business code throwing an exception, not underlying infrastructure outages.

**Can a Worker handle more Workflow instances than its cache size or number of supported threads?**

Yes it can.
But the tradeoff is some added latency.

Workers are stateless, so any Workflow while in a blocked state can be safely removed from a Worker.
Later on, it can be resurrected on the same or different Worker when ever the need arises (in the form of an external event).
So a single Worker can handle millions of open Workflow executions, assuming it can handle the update rate and that a slightly higher latency is not a concern.
