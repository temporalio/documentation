---
id: what-is-a-local-activity
title: What is a Local Activity?
sidebar_label: Local Activity
description: A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.
tags:
  - explanation
---

A Local Activity is an [Activity Execution](/concepts/what-is-an-activity-execution) that executes in the same process as the [Workflow Execution](/concepts/what-is-a-workflow-execution) that spawns it.

Some Activity Executions are very short-living and do not need the queuing semantic, flow control, rate limiting, and routing capabilities.
For this case, Temporal supports the Local Activity feature.

The main benefit of Local Activities is that they use less Temporal service resources (e.g. lower state transitions) and have much lower latency overhead (because no need to roundtrip to the Cluster) compared to normal Activity Executions.
However, Local Activities are subject to shorter durations and a lack of rate limiting.

Consider using Local Activities for functions that are the following:

- no longer than a few seconds, inclusive of retries (shorter than the Workflow Task Timeout, which is 10 seconds by default).
- do not require global rate limiting.
- do not require routing to a specific Worker or Worker pool.
- can be implemented in the same binary as the Workflow that calls them.

Using a Local Activity without understanding its limitations can cause various production issues.
**We recommend using regular Activities unless your use case requires very high throughput and large Activity fan outs of very short-lived Activities.**
More guidance in choosing between [Local Activity vs Activity](https://community.temporal.io/t/local-activity-vs-activity/290/3) is available in our forums.
