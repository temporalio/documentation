---
id: php-workflows
title: Workflows in PHP
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

## Example subscription use-case

Let's look at a subscription based use-case to compare the difference between a Temporal application and other modern approaches.

The basic business steps are as follows:

1. A customer signs up for a service that has a trial period.
2. After the trial period, if the customer has not cancelled, they should be charged once per month for up to x months.
3. The customer has to be notified via email about the charges and should be able to cancel the subscription at any time.

This business logic is not very complicated and can be expressed in a few dozen lines of code.
But any practical implementation has to ensure that the business process is fault tolerant and scalable.

### Database centric design approach

The first approach might be to center everything around a database where an application process would periodically scan the database tables for customers in specific states, execute necessary actions, and update the state to reflect that.

But there are various drawbacks.

1. The most obvious is that the application state machine of the customer's state quickly becomes extremely complicated.
For example, if a credit card charge attempt fails or sending an email fails due to some a downstream system unavailability, the state is in a sort of limbo.
2. Failed calls likely need to be retried for a long time, and these calls need to be throttled to not overload external resources.
3. There needs to be logic to handle corrupted customer records to avoid blocking the whole process.
4. Additionally databases have performance and scalability limitations (eventually would require sharding) and are not efficient for scenarios that require constant polling.

### Queue system design approach

The next commonly employed approach is to use a timer service and queues.
Updates are pushed to a queue and then some other service consumes then one at a time, updating a database, and possibly pushing more messages into other downstream queues.
A timer service can be used to schedule queue polling or database actions.

While this approach has shown to scale a bit better, the programming model can become very complex very quickly and is very prone to errors, as there are usually no transactional updates between a queuing system, a timer service, and a database.

### Temporal design approach

The Temporal programming model aims to encapsulate and implement the entire business logic in a simple function or object method.
Thanks to the Temporal Server, the function/method is stateful, and the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.

Here is an example Workflow that implements the subscription management use case in Java ([Check out all our available language SDKs](/application-development)).

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

Again, it is important to note that this code directly implements the business logic, and if any of the invoked operations (aka [Activities](/docs/php-activities)) take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeMonthlyFee` for a day or more if the downstream processing service is down or not responding.
In the same way it is a completely normal operation to sleep for 30 days directly inside the Workflow code.
This is possible because infrastructure failures are not going to affect the Workflow state including threads, blocking calls, and any local or Workflow variables.

The Temporal Server has practically no scalability limits on the number of open Workflow instances, so this code can be used over and over even if your application has hundreds of millions of customers.

## Workflows have options

When you start a Workflow, you can pass along parameters that tell the Temporal Server how to handle the Workflow.
This includes the ability to set timeouts for Workflow execution, a Retry Policy, the Task Queue name, a data converter, search attributes, and Child Workflow options.

### Timeout settings

It's sometimes necessary to limit the amount of time that a specific Workflow can run.
Though, unlike [Activities](/docs/php-activities), Workflow timeouts are available primarily to protect the system from "runaway" Workflows that may end up consuming too many resources, and not intended to be used as a part of the business logic.
So, there are a few important things to consider with Workflow timeout settings:

1. When a Workflow times out, it is terminated without any notifications available to another application.
2. You should always account for possible outages, such that if your Workers go down for an hour, for example, all of your Workflows don't time out.
Start with infinite timeouts.
3. The SDKs come equipped with timers and sleep APIs that can be used directly inside of Workflows to handle business logic related timeouts.

#### Execution timeout

- **Description**: This is the maximum amount of time that a Workflow should be allowed to run including retries and any usage of the "Continue-as-new" feature.
The default is 10 years.
This is different from [Run timeout](#run-timeout).
- **Use-case**: This is most commonly used for stopping the execution of a [cron scheduled Workflow](#cron-schedule) after a certain amount of time has passed.

#### Run timeout

- **Description**: This is the maximum amount of time that a single Workflow run is restricted to.
The default is set to the same value as the [Execution timeout](#execution-timeout).
- **Use-case**: This is most commonly used to limit the execution time of a single [cron scheduled Workflow](#cron-schedule) invocation.
If this timeout is reached and there is an associated Retry Policy, the Workflow will be retried before any scheduling occurs.
If there is no Retry Policy then the Workflow will be scheduled per the [cron schedule](#cron-schedule).

#### Task timeout

- **Description**: This is the maximum amount of time that the Server will wait for the Worker to start processing a [Workflow Task](/docs/glossary/#workflow-task) after the Task has been pulled from the Task Queue.
The default value is 10 seconds.
- **Use-case**: This is primarily available to recognize whether a Worker has gone down so that the Workflow can be recovered and continue executing on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow that has a very long event history that could take longer than 10 seconds for the Worker to load.

### Retry Policy

There may be scenarios where you need to retry a Workflow's execution from the very beginning.
In this case, you can supply a Retry Policy when you start the Workflow.
However, the intention is that Workflows are written such that they would never fail on intermittent issues.
[Activities](/docs/php-activities) are made available to handle that kind of logic, and thus retrying Workflows is rare.
The exceptions tend to be [cron scheduled Workflows](#cron-schedule) or some other stateless always-running Workflows that benefit from retries.

:::note

Retry Policies are not required when starting a Workflow.
If one is not provided, a default one is generated for the Workflow.
However, if one is provided, the only required option that is set is the [initial interval](#initial-interval).

:::

#### Initial interval

- **Description**: Amount of time that must elapse before the first retry occurs.
There is no default value and one must be supplied if a Retry Policy is provided.
- **Use-case**: This is used as the base interval time for the backoff coefficient to multiply against.

#### Backoff coefficient

- **Description**: Retries can occur exponentially.
The backoff coefficient specifies how fast the retry interval is growing.
The default is backoff coefficient is 2.0.
A backoff coefficient of 1.0 means that the retry interval will always equal the [initial interval](#initial-interval).
- **Use-case**: Use this to grow the interval between retries.
By having a backoff coefficient, the first few retries happen relatively quickly to overcome intermittent failures, but subsequent retries will happen farther and farther apart to account for longer lasting outages.
Use the [maximum interval option](#maximum-interval) to prevent the coefficient from growing the retry interval too much.

#### Maximum interval

- **Description**: Specifies the maximum interval between retries.
The default is 100x that of [initial interval](#initial-interval)
- **Use-case**: This is useful for coefficients greater than 1.0 as it prevents the interval from growing exponentially infinitely.

#### Maximum attempts

- **Description**: Specifies the maximum number of attempts that can be made to execute a Workflow in the presence of failures. If this limit is exceeded, the Workflow fails without retrying again.
The default is unlimited and setting it to 0 also means unlimited.
- **Use-case**: The can be used to ensure that retries do not continue indefinitely.
However, in the majority of cases, we recommend relying on the [execution timeout](#execution-timeout) to limit the duration of the retries instead of the maximum attempts.

#### Non-retryable error reasons

- **Description**: Specifies errors that shouldn't be retried.
- **Use-case**: There may be errors that you know of that should not trigger a retry.
In this case you can specify them such that if they occur, the Workflow will not be retried.

### The Task Queue

The only required Workflow options parameter is the name of a [Task Queue](/docs/php-task-queues).
Read the [Task Queues concept page](/docs/php-task-queues) for a better overview.

Essentially a Task Queue is the mechanism by which any given Worker knows which piece of code to execute next.
A Workflow can only use one Task Queue, just as a Worker can only subscribe to a single Task Queue, and the from a developer's perspective it is named and managed as a simple string value.

### Workflow Id

You may assign a custom Workflow Id to a Workflow.
This Id is meant for business level identification such as a customer Id or an order Id.
The Temporal Server enforces the uniqueness of the Id, within a [Namespace](/docs/server-namespaces) based on the Workflow Id re-use policy.

Any attempt to start a Workflow that has the same Id of a Workflow with a re-use policy that does not allow it, is going to fail with a "Workflow execution already started" error.
Note that, it is not possible to have two open Workflows with the same Workflow Id, regardless of the re-use policy.
The re-use policy applies only to closed Workflows.

:::note

A Workflow is uniquely identified by its Namespace, Workflow Id, and Run Id.

:::

#### Allow duplicate failed only policy

- **Description**: Specifying this means that the Workflow is allowed to start only if a previously executed Workflow with the same Id has failed.
- **Use case**: Use this policy when there is a need to re-execute a failed Workflow and guarantee that the successfully completed Workflow will not be re-executed.

#### Allow duplicate policy

- **Description**: Specifying this means that the Workflow is allowed to start independently of a previous Workflow with the same Id regardless of the its completion status.
This is the default policy, if one is not specified.
- **Use case**: Use this when it is OK to execute a Workflow with the same Workflow Id again.

#### Reject duplicate policy

- **Description**: Specifying this means that no other Workflow is allowed to start using the same Workflow Id at all.
- **Use case**: Use this when there can only be one Workflow execution per Workflow Id ever within a Namespace retention period.

### Cron schedule

When you specify a cron schedule when you start the Workflow, the Temporal Server will treat the Workflow as a cron job.
It is that simple to ensure your Workflow runs on a specific schedule.

The Server only schedules the next run after the current run has completed, failed, or timed out.
If a Retry Policy is also supplied, and the Workflow failed or timeout, the Workflow will be retried based on the Retry Policy. While the Workflow is retrying the Server will not schedule the next run.
If the next scheduled run is due to occur while the Workflow is still running (or retrying), then the Server will skip that scheduled run.
A cron Workflow will not stop until it is terminated or cancelled.

:::note

Scheduling is based on UTC time.

:::

### Search attributes

When you start a Workflow you can configure it with search attributes that can be used in complex Workflow visibility search queries.
Read the [search attributes guide](/docs/server-workflow-search) to learn how to enable search attributes in Workflows.

### Memos

You can also attach a non-indexed bit of information to a Workflow, known as a memo, that is visible in Workflow search results.

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

## FAQ

**Is there a limit to length of time a Workflows can run?**

Workflows intended to run indefinitely should be written with some care.
Temporal stores the complete event history for the entire life of a Workflow Execution.
There is a maximum limit of 50,000 events that is enforced by the Server, and you should try to avoid getting close to this limit; The Temporal Server puts out a warning at every 10,000 events.

The idiomatic way to handle indefinitely running Workflows is to use the "Continue-as-new" feature, which is available in all SDKs.
For example a reasonable cutoff point might be once a day for high volume Workflows.

The "Continue-as-new" feature completes the current Workflow execution and automatically starts a new execution with the same Workflow Id, but different run Id, passing it the appropriate parameters for it to continue.
This keeps the event history within limits, but continues the logic execution.

:::note

If you are using [Signals](/docs/php-signals) with the Go SDK, you should make sure to do an asynchronous drain on the Signal channel or the Signals will be lost.

:::

**How do I handle a Worker process failure/restart in my Workflow?**

You do not. The Workflow code is completely oblivious to any Worker failures or downtime.
As soon as the Worker or Temporal Server has recovered the current state of the Workflow is fully restored and the execution is continued.
The only reason a Workflow might fail is due to the Workflow business code throwing an exception, not underlying infrastructure outages.

**Can a Worker handle more Workflow instances than its cache size or number of supported threads?**

Yes it can.
But the tradeoff is some added latency.

Workers are stateless, so any Workflow while in a blocked state can be safely removed from a Worker.
Later on, it can be resurrected on the same or different Worker when ever the need arises (in the form of an external event).
So a single Worker can handle millions of open Workflow executions, assuming it can handle the update rate and that a slightly higher latency is not a concern.
