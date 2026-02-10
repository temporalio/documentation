---
id: managing-aps-limits
title: Managing Actions per Second (APS) limits in Temporal Cloud
sidebar_label: Managing APS limits
description: Control how limits are assigned to a Namespace with Capacity Modes
slug: /best-practices/managing-aps-limits
toc_max_heading_level: 4
keywords:
  - best practices
  - operations
  - temporal cloud
  - namespaces
  - capacity modes
  - on-demand capacity 
  - provisioned capacity
  - actions per second
  - throttling
tags:
  - Best Practices
  - Capacity Modes
  - On-Demand Capacity
  - Provisioned Capacity
  - TRUs
---

If you're running Workflows on Temporal Cloud, you've probably noticed that each Namespace comes with an Actions Per Second (APS) limit. 
But what exactly does that mean, and why does it matter?

In Temporal, an "action" is any operation that modifies Workflow state or interacts with the Temporal service. 
Your Namespace's APS limit controls how many of these operations can happen per second across all Workflows within that Namespace.
When the APS limit is reached, Temporal begins to throttle requests. 
Depending on the business priority of the Workflow, this may be fine or it may have significant impact. 

The difficulty is that APS consumption isn't always intuitive. 
A single Workflow Execution generates multiple actions from the moment it starts, and use cases that fit nicely within APS limits at small scale can exhaust those limits as they grow. 
Many customers are surprised to find they're hitting APS constraints well before they expected to based on their Workflow count alone.

This guide will help you understand why customers hit APS limits, how to design Workflows that use actions efficiently, and what to do when you're approaching capacity.
When design changes aren't enough, Temporal Cloud offers [Provisioned Capacity Mode](#provisioned-capacity-and-trus) that let you reserve additional capacity using Temporal Resource Units (TRUs) for spiky or unpredictable workloads.

Whether you're just getting started with Temporal Cloud or optimizing an existing deployment, managing APS effectively is key to building scalable, reliable applications.

## Understanding Actions in Temporal

Before we dive into why customers hit APS limits, let's talk about what actions are.

### What Counts as an Action?

In Temporal, actions are the fundamental operations that drive your Workflows forward. 
Here's an overview of what counts, with [the full list in our documentation](/cloud/actions).

- Workflows: Starting, completing, resetting. Also starting Child Workflows, as well as Schedules and Timers
- Activities: Starting, retrying, Heartbeating
- Signals, Updates, and Queries 

Actions that count toward an APS limit are, with a few exemptions, the same as actions that are billable. 
The key insight here is that nearly everything that happens in Temporal--state changes, decision points, interactions--is counted as an action.

### The Action Multiplier Effect

What this means is that when you start a single Workflow, you're not performing just one action as it relates to APS because a Workflow isn’t a single atomic operation, it’s a series of events that Temporal orchestrates. 
Each Activity at the start of the Workflow is an Action, so there can be a burst of Activities at the start of a Workflow. 
Additionally, there are often business reasons to start multiple Workflows at the same time.

These can all contribute to the multiplier effect. 

### The Effect of Rate Limiting

In Temporal Cloud, the effect of rate limiting is increased latency, not lost work. 
Workers [might take longer](/cloud/service-availability#throughput) to complete Workflows. 

## Common Reasons Customers Hit APS Limits

Now that you understand how actions are defined and how they count toward APS limits, let's look at the patterns that most commonly push customers into APS constraints. 

### Bursty Traffic

Most businesses don't operate at constant velocity—they have rhythms, cycles, and spikes. 
These patterns can create APS challenges because Temporal Cloud enforces limits at the per-second level.

Common bursty patterns include:

- Calendar-driven spikes: Month-end financial close processes, quarterly reporting Workflows, payroll that runs on the 1st and 15th, scheduled batch jobs that kick off at midnight. These create predictable but intense load concentrations.
- Event-driven surges: Product launches, marketing campaigns, flash sales, breaking news, or seasonal events like Black Friday. 
- Recovery scenarios: When a downstream dependency fails and then recovers, you often get a thundering herd effect—hundreds or thousands of Workflows that were waiting all suddenly resume execution simultaneously, creating an artificial spike in APS consumption.
- Geographic/business hours concentration: Global applications often see load follow the sun, with peak activity during business hours in each region. If your business concentrates in specific markets, you'll see daily peaks rather than even 24/7 distribution.
- Retry Storms: when a large number of Workflows get stuck on an Activity, and that Activity is failing, if retry delay is very short, this can cause a spike in Actions.
- Timer Storms: a large number of Workflows all set a Timer for the exact same time--triggering a spike as those Timers fire and then Activities run, causing a lot of actions all at the same time.

These types of processes can result in your Namespace averaging 200 APS over a day, but spiking to 800 APS or more during your peak hour/day/event/etc. 

#### How to Mitigate

You can’t change the patterns of how customers interact with your systems, but there are some adjustments you can make to your Workflows to make traffic patterns more consistent, especially for use cases where immediate response isn’t necessary. 

These adjustments include:
- Implement application-level queuing or rate limiting to smooth out predictable spikes.
- For scheduled batch operations, stagger start times rather than triggering everything at once--implement jitter in your high-volume [Schedules](/schedule#spec).
- Implement jitter when starting Workflows, such as with [Start Delay](/workflow-execution/timers-delays#delay-workflow-execution).
- Accept rate limiting
- [Provisioned Capacity](/cloud/capacity-modes#provisioned-capacity)

### Cascading Workflows and Fan-Out Patterns

Decomposing complex processes into parent and Child Workflows (or with Nexus) is a common and often appropriate pattern, but the APS costs multiply dramatically with depth and fan-out.

Consider an order fulfillment Workflow that spawns Child Workflows for payment processing, inventory management, shipping, and customer notifications. 
Each Child Workflow goes through its full action lifecycle (start, tasks, activities, completion), and all of those actions count toward the APS limits on your Namespace. 

This pattern appears frequently in:
- Batch processing: A parent workflow processes a file with 1,000 records, spawning a Child Workflow for each record. Batch processing is also often bursty whenever the batch begins.
- Map-reduce patterns: Data processing Workflows that fan out to process partitions in parallel, then aggregate results.

This challenge additionally compounds when you have multiple levels of nesting--parent Workflows that create children, which create their own children. 

#### How to Mitigate

- Evaluate whether Child Workflows are necessary--other options include Activities or Workflows in another Namespace (via Nexus)
- When you do use Child Workflows, limit fan-out size--design a Child Workflow to process its work in batches rather than one Child per work item. [This sample application](https://github.com/temporalio/samples-java/tree/main/core/src/main/java/io/temporal/samples/batch/slidingwindow) shows more detail.
- Consider flattening deeply nested hierarchies into shallower structures. 

### Human-in-the-Loop Processes at Scale

Workflows that incorporate human decision-making--approvals, reviews, manual data entry, quality checks--tend to be long-running and interaction-intensive, which creates sustained APS load.

These Workflows can involve Queries from UIs to display current state and pending tasks.

At small scale, this is manageable. But when you're running thousands of them at the same time--like a content moderation queue with pending reviews, or a loan approval system processing applications, or a support ticket system managing thousands of open cases--the cumulative APS load from all of those long-running Workflows adds up.

#### How to Mitigate

- Avoid polling patterns where UIs constantly query Workflow state. Instead, push state changes to a database that UIs can read. 

### Real-Time SLAs and Deadline Management

Businesses with strict service level agreements often implement active monitoring and escalation in their Workflows. 
This is generally accomplished by setting Timers every [x] minutes to determine if an SLA deadline is approaching, allowing the Workflow to trigger escalations or alerts. 

Each of these Timers/monitoring actions affect APS. 
When you have thousands of in-flight Workflows all actively monitoring their own SLAs, the background load becomes significant.
You're consuming substantial APS capacity even when Workflows aren't doing their primary work.

#### How to Mitigate

- Use longer monitoring intervals where possible. For example, check SLAs every 30 minutes rather than every 1 minute.
- Where possible, consolidate Timers. Rather than 10 Timers that check 10 tasks, have 1 Timer and then check those 10 tasks.
- Where possible, have an external system signal your Workflow rather than using short-lived Timers to poll.
- For retries, use exponential backoff with reasonable initial intervals.

## Additional Design Patterns
There are some design patterns that can lead to high APS that are consistent across many different types of business use cases. 

### Many Small Activities

Consider two approaches to processing 1,000 records:

- Approach A: Create a Workflow that spawns 1,000 separate activities, one per record.
- Approach B: Create a Workflow that spawns 10 activities, each processing 100 records in a batch.

Approach B will clearly result in less APS. 
This is a simple example, but this pattern shows up everywhere: processing individual transactions versus batches, sending individual notifications versus bulk operations, or making separate API calls versus batch endpoints. 
Each separate Activity adds Action overhead.

#### How to Mitigate

- Consider if you can combine multiple external calls within a single Activity.
- If processing a large amount of data, process it in chunks.
- See [How Many Activities should I use in my Temporal Workflow?](https://temporal.io/blog/how-many-activities-should-i-use-in-my-temporal-workflow) for more information.

### Multiple Use Cases in One Namespace
Often when starting with Temporal, the first use case is implemented in a single Namespace, generally one per logical environment. 
When the second Temporal use case is implemented, it runs in the same Namespace, the same for the third, fourth, etc. 

An APS limit is set per Namespace, so multiple use cases with multiple traffic patterns in the same Namespace can exhaust this limit quickly.

#### How to Mitigate

Plan for a set of Namespaces (one per environment) per use case. See [Managing a Namespace](/best-practices/managing-namespace) for more details.

## Provisioned Capacity and TRUs

The strategies above help you design Workflows that use actions efficiently.
But sometimes you need more capacity than the on-demand model provides, especially for spiky or unpredictable workloads.

Temporal Cloud offers two [Capacity Modes](/cloud/capacity-modes):

- **On-Demand mode** (default): Your Namespace automatically scales based on your trailing 7-day usage. This works well for steady, predictable workloads.
- **Provisioned mode**: You reserve capacity by adding Temporal Resource Units (TRUs), giving you guaranteed headroom for traffic spikes.

See [Capacity Modes](/cloud/capacity-modes) for complete details on TRUs, available increments, and how to manage capacity via UI, CLI, or API.

### Choosing the Right Approach

Use Provisioned capacity when the on-demand model can't respond quickly enough:

| Scenario | Pattern | Recommendation |
|----------|---------|----------------|
| **Planned spikes** | Promotions, holiday traffic, product launches | Pre-provision TRUs before the event starts |
| **Unplanned spikes** | Sudden traffic surges, viral events | React instantly via UI/CLI/API when you see throttling |
| **Load testing** | Validating new services at scale | Provision TRUs for the test, deprovision after |
| **Batch jobs** | Scheduled high-throughput jobs | Automate TRU scaling via API around job schedules |
| **Migrations** | Onboarding a new workload faster than on-demand adjusts | Bridge with TRUs for approximately 7 days while the on-demand envelope catches up |

:::note
When switching back to on-demand mode, your APS limit resets to the running average from the last 7 days.
Plan for this if your workload is sensitive to the transition.
:::

### Cost Optimization Tips

See [Capacity Modes Pricing](/cloud/pricing#capacity-modes-pricing) for billing details. To minimize costs:

- Provision only when you need extra capacity
- Deprovision promptly after spikes end
- For predictable patterns, automate scaling to minimize time in provisioned mode

### Automation Best Practices

Since you understand your workload patterns better than any auto-scaling system, consider building your own TRU automation:

- **Use the [Cloud Ops API](/ops), [Terraform Provider](/cloud/terraform-provider), or [tcld CLI](/cloud/tcld)** to programmatically scale capacity based on your application's signals
- **Set utilization thresholds**: For example, scale up when hitting 70-80% of your limit, scale down after sustained low usage
- **Schedule capacity changes**: Use [Temporal Schedules](/schedule) or Workflows to increase TRUs before known events
- **React to leading indicators**: If your application has upstream signals (incoming order queue depth, marketing campaign start), use those to trigger capacity changes proactively

## Knowing if You're Hitting APS Limits

In addition to understanding the patterns that can affect APS limits on a Temporal Namespace, it's also important to know if you're approaching (or exceeding) these limits.
Temporal Cloud provides several metrics that, if tracked, will tell you if you're being rate limited due to APS.
See the documentation on [detecting resource exhaustion](/cloud/service-health#rps-aps-rate-limits) for an explanation of those metrics as well as a sample Grafana dashboard that shows how they could be viewed.

### Monitoring for TRU Decisions

If you're considering Provisioned capacity, set up monitoring to understand your usage patterns:

- **Use [OpenMetrics](/cloud/metrics/openmetrics)**: For real-time visibility into APS consumption, integrate Temporal Cloud metrics with your observability stack
- **Track APS usage vs. limits**: Monitor `temporal_cloud_v0_resource_exhausted_errors` to detect throttling events
- **Set alerts at 70-80% utilization**: This gives you time to provision TRUs before hitting limits
- **Analyze historical patterns**: Understanding your traffic patterns helps you decide between reactive TRU provisioning and proactive automation

## Key Takeaways

Let's recap the main reasons customers hit APS limits and how to address them:

| Reason for Hitting APS Limits | How to Address It |
|-------------------------------|-------------------|
| Bursty Traffic                | Implement application-level queuing or rate limiting to smooth spike, stagger start times for scheduled batch operations. |
| Cascading Workflows <br />and Fan-Out Patterns | Evaluate if Child Workflows are necessary (consider activities or another Namespace), limit fan-out size by processing work in batches within a Child Workflow, consider flattening deeply nested hierarchies. |
| Human-in-the-Loop <br />Processes at Scale | Design long-running Workflows to minimize sustained APS load from interaction (by avoiding polling where UIs constantly Query state and using Signals only for key human inputs). |
| Many small activities         | Consider if you can combine multiple external calls within a single Activity. If processing a large amount of data, process it in chunks. |
| Multiple use cases <br />in one Namespace | Plan for a set of Namespaces (one per environment) per use case. |
| Planned traffic spikes        | Pre-provision TRUs before the event, then deprovision after. |
| Unpredictable spikes <br />requiring instant response | Switch to Provisioned mode for self-service capacity scaling via UI, CLI, or API. |
| Load testing at scale         | Provision TRUs for the test duration, deprovision when complete. |
| New workload onboarding       | Bridge with TRUs while the on-demand envelope adjusts (approximately 7 days). |


## General guidance

When designing Temporal Workflows with an eye toward APS limits, ask yourself the following questions: 
- How many actions will a single execution of this Workflow consume?
- How many Workflows will typically be running at the same time?
- What happens to APS consumption when the number of Actions * number of active Workflows scales to 100x current volume?
- Are there natural opportunities to combine operations: combine activities, or process chunks of data together?
- Am I polling when I could be using Signals?
- Does this Workflow need to run continuously, or can it be event-driven?

A few hours spent optimizing Workflow design can save you from capacity crunches, emergency limit increases, and potentially significant cost increases down the road.
