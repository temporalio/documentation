---
tags:
  - stresstest
  - stabilization
  - deepdive
  - temporal
posted_on_: 2020-09-10T20:09:50Z
slug: temporal-deep-dive-stress-testing
title: Deep dive into Temporal stress testing
author: Manu Srivastava
author_title: Engineer
author_image_url: https://raw.githubusercontent.com/temporalio/team/master/assets/manu.png
release_version: v0.29.0
---

<!--truncate-->

# Introduction

From a software development standpoint, Temporal is in the unique position of acting as both a database and a service orchestrator. This duality means that complex stress testing is required to validate the systems ability to sustain performance under high loads. Therefore, a huge part of our stabilization effort involves running high volume stress tests and exercising Temporal in a wide range of conditions. The effort has proved fruitful, as we were able to identify and fix many issues that went unnoticed during small scale deployments. In this post we cover two of the scenarios running against Temporal, provide a high level look at our strategy, and highlight some of the issues we have discovered as a result of testing.

# The "rabbit" scenario

![Rabbits](/cms/rabbit.png)

The rabbit scenario aims to generate an exponential burst of load across an entire Temporal cluster. We start with a single Workflow which then spawns Workflow children, each of which spawns more Workflow children, and so on. In addition to load generation, this scenario validates the functionality of various communication mechanisms used between parent Workflows and their Workflow children.

## Terminology

**Branch Workflow:** A Workflow whose sole purpose is to spawn child Workflows and then wait for all of them to complete before itself completing.

**Root branch Workflow:** The parent of the Workflow tree from which all descendants are either directly or indirectly spawned. This is the red node depicted in the diagram below. the root branch Workflow only completes when all its direct children have completed.

**Leaf Workflows:** These represent the Workflows that do not have any children. Unlike root/middle Workflows, whose sole purpose is to start and wait for child Workflows, the leaf Workflow represents arbitrary logic that we want to test at scale (e.g. maybe a few long-running Activities, waiting for a timer, running a side-effect, etc). These are the blue nodes depicted in the diagram below.

**Middle branch Workflows:** Any Workflow that is not a leaf Workflow or a root branch Workflow. A middle branch Workflow only completes when all its direct children have completed.

**Depth:** The literal depth of the Workflow tree which is the number of generations that are spawned. By increasing depth, we are able to stress test the Temporal cluster by spawning an exponential number of Workflows. Temporal shards Workflow executions across its nodes by Workflow ID, so this is an excellent way to generate a large burst of load across an entire cluster.

**Fan-out:** The number of child Workflows that each root and middle Workflow spawns. It can also be thought of as the branching factor of the tree. By scaling fan-out we are able to stress test the ability of Temporal to handle a high number of events for a single Workflow execution. _Disclaimer: Temporal’s recommended unit of scale is a Workflow. This means that you are better off spreading load across multiple Workflow executions rather than trying to cram a bunch of operations into a single, large Workflow execution. Nevertheless, a high fan-out validates a Workflow that conducts a lot of work._

## Diagram

The following is an example "rabbit" Workflow tree with a **fan-out** of 2 and a **depth** of 2.

![](/cms/rabbit_diagram.jpg)

## Test details

### Test 1: spawn and wait for completion

In this test we simply spawn the Workflows and wait for them to complete.

We are looking for following to remain true:

1. Our root Workflow only completes when its children complete.
2. Similarly our root Workflow’s children only complete when _their_ children complete. And so on.
3. By induction, this means that if a root Workflow is complete, we expect all root Workflow’s descendants to also be complete.

In this test, our leaf Workflow is a simple Workflow that completes relatively quickly (i.e. it executes a few Activities sequentially).

Our test performs additional verification by scanning through the entire Workflow tree once the root Workflow is complete and verifies that all descendants have also reported as complete. While technically unnecessary, this validates that the induction behavior we described above is working properly in Temporal.

_In the image below, the root Workflow will complete once all its children are completed, and so on:_

![](/cms/rabbit_diagram_complete.jpg)

### Test 2: spawn and terminate

In this test we spawn the Workflows and then wait for all of the leaf Workflows to report that they have started executing. Unlike the first test, the leaf Workflows block on a timer that is going to fire 1000 years into the future. In other words, we don't intend for the leaf Workflows to ever actually complete.

Once all the leaf Workflows are confirmed to be running, we call `Terminate` on the root Workflow.

We then look for the following behavior:

1. The root Workflow's execution is halted and its status is changed to terminated.
2. Temporal then propagates the`Terminate` command to all of the root Workflow's children.
3. The `Terminate` commands are propagated recursively all the way to the leaf Nodes.
4. Termination halts the execution of a Workflow right away. There is no way for a user's Workflow logic to "ignore" or react to a `Terminate` event.

Our test performs additional verification by waiting for all Workflows in the Workflow tree to have a "terminated" status.

_In the image below, terminating the Root Workflow will cause Temporal to propagate the terminate to all children by default:_

![](/cms/rabbit_diagram_terminate.jpg)

### Test 3: spawn and cancel

In this test we spawn the Workflows and wait for all the leaf Workflows to start executing. Just as in the previous test, the leaf Workflows block on a 1000 year timer.

Once all the leaf Workflows have been spawned, we call `Cancel` on the root Workflow and wait for it to report as cancelled. Note that repeated attempts to `Cancel` the same Workflow will result in an error message indicating that a `Cancel` request is already in progress, even though the Workflow status still shows as Running.

The expected behavior of `Cancel` is different than that of `Terminate` and we look for the following to remain true:

1. The parent Workflow forwards the cancellation **request** to each of its child Workflows.
2. The parent Workflow then waits for each child to explicitly acknowledge that they themselves have been cancelled.
3. The `Cancel` request propagates recursively, all the way down to each leaf Workflow. The leaf Workflow cancels the 1000 year timer it is waiting for and then reports itself as cancelled.
4. When a Workflow is cancelled it will still report as "Running" until the propagated cancellation is complete. A user's Workflow logic can react to a `Cancel` event and chose to either completely ignore it, or perform cleanup actions before returning back.
5. Once the leaf Workflow is cancelled, the cancelled status is propagated back to the leaf’s parent.
6. Once all of a leaf's parent’s children have reported as cancelled, then the leaf’s parent will respond to _its_ parent. And so on.
7. Eventually the root Workflow receives confirmation that all its children (and therefore, of its descendants) are cancelled.

Our test performs additional verification by validating that all Workflows in the Workflow tree have a cancelled status once the root Workflow reports itself as cancelled. While technically unnecessary, this validates the expected behavior.

_In the image below, a cancellation has been sent to the Root Workflow. The cancellation is currently in the middle of propagating. Once all of the children have transitioned to the cancelled status, the parent then transitions to cancelled as well._

![](/cms/rabbit_diagram_cancelled.jpg)

### Note

When creating a child Workflow, you can define a `ParentClosePolicy` that terminates or cancels the Workflow if the child's parent stops execution. You can also have the `ParentClosePolicy` ignore the execution status of the parent, meaning you can opt out of propagating terminates / cancels on a per-child basis. For Test 3 (spawn and cancel), we explicitly set the `ParentClosePolicy` policy to cancel for all child Workflows

## Bug discovery

- [Parent → child Workflow cancellation was broken in the Go SDK](https://github.com/temporalio/go-sdk/commit/f3ddb31cb3624cd0182c670d850d5db0ee748142): There was a race condition where the parent Workflow would “miss” the cancellation response from the child Workflow and would therefore be stuck waiting for the child to be cancelled even though the child was already cancelled.
- [Nil pointer exception when the Temporal Worker processes cancels / terminates](https://github.com/temporalio/temporal/commit/e807dca07b0017e912630849dc84812dfc703d6d): For Workflows with a large number of children (i.e. a large fan-out), `Terminate` and `Cancel` were not propagating to the parent.
- [Parent → child cancellation / termination is not propagated if the child has “continued-as-new” at least once](https://github.com/temporalio/temporal/pull/696): If a parent Workflow spawned a child Workflow, and that child Workflow has continued-as-new at least once, then any `Terminate` or `Cancel` request sent to the parent would not be sent to that child.

# The "reactor" scenario

![](/cms/reactor.png)

The reactor scenario consists of a large number of long-running Workflows that constantly process external Workflow signals and execute complex business logic. For the purpose of this blog post, imagine that each long-running Workflow instance represents a customer on your platform. This Workflow Instance runs complex business logic each time the customer submits a purchase order (each purchase order is represented as a signal).

While the "rabbit" scenario was focused on generating a large burst of load on the cluster, the "reactor" scenario's goal is to generate a sustained and consistent level of load across the entire cluster. This scenario exercises a wide-variety of Temporal features that are commonly used in the field.

## Terminology

[**Signals**](https://docs.temporal.io/concepts/what-is-a-signal): A Workflow signal provides a mechanism for an external process to send arbitrary data to a Workflow. For example, if a customer submits a purchase order on your website, your backend architecture can construct a "purchase order event" and send it to the Workflow instance associated with that customer. Workflow logic can block on the receipt of a signal (or for a specific amount of time to elapse).

[**Signal with start**](https://docs.temporal.io/go/how-to-use-signals-in-go/#signal-with-start) **-** A client can send a signal so that it routes it to a specified Workflow ID, or if no running Workflow exists with that ID, then creates a new Workflow Instance with that ID.

**Large replay history -** You will notice that we described our Workflow as "long-running." Long-running means that we don't anticipate the Workflow "completing" execution. As a Workflow processes signals and executes Activities, its replay history continuously grows. The longer the replay history, the longer it takes for a Workflow to resume execution in the event the worker that was hosting it either crashes or encounters memory pressure. The Temporal Server has configurable limits on both the number of events and overall storage size of the replay history. Any workflow that exceeds this history is automatically terminated.

[**Continue as new**](/go/workflows#large-event-histories) - In order to avoid the performance and/or termination issues described in the previous section, our "long-running" Workflow periodically completes with a "continue as new" error. A "continue as new" error enables you to start a new run of the same Workflow ID with brand new Workflow inputs, which means that the size of the history of your new instance starts growing from zero again.

**Workflow timers -** Timers provide a mechanism to tell your Workflow that it should wait for a specific duration of time before proceeding. For example, maybe you introduce a 10-minute artificial delay between sending a purchase order confirmation to the warehouse and then sending a purchase order confirmation to the customer. Or perhaps you are willing to wait for up to 2 days for a purchase order delivery receipt signal to arrive. If the signal arrives within two days, you take no action. If the signal does not arrive within two days, you automatically open a customer support ticket.

## Diagram

A logical representation of what a long-running Customer Order Workflow instance looks like.

![](/cms/reactor_diagram.jpg)

Note that there are three activities:

1. Submit order to warehouse.
2. Send confirmation email to customer.
3. Open customer support resolution signal.

And there are three different types of signals:

1. Wait for purchase order.
2. Wait for customer support resolution.
3. Wait for order confirmation.

This represents Workflow logic that is waiting for an external component to send a signal to the instance.

The "wait for order confirmation" logic either waits for a signal to arrive or 10 minutes to elapse after which it will follow the appropriate path in the Workflow.

## Test details

We send a large number of purchase order signals to random Workflow instances using the [`SignalWithStart`](https://docs.temporal.io/go/how-to-use-signals-in-go/#signal-with-start) functionality. These signals are sent at a constant rate over a large period of time (on the order of hours or days). Each purchase order signal is sent to a randomly picked Workflow ID from 1 to N. For example, if we were to send 5 signals to 3 workflow instances (Workflow IDs: 1, 2, 3) at random, then those 5 signals could be sent to Workflows IDs in the following order: 2, 2, 1, 2, 3

A common stress test scenario we run is sending 1,000,000 signals to 10,000 Workflow instances at a constant rate over a period of 10 hours.

The test validation procedure is as follows:

1. Our "send confirmation email to customer" and the "open customer support ticket" activities don't actually send emails or open customer support tickets. Instead, their implementations send a signal to a designated stats aggregation Workflow.
2. For every signal received by the "stats-aggregation" Workflow, it increments an internal in-memory counter. Note that the "long-replay" history restriction also applies to this Workflow.
3. Once the stats-aggregation Workflow has processed 3,000 events, to avoid a large replay history, the Workflow processes any remaining pending signals and then continues as new.
4. As part of the "continue as new" logic, the stats aggregation Workflow passes in the latest value of the counter as an input to the next Workflow execution. Counter increments can start from this latest value instead of from zero. This is how one can build an increasing counter across multiple runs of the same Workflow execution.
5. We can both expose and query the value of this counter using either the Admin CLI or the Temporal SDK through the use of the [synchronous queries feature.](https://docs.temporal.io/concepts/queries/#synchronous-query)
6. For every purchase order signal sent, we expect the stats aggregation counter to be incremented by 1. (Note that there are considerations around duplicate increments that we will not cover in today's post.)
7. Once our test logic detects that the counter has reached the specified threshold (1,000,000 in the case of our common stress test scenario), the test is considered to have successfully passed.

One quick caveat: If you recall from the previous scenario, a Workflow is considered to be a unit of scale. If one were to have 10,000 Workflows constantly sending signals to a single stats aggregation Workflow, this would result in lots of timeouts when trying to interact with that stats aggregation Workflow. To work around this, in our common test scenario, we create 500 stats aggregation Workflows. We then have the 10,000 Workflows increment the counters of any one of those 500 at random. In other words, rather than having a single counter that all 10,000 Workflows increment, we have 500 counters that are collectively incremented by the 10,000 Workflows. The test is considered successful when the sum of all 500 counters is equal to 1,000,000.

The following picture shows an example of how the test driver periodically queries all the stats aggregation Workflows for counter values until the sum of all the counters hits the desired threshold.

![](/cms/reactor_diagram_counters.jpg)

## Bug Discovery

- [Workflow history corruption issue (missing contiguous event)](https://github.com/temporalio/temporal/issues/584): This prevents a Workflow from making any additional progress. We are investigating the root cause for this.
- [Workflow reset broken if history not contiguous](https://github.com/temporalio/temporal/issues/585): We discovered this when trying to recover the Workflow that suffered the issue described above to the last contiguous point in the replay history.
- [Worker reports validation error on processing of transient decision](https://github.com/temporalio/go-sdk/issues): Occurs when one schedules and then immediately cancels a Workflow timer. This is still a work in progress.
- [“tctl wf desc” fails if a pending activity is running that has reported heartbeat data](https://github.com/temporalio/temporal/issues/516): This was a critical bug preventing visibility into long-running activities that periodically send Heartbeats.
- Workflow history grows forever when trying to continue as new with a steady supply of signals coming in: We identified a bug which attempts to continue-as-new a Workflow with a high-rate of incoming signals will result in the Workflow history continuously growing as opposed to properly continuing as new. We have filed a backlog item to fix this.
- [Simultaneous SignalWithStarts for the Same WF ID randomly returns an Internal Server Error](https://github.com/temporalio/temporal/pull/719) - Occurred when multiple processes tried to send a [SignalWithStart](https://docs.temporal.io/go/how-to-use-signals-in-go/#signal-with-start) for the same Workflow ID at the same time. [SignalWithStart](https://docs.temporal.io/go/how-to-use-signals-in-go/#signal-with-start) is supposed to either start the Workflow if it is not running or signal an already existing one. Instead, it was randomly returning a "Workflow execution already started" internal server error, which is antithetical to the purpose of the API.

# Ongoing work

**Java SDK testing -** All of the stress tests authored up to this point have been written using the Go SDK. There is an ongoing effort to port all of these test scenarios on top of the Java SDK as well. We expect these tests to help us harden the Java SDK and further prove the stability of the Temporal product.

**Failure testing -** These same stress tests we are authoring can be run against a cluster that is hooked up to fault injection. We’ve written our stress Workflows in a way that we expect them to successfully finish, even in the face of consistent Temporal outages. There is an ongoing effort to create automated pipelines that validate successful test execution in such failure scenarios.

You can expect future blog posts detailing our results and findings for each of the above two efforts as they progress. You can also expect us to have future posts about additional stress tests we are implementing.
