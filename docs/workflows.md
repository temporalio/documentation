---
id: workflows
title: Workflows
sidebar_label: Workflows
description: Temporal core abstraction is a fault-oblivious stateful Workflow. The state of the Workflow code, including local variables and threads it creates, is immune to process and Temporal service failures.
---

import { ResponsivePlayer } from '../src/components'

## Overview

Temporal core abstraction is a **fault-oblivious stateful Workflow**. The state of the Workflow code, including local variables and threads it creates, is immune to process and Temporal service failures.
This is a very powerful concept as it encapsulates state, processing threads, durable timers and event handlers.

## Example

Let's look at a use case. A customer signs up for an application with a trial period. After the period, if the customer has not cancelled, he should be charged once a month for the renewal. The customer has to be notified by email about the charges and should be able to cancel the subscription at any time.

The business logic of this use case is not very complicated and can be expressed in a few dozen lines of code. But any practical implementation has to ensure that the business process is fault tolerant and scalable. There are various ways to approach the design of such a system.

One approach is to center it around a database. An application process would periodically scan database tables for customers in specific states, execute necessary actions, and update the state to reflect that. While feasible, this approach has various drawbacks. The most obvious is that the state machine of the customer state quickly becomes extremely complicated. For example, charging a credit card or sending emails can fail due to a downstream system unavailability. The failed calls might need to be retried for a long time, ideally using an exponential retry policy. These calls should be throttled to not overload external systems. There should be support for poison pills to avoid blocking the whole process if a single customer record cannot be processed for whatever reason. The database-based approach also usually has performance problems. Databases are not efficient for scenarios that require constant polling for records in a specific state.

Another commonly employed approach is to use a timer service and queues. Any update is pushed to a queue and then a worker that consumes from it updates a database and possibly pushes more messages in downstream queues. For operations that require scheduling, an external timer service can be used. This approach usually scales much better because a database is not constantly polled for changes. But it makes the programming model more complex and error prone as usually there is no transactional update between a queuing system and a database.

With Temporal, the entire logic can be encapsulated in a simple durable function that directly implements the business logic. Because the function is stateful, the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.

Here is an example Workflow that implements the subscription management use case. It is in Java, but Go is also supported. The Python and .NET libraries are under active development.

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

Again, note that this code directly implements the business logic. If any of the invoked operations (aka Activities) takes a long time, the code is not going to change. It is okay to block on `chargeMonthlyFee` for a day if the downstream processing service is down that long. The same way that blocking sleep for 30 days is a normal operation inside the Workflow code.

Temporal has practically no scalability limits on the number of open Workflow instances. So even if your site has hundreds of millions of consumers, the above code is not going to change.

The commonly asked question by developers that learn Temporal is "How do I handle Workflow worker process failure/restart in my Workflow"? The answer is that you do not. **The Workflow code is completely oblivious to any failures and downtime of workers or even the Temporal service itself**. As soon as they are recovered and the Workflow needs to handle some event, like timer or an Activity completion, the current state of the Workflow is fully restored and the execution is continued. The only reason for a Workflow failure is the Workflow business code throwing an exception, not underlying infrastructure outages.

Another commonly asked question is whether a worker can handle more Workflow instances than its cache size or number of threads it can support. The answer is that a Workflow, when in a blocked state, can be safely removed from a worker.
Later it can be resurrected on a different or the same worker when the need (in the form of an external event) arises. So a single worker can handle millions of open Workflow executions, assuming it can handle the update rate.

## State Recovery and Determinism

The Workflow state recovery utilizes event sourcing which puts a few restrictions on how the code is written. The main restriction is that the Workflow code must be deterministic which means that it must produce exactly the same result if executed multiple times. This rules out any external API calls from the Workflow code as external calls can fail intermittently or change its output any time. That is why all communication with the external world should happen through Activities. For the same reason, Workflow code must use Temporal APIs to get current time, sleep, and create new threads.

To understand the Temporal execution model as well as the recovery mechanism, watch the following webcast. The animation covering recovery starts at 15:50.

<ResponsivePlayer url='https://www.youtube.com/watch?v=qce_AqCkFys' />

## Id Uniqueness

Workflow Id is assigned by a client when starting a Workflow. It is usually a business level Id like customer Id or order Id.

Temporal guarantees that there could be only one Workflow (across all Workflow types) with a given Id open per [namespace](/docs/glossary/#namespace) at any time. An attempt to start a Workflow with the same Id is going to fail with `WorkflowExecutionAlreadyStarted` error.

An attempt to start a Workflow if there is a completed Workflow with the same Id depends on a `WorkflowIdReusePolicy` option:

- `AllowDuplicateFailedOnly` means that it is allowed to start a Workflow only if a previously executed Workflow with the same Id failed.
- `AllowDuplicate` means that it is allowed to start independently of the previous Workflow completion status.
- `RejectDuplicate` means that it is not allowed to start a Workflow execution using the same Workflow Id at all.

The default is `AllowDuplicateFailedOnly`.

To distinguish multiple runs of a Workflow with the same Workflow Id, Temporal identifies a Workflow with two Ids: `Workflow Id` and `Run Id`. `Run Id` is a service-assigned UUID. To be precise, any Workflow is uniquely identified by a triple: `Namespace`, `Workflow Id` and `Run Id`.

## Child Workflow

A Workflow can execute other Workflows as `child Workflows`. A child Workflow completion or failure is reported to its parent.

Some reasons to use child Workflows are:

- A child Workflow can be hosted by a separate set of workers which don't contain the parent Workflow code. So it would act as a separate service that can be invoked from multiple other Workflows.
- A single Workflow has a limited size. For example, it cannot execute 100k Activities. Child Workflows can be used to partition the problem into smaller chunks. One parent with 1000 children each executing 1000 Activities is 1 million executed Activities.
- A child Workflow can be used to manage some resource using its Id to guarantee uniqueness. For example, a Workflow that manages host upgrades can have a child Workflow per host (host name being a Workflow Id) and use them to ensure that all operations on the host are serialized.
- A child Workflow can be used to execute some periodic logic without blowing up the parent history size. When a parent starts a child, it executes periodic logic calling that continues as many times as needed, then completes. From the parent point if view, it is just a single child Workflow invocation.

The main limitation of a child Workflow versus collocating all the application logic in a single Workflow is lack of the shared state. Parent and child can communicate only through asynchronous signals. But if there is a tight coupling between them, it might be simpler to use a single Workflow and just rely on a shared object state.

We recommended starting from a single Workflow implementation if your problem has bounded size in terms of number of executed Activities and processed signals. It is more straightforward than multiple asynchronously communicating Workflows.

## Workflow Timeouts

It's often necessary to limit the amount of time a specific Workflow can be running. To support this, the following three parameters can be provided to Workflow options:

- `WorkflowExecutionTimeout` maximum time a Workflow should be allowed to run including retries and continue as new. Use `WorkflowRunTimeout` to limit execution time of a single run.
- `WorkflowRunTimeout` maximum time a single Workflow run should be allowed.
- `WorkflowTaskTimeout` timeout for processing a Workflow task starting from the point when a worker pulled the task. If a decision task is lost, it is retried after this timeout.

## Workflow Retries

Workflow code is unaffected by infrastructure level downtime and failures. But it still can fail due to business logic level failures. For example, an Activity can fail due to exceeding the retry interval and the error is not handled by application code, or the Workflow code having a bug.

Some Workflows require a guarantee that they keep running even in presence of such failures. To support such use cases, an optional exponential _retry policy_ can be specified when starting a Workflow. When it is specified, a Workflow failure restarts a Workflow from the beginning after the calculated retry interval. Following are the retry policy parameters:

- `InitialInterval` is a delay before the first retry.
- `BackoffCoefficient`. Retry policies are exponential. The coefficient specifies how fast the retry interval is growing. The coefficient of 1 means that the retry interval is always equal to the `InitialInterval`.
- `MaximumInterval` specifies the maximum interval between retries. Useful for coefficients of more than 1.
- `MaximumAttempts` specifies how many times to attempt to execute a Workflow in the presence of failures. If this limit is exceeded, the Workflow fails without retry.
- `NonRetryableErrorReasons` allows to specify errors that shouldn't be retried. For example, retrying invalid arguments error doesn't make sense in some scenarios.
