---
id: what-is-a-local-activity
title: What is a Local Activity?
description: todo
---

A Local Activity is an [Activity Execution](/docs/content/what-is-an-activity-execution) that executes in the same process as the [Workflow Execution](/docs/content/what-is-a-workflow-execution) that spawns it.

Some Activities are very short lived and do not need the queuing semantic, flow control, rate limiting and routing capabilities.
For this case, Temporal supports a _local Activity_ feature.

The main benefit of local Activities is that they are much more efficient in utilizing Temporal service resources and have much lower latency overhead compared to the usual Activity invocation.
However, Local Activities are subject to shorter durations and a lack of rate limiting.

Consider using local Activities for functions that are:

- no longer than a few seconds, inclusive of retries (shorter than the Workflow Task Timeout, which is 10 seconds by default)
- do not require global rate limiting
- do not require routing to specific workers or pools of workers
- can be implemented in the same binary as the Workflow that invokes them

Using local activities without understanding their limitations will cause various production issues.
**Our advice is to stick to normal activities unless your use case requires very high throughput and large activity fanouts of very short activities.**
More guidance in choosing between [Local Activity vs Activity](https://community.temporal.io/t/local-activity-vs-activity/290/3) is available in our forums.
